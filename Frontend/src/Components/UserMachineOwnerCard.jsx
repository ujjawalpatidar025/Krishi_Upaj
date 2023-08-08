import React from 'react'
import mower from '../Images/tractor-5.png'


const UserMachineOwnerCard = (props) => {




  return (
    <div className='w-full  rounded-lg h-20 my-3 p-2 flex justify-evenly items-center  px-3 bg-gray-200  hover:cursor-pointer hover:shadow-lg shadow-sm border border-gray-300'>
    <div className='w-[7vw]'>
    <img src={ `http://localhost:4000/${props.item.image}`} className=' h-20 p-1  rounded-full '/>
    </div>
    <h1 className='text-xl capitalize font-extrabold text-gray-600 w-[10vw] text-center'>{props.item.title}</h1>
    <h1 className='bg-gray-500 capitalize px-3 py-2 text-white rounded-full w-[7vw] text-center  text-sm font-semibold '>{props.item.type}</h1>
    <h1 className='text-lg font-bold w-[10vw] text-center text-gray-700'>RS.{props.item.rentamount}</h1>
    <h1 className='text-green-500 capitalize font-bold w-[5vw] text-center '>{(props.item.status)?"Active":"Closed"}</h1>
    <button className='bg-green-400 px-3 py-2 rounded-xl w-[10vw] text-center text-white shadow-xl hover:bg-green-500'>See Requests</button>
    </div>
  )
}

export default UserMachineOwnerCard