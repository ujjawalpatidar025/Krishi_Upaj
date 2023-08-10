import React, { useEffect, useState } from "react";
import mower from "../Images/tractor-5.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserMachineRenterCard = (props) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [payloading,setpayloading]= useState(false);
  const [userid, setuserid] = useState("");
  const [activerentdata,setactiverentdata] = useState("");
  const [tenure,settenure]= useState(" ");
  const [modal,setmodal]= useState(false);
  const [modalload,setmodalload ]= useState(false);
  const machineid = props.item._id;
  

  const [isOpen, setIsOpen] = useState(false);


  const toggleSidebar = async() => {
    setIsOpen(!isOpen);
    setpayloading(true);
    const token = localStorage.getItem("token");
    const activerent = await axios.post(
      "http://localhost:4000/api/requests/getactiverental",
      { machineid, token }
    );

     
    setactiverentdata(activerent.data.activerentdata[0]);
    const Renttenure = (activerentdata.tenure);
    let x= (activerent.data.activerentdata[0].tenure).split(" ")[0];
    settenure(x);
   
    setpayloading(false);
    
  };

  const user = useSelector((state) => state.auth.user);
  const renterid= user._id;
  const ownerid = props.item.sellerid;

  const handlePay= async()=>{
    setmodalload(true);
    const token = localStorage.getItem('token');
    try
    {
      const response = await axios.post("http://localhost:4000/api/requests/rentclose",{token,machineid,renterid,ownerid});
      if(response.data.status)
      {
        toast.success(response.data.message);
        
      }
      else{
        toast.error(response.data.message);
        
      }
      navigate("/");
    }
    catch(err)
    {
      console.log(err);
      toast.error(err.response.data.message);
      navigate("/dashboard");
    }
  }


 


  const handlecheck = async () => {
    if (props.item.status == "Accepted") {
      navigate(`/machines/activerent/${props.item._id}`);
    } else {
      const token = localStorage.getItem("token");
      setloading(true);
      try {
  
        const activerent = await axios.post(
          "http://localhost:4000/api/requests/getactiverental",
          { machineid, token }
        );

        setactiverentdata(activerent.data.activerentdata[0]);
        
        //console.log(response);
        if (activerent.data.renter != user._id && activerent) {
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
          props.item.status==="Closed"?
          <h1 className="text-red-500 capitalize font-bold w-[5vw] text-center ">
            Closed
          </h1>:

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


        {payloading ? (
          <div className="flex justify-center items-center h-full">
            <div role="status ">
              <svg
                aria-hidden="true"
                class="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-100"
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
        ) :<>
          

          <button className="text-2xl font-semibold flex items-center absolute left-6 text-black" onClick={toggleSidebar}>X</button>
         
          <h1 className=" w-full text-center text-3xl text-green-500 font-bold  ">Pay With Secure</h1>

          <h1 className=" w-full text-left mt-20 text-xl text-gray-500 font-bold ">{props.item.title}{" "}{props.item.type}</h1>
         
           <h1 className=" w-full text-left mt-6 text-xl text-gray-500 font-bold ">Renter Name : {user.firstname+" "+ user.lastname}</h1>
           <h1 className=" w-full text-left mt-6 text-xl text-gray-500 font-bold ">Rent Tenure : {activerentdata.tenure}</h1>

           <h1 className=" w-full text-left mt-6 text-xl text-gray-500 font-bold ">Rent Amount per Year : {activerentdata.bidamount}</h1>

           <h1 className=" w-full text-center mt-16 text-3xl text-gray-600 font-bold ">Total Amount <h1 className="mt-4 text-4xl">RS.{activerentdata.bidamount*tenure}</h1></h1>

           <div className="w-full flex justify-center ">

           <button className="w-28 py-2 px-4 rounded-lg text-white  hover:cursor-pointer hover:bg-green-500 shadow-xl bg-green-600 flex justify-center items-center mt-10" onClick={()=>setmodal(true)}>Pay</button>
           </div>
           
      
    
          {/* Add your sidebar content here */}
          
          </>}
        </div>
       
      </div>
    </div>
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
                      Payment Confirmation
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Are you sure to pay the rent?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                  onClick={handlePay}
                >
                 {modalload?"Loading...":"Pay"} 
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

    
    </>
  );
};

export default UserMachineRenterCard;
