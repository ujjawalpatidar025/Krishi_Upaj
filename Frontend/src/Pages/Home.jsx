import React from 'react'
import Navbar from '../Components/Navbar'
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect ,useState} from "react";
import { useDispatch } from "react-redux";
import Loading from "../Components/Loading.jsx";
import axios from "axios";
import { add, gettoken } from "../Redux/Slices/authReducer.js";

const Home = () => {
  const [loading, setloading] = useState(false);
  const navigate= useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token=localStorage.getItem('token');
    setloading(true);
    const fetchdata = async()=>{
    try{
      const response = await axios.post('http://localhost:4000/api/users/isAuthenticated',
      {token});

      if(!response)
      {
        setloading(false);
        navigate('/signin');
      }
      const user = response.data.others;
      dispatch(add(user));
      dispatch(gettoken(token));
      setloading(false);
    }
    catch(err)
    {
      toast.error(err.response.data.message);
      setloading(false);
      navigate('/signin');
    }}

    fetchdata();
  }, [])
  return (
    <div>
        <Navbar/>
    </div>
  )
}

export default Home