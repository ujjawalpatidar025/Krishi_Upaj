import React, { useState } from "react";
import mower from "../Images/tractor-5.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserMachineRenterCard = (props) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [userid, setuserid] = useState("");
  const machineid = props.item._id;

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const user = useSelector((state) => state.auth.user);

  const handlecheck = async () => {
    if (props.item.status == "Accepted") {
      navigate(`/machines/activerent/${props.item._id}`);
    } else {
      const token = localStorage.getItem("token");
      setloading(true);
      try {
        const response = await axios.post(
          "http://localhost:4000/api/requests/getactiverental",
          { machineid, token }
        );
        //console.log(response);
        if (response.data.renter != user._id && response) {
          toast.error("Your Request has been Rejected and Closed");
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    }
    setloading(false);
  };

  return (
    <>
      <div className="w-full  rounded-lg h-20 my-3 p-2 flex justify-evenly items-center  px-3 bg-gray-200  hover:cursor-pointer hover:shadow-lg shadow-sm border border-gray-300">
        <div className="w-[7vw]">
          <img
            src={`http://localhost:4000/${props.item.image}`}
            className=" h-20 p-1  rounded-full "
          />
        </div>
        <h1 className="text-xl capitalize font-extrabold text-gray-600 w-[10vw] text-center">
          {props.item.title}
        </h1>
        <h1 className="bg-gray-500 capitalize px-3 py-2 text-white rounded-full w-[7vw] text-center  text-sm font-semibold ">
          {props.item.type}
        </h1>
        <h1 className="text-lg font-bold w-[10vw] text-center text-gray-700">
          RS.{props.item.rentamount}
        </h1>
        {props.item.status == "Accepted" ? (
          <h1 className="text-green-500 capitalize font-bold w-[5vw] text-center ">
            Accepted
          </h1>
        ) : (
          <h1 className="text-red-500 capitalize font-bold w-[5vw] text-center ">
            Pending
          </h1>
        )}

        <button
          className="bg-green-400 px-3 py-2 rounded-xl w-[10vw] text-center text-white shadow-xl hover:bg-green-500"
          onClick={handlecheck}
        >
          {" "}
          {loading ? (
            <div className="flex justify-center items-center">
              <div role="status ">
                <svg
                  aria-hidden="true"
                  class="w-8 h-[24px] mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-100"
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
            </div>
          ) : (
            <>Check Rent Status</>
          )}
        </button>

        {props.item.status == "Accepted" ? (
          <button
            className="bg-green-400 px-2 py-2 rounded-xl  text-sm w-[5vw] text-center text-white shadow-xl hover:bg-green-500"
            onClick={toggleSidebar}
          >
            {" "}
            {loading ? (
              <div className="flex justify-center items-center">
                <div role="status ">
                  <svg
                    aria-hidden="true"
                    class="w-8 h-[24px] mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-100"
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
              </div>
            ) : (
              <>Pay Rent</>
            )}
          </button>
          
        ) : (
          ""
        )}
       
      </div>
      <div className="flex z-70 ">
      {/* Main content */}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-[30vw] shadow-2xl backdrop-blur-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ease-in-out transition duration-300`}
      >
        {/* Sidebar content */}
        <div className="py-20 px-8">

          <button className="text-2xl font-semibold flex items-center absolute left-6 text-black" onClick={toggleSidebar}>X</button>
          {/* Add your sidebar content here */}
        </div>
      </div>
    </div>

    
    </>
  );
};

export default UserMachineRenterCard;
