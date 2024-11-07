import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorAppointment = () => {
  const {dtoken,appointments,getAppointments} = useContext(DoctorContext);

  useEffect(()=>{
    if(dtoken){
      getAppointments();
    }
  },[dtoken]);

  return (
    <div>DoctorAppointment</div>
  )
}

export default DoctorAppointment