import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="loader ">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
        <div className="text-3xl absolute top-36 font-bold text-green-600 left-20 max-sm:left-0">
          Loading
        </div>
      </div>
    </div>
  );
};

export default Loading;
