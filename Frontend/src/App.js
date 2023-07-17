import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Home from "./Pages/Home.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Navbar from "./Components/Navbar.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loading from "./Components/Loading.jsx";


const App = () => {


  
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<ProtectedRoute component={Home} />}></Route>
      </Routes>
      {/* <Navbar/> */}
      {/* <Loading/> */}
    </div>
  );
};

export default App;
