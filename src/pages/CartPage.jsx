import React, { useEffect, useState } from "react";
import emptyCartImg from "../assets/empty-cart.webp";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../modules/firebase-modules/firestore";
import CartItem from "../components/CartItem";
import PromoCodeForm from "../components/PromoCodeForm";
const CartPage = () => {
  const [cartItems, setCartItems] = useState(() => {
    // Get initial cart items from localStorage
    return JSON.parse(localStorage.getItem('cart-items')) || [];
  });
  const [subTotal, setSubTotal] = useState(null)
  const [total, setTotal] = useState(null)
  const [productsLoading, setProductsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const [allProductTags, setAllProductTags] = useState([])
  const [discountValue, setDiscountValue] = useState(0)
  const [discountType, setDiscountType] = useState(null)
  const [shippingFees, setShippingFees] = useState(null)
  const [checkoutLink, setCheckoutLink] = useState(`/checkout/cart/0/`)
  // const [ finalShippingFees, setFinalShippingFees] = useState(null)
  const [couponCodeApplied, setCouponCodeApplied] = useState(null)


  useEffect(()=>{
    console.log(couponCodeApplied)
  },[couponCodeApplied])

  useEffect(() => {
    if (cartItems?.length) {
      const getCartProducts = async (allProducts) => {
        const productsArr = [];
        allProducts.map((product) => {
          const quantity = product.quantity;
          const selectedVariant = product.selectedVariant;
          const id = product.productId;
          console.log(quantity);
          const allData = {
            ...product.data,
            quantity,
            selectedVariant,
            id,
            quantityUpdater: (newQuantity) => {
              if (newQuantity > 0) {
                allData.quantity = newQuantity;
              }
            },
          };

          console.log(allData);
          productsArr.push(allData);
        });
        return productsArr;
      };

      getCartProducts(cartItems).then(async (products) => {
        let subtotal = 0;
        const allProductsTags = [];
        
        products.forEach((product) => {
            subtotal += product.selectedVariant.price * product.quantity;
            allProductsTags.push(...product.tags);
        });
        
       
       setAllProductTags(allProductsTags)
       setSubTotal(subtotal)
        setProducts(products); 
        setProductsLoading(false);
        if (subtotal > 1500){
          console.log(subtotal > 1500)
          setShippingFees(0)
          console.log(shippingFees)
          console.log(`set the shippin fee 0`)
        }else{
          console.log(`sdfasfasfsfasf`)
          setShippingFees(300)

        }
      });
    } else {
      setProductsLoading(false);
    } //empty
  }, [cartItems]);

  useEffect(()=>{
    setTotal(subTotal + shippingFees - discountValue)
  },[subTotal, discountValue, shippingFees])

  const getDiscountValue = (value, type, coupon_code_applied)=>{
    setCouponCodeApplied(coupon_code_applied)
    sessionStorage.setItem("couponApplied", coupon_code_applied)
    if(type){
      if(type == "amount") {setDiscountValue(value)}
        else if(type == "percentage") {
      const discountedPrice = subTotal * (1 - (value / 100));
      setDiscountValue(Math.round(subTotal - discountedPrice))
      
    }
    console.log(coupon_code_applied)
    
    }
  }


  return (
    <main className="overflow-x-hidden py-8">
      {cartItems?.length ? (
        <section className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
          <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
            <div className="grid grid-cols-12 md:order--1 order-1">
              <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto order-1 md:order-2">
                <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                  <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                    Shopping Cart
                  </h2>
                  <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                    {cartItems.length} Items
                  </h2>
                </div>
                <div className="md:grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200 hidden">
                  <div className="col-span-12 md:col-span-7">
                    <p className="font-normal text-left text-lg leading-8 text-gray-400">
                      Product Details
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <div className="grid grid-cols-5">
                      <div className="col-span-3">
                        <p className="font-normal text-lg leading-8 text-gray-400 text-left">
                          Quantity
                        </p>
                      </div>
                      <div className="col-span-2">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-right pr-4">
                          Total
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {products.length &&
                  products.map((product, i) => {
                    return (
                      <CartItem
                        key={i}
                        product={product}
                        productsLoading={productsLoading}
                        quantity={product.quantity}
                        cartItemsUpdater={setCartItems}
                      />
                    );
                  })}

                  {/* <div className="flex flex-col md:hidden">
                  <div className="py-8 flex flex-col gap-4">
                    <div>
                    <div className="flex items-center justify-between ">
                      <p className="font-medium text-md leading-8 text-gray-800">
                        Sub Total
                      </p>
                      <p className="font-semibold text-md leading-8 text-red-800">
                          Rs. {subTotal}
                      </p>
                    </div>

                    <div className="flex items-center justify-between ">
                      <p className="font-medium text-md leading-8 text-gray-800">
                        Shipping Fees
                      </p>
                      <p className={`font-semibold text-md leading-8 text-red-800 ${shippingFees == null && "skeleton-loading"}`}>
                          Rs. {shippingFees}
                      </p>
                    </div>

                   {discountValue > 0 && <div className="flex items-center justify-between ">
                      <p className="font-medium text-md leading-8 text-gray-800">
                        Coupon Discount:
                      </p>
                      <p className="font-semibold text-md leading-8 text-red-800">
                          - Rs. {discountValue}
                      </p>
                    </div>}
                    </div>

                    <div className="flex items-center justify-between ">
                      <p className="font-medium text-xl leading-8 text-black">
                       Total
                      </p>
                      <p className={`font-semibold text-xl leading-8 text-red-800 ${shippingFees == null && "skeleton-loading"}`}>
                          Rs. {total}
                      </p>
                    </div>

                   </div>

                    <Link className="w-full text-center bg-red-800 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-red-900" to={`/cart/checkout/`}>
                      Checkout
                    </Link>
                  </div> */}
              </div>

              <div className={`col-span-12 xl:col-span-4 md:bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 md:py-24  md:order-2 order ${isSummaryExpanded  && "bg-gray-50"}`}>
                <h2
                  className="font-manrope font-bold md:text-3xl text-lg leading-10 text-black pb-8 border-b border-gray-300 md:text-center text-left pl-4 flex gap-2 p-3 items-center "
                  onClick={() => {
                    setIsSummaryExpanded(!isSummaryExpanded);
                  }}
                >
                  Order Summary
                  <div
                    className={`"flex md:hidden  ${
                      isSummaryExpanded ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <svg
                      className="ml-2 my-auto"
                      width={16}
                      viewBox="0 0 12 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </h2>
                <div className={`mt-8 md:flex flex-col bg-none md:p-0 p-4  ${isSummaryExpanded ? "flex " : "hidden"}`}>
                  <div className="flex items-center justify-between pb-6">
                    <p className="font-normal text-lg leading-8 text-black">
                      {cartItems.length} Items
                    </p>
                    <p className="font-medium text-lg leading-8 text-black">
                      Rs. {total}
                    </p>
                  </div>
                  <div>

                    <div className="flex pb-6">
                      <div className="relative w-full">

                        <div
                          id="dropdown-delivery"
                          aria-labelledby="dropdown-delivery"
                          className="z-20 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-10 bg-white right-0"
                        >

                        </div>
                      </div>
                    </div>

                    <PromoCodeForm productTags={allProductTags ?allProductTags : []} discountTypeReturner={setDiscountType} discountValueReturner={getDiscountValue}/>
                   
                   <div className="py-8 flex flex-col gap-4 w-full">
                    <div className="w-full">
                    <div className="flex items-center justify-between ">
                      <p className="font-medium text-md leading-8 text-gray-800">
                        Sub Total
                      </p>
                      <p className="font-semibold text-md leading-8 text-red-800">
                          Rs. {subTotal}
                      </p>
                    </div>

                    <div className="flex items-center justify-between ">
                      <p className="font-medium text-md leading-8 text-gray-800">
                        Shipping Fees
                      </p>
                      <p className={`font-semibold text-md leading-8 text-red-800 ${shippingFees == null && "skeleton-loading"}`}>
                          Rs. {shippingFees}
                      </p>
                    </div>

                   {discountValue > 0 && <div className="flex items-center justify-between ">
                      <p className="font-medium text-md leading-8 text-gray-800">
                        Coupon Discount:
                      </p>
                      <p className="font-semibold text-md leading-8 text-red-800">
                          - Rs. {discountValue}
                      </p>
                    </div>}
                    </div>

                    <div className="flex items-center justify-between ">
                      <p className="font-medium text-xl leading-8 text-black">
                       Total
                      </p>
                      <p className={`font-semibold text-xl leading-8 text-red-800 ${shippingFees == null && "skeleton-loading"}`}>
                          Rs. {total}
                      </p>
                    </div>

                   </div>
                   <div className="w-full">

                    <Link to={`/checkout/cart/0/${couponCodeApplied !== null ? couponCodeApplied : ""}`} className=" text-center bg-red-800 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-red-900 mb-8 block">
                      Checkout
                    </Link>

                   </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex w-screen flex-col items-center justify-center min-h-screen gap-6 max-w-screen ">
          <div className=" h-fit w-fit p-8 rounded-full bg-yellow-50 aspect-square flex items-center justify-center">
            <img src={emptyCartImg} alt="" />
          </div>
          <div>
            <h1 className="font-bold text-lg py-2">Your Cart Is Empty</h1>
            <p>Look like you have added nothing to your cart,</p>
            <p>Go ahead and explore some products.</p>
          </div>
          <Link to={"/products"}>
            <Button>Explore Products</Button>
          </Link>
        </section>
      )}
    </main>
  );
};

export default CartPage;
