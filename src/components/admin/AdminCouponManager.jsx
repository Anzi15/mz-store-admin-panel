import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../modules/firebase-modules/firestore";
import { PiHeadlightsDuotone } from "react-icons/pi";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminCouponManager = () => {
    const [coupons, setCoupons] = useState([]);
    const [couponsLoading, setCouponsLoading] = useState(true);
    useEffect(() => {
        // Async function to get the headline from Firestore
        const getCoupons = async () => {
          try {
            const collectionRef = collection(db, "coupons");
            const allCoupons = await getDocs(collectionRef);
            
            const allCouponsData = []
            allCoupons.forEach((coupon)=>{
                allCouponsData.push(coupon.data())
            })
            console.log(allCouponsData)
            setCoupons(allCouponsData);
            
          } catch (error) {
            console.error("Error fetching headline:", error);
            toast.error("Error fetching coupons:", error)
          } finally{
            setCouponsLoading(false)
          }
        };
    
        getCoupons();
      }, []);
  return (
    <section className="p-4 w-full">
      <div className="flex">
    <div className="flex w-full justify-between items-center pb-10">
      <h3 className="text-left font-semibold">Manage Coupons</h3>
        <Link to={"/admin/management/coupons/new"} className="flex items-center bg-gray-900 rounded-md p-3 text-white aspect-square">
        <FaPlus />
        </Link>
    </div>
      </div>

    <div className="">
      <div className='grid md:grid-cols-4 grid-cols-3 w-full border-b py-4'>
        <h3>Coupon</h3>
        <h3>Discount</h3>
        <h3>Status</h3>
        <h3 className="md:flex hidden">Usage</h3>
      </div>

        {
            !couponsLoading ? (
                coupons.map((coupon, i)=>{
                    return(
                <Link to={`/admin/management/coupons/${coupon.couponCode}/edit`} className='grid md:grid-cols-4 grid-cols-3 w-full border-b py-4 hover:scale-105 transition-all cursor-pointer items-center' key={i}>
                <h3>{coupon.couponCode}</h3>
                <h3>
                    {coupon.discountType == "amount" ? `Rs. ${coupon.discountValue}`: coupon.discountType == "percentage" ? `${coupon.discountValue} %` : coupon.discountValue}
                </h3>
                <div className='flex justify-center'>
                    <p className={`w-fit ${coupon.isActive  ? "bg-green-500" :"bg-red-800"} px-6 text-white font-semibold py-2 rounded-full`}>
        
                    {coupon.isActive ? "Active" : "Paused"}
                    </p>
                </div>
                <h3 className="md:flex hidden">{coupon.usedCount} Times</h3>
              </Link>
                    )
                })
            ) : 
                "meow"
            
        }
        
    </div>
    </section>
  )
}

export default AdminCouponManager
