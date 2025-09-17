import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField";
import { Dropdown } from "flowbite-react";
import { Select, Option } from "@material-tailwind/react";
import DatePicker from "../../components/DatePicker";
import { expression } from "@cloudinary/url-gen/qualifiers/expression";
import { TagsInput } from "react-tag-input-component";
import { GoGoal } from "react-icons/go";
import { toast } from "react-toastify";
import { getCouponDoc } from "../../components/PromoCodeForm";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../modules/firebase-modules/firestore";
import TailwindDialog from "../../components/TailwindDialog";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";

const AdminCouponEdit = () => {
  const { couponCode: couponId } = useParams();
  const [productId, setProductId] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountType, setDiscountType] = useState("amount");
  const [discountValue, setDiscountValue] = useState("");
  const [expirationDate, setExpirationDate] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [minimumOrderValue, setMinimumOrderValue] = useState(1);
  const [usageLimit, setUsageLimit] = useState(undefined);
  const [usedCount, setUsedCount] = useState(0);
  const [publishing, setPublishing] = useState(false);
  const [publishingMsg, setPublishingMsg] = useState("Publishing..");
  const [validForProducts, setValidForProducts] = useState(["all"]);
  const [error, setError] = useState(null);
  const [confirmationDialog, setConfirmationDialog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCouponData = async () => {
      try {
        const couponDoc = await getCouponDoc(couponId, setError); // Ensure this returns a document snapshot
        console.log(couponDoc);
        const data = couponDoc[0]; // Access the document's data

        if (data) {
        setProductId(data.id)
        console.log(data.id)
          setCouponCode(data.couponCode);
          setDiscountType(data.discountType);
          setDiscountValue(data.discountValue);
          setExpirationDate(data.expirationDate);
          setIsActive(data.isActive);
          setMinimumOrderValue(data.minimumOrderValue);
          setUsageLimit(data.usageLimit);
          setValidForProducts(data.validForProducts);
        }
      } catch (error) {
        console.error("Error fetching coupon data:", error);
      }
    };

    if (couponId) {
      getCouponData();
    }
  }, [couponId]);

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    if (expirationDate == "" || expirationDate == undefined) {
      toast.error("Select a date");
      return;
    }
    if (!validForProducts.length) {
      toast.error(
        "Select     a collection of product, or write all for universal coupons in 'valid for products' field"
      );
    }
    setPublishing(true);
    try {
        if(couponCode !== couponId){
            const doesCouponExist =
            (await getCouponDoc(couponCode, setError)).length !== 0;
            if (doesCouponExist) {
                toast.error("Coupon already exist");
                return;
            }
        }
      const data = {
        couponCode,
        discountType,
        discountValue,
        expirationDate,
        isActive,
        minimumOrderValue,
        usageLimit,
        usedCount,
        validForProducts,
      };

      const docRef = doc(db, "coupons", productId);
      await setDoc(docRef, data);
      setPublishing(false);
      setConfirmationDialog(
        <TailwindDialog
          title={"Coupon Updated"}
          text={"coupon updated successfully"}
          actionBtnText={"Go to Management"}
          cancelBtnText={"Update more details"}
          initialOpen={true}
          actionReturner={(action) => handleDialogResult(action)}
          icon="success"
        />
      );
      console.table(data);
    } catch (error) {
      console.error(error);
      toast.error("something went wrong");
      return;
    }
  };


  const deleteCoupon = ()=>{
    setConfirmationDialog(
        <TailwindDialog
          title={"Are you sure?"}
          text={"Are you sure to delete this coupon"}
          actionBtnText={"Delete"}
          cancelBtnText={"Cancel"}
          initialOpen={true}
          actionReturner={async (action) => {
            if(action=== "confirmed"){
                try {
                    await deleteDoc(doc(db, "coupons", productId));
                    navigate("/admin/management")
                } catch (error) {
                    toast.error("Something went wrong :( ")
                    console.log(error)
                }
            }else{
                setConfirmationDialog(null)
            }
          }}
          icon="error"
        />
      );
  }

  const handleStatusUpdate = () => {
    Swal.fire({
      icon: "info",
      title: "Update Coupon Status",
      text: "set the status for this coupon",
      confirmButtonText: "Active",
      cancelButtonText: "In Active",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) setIsActive(true);
      else if (result.isDismissed) setIsActive(false);
    });
  };

  const handleDialogResult = (action) => {
    if (action === "confirmed") {
      navigate("/admin/management");
    } else {
      window.location.reload();
    }
  };
  return (
    <>
      {publishing && (
        <div className="w-full h-screen fixed z-30 inset-0 bg-white flex items-center justify-center flex-col">
          <h1 className="text-black z-50 text-2xl">Publishing Product</h1>
          <img
            src="https://cdnb.artstation.com/p/assets/images/images/028/712/381/original/tim-gilardi-bunny-loading-animation3.gif?1595286299"
            className="w-1/2 md:w-[15rem] mx-auto my-5"
            alt="Loading.."
          />
          <p>{publishingMsg}</p>
        </div>
      )}
      {confirmationDialog}
      <section className="p-4 w-full h-full flex flex-col items-start ">
        <div className="flex w-full items-center md:flex-row flex-col justify-between">
          <h2 className="text-3xl my-4">Update a new coupon</h2>

          <button
            className={` w-full items-center flex ${
              isActive ? "bg-green-500" : "bg-red-800"
            } px-6 text-white font-semibold md:w-[10rem] justify-center h-[3rem] rounded-full`}
            onClick={handleStatusUpdate}
          >
            {isActive ? "Active" : "Paused"}
          </button>
        </div>
        <form className="my-9 w-full" onSubmit={handleFormSubmission}>
          <div className="w-full flex gap-4 md:flex-row flex-col">
            <InputField
              requiredInput={true}
              inputName="Coupon Code"
              inputType="text"
              valueReturner={(text) => {
                setCouponCode(text.toUpperCase());
              }}
              inputValue={couponCode}
            />

            <div className="w-full">
              <Select value={discountType} label={"Discount Type"}>
                <Option onClick={() => setDiscountType("percentage")}>
                  Percentage
                </Option>
                <Option onClick={() => setDiscountType("amount")}>
                  Amount
                </Option>
              </Select>
            </div>
          </div>
          <div className="w-full flex gap-4 md:flex-row flex-col my-4 items-center">
            <InputField
              requiredInput={true}
              inputName="Discount Value"
              inputType="number"
              valueReturner={setDiscountValue}
              inputValue={discountValue}
              className="w-1/2"
            />
            <InputField
              requiredInput={false}
              inputName="Usage Limited (infinite by default)"
              inputType="number"
              valueReturner={setUsageLimit}
              inputValue={usageLimit}
              className="w-1/2"
            />
            <DatePicker
              dateReturner={setExpirationDate}
              initialDate={expirationDate ? expirationDate : null}
              className="min-w-1/2"
            />
          </div>
          <div className="w-full flex gap-4 md:flex-row flex-col">
            <InputField
              requiredInput={true}
              inputName="Minimum Order Requirement"
              inputType="number"
              valueReturner={setMinimumOrderValue}
              inputValue={minimumOrderValue}
            />

            <div className="w-full">
              <TagsInput
                value={validForProducts}
                onChange={(tags) =>
                  setValidForProducts(tags.map((tag) => tag.toLowerCase()))
                }
                name="tags"
                placeHolder="Enter Tags"
                separators={["Enter", ",", " "]}
              />
              <em className="text-left">
                Add tags (product collections), that can use this coupon or make
                it for all
              </em>
            </div>
          </div>

          <div className="flex w-full gap-4 items-center">
            <button
              className="my-10 w-full justify-center align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
              type="submit"
            >
              <GoGoal className="text-2xl" />
              Update Coupon
            </button>
            <button className="bg-red-800 h-fit px-4 py-3  rounded-lg text-white text-nowrap" type="button"  onClick={deleteCoupon}>
              Delete coupon
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AdminCouponEdit;
