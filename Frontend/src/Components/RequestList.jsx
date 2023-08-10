import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mower from "../Images/harvester-2.png";
import RequestRenterList from "./RequestRenterList";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const RequestList = () => {
  const [loading, setloading] = useState(false);
  const [machine, setmachine] = useState("");
  const [requests, setrequests] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const machineid = params.id;

  useEffect(() => {
    const funCheck = async () => {
      setloading(true);
      const token = localStorage.getItem("token");

      try {
        const machineData = await axios.post(
          "http://localhost:4000/api/machines/getmachinebyid",
          { machineid, token }
        );
        setmachine(machineData.data.data);
        const machinerequests = await axios.post(
          "http://localhost:4000/api/requests/getmachinerequest",
          { machineid, token }
        );

        setrequests(machinerequests.data.machineRequests[0].requests);
        setloading(false);
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
        setloading(false);
        navigate("/dashboard");
      }
    };
    funCheck();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-[#e8e7e6] h-screen w-screen">
          <Navbar />
          <div className="h-[90vh] w-screen  p-12  flex justify-around items-center">
            <div className="w-[18vw] h-[80vh] border-0 bg-gray-600 shadow-xl border-gray-300 rounded-lg ">
              <img
                src={`http://localhost:4000/${machine.image}`}
                className="h-[40vh] rounded-b-full shadow-lg shadow-yellow-200 "
              />
              <h1 className="text-2xl py-4 text-center capitalize text-white font-semibold">
                {machine.title}
              </h1>
              <h1 className="text-lg py-1 bg-green-200 capitalize w-3/5 rounded-full text-gray-800 m-auto text-center  font-semibold">
                {machine.type}
              </h1>
              <h1 className="text-lg my-2 py-2  w-3/5 rounded-full text-white m-auto text-center  font-semibold">
                Model Year : {machine.year}
              </h1>
              <h1 className="text-lg my-2 py-2  w-3/5 rounded-full text-green-500 m-auto text-center  font-semibold">
                {machine.status ? "Active" : "Closed"}
              </h1>
              <h1 className="text-xl my-2 py-2  bg-gray-300 font-bold  text-gray-800 m-auto text-center  ">
                RS.{machine.rentamount}
              </h1>
            </div>
            <div className="w-[55vw] h-[80vh] border-0 bg-gray-600 shadow-xl border-gray-300  rounded-lg">
              <div className="container mx-auto p-4">
                <h1 className="text-4xl max-md:text-4xl font-extrabold px-2 text-gray-300  text-center md:text-left">
                  Request List
                </h1>
              </div>
              <hr />
              <div className="py-5 px-4 overflow-y-scroll h-[68vh]">
                {Object.values(requests).map((item) => (
                  <RequestRenterList item={item} machineData = {machine} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestList;
