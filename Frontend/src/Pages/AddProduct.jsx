import React from "react";
import mower from "../Images/mower-bg.png";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import { Link } from "react-router-dom";
import { add, gettoken, remove } from "../Redux/Slices/authReducer";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isUpdate, setisUpdate] = useState({});
  const [loading, setloading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    image: null,
    description: "",
    shortDescription: "",
    year: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can do something with the formData, for example, send it to a server.
    console.log(formData);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setloading(true);
    const fetchdata = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/users/isAuthenticated",
          { token }
        );

        if (!response.data.others) {
          toast.error("Network Error");
          setloading(false);
          navigate("/signin");
        } else {
          const user = response.data.others;
          setisUpdate(user.isUpdate);
          dispatch(add(user));
          dispatch(gettoken(token));
          setloading(false);
        }
      } catch (err) {
        dispatch(remove());
        console.log(err.response.data.message);
        setloading(false);
        navigate("/signin");
      }
    };

    fetchdata();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />

          {isUpdate ? (
            <>
              <div>
                <h1 className="text-7xl bg-[#f0eceb]  max-md:text-4xl font-extrabold px-12 text-gray-300  text-center md:text-left">
                  Add Machine
                </h1>
              </div>
              <div className="bg-[#f0eceb] w-[100vw] h-[80vh] max-sm:h-auto  flex flex-wrap p-8">
                <div className=" h-[70vh] w-[50vw] px-4 max-sm:w-[100vw] max-sm:px-4 overflow-scroll">
                  <form class="w-full ">
                    <div class="flex flex-wrap -mx-3 mb-6">
                      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="title"
                        >
                          Machine Title
                        </label>
                        <input
                          class="appearance-none block w-full bg-white text-gray-700 border border-gray-300  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="title"
                          type="text"
                          name="title"
                          onChange={handleChange}
                          placeholder="Jane"
                        />
                      </div>
                      <div class="w-full md:w-1/2 px-3">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-state"
                        >
                          State
                        </label>
                        <div class="relative">
                          <select
                            class="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "

                            id="grid-state"
                            onChange={handleChange}
                          >
                            <option value="tractor" >Tractor</option>
                            <option value="harvester">Harvester</option>
                            <option value="cultivater">Cultivater</option>
                            <option value="seeder">Seeder</option>
                          </select>
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              class="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                      <div class="w-full px-3">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                        >
                          Password
                        </label>
                        <input
                          class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-password"
                          type="password"
                          placeholder="******************"
                        />
                        <p class="text-gray-600 text-xs italic">
                          Make it as long and as crazy as you'd like
                        </p>
                      </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-2">
                      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-city"
                        >
                          City
                        </label>
                        <input
                          class="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-city"
                          type="text"
                          placeholder="Albuquerque"
                        />
                      </div>
                      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-state"
                        >
                          State
                        </label>
                        <div class="relative">
                          <select
                            class="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state"
                          >
                            <option>New Mexico</option>
                            <option>Missouri</option>
                            <option>Texas</option>
                          </select>
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              class="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-zip"
                        >
                          Zip
                        </label>
                        <input
                          class="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-zip"
                          type="text"
                          placeholder="90210"
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <img src={mower} className="h-[70vh] w-[33vw] m-auto" />
              </div>
            </>
          ) : (
            <>
              <div className="bg-[#f0eceb] h-[90vh] ">
                <div className=" text-5xl h-60 flex justify-center items-center font-bold text-gray-400 text-center">
                  No Access, Complete Your Profile....
                </div>
                <Link
                  to="/dashboard"
                  className="text-xl h-20 flex justify-center items-center text-blue-700 hover:underline"
                >
                  Go to Dashboard...
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AddProduct;
