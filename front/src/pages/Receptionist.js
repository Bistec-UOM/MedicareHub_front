import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Calender from '../components/recepcomponents/Calender/MyCalender'
import DayAppointments from '../components/recepcomponents/DayAppointments/DayAppointments'
import AppointmentCalender from '../components/recepcomponents/AppointmentCalender/AppointmentCalender'




export default function Receptionist() {
  return (
    <div>
        <Navbar/>
        <AppointmentCalender/>
    </div>
  )
}
