import React, { useState, useEffect } from "react";
import { Link, useParams, Navigate, useLocation } from "react-router-dom";
import HtmlRenderer from "../HtmlRenderer.jsx";

const ProductPagePreview = ({
  primaryImg,
  secondary1Img,
  secondary2Img,
  title,
  subTitle,
  price,
  comparePrice,
  descriptionHtml,
  variants,
}) => {
  const data = {
    primaryImg,
    secondary1Img,
    secondary2Img,
    title,
    subTitle,
    price,
    comparePrice,
    descriptionHtml,
  };
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);
  const { id: productId } = useParams();
  const location = useLocation();
  const [routeChanged, setRouteChanged] = useState(false);
  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <>
      <main className="flex justify-evenly w-full md:flex-row flex-col max-w-full">
        <div className="imgs-section px-8  w-full md:w-1/2 flex flex-col">
          <div className="product-tree flex gap-2 text-lg py-6">
            <Link to="/" className="text-gray-700">
              Products
            </Link>{" "}
            /
            <p
              className={`this-product ${isLoading ? "skeleton-loading" : ""}`}
              id="product-tree-this-product-name"
            >
              {data.title}
            </p>
          </div>
          <div
            className={`primary-img-con mb-4 ${
              isLoading ? "skeleton-loading" : ""
            }`}
          >
            <img
              src={data.primaryImg}
              alt={data.title}
              className="primary-img w-full aspect-square skeleton-loading object-cover"
              id="product-primaryImg-elem"
              loading="lazy"
            />
          </div>
          <div className="sec-img-con flex justify-between gap-2">
            <div className={`w-1/2 ${isLoading ? "skeleton-loading" : ""}`}>
              <img
                src={data.secondary1Img}
                alt={data.title}
                className="sec-img w-full aspect-square skeleton-loading object-cover"
                id="product-secImg1-elem"
                loading="lazy"
              />
            </div>
            <div className={`w-1/2 ${isLoading ? "skeleton-loading" : ""}`}>
              <img
                src={data.secondary2Img}
                alt={data.title}
                className="sec-img w-full aspect-square skeleton-loading object-cover"
                id="product-secImg2-elem"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="details-section flex flex-col pt-14 text-left gap-3 w-full md:w-1/2 px-6 ">
          <div className="product-data flex flex-col gap-6 pb-8">
            <h1
              className={`product-title text-3xl tracking-wide font-bold text-left uppercase ${
                isLoading ? "skeleton-loading" : ""
              }`}
              id="product-title-elem"
            >
              {data.title}
            </h1>
            <div
              className={`capitalize ${isLoading ? "skeleton-loading" : ""}`}
            >
              {data.Description}
            </div>
            <h3
              className={`product-price text-2xl text-brandRed font-medium tracking-wide ${
                isLoading ? "skeleton-loading" : ""
              }`}
              id="product-price-elem"
            >
              Rs.{selectedVariant ? selectedVariant.price : data.price}
            </h3>
            {variants.length > 1 && (
              <div>
                <p className="font-bold">Format</p>
                <div className="relative flex w-full max-w-[24rem] flex-col rounded-xl  bg-clip-border text-gray-700 gap-3">
                  {variants.length > 0 &&
                    variants.map((variant, index) => (
                      <div
                        key={index}
                        role="button"
                        onClick={() => handleVariantChange(variant)}
                        className={`border flex items-center w-full p-0 leading-tight transition-all max-w-[80%] rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
              ${
                selectedVariant === variant
                  ? "bg-blue-gray-50 text-blue-gray-900"
                  : ""
              }
            `}
                      >
                        <label className="flex items-center w-full px-3 py-2 cursor-pointer">
                          <div className="grid mr-3 place-items-center">
                            <div className="inline-flex items-center">
                              <label
                                className="relative flex items-center p-0 rounded-full cursor-pointer"
                                htmlFor="horizontal-list-react"
                              >
                                <input
                                  name="horizontal-list"
                                  id="horizontal-list-react"
                                  type="radio"
                                  defaultChecked
                                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
                                />
                                <span className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                  >
                                    <circle
                                      data-name="ellipse"
                                      cx="8"
                                      cy="8"
                                      r="8"
                                    ></circle>
                                  </svg>
                                </span>
                              </label>
                            </div>
                          </div>
                          <p className="block font-sans text-base antialiased font-medium leading-relaxed">
                            {variant.name}
                          </p>
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
          <p className="font-bold">Quantity</p>
          <form className="max-w-xs p-2 flex justify-left items-start">
            <div className="relative flex items-start max-w-[8rem]">
              <button
                type="button"
                id="decrement-button"
                data-input-counter-decrement="quantity-input"
                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-l-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                onClick={() => {
                  updateQuantity(1, "decrement");
                }}
              >
                <svg
                  className="w-3 h-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <input
                type="number"
                id="quantity-input"
                data-input-counter
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={quantity}
                required
                onInput={(e) => {
                  updateQuantity(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateQuantity(1, "increment");
                }}
                type="button"
                id="increment-button"
                data-input-counter-increment="quantity-input"
                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              >
                <svg
                  className="w-3 h-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className="cta-con pt-8">
            <div className="two_btn_con flex gap-4 items-center mb-4 flex-col">
              <button
                className="align-middle select-none w-full text-xm min-h-6 font-sans font-semibold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
              >
                Buy Now
              </button>
              <button
                className="align-middle select-none w-full text-xm min-h-6 font-sans font-semibold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3 px-6 rounded-lg border-2 border-gray-700 text-black shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
              >
                Add To Cart
              </button>
            </div>
          </div>

          <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 my-8">
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917L5.724 10.5 15 1.5"
                />
              </svg>
              <span>Long lasting</span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917L5.724 10.5 15 1.5"
                />
              </svg>
              <span>Elegant fragrance</span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917L5.724 10.5 15 1.5"
                />
              </svg>
              <span>Perfect for all occasions</span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917L5.724 10.5 15 1.5"
                />
              </svg>
              <span>Attractive packaging</span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917L5.724 10.5 15 1.5"
                />
              </svg>
              <span>High-quality ingredients</span>
            </li>
          </ul>
        </div>
      </main>
      <div className="description">
        {<HtmlRenderer rawHtml={descriptionHtml} />}
      </div>
    </>
  );
};

export default ProductPagePreview;
