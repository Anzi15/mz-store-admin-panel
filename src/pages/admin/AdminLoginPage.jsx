import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  useSignInWithEmailAndPassword,
  useAuthState,
  useSignInWithGoogle,
  useSendPasswordResetEmail,
} from "react-firebase-hooks/auth";
import { auth } from "../../modules/firebase-modules/fireauth";
import tubeSpinner from "../../assets/tube-spinner.svg";

const AdminLoginPage = () => {
  const [sendPasswordResetEmail, passResetSending, passResetError] =
    useSendPasswordResetEmail(auth);
  const [userAlreadyExist, userExistLoading, userExistError] =
    useAuthState(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const MySwal = withReactContent(Swal);

  if (userAlreadyExist) navigate("/admin");

  const handleForgotPassword = async () => {
    const { value: email } = await MySwal.fire({
      iconHtml:
        '<img src="https://ouch-cdn2.icons8.com/CxA-vssAcYV5CC2p0DBW3-u6tDRNI5Ppppnnt1XOMZk/rs:fit:368:311/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNDQ0/L2E1OWIzOGJjLWQ3/NzAtNDMzYS1hYzk3/LTkwMDdlYzAyODlk/My5zdmc.png">',
      customClass: {
        icon: "no-border",
      },
      input: "email",
      inputPlaceholder: "Enter your email address",
      confirmButtonText: "Send Recovery Email",
      confirmButtonColor: "blue",
    });

    if (email) {
      sendPasswordResetEmail(email);
      if (passResetError) {
        MySwal.fire({
          icon: "error",
          title: passResetError.message,
          confirmButtonText: "Done",
          confirmButtonColor: "red",
        });
      } else {
        MySwal.fire({
          iconHtml:
            '<img src="https://ouch-cdn2.icons8.com/Qij4124AsXem96Za5Vdf8k2wfo6GR6dA06iPlmXQm5Q/rs:fit:368:368/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNTMz/LzFlZGFiMWQ0LWMw/MzAtNGYwMy05Nzll/LWI4NmI2ZjI0N2U3/NS5zdmc.png">',
          customClass: {
            icon: "no-border",
          },
          title: "Check your inbox",
          confirmButtonText: "Done",
          confirmButtonColor: "blue",
        });
      }
    }
  };

  useEffect(() => {
    if (userAlreadyExist) {
      navigate("/admin");
    }
  }, [userAlreadyExist, navigate]);
  const handleSubmission = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("Error signing in:", error.message);
    }

    if (error) {
      console.log("Firebase Authentication Error:", error.message);
    }
    if (!loading && !googleLoading) {
      if (user || googleUser) {
        navigate("/admin");
      }
    }
  };

  return (
    <div className="font-[sans-serif]">
      <div className="flex gap-4 h-screen m-auto items-center justify-center">
        {/* <div className="max-md:order-1 md:flex hidden lg:col-span-2 md:h-screen w-full bg-[#000842] md:rounded-tr-xl md:rounded-br-xl lg:p-12 p-8 order-1">
      <img
        src={"https://maxst.icons8.com/vue-static/ouch/images/hero/slides/corporate.png"}
        className="lg:w-[70%] w-full h-full object-contain block mx-auto"
        alt="login-image"
      />
    </div> */}

        <div className="w-full p-6 max-w-[30rem]">
          <form
            onSubmit={(e) => {
              handleSubmission(e);
            }}
          >
            <div className="mb-8">
              <h3 className="text-gray-800 text-3xl font-extrabold">Log in</h3>
              <p className="text-sm mt-4 text-gray-800">
                Don't have an account?
                <Link
                  to="/admin/signup"
                  className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </Link>
              </p>
            </div>

            <div>
              <label className="text-gray-800 text-[15px] mb-2 block">
                Email
              </label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  required
                  onInput={(e) => {
                    setEmail(e.target.value.trim());
                  }}
                  className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
                  placeholder="Enter email"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clipPath="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      strokeMiterlimit="10"
                      strokeWidth="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-gray-800 text-[15px] mb-2 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  onInput={(e) => {
                    setPassword(e.target.value.trim());
                  }}
                  className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
                  placeholder="Enter password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm">
                  Remember me
                </label>
              </div>
              <div>
                <a
                  onClick={(e) => {
                    handleForgotPassword(e);
                  }}
                  href="#"
                  className="text-blue-600 font-semibold text-sm hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            <div className="mt-8">
              <p
                className={`text-red-600 font-semibold ${
                  error ? "" : "hidden"
                }`}
              >
                {error?.message}
              </p>
              <button
                type="submit"
                className="w-full py-3 px-6 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                {loading ? "Loading.." : "Log In"}
              </button>
            </div>

            <div className="my-4 flex items-center gap-4">
              <hr className="w-full border-gray-300" />
              <p className="text-sm text-gray-800 text-center">or</p>
              <hr className="w-full border-gray-300" />
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-4 py-3 px-6 text-sm tracking-wide text-gray-800 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none"
              onClick={() => {
                signInWithGoogle();
              }}
            >
              {googleLoading ? (
                "..."
              ) : (
                <>
                  <FaGoogle className="text-2xl" />
                  <span>Sign in with Google</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
