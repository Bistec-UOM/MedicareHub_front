import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Calender from '../components/Calender/MyCalender'
import DayAppointments from '../components/DayAppointments/DayAppointments'
import AppointmentCalender from '../components/AppointmentCalender/AppointmentCalender'




export default function Receptionist() {
  return (
    <div>
        <Navbar/>
        <AppointmentCalender/>
    </div>
  )
}
