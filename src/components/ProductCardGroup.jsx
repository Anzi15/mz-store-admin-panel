import React from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const ProductCardGroup = ({
  products,
  groupHeading = null,
  loading,
  link = null,
}) => {
  // Handle the case where products might be empty or null
  const productArray =
    products && products.length > 0
      ? products
      : [
          {
            id: 1,
            title: "meow",
            price: 200,
            primaryImg:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
          },
          {
            id: 2,
            title: "meow",
            price: 200,
            primaryImg:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
          },
          {
            id: 3,
            title: "meow",
            price: 200,
            primaryImg:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
          },
          {
            id: 4,
            title: "meow",
            price: 200,
            primaryImg:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
          },
        ];

  return (
    <div className="my-12 px-8 ">
      {/* Conditional rendering for group heading */}
      <div className="w-full flex justify-between">
        {groupHeading && (
          <h3 className="text-3xl uppercase text-left font-semibold max-w-fit">
            {groupHeading}
          </h3>
        )}

        {link && (
          <Link to={link} className="normal-brand-link">
            View All
          </Link>
        )}
      </div>
      <div className="w-full grid lg:grid-cols-4 gap-3 grid-cols-2">
        {productArray.map((product) => (
          <ProductCard
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            key={product.id}
            loading={loading}
            price={product.price}
            title={product.title}
            image1={product.primaryImg}
            link={`/product/${product.id}`}
            comparedPrice={product.comparedPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCardGroup;
