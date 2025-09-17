"use client"
import { toast } from "react-toastify";

const AddToCartBtn = ({productData}) => {
  const addToCart = () => {
    const productId = productData.id;
    const prevCartItems = JSON.parse(localStorage.getItem("cart-items")) || [];
    const productIndex = prevCartItems.findIndex(
      (item) => item.productId === productId
    );
    const productDataObj = { productId, quantity: 1, selectedVariant: productData.variants[0], product:productData };

    if (productIndex === -1) {
      // Product is not in the cart, add a new item
      prevCartItems.push(productDataObj);
      localStorage.setItem("cart-items", JSON.stringify(prevCartItems));
      toast.success("Item Added to Cart");
    } else {
      // Product is already in the cart, update its quantity
      prevCartItems[productIndex].quantity += quantity;
      localStorage.setItem("cart-items", JSON.stringify(prevCartItems));
      toast.success("Item Quantity Updated");
    }
  };
  return (
    <div>
              <button
        className={`mt-4 w-full border-2 border-brandRed
         text-brandRed py-2 rounded-lg transition duration-300 hover:bg-brandRed hover:text-white md:text-md text-smPPRODUC`}
        onClick={() => {
         addToCart()
        }}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default AddToCartBtn
