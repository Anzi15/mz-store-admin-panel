import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import Swal from "sweetalert2";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../modules/firebase-modules/firestore";
import { ref, deleteObject } from "firebase/storage";
import storage from "../../modules/firebase-modules/firestorage";

const AdminProductCard = ({
  link,
  title,
  image1,
  price,
  comparedPrice = null,
  loading,
  onDeleteProduct,
}) => {
  
  const deleteProduct = async (docId) => {
    Swal.fire({
      icon: "warning",
      text: "to delete this product permanently",
      title: "Are you sure?",
      confirmButtonText: "delete",
      confirmButtonColor: "red",
      cancelButtonText: "cancel",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Deleting...",
            text: "Please wait while the product is being deleted.",
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          const productRef = doc(db, "Products", docId);
          const docSnapshot = await getDoc(productRef);
  
          if (docSnapshot.exists()) {
            const productData = docSnapshot.data();
  
            // Move product data to the trash collection
            await setDoc(doc(db, "trashProducts", docId), productData);
  
            // Delete the product document
            await deleteDoc(productRef);
            onDeleteProduct(docId);
  
            Swal.fire({
              icon: "success",
              text: "Product has been deleted and moved to trash.",
              title: "Deleted",
            });
          } else {
            Swal.fire({
              icon: "error",
              text: "Product not found.",
              title: "Error",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            text: "An error occurred while deleting the product.",
            title: "Error",
          });
          console.error("Error deleting product: ", error);
        }
      }
    });
  };
  

  return (
    <>
      <div className="bg-gray-100 border border-blue-200 rounded-lg shadow hover:scale-105 transition-all">
        <img
          src={image1}
          alt={title}
          className="aspect-square w-full skeleton-loading h-64 object-cover rounded-t-lg"
          loading="lazy"
        />
        <div className="p-4">
          <h3
            className={`text-gray-700 text-left ${
              loading && "skeleton-loading"
            }`}
          >
            {title}
          </h3>
          <div className="flex gap-4     items-center mt-2">
            <p
              className={`text-lg font-bold text-gray-900 ${
                loading && "skeleton-loading"
              }`}
            >
              Rs.{price}
            </p>
            {comparedPrice && !isNaN(comparedPrice) ? (
              <p
                className={`text-sm line-through ${
                  loading && "skeleton-loading"
                }`}
              >
                Rs.{comparedPrice}
              </p>
            ) : null}
          </div>
          <div className="flex justify-end gap-4 mt-4">
            {/* <Link
              to={`/product/${link}`}
              className="text-2xl transition text-gray-700"
            >
              <FaRegEye />
            </Link> */}

            <Link
              to={`/admin/products/${link}/edit`}
              className="text-2xl transition"
            >
              <CiEdit />
            </Link>

            <button
              className="text-2xl text-red-600 hover:text-red-800 transition"
              data-product_id={""}
              onClick={() => {
                deleteProduct(link);
              }}
            >
              <MdDeleteOutline />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductCard;
