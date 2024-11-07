import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react';

const AllApointments = () => {
  const {atoken,appointments,getAllAppointments} = useContext(AdminContext);

  useEffect(()=>{
    if(atoken){
      getAllAppointments();
    }
  },[atoken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p className="">#</p>
          <p className="">Patient</p>
          <p className="">Age</p>
          <p className="">Date & Time</p>
          <p className="">Doctor Name</p>
          <p className="">Fee</p>
          <p className="">Action</p>

          {appointments.map((item,index)=>(
            <div className="" key={index}>
              <p className="">{index + 1}</p>
              <div className="">
                <img src={item.userdata.image} alt="" className="" /> <p className="">{item.userData.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllApointments