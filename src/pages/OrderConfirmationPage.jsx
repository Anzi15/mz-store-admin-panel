import React, { useEffect, useState } from 'react'
import { IoCheckmark } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../modules/firebase-modules/firestore';
import ConfirmationEmail from '../components/ConfirmationEmail';
import AdminOrderNotification from '../components/admin/AdminOrderNotification';


const OrderConfirmationPage = () => {
  const {orderId, paymentMethod, name, email} = useParams();
  const [orderDetails, setOrderDetails] = useState(null)
  useEffect(()=>{
    const sendConfirmationEmail = async()=>{
      const orderDoc = await getDoc(doc(db,"orders", orderId))
      console.log(orderDoc.data())
      setOrderDetails(orderDoc.data())
      if(!orderDoc.data().ConfirmationEmailSent){
        // const res = ConfirmationEmail(email, name)
        try {
          ConfirmationEmail(orderDoc.data().customer.email, orderDoc.data().customer.firstName)
          const adminRes = AdminOrderNotification(orderDoc.data())
          
          await sendNotification()
          await updateDoc(doc(db, "orders", orderId), {
            ConfirmationEmailSent: true
          });
        } catch (error) {
          console.log(error)
        }
      }
    }

    const sendNotification = async()=>{
      const emails = []
          const emailsDoc = await getDocs(collection(db, "Admins"))
          emailsDoc.forEach((email)=>{
            emails.push(email.data().Email)
          })
          AdminOrderNotification(orderDetails, emails)
          console.log(emails)
    }

    sendConfirmationEmail()
  },[])
  return (
    <main className='w-screen flex flex-col overflow-x-hidden '>
      <section className='flex items-center gap-3 justify-center py-16 flex-col'>

<div className='flex gap-3 items-center'>
      <div className='border-2 border-gray-600 rounded-full w-fit p-3 ' >
      <IoCheckmark  className='text-4xl text-gray-600'/>
      </div>
      <div>

      <h3 className='text-2xl text-gray-600 text-left w-full'>

      Thank you, {name}!
      </h3>
      <h5 className='text-left text-gray-600'>Your order is placed.</h5>
      </div>

</div>
{
  paymentMethod !== "COD" && (
      <div>
        <p>You have chosen online payment method <br /> kindly send us a screenshot of the receipt at <a className='underline font-bold text-light-blue-800' href="https://wa.me/923323947336" target='_blank'>WhatsApp</a>, <br /> In unverified cases the payment will be COD</p>
      </div>
  )
}

      <div className='py-10 px-10'>
        <Link to="/products" className=' text-center bg-red-800 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-red-900 mb-8 block'>Continue Shopping</Link>
        <p>(use promo code "OLDFRIEND" and get special discount on your next order 😉)</p>
      </div>
      </section>

    </main>
  )
}

export default OrderConfirmationPage
