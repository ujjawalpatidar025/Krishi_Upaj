import React from "react";
import Navbar from "../Components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../Components/Loading.jsx";
import axios from "axios";
import harvester from "../Images/harvester-white-bg-clone.png";
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
        }
        else{
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
          <h1 className="  text-7xl font-bold w-64 ml-20 absolute top-36 left-28 z-20 text-gray-600 max-xl:text-5xl max-xl:left-2 max-sm:left-1 max-sm:ml-1 max-sm:text-4xl"><span className="text-[13rem] text-gray-300 max-xl:text-8xl max-md:text-gray-700  max-sm:text-7xl">Harvest</span> Your Potential...</h1>
          <h1 className=" text-3xl font-semibold  text-gray-600 absolute top-[75%] left-48 z-20 w-[30vw] ] max-xl:text-2xl max-xl:top-[50%] max-xl:left-24 max-sm:w-[80vw] max-sm:left-3 max-sm:text-lg max-sm:top-[40%]">Unlocking the Power of Farming Machines for Rent!</h1>
        </div>
        <img
          src={harvester}
          className="h-[110vh] max-sm:absolute max-sm:top-40 max-sm:right-0 max-sm:h-[50%] max-sm:mt-0 max-md:h-[70%] max-lg:h-[90%] opacity-90 z-10 max-md:opacity-50 max-sm:opacity-20 "
        />
      </div>
      <div className="text-center text-gray-400  max-sm:absolute max-sm:bottom-0 max-sm:left-[15%] bottom-0 ">
        Design with Love ❤ IIST Coder [UP]
      </div>
    </div>
  );
};

export default Home;
