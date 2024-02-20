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
import '../../../recep.css'

const localizer = momentLocalizer(moment);
let today;

const MyCalendar = ({doctorId,selectedTab,setSelectedTab}) => {

  const [doctorList,setDoctorList]=useState([]);
  const [doctorCount,setDoctorCount]=useState(0);
 
  useEffect(()=>
  {
    fetch("https://localhost:7205/api/Appointment/doctors").then((response)=>
    {
      return response.json();
    }).then((responseData)=>
    {
      setDoctorCount(doctorCount+1);
      console.log(responseData.result);
      setDoctorList(responseData.result);
    })
 
  },[]);



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
    if (selectedMonth === currentMonth) {
      navigate('/resday', { state: { today: today ,doctorid:doctorId,doctorList:doctorList} });
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
      dayWrapper: <ProgressToday/>
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
        onNavigate={handleNavigate}
        views={{ month: true }}
        components={{
          toolbar: CustomToolbar,
        }}
        dayLayoutAlgorithm="no-overlap"
        dayPropGetter={dayPropGetter}
        
      />
    </Box>
  );
};

export default MyCalendar;
