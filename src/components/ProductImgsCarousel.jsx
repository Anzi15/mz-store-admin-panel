import React, { useState } from "react";
import ProductCardGroup from "./ProductCardGroup";

const ProductImgsCarousel = ({ productImages, thumbnails }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [isImgZoomed, setIsImgZoomed] = useState(false);
  console.log(thumbnails);
  const zoomImage = () => {};
  return (
    <div className="md:px-8 px-4 md:w-1/3 w-full  md:block">
      <div className="activeImg relative w-full aspect-square">
        {productImages.map((img, i) => {
          return (
            <img
              src={img}
              key={i}
              alt="Gm foods achars"
              className={`w-full aspect-square rounded-md skeleton-loading absolute transition-opacity duration-300 ${
                i === activeImg ? "opacity-100 z-20" : "opacity-0 z-10"
              }`}
              onClick={zoomImage}
            />
          );
        })}

        {/* <img src={productImages[activeImg]} alt="" className='w-full aspect-square rounded-md skeleton-loading'/> */}
      </div>
      <div className="w-full flex py-4 gap-4">
        {thumbnails.map((img, i) => {
          return (
            <button
              className={`w-[32%] hover:opacity-85 transition-all rounded-md ${
                i == activeImg && "border-2 border-brandRed"
              }`}
              key={i}
              onClick={() => {
                setActiveImg(i);
              }}
            >
              <img
                src={img}
                className={` rounded-md w-full skeleton-loading aspect-square`}
                alt=""
              />
            </button>
          );
        })}
      </div>

      {isImgZoomed && (
        <div className="w-screen h-screen absolute inset-0 bg-black opacity-30 flex items-center justify-center">
          <img src={productImages[activeImg]} alt="Product" />
        </div>
      )}
    </div>
  );
};

export default ProductImgsCarousel;
