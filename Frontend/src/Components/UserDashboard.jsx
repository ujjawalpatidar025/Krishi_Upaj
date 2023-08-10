import UserMachineOwnerCard from "./UserMachineOwnerCard";
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
import UserMachineRenterCard from "./UserMachineRenterCard";

const UserDashboard = ({ usermachinedata, machinedata }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [machines, setmachines] = useState("");
  const [loading, setloading] = useState(true);
  const [isUpdate, setisupdate] = useState(true);
  const [filterusermachines, setfilterusermachines] = useState("");
  const [filterrentmachines, setfilterrentmachines] = useState("");
  const [status, setstatus] = useState("");
  const ownedmachines = usermachinedata.owned;
  const rentedmachines = usermachinedata.rented;

  const tabs = [{ label: "Owned Machines" }, { label: "Rented Machines" }];

  const changeTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const TabBar = ({ tabs, defaultTab }) => {
    const changeTab = (tabIndex) => {
      setActiveTab(tabIndex);
    };

    return (
      <div className="flex justify-start border border-gray-300 rounded-lg w-full max-sm:w-[90vw]">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 h-12 px-4 max-sm:px-2 w-1/2 max-sm:text-sm ${
              activeTab === index
                ? " border-b-4  border-green-700 text-green-700 "
                : ""
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
        const a = machines.data.machines;
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
      const data = machinedata.filter(
        (item) => item.sellerid === usermachinedata.userid
      );
      const rentusermachines = usermachinedata.rented;
      const rentdata = machinedata.filter((item) => {
        let flag = 0;
        Object.values(rentusermachines).map((item2) => {
          if (item2.machineid == item._id) {
            flag = 1;

            item.status = item2.requeststatus;
          }
        });
        // console.log(item);
        if (flag) return item;
      });

      setfilterusermachines(data);
      setfilterrentmachines(rentdata);
    };

    fetchdata();
  }, []);

  return (
    <div>
      <div className="flex-column w-[72vw] m-auto justify-center items-center">
        <div className="container mx-auto  py-2 w-full">
          <TabBar tabs={tabs} activeTab={activeTab} changeTab={changeTab} />
        </div>

        {activeTab == 0 ? (
          <div className="h-[46vh] w-full  overflow-y-scroll px-2">
            {ownedmachines.length == 0 ? (
              <h1 className=" w-full h-full flex justify-center items-center text-6xl font-bold text-gray-300">
                No Machines Added
              </h1>
            ) : (
              Object.values(filterusermachines).map((item) => (
                <UserMachineOwnerCard item={item} ownedmachines={ownedmachines} />
              ))
            )}
          </div>
        ) : (
          ""
        )}

        {activeTab == 1 ? (
          <div>
            <div className="h-[46vh] w-full  overflow-y-scroll px-2">
              {rentedmachines.length == 0 ? (
                <h1 className=" w-full h-full flex justify-center items-center text-6xl font-bold text-gray-300">
                  No Machines Rented
                </h1>
              ) : (
                Object.values(filterrentmachines).map((item) => {
                  return <UserMachineRenterCard item={item} />;
                })
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
