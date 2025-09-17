'use client';

import { Link } from "react-router-dom";
import AddToCartBtn from "./AddToCartBtn";
import StarRating from "./StarRatings";

const ProductCard = ({
  link,
  title,
  image1,
  price,
  comparedPrice = null,
  loading,
  productData, 
  ratings
}) => {
  const hasDiscount = comparedPrice && !isNaN(comparedPrice);
  const discountPercentage = hasDiscount
    ? Math.round(((comparedPrice - price) / comparedPrice) * 100)
    : 0;

  return (
    <div className="group my-4 md:my-10 flex m-[1%] w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-small hover:shadow-md">
      <Link to={link}>
        <div className="flex rounded-xl relative">
          <img
            className="peer right-0 w-full object-cover aspect-square skeleton-loading object-center"
            src={image1}
            alt={title}
          />
          {hasDiscount && (
            <span className="absolute top-0 right-0 m-2 rounded-full bg-red-600 px-2 text-center text-sm font-medium text-white">
              SALE
            </span>
          )}
        </div>
      </Link>
      <div className="mt-4 px-5 pb-5 md:min-h-[12rem]">
        <Link to={link}>
          <h5 className={`text-xl text-left tracking-tight text-slate-900 ${loading && "skeleton-loading"}`}>
            {title}
          </h5>
          {ratings && (
            <div className="flex items-center mt-2">
              <StarRating rating={ratings.stars} />
              <span className="text-sm text-gray-400 ml-2">
                ({ratings.numberOfReviews})
              </span>
            </div>
          )}
          <div className="mt-2 mb-5 md:flex justify-between">
            <p>
              <span className={`md:text-2xl text-left text-[#2f2f2f] font-bold ${loading && "skeleton-loading"}`}>
                Rs. {price}
              </span>
            </p>
            {hasDiscount && (
              <span className={`ml-2 text-red-600 text-sm text-slate-900 line-through ${loading && "skeleton-loading"}`}>
                Rs. {comparedPrice}
              </span>
            )}
          </div>
        </Link>
        <AddToCartBtn productData={productData} />
      </div>
    </div>
  );
};

export default ProductCard;