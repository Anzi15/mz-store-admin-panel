import axios from "axios";
import { db } from "../../modules/firebase-modules/firestore.js";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import ImageDropZone from "../../components/admin/ImageDropZone";
import TiptapEditor from "../../components/admin/TiptapEditor";
import ProductCard from "../../components/ProductCard.jsx";
import placeholderImg from "../../assets/placeholder-image-icon.webp";
import ProductPagePreview from "../../components/admin/ProductPagePreview.jsx";
import { GoGoal } from "react-icons/go";
import "rsuite/TagInput/styles/index.css";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { TagsInput } from "react-tag-input-component";
import InputField from "../../components/InputField.jsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminNewProductPage = () => {
  const navigate = useNavigate();
  const FormRef = useRef(null);

  // State
  const [primaryImg, setPrimaryImg] = useState(null);
  const [secondary1Img, setSecondary1Img] = useState(null);
  const [secondary2Img, setSecondary2Img] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [comparePrice, setComparePrice] = useState(null);
  const [descriptionHtml, setDescriptionHtml] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [docId, setDocId] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [publishingMsg, setPublishingMsg] = useState("Publishing..");
  const [ratingStars, setRatingStars] = useState(null);
  const [numberOfReviews, setNumberOfReviews] = useState(null);
  const [isTitleAlreadyExisting, setIsTitleAlreadyExisting] = useState(false);

  const [variants, setVariants] = useState([
    { name: "Default Variant", price: 0, comparePrice: 0 },
  ]);

  const [openTab, setOpenTab] = useState(1);
  const [productSavingType, setProductSavingType] = useState("publish");

  // check title exists
  useEffect(() => {
    setDocId(title.toLowerCase().replace(/ /g, "-"));
    const checkForExistence = async () => {
      if (title.length) {
        try {
          const docRef = doc(db, "Products", title.toLowerCase().replace(/ /g, "-"));
          const docSnap = await getDoc(docRef);
          setIsTitleAlreadyExisting(docSnap.exists());
        } catch (error) {
          console.error("Error checking document:", error);
        }
      } else {
        setIsTitleAlreadyExisting(false);
      }
    };
    checkForExistence();
  }, [title]);

  // keep variants updated with price/comparePrice
  useEffect(() => {
    setVariants(prev => {
      const updated = [...prev];
      updated[0].price = price;
      updated[0].comparePrice = comparePrice;
      return updated;
    });
  }, [price, comparePrice]);

  // upload to imgbb
  const uploadImage = async (file) => {
    const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
    if (!API_KEY) throw new Error("ImgBB API key is missing");

    const toBase64 = (fileOrBlob) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileOrBlob);
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
      });

    const uploadToImgBB = async (base64) => {
      const formData = new FormData();
      formData.append("image", base64);
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!result.success) throw new Error("ImgBB upload failed");
      return result.data.url;
    };

    const originalBase64 = await toBase64(file);
    const originalUrl = await uploadToImgBB(originalBase64);
    return { originalUrl, thumbnails: [] }; // trimmed for brevity
  };

  const addVariant = () =>
    setVariants([
      ...variants,
      { name: `${variants.length + 1} Variant Name`, price: 0, comparePrice: 0 },
    ]);

  const removeVariant = (index) =>
    setVariants(variants.filter((_, i) => i !== index));

  const updateVariant = (index, key, value) =>
    setVariants((prev) => {
      const updated = [...prev];
      updated[index][key] = value;
      return updated;
    });

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    // fallback images logic safely using setters
    if (!primaryImg) {
      if (secondary1Img) {
        setPrimaryImg(secondary1Img);
        setSecondary1Img(null);
      } else if (secondary2Img) {
        setPrimaryImg(secondary2Img);
        setSecondary2Img(null);
      }
    } else if (primaryImg && !secondary1Img && secondary2Img) {
      setSecondary1Img(secondary2Img);
      setSecondary2Img(null);
    }

    if (!primaryImg && !secondary1Img && !secondary2Img) {
      toast.error("Upload All Images!");
      return;
    }
    if (ratingStars > 5) {
      alert("Rating stars can't be more than 5");
      return;
    }

    try {
      setPublishing(true);
      setPublishingMsg("Uploading images...");

      const primaryImgUrl = await uploadImage(primaryImg);
      const secondary1ImgUrl = secondary1Img ? await uploadImage(secondary1Img) : null;
      const secondary2ImgUrl = secondary2Img ? await uploadImage(secondary2Img) : null;

      const reviewsObj =
        ratingStars !== null ? { stars: ratingStars, numberOfReviews } : {};

      const productData = {
        primaryImg: primaryImgUrl.originalUrl,
        secondary1Img: secondary1ImgUrl?.originalUrl || null,
        secondary2Img: secondary2ImgUrl?.originalUrl || null,
        title,
        subTitle,
        descriptionHtml,
        price,
        comparePrice,
        createdAt: Timestamp.now(),
        tags: selectedTags,
        variants,
        ratings: reviewsObj,
      };

      const collectionName = productSavingType === "publish" ? "Products" : "archives";
      await setDoc(doc(db, collectionName, docId), productData);

      Swal.fire({
        text: "Product Added",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "View Products",
        cancelButtonText: "Add another Product",
      }).then((result) => {
        if (result.isConfirmed) navigate("/admin/products");
        else window.location.reload();
      });
    } catch (error) {
      console.error(error);
      toast.error("Error adding product");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <main className="py-16 px-4 md:w-[80vw] w-screen p-4">
      {publishing && (
        <div className="fixed inset-0 flex items-center justify-center flex-col bg-white z-30">
          <h1 className="text-black text-2xl">Publishing Product</h1>
          <p>{publishingMsg}</p>
        </div>
      )}

      {/* form */}
      <form className="md:w-1/2" onSubmit={handleFormSubmission} ref={FormRef}>
        <ImageDropZone storeFileToUpload={setPrimaryImg} />
        <div className="grid grid-cols-2 gap-4">
          <ImageDropZone storeFileToUpload={setSecondary1Img} />
          <ImageDropZone storeFileToUpload={setSecondary2Img} />
        </div>

        <InputField
          inputName={"Title"}
          inputType="text"
          valueReturner={setTitle}
          inputValue={title}
          requiredInput={true}
          errorMsg={isTitleAlreadyExisting && "Product Already exists"}
        />

        {/* other fields ... */}

        <button
          type="submit"
          onClick={() => setProductSavingType("publish")}
          className="bg-gray-900 text-white px-6 py-3 rounded-lg"
        >
          <GoGoal className="inline mr-2" />
          Publish
        </button>
      </form>

      {/* preview */}
      <div className="md:w-1/2">
        {openTab === 1 && (
          <ProductCard
            title={title || "Product Name"}
            price={price || 100}
            image1={primaryImg ? URL.createObjectURL(primaryImg) : placeholderImg}
            comparedPrice={comparePrice || 200}
            ratings={{
              stars: ratingStars > 5 ? 5 : ratingStars,
              numberOfReviews,
            }}
          />
        )}
        {openTab === 2 && (
          <ProductPagePreview
            title={title}
            price={price}
            primaryImg={primaryImg ? URL.createObjectURL(primaryImg) : placeholderImg}
            secondary1Img={
              secondary1Img ? URL.createObjectURL(secondary1Img) : placeholderImg
            }
            secondary2Img={
              secondary2Img ? URL.createObjectURL(secondary2Img) : placeholderImg
            }
            descriptionHtml={descriptionHtml}
            variants={variants}
          />
        )}
      </div>
    </main>
  );
};

export default AdminNewProductPage;
