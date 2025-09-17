import { collection } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";

const CollectionCard = ({ image, collectionName, collectionSlug }) => {
  return (
    <Link
      to={`/collection/${collectionSlug}`}
      className="md:w-1/5 w-[45%] md:m-0 my-4 flex flex-col group relative group"
    >
      <img
        src={image}
        className="rounded-lg rounded-tr-[10rem] aspect- group-hover:brightness-50 group-hover:scale-105 relative transition-all duration-500 w-full uppercase aspect-square skeleton-loading group-hover:rounded-tr-lg "
        alt={`${collectionName} collection | Gm foods achars`}
      />
      <h2 className="hidden uppercase group-hover:flex text-4xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 font-sans">
        {collectionName}
      </h2>
      <h3 className="text-brandRed font-semibold  group-hover:hidden text-2xl uppercase font-sans">
        {collectionName}
      </h3>
    </Link>
  );
};

export default CollectionCard;
