import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import BouncingBallLoader from "../../components/BouncingBallLoader";
import AdminProductCard from "../../components/admin/AdminProductCard";
import { loadProductsWithPagination } from "../../modules/firebase-modules/firestore";
import Swal from "sweetalert2";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [sortOrder, setSortOrder] = useState("title"); // Default sort by title
  const [filterTag, setFilterTag] = useState(""); // Default no filter
  const loader = useRef(null);

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
    const PAGE_SIZE = 15;
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

  const productData = {
    product_id: "001",
    primaryImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-YIGV8GTRHiW_KACLMhhi9fEq2T5BDQcEyA&s", // Placeholder image of a product
    title: "Elegant Wooden Chair",
    price: 5999,
    comparedPrice: 7999, // Comparison price, set to undefined if not applicable
    collection: "Furniture",
  };

  const handleDeleteProduct = (docId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== docId)
    );
  };

  return (
    <main className="my-8">
      <h1 className="text-5xl text-left   ">Manage Products</h1>

      <section className="my-8 md:w-[80vw]">
        <div className="w-full flex md:justify-end">
          <Link
            to={"/admin/products/new"}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center gap-4"
          >
            <CiSquarePlus className="text-2xl" />
            Add a new product
          </Link>
        </div>
        {/* <BouncingBallLoader className="w-[80vw]" /> */}

        <div className="w-full my-12 text-left text-3xl pl-4 mb-0">
          Your Products:
        </div>
        <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {initialLoading ? (
            <>
              <AdminProductCard loading={true} />
              <AdminProductCard loading={true} />
              <AdminProductCard loading={true} />
            </>
          ) : (
            products.map((product) => (
              <AdminProductCard
                key={product.id}
                title={product.title}
                image1={product.primaryImg}
                price={product.price}
                comparedPrice={product?.comparedPrice}
                link={product.id}
                onDeleteProduct={handleDeleteProduct}
              />
            ))
          )}
          <div ref={loader} />
        </div>
        {loading && <AdminProductCard loading={true} />}
      </section>
    </main>
  );
};

export default AdminProductsPage;
