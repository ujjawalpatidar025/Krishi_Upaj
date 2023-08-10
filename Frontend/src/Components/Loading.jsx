import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center flex-wrap flex-column ">
    <div className="  absolute bottom-[15%] text-5xl font-bold h-20 grad   bg-gradient-to-tr from-green-500 to-gray-500 bg-clip-text text-transparent" >
    Loading
    </div>
      <div class="middle">
        <div class="bar bar1"></div>
        <div class="bar bar2"></div>
        <div class="bar bar3"></div>
        <div class="bar bar4"></div>
        <div class="bar bar5"></div>
        <div class="bar bar6"></div>
        <div class="bar bar7"></div>
        <div class="bar bar8"></div>
      </div>
     
    </div>
  );
};

export default Loading;
