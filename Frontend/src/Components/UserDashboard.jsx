import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserMachineCard from './UserMachineCard';

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
      { label: "Owned Machines" },
      { label: "Rented Machines" },
    
    ];
  
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
  return (
    <div>
    <div className='flex-column w-[72vw] m-auto justify-center items-center'>

   
    <div className="container mx-auto  py-2 w-full">
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        changeTab={changeTab}
      />
    </div>
  

  
    {activeTab == 0 ? (
      <div>
      <UserMachineCard/>
      <UserMachineCard/>
      </div>
    ) : (
      ""
    )}

    {activeTab == 1 ? (
      <div>Patidar</div>
    ) : (
      ""
    )}
  
  </div>

    </div>
  )
}

export default UserDashboard