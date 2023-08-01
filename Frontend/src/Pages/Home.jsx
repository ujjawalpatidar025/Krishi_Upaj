import React from "react";
import Navbar from "../Components/Navbar";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../Components/Loading.jsx";
import axios from "axios";
import harvester from "../Images/harvester-white-bg-clone.png";
import tractor from "../Images/tractor-bg3.png";
import tractor1 from "../Images/tractor-bg4.png";
import { FaEnvelope, FaPhone, FaFacebook, FaTwitter } from "react-icons/fa";

import { add, gettoken, remove } from "../Redux/Slices/authReducer.js";

const Home = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setloading(true);
    const fetchdata = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/users/isAuthenticated",
          { token }
        );

        if (!response.data.others) {
          toast.error("Network Error");
          setloading(false);
          navigate("/signin");
        } else {
          const user = response.data.others;
          dispatch(add(user));
          dispatch(gettoken(token));
          setloading(false);
        }
      } catch (err) {
        dispatch(remove());
        console.log(err.response.data.message);
        setloading(false);
        navigate("/signin");
      }
    };

    fetchdata();
  }, []);
  return (
    <div className="max-sm:overflow-x-hidden ">
      <Navbar />
      <div className="w-full h-auto flex justify-between items-center  bg-[#fcfaf9] wrap overflow-x-hidden">
        <div className="w-[50vw] h-[120%]">
          <h1 className="  text-7xl font-bold w-64 ml-20 absolute top-36 left-28 z-20 text-gray-600 max-xl:text-5xl max-xl:left-2 max-sm:left-1 max-sm:ml-1 max-sm:text-4xl">
            <span className="text-[13rem] text-gray-300 max-xl:text-8xl max-md:text-gray-700  max-sm:text-7xl">
              Harvest
            </span>{" "}
            Your Potential...
          </h1>
          <h1 className=" text-3xl font-semibold  text-gray-600 absolute top-[75%] left-48 z-20 w-[30vw] ] max-xl:text-2xl max-xl:top-[50%] max-xl:left-24 max-sm:w-[80vw] max-sm:left-3 max-sm:text-lg max-sm:top-[45%]">
            Unlocking the Power of Farming Machines for Rent!
          </h1>
        </div>
        <img
          src={harvester}
          className="h-[110vh] max-sm:absolute max-sm:top-80 max-sm:right-0 max-sm:h-[50%] max-sm:mt-0 max-md:h-[70%] max-lg:h-[90%] opacity-90 z-10 max-md:opacity-50 max-sm:opacity-20  "
        />
      </div>
      <div className="bg-[#fcfaf9] flex justify-around items-center flex-wrap ">
        <div className="w-[50vw]">
          <img
            src={tractor}
            className="h-[100vh] opacity-90 max-xl:absolute max-xl:top-[130%] max-xl:opacity-80 max-xl:h-[80vh] max-xl:w-[50vw] max-lg:w-[70vw] max-lg:opacity-60 max-lg:left-4 max-lg:top-[100%] max-md:w-[80vw] max-md:h-[80vh] max-md:opacity-40 max-md:top-[150%] max-sm:w-[90vw] max-sm:hidden "
          />
        </div>

        <section class="w-[50vw] max-sm:m-auto max-sm:top-[90%] h-[100vh] p-3 z-20 max-xl:w-[50vw] max-lg:absolute  max-lg:top-[90%] max-lg:right-10 max-lg:w-[70vw] max-md:w-[90vw] ">
          <h1 className="text-[10rem] max-sm:text-[4rem]  font-extrabold  text-gray-300 max-xl:text-[6rem] max-lg:text-gray-400 max-lg:text-right max-md:text-center">
            <span className="text-[12rem] max-sm:text-[6rem]">S</span>ervices
          </h1>
          <div className="flex justify-between items-center flex-wrap max-lg:absolute max-lg:w-full">
            <div className="border bg-gray-200  border-gray-300 m-3 p-4 w-[45%] rounded-lg shadow-xl max-md:bg-gray-400 max-sm:w-full max-sm:bg-emerald-200">
              <p className="font-bold text-lg mb-2">
                Equipment Delivery and Pickup
              </p>
              <p>Convenient delivery and pickup services.</p>
            </div>
            <div className="border bg-gray-200  border-gray-300 m-3 p-4 w-[45%] rounded-lg shadow-xl max-md:bg-gray-400 max-sm:w-full max-sm:bg-emerald-200">
              <p className="font-bold text-lg mb-2">
                Online Booking and Reservations
              </p>
              <p>Easily book equipment online.</p>
            </div>
            <div className="border  bg-gray-200 border-gray-300 m-3 p-4 w-[45%] rounded-lg shadow-xl max-md:bg-gray-400 max-sm:w-full max-sm:bg-emerald-200">
              <p className="font-bold text-lg mb-2">
                Pricing and Transparent Costs
              </p>
              <p>Clear and upfront pricing.</p>
            </div>
            <div className="border  bg-gray-200 border-gray-300 m-3 p-4 w-[45%] rounded-lg shadow-xl max-md:bg-gray-400 max-sm:w-full max-sm:bg-emerald-200">
              <p className="font-bold text-lg mb-2">
                Contact and Support Channels
              </p>
              <p>Various contact options.</p>
            </div>
          </div>
        </section>
      </div>
      <div className="bg-[#fcfaf9] w-[100vw] h-[100vh] max-md:top-[230%] max-sm:top-[200%] flex justify-around px-8 max-lg:absolute max-lg:top-[180%] max-lg:left-0 max-lg:w-[100vw]">
        <div className="w-[50vw] h-[70vh] z-20 max-lg:absolute max-lg:left-0 max-lg:h-[80vh] max-md:w-[100vw]">
          <h1 className="text-[10rem] text-center max-md:text-[4rem]   font-extrabold  text-gray-300 max-xl:text-[6rem] max-lg:text-gray-400  max-md:text-center max-lg:text-[4rem] max-lg:text-left">
            <span className="text-[12rem] max-sm:text-[6rem] ">C</span>ontact
          </h1>
          <section className=" py-8 max-md:w-[60vw] max-sm:m-auto  max-sm:text-md">
            <div className="container mx-auto px-4">
              <div className="flex justify-center max-lg:w-[40vw] max-md:w-full max-md:m-auto ">
                <div className="flex items-center justify-around w-3/4  space-x-4">
                  {/* Email */}
                  <Link
                    href="mailto:info@example.com"
                    className="contact-icon text-7xl hover:text-red-700 max-sm:text-4xl"
                  >
                    <FaEnvelope />
                  </Link>
                  {/* Phone */}
                  <Link
                    href="tel:+123456789"
                    className="contact-icon text-7xl hover:text-blue-400 max-sm:text-4xl"
                  >
                    <FaPhone />
                  </Link>
                  {/* Facebook */}
                  <Link
                    href="https://www.facebook.com/example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-icon text-7xl hover:text-blue-900 max-sm:text-4xl"
                  >
                    <FaFacebook />
                  </Link>
                  {/* Twitter */}
                  <Link
                    href="https://twitter.com/example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-icon text-7xl hover:text-blue-500 max-sm:text-4xl"
                  >
                    <FaTwitter />
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <div className="w-full text-xl text-slate-600 text-center px-4 max-xl:text-lg max-md:px-8 max-md:font-bold max-sm:text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </div>
        </div>
        <img
          src={tractor1}
          className="max-xl:h-[80vh] w-[60vw] max-lg:absolute max-lg:right-0 max-lg:opacity-80 max-md:top-[50%] max-md:w-[80vw] max-md:opacity-30 max-sm:top-[40%] max-sm:w-[100vw] max-sm:h-[50vh]"
        />
      </div>
      <div className="text-center text-gray-400  max-xl:absolute max-xl:top-[310%] max-xl:right-[40%]  max-lg:absolute max-lg:top-[320%] max-lg:right-[30%] max-md:top-[290%] max-sm:left-[25%]">
        Design with Love ❤ IIST Coder [UP]
      </div>
    </div>
  );
};

export default Home;
