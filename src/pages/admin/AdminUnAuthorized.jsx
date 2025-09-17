import React from "react";
import { auth } from "../../modules/firebase-modules/fireauth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AdminUnAuthorized = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/admin/login");
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-7">
      <h1 className="font-bold text-2xl text-blue-gray-800 ">
        Sorry buddy, you're not an admin
      </h1>

      <button
        className="bg-deep-orange-900 text-white p-7 py-4 font-bold text-2xl rounded-md"
        onClick={() => {
          handleLogout();
        }}
      >
        Log out 👈
      </button>
    </div>
  );
};

export default AdminUnAuthorized;
