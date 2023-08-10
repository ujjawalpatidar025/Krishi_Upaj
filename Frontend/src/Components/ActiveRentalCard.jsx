import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import axios from "axios";

const ActiveRentalCard = () => {
  const [loading, setloading] = useState(true);
  const [machine, setmachine] = useState("");
  const [renter, setrenter] = useState("");
  const [owner, setowner] = useState("");
  const [activerentdata, setactiverentdata] = useState("");
  const params = useParams();

  useEffect(() => {
    setloading(true);
    const token = localStorage.getItem("token");
    const machineid = params.id;

    const fetchData = async () => {
      try {
        const activerent = await axios.post(
          "http://localhost:4000/api/requests/getactiverental",
          { machineid, token }
        );
        setactiverentdata(activerent.data.activerentdata[0]);
        const renterid = activerent.data.activerentdata[0].renter;
        const ownerid = activerent.data.activerentdata[0].owner;

        const rentUser = await axios.post(
          "http://localhost:4000/api/users/getUser",
          { _id: renterid, token: token }
        );
        setrenter(rentUser.data.others);
        const ownerUser = await axios.post(
          "http://localhost:4000/api/users/getUser",
          { _id: ownerid, token: token }
        );
        setowner(ownerUser.data.others);

        const machineData = await axios.post(
          "http://localhost:4000/api/machines/getmachinebyid",
          { machineid, token: token }
        );
        setmachine(machineData.data.data);
        setloading(false);
      } catch (err) {
        console.log(err);
        setloading(false);  
        toast.error(err.response.data.message);
      }
    };

    fetchData();
   
   
  }, []);

  return (
    <>
    {loading?<Loading/>:<>
      <Navbar />
    
      <div className=" w-screen h-[90vh] p-10 bg-[#fcfaf9]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl max-md:text-4xl font-extrabold pb-2 text-gray-400  text-center md:text-left">
            Machine
          </h1>
        </div>
        <div className=" w-full shadow-md rounded-lg  bg-blue-100 h-[30vh] mb-8 flex justify-between items-center px-16 flex-wrap ">
          <img
            src={`http://localhost:4000/${machine.image}`}
            className="h-[25vh] rounded-full "
          />
          <div className="h-[30vh] w-[40vw]  p-3 ">
            <h1 className="text-lg font-bold text-gray-600 my-2">
              ID :{" "}
              <span className="text-green-900">
                {machine.type + machine.year + machine._id}
              </span>
            </h1>
            <h1 className="text-lg font-bold text-gray-600 my-2 capitalize">
              Machine Model Name:{" "}
              <span className="text-green-800 text-xl">{machine.title}</span>
            </h1>
            <h1 className="text-lg font-bold text-gray-600 my-2 capitalize flex justify-center items-center w-1/2">
              Machine Model Type:{" "}
              <h1 className="text-white bg-gray-600 py-1 w-24 rounded-full text-md mx-2 text-center">
                {machine.type}
              </h1>
            </h1>
            <h1 className="text-lg font-bold text-gray-600 my-2 capitalize">
              Machine Model Year:{" "}
              <span className="text-green-800 text-xl">{machine.year}</span>
            </h1>
          </div>
          <div className="h-[30vh] w-[20vw] ">
            <h1 className="text-2xl font-bold text-gray-600 my-4 text-center">
              Rent Amount :{" "}
              <span className="text-green-900 ">
                RS.{activerentdata.bidamount}
              </span>
            </h1>
            <h1 className="text-2xl font-bold text-gray-600 my-2 text-center">
              Rent Tenure :{" "}
              <span className="text-green-900">{activerentdata.tenure}</span>
            </h1>
            <h1 className="text-3xl font-bold text-green-600  mt-8 text-center flex justify-center items-center">
              <div className="bg-green-600 rounded-full h-4 w-4 mx-2"></div>
              ACTIVE
            </h1>
          </div>
        </div>

        <div className="h-[42vh] flex justify-between items-center flex-wrap ">
          <div className="w-[45vw] h-full shadow-md rounded-lg  bg-blue-100 ">
            <div className="container mx-auto p-2">
              <h1 className="text-2xl max-md:text-4xl font-extrabold px-2 text-gray-400  text-center md:text-left">
                Owner
              </h1>
              <div className="p-2">
                <h1 className="text-lg font-bold text-gray-600 my-2 capitalize">
                  Owner ID:{" "}
                  <span className="text-green-800 text-lg">{owner._id}</span>
                </h1>
                <h1 className="text-lg font-bold text-gray-600 my-2 capitalize">
                  Owner Name:{" "}
                  <span className="text-green-800 text-lg">
                    {owner.firstname + " " + owner.lastname}
                  </span>
                </h1>
                <h1 className="text-lg font-bold text-gray-600 my-2 capitalize">
                  Owner Username:{" "}
                  <span className="text-green-800 text-lg">
                    {owner.username}
                  </span>
                </h1>
                <h1 className="text-lg font-bold text-gray-600 my-2 capitalize">
                  Owner Address:{" "}
                  <span className="text-green-800 text-lg">
                    {owner.address}
                  </span>
                </h1>

                <h1 className="text-lg font-bold text-gray-600 my-2 capitalize">
                  Owner Contact No:{" "}
                  <span className="text-green-800 text-lg">
                    {owner.phonenumber}
                  </span>
                </h1>
                <h1 className="text-lg font-bold text-gray-600 my-2 capitalize">
                  Owner Pincode:{" "}
                  <span className="text-green-800 text-lg">
                    {owner.pincode}
                  </span>
                </h1>
              </div>
            </div>
          </div>
          <div className="w-[45vw] h-full shadow-md rounded-lg  bg-blue-100 ">
            <div className="container mx-auto p-2">
              <h1 className="text-2xl max-md:text-4xl font-extrabold px-2 text-gray-400  text-center md:text-left">
                Renter
              </h1>

              <div className="p-2">
                <h1 className="text-lg font-bold text-gray-600 my-2 capitalize">
                  Renter ID:{" "}
                  <span className="text-green-800 text-lg">{renter._id}</span>
                </h1>
                <h1 className="text-lg font-bold text-gray-600 my-2 capitalize">
                  Renter Name:{" "}
                  <span className="text-green-800 text-lg">
                    {renter.firstname + " " + renter.lastname}
                  </span>
                </h1>
                <h1 className="text-lg font-bold text-gray-600 my-2 capitalize">
                  Renter Username:{" "}
                  <span className="text-green-800 text-lg">
                    {renter.username}
                  </span>
                </h1>
                <h1 className="text-lg font-bold text-gray-600 my-2 capitalize">
                  Renter Address:{" "}
                  <span className="text-green-800 text-lg">
                    {renter.address}
                  </span>
                </h1>

                <h1 className="text-lg font-bold text-gray-600 my-2 capitalize">
                  Renter Contact No:{" "}
                  <span className="text-green-800 text-lg">
                    {renter.phonenumber}
                  </span>
                </h1>
                <h1 className="text-lg font-bold text-gray-600 my-2 capitalize">
                  Renter Pincode:{" "}
                  <span className="text-green-800 text-lg ">
                    {renter.pincode}
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>}
    </>
  );
};

export default ActiveRentalCard;
