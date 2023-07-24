import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Loading from "../Components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { add, gettoken } from "../Redux/Slices/authReducer";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const [userDetails, setuserDetails] = useState({});
  const [isUpdate, setisUpdate] = useState(false);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const _id = userDetails._id;
  const username = userDetails.username;
  useEffect(() => {
    const token = localStorage.getItem("token");
    setisUpdate(false);
    setloading(true);
    const fetchdata = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/users/isAuthenticated",
          { token }
        );

        if (!response) {
          setloading(false);
          navigate("/signin");
        }
        const user = response.data.others;
        setuserDetails(user);
        dispatch(add(user));
        dispatch(gettoken(token));
        setisUpdate(user.isUpdate);
        setloading(false);
      } catch (err) {
        toast.error(err.response.data.message);
        setloading(false);
        navigate("/signin");
      }
    };

    fetchdata();
  }, []);

  const handlesubmit = async(e) =>{
    const token = localStorage.getItem("token");
    
    if(!firstname||!lastname||!address||!pincode||!phonenumber)
    {
      toast.error("Fill all necessary Details");
      
    }
    else
    {
      setloading(true);
    e.preventDefault();
    try{
      //console.log({token,_id,firstname,lastname,address,pincode,phonenumber,username})
      const response = await axios.post('http://localhost:4000/api/users/updateUser',{
        token,_id,firstname,lastname,address,pincode,phonenumber,username
      });
      setloading(false);
      toast.success(response.data.message);
      navigate('/');
    
      

    }
    catch(err)
    {
     
      toast.error(err.response.data.message);
      console.log(err);
      navigate('/signin');
    }
  }
  }

  
  return (
    <>
      
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <header className="bg-white py-5 text-white">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-semibold text-green-500  text-center md:text-left">
                Dashboard
              </h1>
            </div>
           
          </header>
          {userDetails?.isUpdate ? (
            <>
              <div className=" min-h-[70h] py-7">
                <div className="containver mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <aside className="md:col-span-1 border-2 border-gray-300  shadow-lg rounded-lg p-4">
                      <h2 className="text-3xl text-gray-400 text-center  font-semibold mb-4">
                        Navigations
                      </h2>
                      <hr />
                      <ul className="space-y-2 h-40">
                        <li className="cursor-pointer mt-4  text-xl py-2 rounded-3xl text-center  text-gray-400 hover:bg-gray-100">
                          User Profile
                        </li>
                        <li className="cursor-pointer mt-4  text-xl py-2 rounded-3xl text-center text-gray-400 hover:bg-gray-100">
                          User Machines
                        </li>
                      </ul>
                    </aside>

                    <section className="md:col-span-4 border-2 border-gray-300 bg-white shadow-lg rounded-lg p-8">
                      <h2 className="text-3xl font-semibold text-center text-gray-400 mb-6">
                        User Details
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                        <div className="border border-gray-300 p-4 rounded-lg shadow-md">
                          <p className="font-semibold mb-2">First Name</p>
                          <p>{userDetails.firstname}</p>
                        </div>
                        <div className="border border-gray-300 p-4 rounded-lg shadow-md">
                          <p className="font-semibold mb-2">Last Name</p>  
                          <p>{userDetails.lastname}</p>
                        </div>
                        <div className="border border-gray-300 p-4 rounded-lg shadow-md">
                          <p className="font-semibold mb-2">Username</p>
                          <p className="max-sm:h-auto h-[100%]">{userDetails.username}</p>
                        </div>
                        <div className="border border-gray-300 p-4 rounded-lg shadow-md">
                          <p className="font-semibold mb-2">Address</p>
                          <p >{userDetails.address}</p>
                        </div>
                        <div className="border border-gray-300 p-4 rounded-lg shadow-md">
                          <p className="font-semibold mb-2">Pincode</p>
                          <p>{userDetails.pincode}</p>
                        </div>
                        <div className="border border-gray-300 p-4 rounded-lg shadow-md">
                          <p className="font-semibold mb-2">Phone Number</p>
                          <p>{userDetails.phonenumber}</p>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center min-h-[70vh]">
                <div className="w-full md:w-3/4 lg:w-1/2 px-8 py-6 bg-white rounded-lg shadow-lg">
                  <h1 className="py-4 text-red-500 ">
                    {" "}
                    *First Complete your profile for further activity
                  </h1>
                  <form className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstname"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        required
                        value={firstname}
                        onChange={(e)=>setfirstname(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastname"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        required
                        value={lastname}
                        onChange={(e)=>setlastname(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        value={address}
                        onChange={(e)=>setaddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                       
                        onChange={(e)=>setphonenumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="pincode"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Pincode
                      </label>
                      <input
                        type="tel"
                        id="pincode"
                        name="pincode"
                        required
                       
                        onChange={(e)=>setpincode(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                    </div>

                    <div className="col-span-2 text-center">
                      <button
                        type="submit"
                        onClick={handlesubmit}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
