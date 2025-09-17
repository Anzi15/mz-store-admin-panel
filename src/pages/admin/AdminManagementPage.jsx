import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../modules/firebase-modules/firestore";
import { PiHeadlightsDuotone } from "react-icons/pi";
import { toast } from "react-toastify";
import AdminCouponManager from "../../components/admin/AdminCouponManager";

const AdminManagementPage = () => {
  const [headline, setHeadline] = useState(null);

  const updateHeadline = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "storeManagement", "headerNotificationMsg");
    const data = { value: headline };
    try {
      const updateTask = await setDoc(docRef, data);
      toast.success("Headline Updated!");
    } catch (error) {
      toast.error("Error updating headline, try again latter!");
    }
  };
  useEffect(() => {
    // Async function to get the headline from Firestore
    const getHeadline = async () => {
      try {
        const docRef = doc(db, "storeManagement", "headerNotificationMsg");
        const headlineDoc = await getDoc(docRef);

        if (headlineDoc.exists()) {
          const headlineData = headlineDoc.data(); // Extract document data
          setHeadline(headlineData.value); // Assuming `message` is the field in your Firestore document
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching headline:", error);
      }
    };

    getHeadline();
  }, []);
  return (
    <main className="py-16 px-4 md:w-[80vw] w-screen p-4 flex justify-normal items-start min-h-screen flex-col gap-6">
      <h1 className="text-5xl text-left mb-10">Store Management</h1>

      <section className="w-full">
        <div className={`p-4 `}>
          <h3 className="text-left">Edit Store Headline</h3>

          <form
            className="flex w-full border rounded-lg border-gray-900 min-h-[3rem]"
            onSubmit={updateHeadline}
          >
            <input
              type="text"
              className={`w-full border-none rounded-l-lg min-h-full ${
                !headline && "skeleton-loading"
              }`}
              value={headline}
              onInput={(e) => {
                setHeadline(e.target.value);
              }}
            />
            <button className="px-4 bg-indigo-600 rounded-r-lg text-white ">
              Update
            </button>
          </form>
          <p class="flex items-start mt-2 text-xs text-slate-400 text-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 mr-1.5"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clip-rule="evenodd"
              />
            </svg>
            For a better Experience, keep it under 35 characters
          </p>
        </div>
      </section>

    <AdminCouponManager/>
      
    </main>
  );
};

export default AdminManagementPage;
