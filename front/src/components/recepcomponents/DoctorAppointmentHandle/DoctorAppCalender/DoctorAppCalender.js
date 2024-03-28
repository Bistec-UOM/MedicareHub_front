import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import {Box} from '@mui/material';

import axios from 'axios';

import '../../.././../recep.css'
import DoctorAppDeletePopup from '../DoctorAppDeletePopup/DoctorAppDeletePopup';
import SuccessNotification from '../../SnackBar/SuccessNotification';
import CloseIcon from "@mui/icons-material/Close";

import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'


import { useEffect } from 'react';

import EventBusyIcon from '@mui/icons-material/EventBusy';


import interactionPlugin from '@fullcalendar/interaction';
import '../../../../recep.css';
import CustomizedProgressBars from '../../CustomProgressBar/CustomProgressBar';





const localizer = momentLocalizer(moment);




const DoctorAppCalender=({doctorId})=>
{


    const [doctorList,setDoctorList]=useState([]);
    const [doctorCount,setDoctorCount]=useState(0);

    const [doctorAppDeleteOpen,setDoctorAppDeleteOpen]=useState(false);  //state variable for popup of the doctor appointment cancellation

    const [notificationOpen,setNotificationOpen]=useState(false);
    const [notiMessage,setNotiMessage]=useState("");
    const [notiType,setNotiType]=useState("success");


    const currentDate = new Date();


    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    const [validRange, setValidRange] = useState({ start: firstDayOfMonth, end: lastDayOfMonth });


    
    const [dayAppCount,setDayAppCount]=useState([]);

    const [pasMonth,setPasMonth]=useState(null);

    const [disabledDates,setDisabledDates]=useState([]);  //var list for storing disabled dates

 



    let newselectedDay;
    let today;


    useEffect(()=>
    {

    
      axios.get(`https://localhost:7205/api/Appointment/doctor/${doctorId}/month/${pasMonth}`)
      .then((response) => {
        console.log(response.data);
        console.log("daycout"+response.data);
        console.log(pasMonth+"doc"+doctorId)
        setDayAppCount(response.data);
        console.log(getDayAppCount(10));
      })
      .catch((error) => {
          console.error('Error fetching appointments:', error);
      });


      




    },[doctorId,pasMonth]);

    useEffect(()=>
    {
      axios.get(`https://localhost:7205/api/Appointment/BlockedDates/${doctorId}`)
      .then((response) => {
        setDisabledDates(response.data);
        //console.log(response.data,"dislist");
       
      })
      .catch((error) => {
          console.error('Error fetching disabled dates:', error);
      });
    },[doctorId]);
  

    function getDayAppCount(day)
    {
      var total=0;
      const newDay=parseInt(day,10);
      for(var i=0;i<dayAppCount.length;i++)
      {
       const date = new Date( dayAppCount[i].dateTime);
       if(date.getDate()==newDay)
       {
         total+=1;
       }
        
      }
      return total;
    }

    const getDayStatus=(target)=>
{
  return disabledDates.some(item=>item.date===target);
}
 



    function renderEventContent(eventInfo) {
      return (
        <>
          <b>{eventInfo.timeText}</b>
          <i>{eventInfo.event.title}</i>
        </>
      )
    }
    
    
    function renderDayCellContent(dayCell) {
      const renderingDate = dayCell.date;
      const date=new Date(renderingDate);
      const milliseconds = date.getMilliseconds();
      const millisecondsPart = milliseconds === 0 ? '' : `.${milliseconds.toString().padStart(3, '0')}`;
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}${millisecondsPart}`;
      console.log(formattedDate);
      return (
        <div >
          <div>{dayCell.dayNumberText} </div>
          
          <Box sx={{display:getDayStatus(formattedDate)?'none':'flex'}}>
        <CustomizedProgressBars  value={getDayAppCount(dayCell.dayNumberText)*10}  />       
        </Box>
          
               
    
        </div>
      );
    }
    
    
    
    
    const handleDatesSet = (arg) => {
      const displayedDate = arg.view.currentStart;
      const selectedMonth = displayedDate.getMonth(); // 0-indexed (0 for January, 11 for December)
      const selectedYear = displayedDate.getFullYear();

      setPasMonth(selectedMonth);
    
      const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
      const lastDayOfMonth = new Date(selectedYear, selectedMonth+1, 1);


    
     
    
      
    
      const newValidRange = {
        start:new Date(selectedYear, selectedMonth, 1),
        end:  new Date(selectedYear, selectedMonth+1, 1)
      };
      if (
        validRange.start.getTime() !== newValidRange.start.getTime() ||
        validRange.end.getTime() !== newValidRange.end.getTime()
      ) {
        setValidRange({ start: firstDayOfMonth, end: lastDayOfMonth })
      }
    
    
     
      console.log('Selected Month:', selectedMonth+1);
      console.log('Selected Year:', selectedYear);
      console.log(validRange);
    };
    
  
    const handleNotification=(msg,type)=>
   {
       //console.log(msg)
       setDoctorAppDeleteOpen(false);
       setNotiMessage(msg);
      setNotificationOpen(true);
      setNotiType(type);
      console.log(notiMessage);
     
      
   }

   const getDayCellClassNames = (arg) => {
    const date=new Date(arg.date);
    const milliseconds = date.getMilliseconds();
    const millisecondsPart = milliseconds === 0 ? '' : `.${milliseconds.toString().padStart(3, '0')}`;
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}${millisecondsPart}`;
    if(getDayStatus(formattedDate))
    {
      return 'blocked-date';
    } 
    else{
      return 'nonblocked-date';
    }
};

   const handleDelete=(event)=>
   {

    const selectedDate = moment(event.start);
    console.log("hello",selectedDate);
    newselectedDay = selectedDate.format('MMMM D, YYYY');
    console.log("inside delete");
    console.log("newselectedday",newselectedDay);
    //if(today<)
    setDoctorAppDeleteOpen(true);

   }
 
 



  const navigate = useNavigate();
  const [displayedRange, setDisplayedRange] = useState({
    start: moment().startOf('month'),
    end: moment().endOf('month'),
  });

  const handleDateClick = (arg) => {
    const selectedDate = moment(arg.dateStr);
    console.log("hello",selectedDate);
    today = selectedDate.format('MMMM D, YYYY');
    console.log("hello",today);

    const displayedDate = arg.view.currentStart;
    const selectedMonth = selectedDate.month();
    const currentMonth = displayedDate.getMonth(); 

    const date=new Date(arg.date);
      const milliseconds = date.getMilliseconds();
      const millisecondsPart = milliseconds === 0 ? '' : `.${milliseconds.toString().padStart(3, '0')}`;
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}${millisecondsPart}`;
  

    if(!getDayStatus(formattedDate))
    {
      
    if (selectedMonth === currentMonth) {
      navigate('/dappList', { state: { selectedDay: today ,doctorid:doctorId,doctorList:doctorList} });
    }

    }
    else{
      handleNotification("This date is has been blocked!","error")

    }


  };

  const handleNavigate = (newDate) => {
    const startDate = moment(newDate).startOf('month');
    const endDate = moment(newDate).endOf('month');
    setDisplayedRange({ start: startDate, end: endDate });
  };

  const dayPropGetter = (date) => {
    const dayOfWeek = date.getDay();
    const isToday = moment(date).isSame(moment(), 'day');

    let className = 'weekday-day';

    if (dayOfWeek === 0) {
      className = 'sunday-day';
    } else if (dayOfWeek === 1) {
      className = 'monday-day';
    }

    return {
      className: isToday ? 'today-day' : className,
      style: isToday ? { backgroundColor: '#3B877A' } : null,
      icon: <CloseIcon style={{ color: 'red' }} /> // Render the CloseIcon component
    };
  };

 
  const ProgressToday = () => (
    <div style={{ position: 'relative', height: '100%' }}>
      <EventBusyIcon variant="determinate"  /> {}
    </div>
  );

  const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };

    const goToToday = () => {
      toolbar.onNavigate('TODAY');
    };

    return (
      <div className="rbc-toolbar">
        <ArrowBackIosIcon onClick={goToBack} />
        <Typography sx={{ textDecoration: 'underline', color: 'gray', fontSize: 18 }} className="rbc-toolbar-label">
          {toolbar.label}
        </Typography>
        <hr />
        <ArrowForwardIosIcon onClick={goToNext} />
      </div>
    );
  };

  return (
    <div>
      
      <Box sx={{overflowY: 'hidden' }}>
      <FullCalendar
        plugins={[dayGridPlugin,interactionPlugin]}
        initialView='dayGridMonth'
       // weekends={false}
      //  events={events}
        eventContent={renderEventContent}
        dayCellContent={renderDayCellContent}
        dateClick={handleDateClick}
        datesSet ={handleDatesSet}
        selectable={false}
        dayCellClassNames={getDayCellClassNames}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next'
        }}
       
       // validRange={validRange}
        
      //  select={handleDateClick}
      />

      </Box>
      <DoctorAppDeletePopup setNotificationOpen={setNotificationOpen} setNotiMessage={setNotiMessage} notiMessage={notiMessage} handleNotification={handleNotification} setDoctorAppDeleteOpen={setDoctorAppDeleteOpen} doctorAppDeleteOpen={doctorAppDeleteOpen}  ></DoctorAppDeletePopup>
      <SuccessNotification type={notiType} setNotificationOpen={setNotificationOpen} notiMessage={notiMessage} notificationOpen={notificationOpen}/>
    </div>
    
   
  );
};


export default DoctorAppCalender;

    

