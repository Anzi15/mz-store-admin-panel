import React from 'react';
import ProductCard from "../ProductCard"

const OrderDetailsModal = ({ orderDetails, onClose }) => {
  if (!orderDetails) return null;

    console.log(orderDetails)

  return (
    <div
      id="orderDetailsModal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 flex md:items-center justify-center items-start w-full h-full overflow-y-scroll overflow-x-hidden bg-gray-800 bg-opacity-50"
    >
      <div className="relative p-4 w-full md:max-w-4xl h-auto bg-white rounded-lg shadow dark:bg-gray-800 py-10 overflow-scroll">
        {/* Modal header */}
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Order #{orderDetails.id}
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {/* Modal body */}
        <div className="space-y-4 ">
            
            <div className="md:columns-3 text-left">
                <div>
                    <h3 className='font-bold text-black py-5 text-lg'>
                        Order Details
                    </h3>
                    <div className='flex pb-3 items-center gap-3'>
                        <h4 className='font-semibold '>
                            Status:
                        </h4>
                        <p>{orderDetails.status}</p>
                    </div>
                    <div className='flex pb-3 items-center gap-3'>
                        <h4 className='font-semibold '>
                            Date:
                        </h4>
                        <p>{orderDetails.createdAt.toDate().toDateString()}</p>
                    </div>
                    <div className='flex pb-3 items-center gap-3'>
                        <h4 className='font-semibold '>
                            Worth:
                        </h4>
                        <p>{orderDetails.grandTotal}</p>
                    </div>
                </div>

                <div>
                    <h3 className='font-bold text-black py-5 text-lg'>
                        Customer Details
                    </h3>
                    <div className='flex pb-3 items-center gap-3'>
                        <h4 className='font-semibold '>
                            First Name:
                        </h4>
                        <p>{orderDetails.customer.firstName}</p>
                    </div>
                    <div className='flex pb-3 items-center gap-3'>
                        <h4 className='font-semibold '>
                        Last Name:
                        </h4>
                        <p>{orderDetails.customer.lastName}</p>
                    </div>
                    <div className='flex pb-3 items-center gap-3'>
                        <h4 className='font-semibold '>
                            Email:
                        </h4>
                        <p>{orderDetails.customer.email}</p>
                    </div>
                    <div className='flex pb-3 items-center gap-3'>
                        <h4 className='font-semibold '>
                            Phone:
                        </h4>
                        <p>{orderDetails.customer.phoneNumber}</p>
                    </div>
                </div>

                <div>
                    <h3 className='font-bold text-black py-5 text-lg'>
                        Shipping Details
                    </h3>
                    <div className='flex pb-3 items-center gap-3'>
                        <h4 className='font-semibold '>
                            City:
                        </h4>
                        <p>{orderDetails.customer.shippingAddress?.city}</p>
                    </div>
                    <div className='flex pb-3 items-center gap-3 justify-center'>
                        <h4 className='font-semibold text-left'>
                            Street Address:
                        </h4>
                        <p>{orderDetails.customer.shippingAddress?.street}</p>
                    </div>
                    <div className='flex pb-3 items-center gap-3'>
                        <h4 className='font-semibold '>
                            Province
                        </h4>
                        <p>{orderDetails.customer.shippingAddress?.state}</p>
                    </div>
                    <div className='flex pb-3 items-center gap-3'>
                        <h4 className='font-semibold '>
                            Near spot
                        </h4>
                        <p>{orderDetails.customer.shippingAddress?.nearSpot}</p>
                    </div>
                </div>
            </div>
            <div className="md:columns-3 text-left">
                <div>
                    <h3 className='font-bold text-black py-5 text-lg'>
                        Discount Details
                    </h3>
                    <div className='flex pb-3 items-center gap-3'>
                        <h4 className='font-semibold '>
                            Coupon code:
                        </h4>
                        <p>{orderDetails.discounts.code}</p>
                    </div>
                    <div className='flex pb-3 items-center gap-3'>
                        <h4 className='font-semibold '>
                            Discount amount:
                        </h4>
                        <p>{orderDetails.discounts.amount}</p>
                    </div>
                </div>

                <div>
                    <h3 className='font-bold text-black py-5 text-lg'>
                        Items
                    </h3>
                    {
                        orderDetails.items.map((item)=>{
                            return(
                                <div className='flex gap-4' key={item.product.title}> 
                                    <div>
                                        <img src={item.product.primaryImg}alt={item.product.title} className='h-20 rounded skeleton-loading aspect-square' />
                                    </div>
                                    <div>
                                        <h3 className='text-xl'>
                                            {item.product?.title}
                                        </h3>
                                        <h4>
                                           x  {item.quantity}
                                        </h4>
                                        <h4>
                                           {item.selectedVariant.name}-{item.selectedVariant.price}
                                        </h4>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div>
                    <h3 className='font-bold text-black py-5 text-lg'>
                        Payment Details
                    </h3>
                    <div className='flex pb-3 items-center gap-3'>
                        <h4 className='font-semibold '>
                            Amount Total:
                        </h4>
                        <p>Rs. {orderDetails.grandTotal}</p>
                    </div>
                    
                    <div className='flex pb-3 items-center gap-3'>
                        <h4 className='font-semibold '>
                            Payment Method:
                        </h4>
                        <p>{orderDetails.payment.method}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
