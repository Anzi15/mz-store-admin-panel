import React, { useEffect, useState } from "react";
import ProductCardGroup from "../components/ProductCardGroup";
import { getMultipleDocuments } from "../modules/firebase-modules/firestore";

const ProductSuggestions = ({ heading, dontUse = null }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Determine number of products to fetch based on dontUse condition
        const numOfDocs = dontUse === null ? 4 : 5;
        const products = await getMultipleDocuments("Products", numOfDocs);

        // If dontUse is provided, filter out the unwanted product
        if (dontUse !== null) {
          const filteredProducts = products.filter(
            (doc) => doc.title !== dontUse
          );
          // Ensure we have exactly 4 products
          setData(filteredProducts.slice(0, 4));
        } else {
          // No filtering needed, use the fetched products directly
          setData(products);
        }
      } catch (e) {
        setError(e);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dontUse]);

  return (
    <ProductCardGroup
      className="my-8"
      products={data}
      groupHeading={heading}
      loading={loading}
      link={"/products"}
    />
  );
};

export default ProductSuggestions;
