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
import { useEffect } from 'react';
import '../../.././../recep.css'
import DoctorAppDeletePopup from '../DoctorAppDeletePopup/DoctorAppDeletePopup';
import SuccessNotification from '../../SnackBar/SuccessNotification';
import CloseIcon from "@mui/icons-material/Close";




const localizer = momentLocalizer(moment);
let today;


const DoctorAppCalender=()=>
{
    const [doctorList,setDoctorList]=useState([]);
    const [doctorCount,setDoctorCount]=useState(0);

    const [doctorAppDeleteOpen,setDoctorAppDeleteOpen]=useState(false);  //state variable for popup of the doctor appointment cancellation

    const [notificationOpen,setNotificationOpen]=useState(false);
    const [notiMessage,setNotiMessage]=useState("");
  
    const handleNotification=(msg)=>
   {
       //console.log(msg)
       setDoctorAppDeleteOpen(false);
       setNotiMessage(msg);
      setNotificationOpen(true);
      console.log(notiMessage);
     
      
   }
 
 



  const navigate = useNavigate();
  const [displayedRange, setDisplayedRange] = useState({
    start: moment().startOf('month'),
    end: moment().endOf('month'),
  });

  const handleDateClick = (event) => {
    const selectedDate = moment(event.start);
    console.log("hello",selectedDate);
    today = selectedDate.format('MMMM D, YYYY');
    console.log("hello",today);
    const selectedMonth = selectedDate.format('MMMM');
    const currentMonth = displayedRange.start.format('MMMM');
    console.log(selectedMonth);
    console.log(currentMonth);
    setDoctorAppDeleteOpen(true);



    
    // if (selectedMonth === currentMonth) {
    //   navigate('/resday', { state: { selectedDay: today ,doctorid:doctorId,doctorList:doctorList} });
    // }
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
      <LinearProgress variant="determinate" value={50} /> {}
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
    
    <Box sx={{ height: '100%', width:'100%'
     
    }}>
      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={handleDateClick}
       // onNavigate={handleNavigate}
        views={{ month: true }}
        components={{
          toolbar: CustomToolbar,
        }}
        dayLayoutAlgorithm="no-overlap"
        dayPropGetter={dayPropGetter}
        
      />
      <DoctorAppDeletePopup handleNotification={handleNotification} doctorAppDeleteOpen={doctorAppDeleteOpen} setDoctorAppDeleteOpen={setDoctorAppDeleteOpen}/>
      <SuccessNotification setNotificationOpen={setNotificationOpen} notiMessage={notiMessage} notificationOpen={notificationOpen}/>
    </Box>
  );
};


export default DoctorAppCalender;

    

