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
  const [title, settitle] = useState("");
  const [type, settype] = useState("");
  const [shortdescription, setshortdescription] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState("");
  const [year, setyear] = useState("");
  const [rentamount, setrentamount] = useState("");
  const user = useSelector((state) => state.auth.user);
  let url;
 
  // const [data, setdata] = useState({
  //   title: "",
  //   type: "",
  //   image: null,
  //   description: "",
  //   shortdescription: "",
  //   year: "",
  //   amount: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setdata({
  //     ...data,
  //     [name]: value,
  //   });
  // };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setdata({
  //     ...data,
  //     image: file,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("shortdescription", shortdescription);
    formData.append("year", year);
    formData.append("rentamount", rentamount);
    formData.append("image", image);
    formData.append("_id", user._id);

    //console.log(title,type,description,shortdescription,year,amount,image);

    // Here you can do something with the data, for example, send it to a server.
    // console.log(data);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:4000/api/machines/addMachine",
        formData
      );
      setloading(false);
      toast.success(response.data.message);
        
        navigate("/");
     
      
    } catch (err) {
      setloading(false);
      toast.error(err.response.data.message);
      console.log(err);
    }
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
    <div className="max-sm:overflow-hidden">
      {loading ? (
        <Loading />
      ) : 
      (
        <>
          <Navbar />

          {isUpdate ? 
            <>
              <div className="overflow-hidden  bg-[#f0eceb] w-[100vw] max-sm:w-[100vw] max-sm:overflow-hidden">
                <h1 className="text-7xl bg-[#f0eceb]  max-md:text-4xl font-extrabold px-12 text-gray-300  text-center md:text-left max-sm:py-3">
                  Add Machine
                </h1>
              </div>
              <div className="bg-[#f0eceb] w-[100vw] h-[80vh] flex flex-wrap p-8 max-md:overflow-hidden max-sm:p-0 max-sm:h-auto  max-sm:w-[100vw] ">
                <div className=" h-[70vh] w-[50vw] px-4 max-sm:px-0 max-sm:w-[100vw]">
                  <form
                    class="w-full overflow-y-scroll py-4 h-[67vh] p-4   "
                    onSubmit={handleSubmit}
                  >
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
                          required
                          value={title}
                          onChange={(e) => {
                            settitle(e.target.value);
                          }}
                          placeholder="Machine Name"
                        />
                      </div>
                      <div class="w-full md:w-1/2 px-3">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="type"
                        >
                          Machine Type
                        </label>
                        <div class="relative">
                          <select
                            class="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                            id="grid-state"
                            name="type"
                            required
                            value={type}
                            onChange={(e) => {
                              settype(e.target.value);
                            }}
                          >
                            <option value="">Select Type</option>
                            <option value="tractor">Tractor</option>
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
                          for="short_description"
                        >
                          Short Description
                        </label>
                        <input
                          class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="short_description"
                          name="shortdescription"
                          type="text"
                          required
                          value={shortdescription}
                          onChange={(e) => {
                            setshortdescription(e.target.value);
                          }}
                          placeholder="Short Detail about Machine"
                        />
                      </div>
                    </div>

                    <div class="flex flex-wrap -mx-3 mb-6">
                      <div class="w-full px-3">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="description"
                        >
                          Description
                        </label>
                        <textarea
                          class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-40"
                          id="description"
                          type="text"
                          required
                          name="description"
                          value={description}
                          onChange={(e) => {
                            setdescription(e.target.value);
                          }}
                          placeholder="Detailed Info..."
                        />
                        <p class="text-gray-600 text-xs italic">
                          Make it as long and as crazy as you'd like
                        </p>
                      </div>
                    </div>

                    <div class="flex flex-wrap -mx-3 mb-2">
                      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="year"
                        >
                          Machine Model Year
                        </label>
                        <div class="relative">
                          <select
                            class="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="year"
                            name="year"
                            required
                            value={year}
                            onChange={(e) => {
                              setyear(e.target.value);
                            }}
                            placeholder="Manufactured Year"
                            defaultValue=""
                          >
                            <option value="">Select Year</option>
                            <option value="2009">2009</option>
                            <option value="2010">2010</option>
                            <option value="2011">2011</option>
                            <option value="2012">2012</option>
                            <option value="2013">2013</option>
                            <option value="2014">2014</option>
                            <option value="2015">2015</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
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
                      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="amount"
                        >
                          Rent Amount
                        </label>
                        <input
                          class="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="amount"
                          required
                          type="number"
                          name="amount"
                          value={rentamount}
                          onChange={(e) => {
                            setrentamount(e.target.value);
                          }}
                          min="5000"
                          placeholder="(Mention the amount acc. to per year)"
                        />
                      </div>
                      <div class="w-full md:w-full px-3 mb-6 md:mb-0 mt-5">
                        <label htmlFor="image" className="block font-bold mb-1">
                          Image:
                        </label>
                        <input
                          type="file"
                          required
                          id="image"
                          name="image"
                          accept="image/*"
                          onChange={(e) => {
                            setimage(e.target.files[0]);
                          }}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                    </div>
                    <div class="w-full md:w-full  mb-6 md:mb-0 mt-5">
                      <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2  rounded"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>

                <img src={mower} alt="machine image" className="h-[70vh] w-[33vw] m-auto max-lg:w-[30vw] max-lg:h-[50vh] max-md:w-[70vw] max-md:h-[60vh] max-sm:h-[35vh] max-sm:w-[70vw] max-sm:opacity-30" />
                
              </div>
            </>
           : 
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
          }
        </>
      )
    }
    </div>
  );
};

export default AddProduct;
