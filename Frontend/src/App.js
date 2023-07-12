import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import SignUp from "./Pages/SignUp.jsx";

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/signin" element={<LoginPage/> } />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </div>
  );
};

export default App;
