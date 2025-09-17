import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import TailwindDialog from './TailwindDialog';

const CartItem = ({product, productsLoading, quantity, cartItemsUpdater}) => {
  const [quantityState, setQuantityState] = useState(quantity);
  const [confirmationDialog, setConfirmationDialog] = useState(null);
  
    const products = JSON.parse(localStorage.getItem("cart-items"))
  useEffect(()=>{
    updateProductQuantity(product.id, quantityState);
  },[quantityState]);


  const removeItemFromCart = (itemId) => {
    // Set the dialog open and pass a callback to handle the result
    setConfirmationDialog(
      <TailwindDialog
        title={"Are you sure?"}
        text={"Do you want to remove this item from the cart?"}
        actionBtnText={"Yes, remove it"}
        cancelBtnText={"Cancel"}
        initialOpen={true}
        actionReturner={(action) => handleDialogResult(action, itemId)}
        icon='warn'
      />
    );
  }
  
  const handleDialogResult = (action, itemId) => {
    if (action === "confirmed") {
      const product = products.find(p => p.productId === itemId);
      const updatedProducts = products.filter(function(product) {
        return product.productId !== itemId
    })

    cartItemsUpdater(updatedProducts)
    localStorage.setItem("cart-items", JSON.stringify(updatedProducts));
      console.log("Item removed:", itemId);
      window.location.reload()
      // Proceed with actual removal logic from the cart (e.g., updating state)
    }
    // Close the dialog after result handling
    setConfirmationDialog(null);
  };

  function updateProductQuantity(productId, newQuantity) {
    console.log(productId)
    const product = products.find(p => p.productId === productId);
    if (product) {
       // Update the quantity
    product.quantity = newQuantity;

    localStorage.setItem("cart-items", JSON.stringify(products));
    cartItemsUpdater(products)
    } else {
      console.log('Product not found');
    }
  }
    return (
    <div className="flex min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group" >
      {confirmationDialog}
    <div className="w-[40%] md:max-w-[126px]">
      <img
        src={productsLoading ? "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984" : product.primaryImg}
        alt="perfume bottle image"
        className={`mx-auto skeleton-loading rounded-xl ${productsLoading && "skeleton-loading"}`}
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 ">
      <div className="md:col-span-2">
        <div className="flex flex-col  w-full md:items-start md:pl-4 md:gap-3 md:mb-0 mb-2 md:justify-left justify-center ">
          <h6 className={`font-semibold text-base md:text-center text-left leading-7 text-black ${productsLoading && "skeleton-loading"}`}>
           {product.title}
          </h6>
           <h6 className={`font-normal md:text-center text-left text-base leading-7 text-gray-500 ${productsLoading && "skeleton-loading"}`}>
            {product.selectedVariant.name} 
          </h6>
          <h6 className={`font-medium text-base leading-7 text-gray-600 transition-all md:text-center text-left duration-300 group-hover:text-red-800 ${productsLoading && "skeleton-loading"}`}>
            Rs. {product.selectedVariant.price}
          </h6>
        </div>
      </div>
      <div className="flex items-center justify-between max-[500px]:justify-center h-full max-md:mt-3 max-[500]:mb-4">
        <div className="flex items-center md:w-[70%] w-[50%]">
          <button className="group rounded-l-xl  px-2 md:py-[12px] py-3 border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
           onClick={()=>{
            const newQuantity = quantityState-1
            if(newQuantity > 0) setQuantityState(newQuantity)
          }}>

            <svg
              className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
              xmlns="http://www.w3.org/2000/svg"
              width={22}
              height={22}
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M16.5 11H5.5"
                stroke=""
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M16.5 11H5.5"
                stroke=""
                strokeOpacity="0.2"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M16.5 11H5.5"
                stroke=""
                strokeOpacity="0.2"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <input
            type="number"
            className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-md w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 md:py-[10px]  text-center bg-transparent"
            value={quantityState}
            onChange={(e)=>{
                if(e.target.value > 0) setQuantityState(e.target.value)
            }}
          />
          <button className="group z-10 rounded-r-xl px-2 md:py-[12px] py-3 border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
          onClick={()=>{
            const newQuantity = quantityState+1
            setQuantityState(newQuantity)
          }}>
            <svg
              className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
              xmlns="http://www.w3.org/2000/svg"
              width={22}
              height={22}
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M11 5.5V16.5M16.5 11H5.5"
                stroke=""
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M11 5.5V16.5M16.5 11H5.5"
                stroke=""
                strokeOpacity="0.2"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M11 5.5V16.5M16.5 11H5.5"
                stroke=""
                strokeOpacity="0.2"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <button onClick={()=>{removeItemFromCart(product.id)}}>
        <FaTrashAlt className='text-red-800' />
        </button>
      </div>
      <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full justify-center">
        <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-red-800 hidden md:flex ">
          Rs. {product.selectedVariant.price * quantityState}
        </p>
      </div>
    </div>
  </div>
  )
}

export default CartItem
