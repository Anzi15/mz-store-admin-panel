import React, { useState, useEffect, useRef, use } from "react";
import { loadProductsWithPagination } from "../modules/firebase-modules/firestore";
import ProductCardGroup from "../components/ProductCardGroup";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoIosOptions } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

const PAGE_SIZE = 12;

const CollectionPage = () => {
  const { collectionName: collectionName } = useParams();
  const [products, setProducts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [sortOrder, setSortOrder] = useState("title"); // Default sort by title
  const navigate = useNavigate();
  const [filterTag, setFilterTag] = useState(collectionName); // Default no filter
  const loader = useRef(null);

  useEffect(() => {
    console.log(products.length < 1);
    if (!initialLoading && products.length < 1) navigate("/");
  }, [products]);

  useEffect(() => {
    loadMoreProducts();
  }, [sortOrder, filterTag]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const handleObserver = (entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadMoreProducts();
      }
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loading, hasMore]);

  const loadMoreProducts = async () => {
    setLoading(true);

    try {
      const productsData = await loadProductsWithPagination(
        "Products",
        PAGE_SIZE,
        lastVisible,
        sortOrder,
        filterTag
      );

      if (productsData.length === 0) {
        setHasMore(false);
      } else {
        setLastVisible(productsData[productsData.length - 1].doc); // Update last visible document

        setProducts((prevProducts) => {
          const newProducts = productsData.map((doc) => ({
            id: doc.id,
            ...doc,
          }));
          const uniqueProducts = newProducts.filter(
            (newProduct) =>
              !prevProducts.some(
                (prevProduct) => prevProduct.id === newProduct.id
              )
          );
          return [...prevProducts, ...uniqueProducts];
        });
      }
    } catch (error) {
      console.error("Error loading products:", error);
    }

    setLoading(false);
    setInitialLoading(false);
  };

  const handleSortChange = (sortOrder) => {
    setProducts([]);
    setLastVisible(null);
    setHasMore(true);
    setSortOrder(sortOrder);
  };

  const handleFilterChange = (filterTag) => {
    setProducts([]);
    setLastVisible(null);
    setHasMore(true);
    setFilterTag(filterTag);
  };

  return (
    <main>
      <div>
        <div className="px-8 flex w-full justify-between items-center ">
          <h1 className="text-[3rem] py-4 text-left uppercase -">
            {collectionName}
          </h1>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex items-center gap-2 w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <IoIosOptions className="2xl" />
                Options
              </MenuButton>
            </div>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
            >
              <div className="py-1">
                <MenuItem>
                  <button
                    onClick={() => handleSortChange("title")}
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Sort by Title
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => handleSortChange("price")}
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Sort by Price
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => handleFilterChange("achars")}
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Filter by achars
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => handleFilterChange("Attars")}
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Filter by Attars
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => handleFilterChange("")}
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Clear Filter
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
        <div className="products-list">
          {initialLoading ? (
            <>
              <ProductCardGroup loading={true} />
              <ProductCardGroup loading={true} />
            </>
          ) : (
            <ProductCardGroup products={products} />
          )}
          <div ref={loader} />
        </div>
        {loading && <ProductCardGroup loading={true} />}
      </div>
    </main>
  );
};

export default CollectionPage;
