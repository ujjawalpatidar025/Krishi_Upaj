import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const RequestRenterList = (props) => {
  const navigate = useNavigate();
  const [modal, setmodal] = useState(false);
  const [loading,setloading ] = useState(false);
  const machine= props.machineData;
  const renterid = props.item.userid;
  const ownerid = machine.sellerid;
  const bidamount = props.item.bidamount;
  const tenure = props.item.tenure;

  const handleAllot = async(req,resp)=>{
    setloading(true);
    const token = localStorage.getItem('token');
    try{
      const machineid = machine._id;
      const response = await axios.post("http://localhost:4000/api/requests/requestaccept",{token,machineid,renterid,ownerid,bidamount,tenure});
      if(response.data.status)
      {
        setmodal(false);
        toast.success("Machine Alloted Successfully, Refresh the Page");
        navigate('/dashboard');
      }
      else
      {
        setmodal(false);
        toast.error(response.data.message);
        navigate('/');
      }



    }
    catch(err)
    {
      console.log(err);
      toast.error(err.response.data.message);

    }
  }

  
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
                          Confirmation!!!!
                        </h3>
                        <div class="mt-2">
                          <p class="text-sm text-gray-500">
                            Are you Confirm to allot the <strong>{machine.title}</strong> {machine.type} to the Renter <strong>{props.item.username}</strong> for <strong>{props.item.tenure}</strong> at a amount of <strong>RS. {props.item.bidamount}</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      onClick={handleAllot}
                    >
                    {loading?"Loading...":"Allot"}
                     
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
    <div className='h-12 my-2 flex justify-evenly items-center w-full bg-gray-300 rounded-md shadow-md shadow-gray-600 p-2'>
        <h1 className='font-bold text-gray-800 w-[13vw] text-center text-lg'>{props.item.username}</h1>
        <h1 className='w-[6vw] text-xl font-extrabold text-center text-gray-700'>RS.{props.item.bidamount}</h1>
        <h1 className='w-[10vw] font-semibold text-center text-lg '>{props.item.tenure}</h1>
        <button className='w-[6vw] bg-green-500 rounded-lg shadow-lg hover:bg-green-400 py-1 text-white font-bold' onClick={()=>setmodal(true)}>Accept</button>
    </div>
    </>
    
  )
}

export default RequestRenterList