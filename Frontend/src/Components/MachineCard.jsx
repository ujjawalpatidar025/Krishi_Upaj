import React, { useState } from "react";
import mower from "../Images/mower.png";

const MachineCard = (props) => {
  const [isopen, setisopen] = useState(false);
  const handleToggle = () => {
    setisopen(!isopen);
  };

  return (
    <>
      <div className=" bg-gray-300 border-gray-900 border-1 min-h-[25vh] w-[28vw] flex-wrap shadow-md rounded-lg m-3 flex justify-between items-center max-xl:w-[30vw] max-lg:w-[50vw] max-md:w-[70vw] max-sm:w-[90vw] max-sm:min-h-[20vh]">
        <img
          src={`http://localhost:4000/${props.item.image}`}
          className=" h-[25vh] max-w-1/2 rounded-l-md rounded-r-[50%] shadow-2xl max-sm:h-[20vh] max-sm:w-[45%]"
        />

        <div className="w-1/2 max-sm:w-1/2 ">
          <h1 className="text-xl font-bold my-1 max-sm:text-sm">
            {props.item.title}
          </h1>
          <h1 className="bg-gray-600 w-1/2 text-center rounded-xl py-1 text-sm text-white font-semibold max-sm:text-[10px]">
            {props.item.type}
          </h1>
          <p className="text-gray-600  pr-2 py-1  truncate h-8">
            {props.item.shortdescription}{" "}
          </p>
          <div className="flex justify-between items-center  w-full">
            <h1 className="w-1/2 text-left font-extrabold text-sm">
              RS. {props.item.rentamount}
            </h1>
            <div className="w-1/2">
              <button
                onClick={handleToggle}
                className="px-3 bg-green-500 py-1 rounded-lg shadow-md text-white font-bold hover:cursor-pointer hover:bg-green-600 max-sm:px-2"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
      {isopen ? (
        <>
          <div className="w-[100vw] h-[100vh] absolute top-0 left-0 backdrop-blur-sm  transition-all flex justify-center items-center  ">
            <div className="w-[40vw] h-[80vh]  bg-white shadow-2xl rounded-lg border border-gray-300 bg-opacity-100 transition-all ease-in-out ">
            <div className="flex ">
            <img src={mower} className="h-[50vh] w-[50vh] rounded-tl-lg rounded-br-[50%]"/>
            </div>
            <button onClick={()=>setisopen(!isopen)}>Cancel</button></div>
          </div>
        </>
      ) : (
        <div className="hidden"></div>
      )}
    </>
  );
};

export default MachineCard;
