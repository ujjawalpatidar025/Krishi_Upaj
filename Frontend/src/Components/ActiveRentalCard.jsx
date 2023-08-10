import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Loading from './Loading';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './Navbar';
import axios from 'axios';



const ActiveRentalCard = () => {
    const [loading, setloading] = useState(false);
    const [machine,setmachine]= useState("");
    const [renter,setrenter]= useState("");
    const [owner,setowner]= useState("");
    const params= useParams();


    useEffect(() => {
        const token = localStorage.getItem('token');
        const machineid = params.id;

        const fetchData = async()=>{
        try{

            const activerent = await axios.post("http://localhost:4000/api/requests/getactiverental",{machineid,token});


        }
        catch(err)
        {
            console.log(err);
            toast.error(err.response.data.message);
        }
    }
    fetchData();
     
    }, [])
    

    
    

  return (
    <div>
        {loading?<Loading/>:<>
            <Navbar/>

        
        
        </>}
    
    </div>
  )
}

export default ActiveRentalCard