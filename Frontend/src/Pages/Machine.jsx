import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { add, gettoken, remove } from "../Redux/Slices/authReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Loading from "../Components/Loading";
import MachineCard from "../Components/MachineCard";

const Machine = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const [machines, setmachines] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [isUpdate, setisupdate] = useState(true);

  const tabs = [
    { label: "Tractor" },
    { label: "Harvester" },
    { label: "Cultivator" },
    { label: "Seeder" },
  ];

  const changeTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const TabBar = ({ tabs, defaultTab }) => {
    const changeTab = (tabIndex) => {
      setActiveTab(tabIndex);
    };

    return (
      <div className="flex justify-start  max-sm:w-[90vw]">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 max-sm:px-2 max-sm:text-sm ${
              activeTab === index
                ? "bg-green-500 text-white rounded-t-lg"
                : "border-b border-black"
            }`}
            onClick={() => changeTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
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
        const machines = await axios.post(
          "http://localhost:4000/api/machines/getmachines",
          {
            token,
          }
        );
        const user = response.data.others;
        setisupdate(user.isUpdate);
        const a = machines.data.machines.filter(
          (item) => item.sellerid != user._id
        );
        setmachines(a);

        if (!response.data.others) {
          toast.error("Network Error");
          setloading(false);
          navigate("/signin");
        } else {
          dispatch(add(user));
          dispatch(gettoken(token));
          setloading(false);
        }
        setloading(false);
      } catch (err) {
        dispatch(remove());
        console.log(err.response.data.message);
        setloading(false);
        navigate("/signin");
      }
    };

    fetchdata();
  }, []);
  console.log(isUpdate);

  return (
    <>
      <div className="bg-[#f0eceb] min-h-[100vh] max-sm:min-h-auto w-[100vw] overflow-hidden">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Navbar />
            {isUpdate ? (
              <>
                <div className="container mx-auto px-8 overflow-hidden">
                  <h1 className="text-7xl max-md:text-4xl font-extrabold px-10 text-gray-300  text-center md:text-left">
                    Machines
                  </h1>
                </div>
                <div className="h-20 p-4 max-sm:h-28  pb-16  px-16 my-2 max-sm:my-0 max-sm:pb-0max-sm:p-0  w-[90vw] max-sm:w-[100vw]">
                  <div className="container mx-auto pl-3 py-4 ">
                    <TabBar
                      tabs={tabs}
                      activeTab={activeTab}
                      changeTab={changeTab}
                    />
                  </div>
                </div>

                {activeTab == 0 ? (
                  <div className="flex flex-wrap justify-start items-start m-auto  px-16 py-3 max-sm:py-0 max-sm:px-0 max-sm:w-[100vw] h-[66vh] w-[99vw] overflow-x-hidden overflow-y-scroll max-sm:h-[68vh]">
                    {Object.values(machines).map((item) => {
                      if (item.type == "tractor")
                        return <MachineCard item={item} />;
                    })}
                  </div>
                ) : (
                  ""
                )}

                {activeTab == 1 ? (
                  <div className="flex flex-wrap justify-start items-start m-auto  px-16 py-3 max-sm:py-0 max-sm:px-0 max-sm:w-[100vw] h-[66vh] w-[99vw] overflow-x-hidden overflow-y-scroll max-sm:h-[68vh] ">
                    {Object.values(machines).map((item) => {
                      if (item.type == "harvester")
                        return <MachineCard item={item} />;
                    })}
                  </div>
                ) : (
                  ""
                )}
                {activeTab == 2 ? (
                  <div className="flex flex-wrap justify-start items-start m-auto  px-16 py-3 max-sm:py-0 max-sm:px-0 max-sm:w-[100vw] h-[66vh] w-[99vw] overflow-x-hidden overflow-y-scroll max-sm:h-[68vh]">
                    {Object.values(machines).map((item) => {
                      if (item.type == "cultivater")
                        return <MachineCard item={item} />;
                    })}
                  </div>
                ) : (
                  ""
                )}

                {activeTab == 3 ? (
                  <div className="flex flex-wrap justify-start items-start m-auto  px-16 py-3 max-sm:py-0 max-sm:px-0 max-sm:w-[100vw] h-[66vh] w-[99vw] overflow-x-hidden overflow-y-scroll max-sm:h-[68vh]">
                    {Object.values(machines).map((item) => {
                      if (item.type == "seeder")
                        return <MachineCard item={item} />;
                    })}
                  </div>
                ) : (
                  ""
                )}
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
    </>
  );
};

export default Machine;
