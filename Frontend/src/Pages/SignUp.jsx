import React, { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../Images/Logos/png/logo-color.png";

const SignUp = () => {
  const [submitLoader, setsubmitLoader] = useState(false);
  const handleSubmit = () => {
    setsubmitLoader(true);
    
    
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center md:w-1/2 bg-gray-100 text-white">
        <img src={Logo} className="h-full w-full" />
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center md:w-1/2 bg-[#41bb47] shadow-2xl shadow-green-700">
        <h2 className="text-3xl mb-4 text-white font-bold">Sign Up</h2>
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Enter Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 shadow-md shadow-green-800 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="password"
            >
              Create Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 shadow-md shadow-green-800 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>

          {submitLoader ? (
            <>
              <div role="status" className="text-center">
                <svg
                  aria-hidden="true"
                  class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <button
                  className="bg-green-700 hover:bg-green-600 text-white w-full font-bold shadow-md shadow-green-900 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSubmit}
                >
                  Create Account
                </button>
              </div>
            </>
          )}
        </form>
        <h2 className="text-sm pt-4 text-gray-200">
          Already have an account ??{" "}
          <Link
            to="/signin"
            className="font-bold text-green-900 hover:underline"
          >
            SignIn
          </Link>{" "}
        </h2>
      </div>
    </div>
  );
};

export default SignUp;
