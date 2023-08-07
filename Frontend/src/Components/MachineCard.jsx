import React, { useState } from "react";
import mower from "../Images/mower.png";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { useNavigate, Link } from "react-router-dom";

const MachineCard = (props) => {
  const navigate = useNavigate();
  const [isopen, setisopen] = useState(false);
  const [bidamount, setbidamount] = useState(props.item.rentamount);
  const [tenure, settenure] = useState("");
  const [modal, setmodal] = useState(false);
  const [loading, setloading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleToggle = () => {
    setisopen(!isopen);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    // console.log(props.item._id,props.item.title,props.item.rentamount,props.item.status,tenure+"years",bidamount,user._id,user.firstname+" "+user.lastname);
    const token = localStorage.getItem("token");
    const data = {
      machineid: props.item._id,
      status: props.item.status,
      userid: user._id,
      username: user.firstname + " " + user.lastname,
      machinename: props.item.title,
      bidamount: bidamount,
      tenure: tenure + " " + "year",
      rentamount: props.item.rentamount,
      token: token,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/requests/rentrequest",
        data
      );
      if (!response) {
        setloading(false);
        setmodal(false);
        toast.error("Something Went Wrong");

        navigate("/");
      } else {
        setloading(false);
        setmodal(false);
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setloading(false);
      setmodal(false);
      navigate("/");

      toast.error("Internal Server Error, Try Again");
    }
  };

  return (
    <>
      {modal ? (
        <div
          class="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        class="h-6 w-6 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        class="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Request Confirmation
                      </h3>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">
                          Are you sure you want to Confirm your Request?
                        </p>
                        <p class="text-sm text-gray-500">
                          The Request for the Machine {props.item.title} with
                          Bidamount of{" "}
                          <span className="font-extrabold text-gray-700">
                            RS.{bidamount}
                          </span>{" "}
                          for{" "}
                          <span className="font-extrabold text-gray-700">
                            {tenure}
                          </span>{" "}
                          years
                        </p>
                      </div>
                      <p class="text-lg font-bold text-gray-700 py-3">
                        Total Amount : RS.{bidamount * tenure}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 sm:ml-3 sm:w-auto"
                    onClick={handlesubmit}
                  >
                    {loading ? "Loading..." : "Confirm"}
                  </button>

                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setmodal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className=" bg-gray-300 border-gray-900 border-1 min-h-[25vh] w-[28vw] flex-wrap shadow-md rounded-lg m-3 flex justify-between items-center max-xl:w-[30vw] max-lg:w-[50vw] max-md:w-[70vw] max-sm:w-[90vw] max-sm:min-h-[20vh]">
        <img
          src={`http://localhost:4000/${props.item.image}`}
          className=" h-[25vh] max-w-1/2 rounded-l-md rounded-r-[50%] shadow-2xl max-sm:h-[20vh] max-sm:w-[45%]"
        />

        <div className="w-1/2 max-sm:w-1/2 ">
          <h1 className="text-xl font-bold my-1 py-2 max-sm:text-sm capitalize">
            {props.item.title}
          </h1>
          <div className="flex justify-between ">
            <h1 className="bg-gray-600 w-1/2 text-center capitalize rounded-xl py-1 text-sm text-white font-semibold max-sm:text-[10px]">
              {props.item.type}
            </h1>
            <h1
              className={
                props.item.status
                  ? "w-1/3 bg-gray-200 text-center rounded-xl text-green-600 text-sm py-1 mx-2 font-bold"
                  : "w-1/3 bg-gray-200 text-center rounded-xl text-red-600 mx-2 text-sm py-1 font-bold "
              }
            >
              {props.item.status ? "Active" : "Closed"}
            </h1>
          </div>
          <p className="text-gray-600  pr-2 py-1 capitalize  truncate h-8">
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
          <div className="w-[100vw] h-[100vh] absolute top-0 left-0 backdrop-blur-sm shadow-2xl  transition-all flex justify-center items-center  ">
            <div className="w-[40vw] h-[85vh] mt-10  bg-white shadow-md rounded-lg border border-gray-300 bg-opacity-100 transition-all ease-in-out ">
              <div className="flex justify-evenly items-start ">
                <img
                  src={`http://localhost:4000/${props.item.image}`}
                  className="h-[50vh] w-[50vh] rounded-tl-lg rounded-br-[50%]"
                />
                <div className="w-1/2 px-4 pt-4">
                  <h1 className="text-center text-3xl font-bold py-4 h-24 capitalize">
                    {props.item.title}
                  </h1>
                  <h1 className="text-center text-2xl font-bold py-2 capitalize text-white rounded-[50px] bg-stone-700">
                    {props.item.type}
                  </h1>
                  <h1 className="text-xl text-center py-3  font-semibold ">
                    Short Description
                  </h1>
                  <p className="h-[15vh]  py-1 text-center  text-gray-500 px-2">
                    {props.item.shortdescription}
                  </p>
                  <div className="flex justify-center items-center">
                    <p className="bg-green-200 p-2 text-center rounded-[40px] mx-2 w-1/2 text-md font-bold text-green-800">
                      {" "}
                      Year : {props.item.year}
                    </p>
                    <p
                      className={
                        props.item.status
                          ? "bg-green-800 w-1/3 p-2 text-center rounded-[40px] mx-2 text-md font-bold text-white"
                          : "bg-red-600 w-1/3 p-2 text-center rounded-[40px] mx-2 text-md font-bold text-white"
                      }
                    >
                      {props.item.status ? "Active" : "Closed"}{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-200 my-3 w-full h-[16vh] p-3 px-4 ">
                <p className="text-sm  ">
                  <span className="text-lg font-bold">Description : </span>
                  {props.item.description}
                </p>
              </div>
              <div className="flex justify-around items-center h-[10vh] pt-3">
                <form
                  className="flex justify-around items-center w-full"
                  onSubmit={() => {
                    setmodal(true);
                    setisopen(false);
                  }}
                >
                  <div className="h-[6vh]  text-lg p-2 text-center rounded-lg bg-green-700 w-50 text-white font-bold">
                    RS.{props.item.rentamount} / Year
                  </div>
                  <div className="w-[8vw]">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="amount"
                    >
                      Bid Amount
                    </label>
                    <input
                      class="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="amount"
                      required
                      type="number"
                      name="amount"
                      value={bidamount}
                      onChange={(e) => setbidamount(e.target.value)}
                      min="5000"
                      placeholder="(Mention the amount acc. to per year)"
                    />
                  </div>
                  <div className="w-[8vw]">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="amount"
                    >
                      Tenure (in Years)
                    </label>
                    <input
                      class="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="amount"
                      required
                      max="5"
                      type="number"
                      name="amount"
                      value={tenure}
                      onChange={(e) => settenure(e.target.value)}
                      min="1"
                      placeholder="Years"
                    />
                  </div>
                  <div className="  flex flex-col mx-2">
                    {props.item.status ? (
                      <button
                        className="w-20 bg-green-600 my-2 py-2 rounded-lg text-white shadow-md hover:bg-green-700 hover:cursor-pointer"
                        type="submit"
                      >
                        Request
                      </button>
                    ) : (
                      <button
                        className="w-20 bg-red-600 my-2 py-2  rounded-lg text-[12px] text-white shadow-md "
                        disabled
                      >
                        Not Available
                      </button>
                    )}
                    <button
                      className="w-20 bg-white border border-gray-300 hover:bg-gray-100 shadow-md  my-0 py-2 rounded-lg"
                      onClick={() => setisopen(!isopen)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="hidden"></div>
      )}
    </>
  );
};

export default MachineCard;
