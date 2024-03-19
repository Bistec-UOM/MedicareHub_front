
import FullCalendar from '@fullcalendar/react'
import { Box } from '@mui/material';
import dayGridPlugin from '@fullcalendar/daygrid'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useEffect } from 'react';
import moment from 'moment';

import CustomizedProgressBars from '../CustomProgressBar/CustomProgressBar';

import interactionPlugin from '@fullcalendar/interaction';

import LinearProgress from '@mui/material/LinearProgress';
import { useState } from 'react';
import '../../../recep.css'


const events = [
  { title: 'Meeting', start: new Date() }
]

function MyFullCalendar({doctorId,selectedTab,setSelectedTab}) {


   // const localizer = momentLocalizer(moment);
    let today;

    const [doctorList,setDoctorList]=useState([]);
    const [doctorCount,setDoctorCount]=useState(0);


    const [dayAppCount,setDayAppCount]=useState([]);

    const [pasMonth,setPasMonth]=useState(null);
    
 

    useEffect(()=>
    {
      fetch("https://localhost:7205/api/Appointment/doctors").then((response)=>
      {
        return response.json();
      }).then((responseData)=>
      {
        setDoctorCount(doctorCount+1);
      
        setDoctorList(responseData.result);
      })
   
    },[]);


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

    const navigate = useNavigate();
    // const [displayedRange, setDisplayedRange] = useState({
    //   start: moment().startOf('month'),
    //   end: moment().endOf('month'),
    // });


    const handleDateClick = (arg) => {
      const selectedDate = moment(arg.dateStr);
      console.log("hello",selectedDate);
      today = selectedDate.format('MMMM D, YYYY');
      console.log("hello",today);

      const displayedDate = arg.view.currentStart;
      const selectedMonth = selectedDate.month();
      const currentMonth = displayedDate.getMonth(); 
      console.log("dd",selectedMonth);
      console.log(currentMonth);
      console.log("new",today)
      if (selectedMonth === currentMonth) {
        navigate('/resday', { state: { selectedDay: today ,doctorid:doctorId,doctorList:doctorList} });
      }
    };
  
    
    //   const handleNavigate = (newDate) => {
    //     const startDate = moment(newDate).startOf('month');
    //     const endDate = moment(newDate).endOf('month');
    //     setDisplayedRange({ start: startDate, end: endDate });
    //   };



  const currentDate = new Date();

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

  const [validRange, setValidRange] = useState({ start: firstDayOfMonth, end: lastDayOfMonth });

  function getValidRange() {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    return { start: firstDayOfMonth, end: lastDayOfMonth };
  }

//   function handleDateClick() {
//    console.log("Hello");
//   }

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


  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  const isWithinDisplayedMonth = (arg) => {
    const currentDate = new Date();
    return validRange.start.getMonth() === currentDate.getMonth();
  };

  const selectAllow = (arg) => {
    return isWithinDisplayedMonth(arg);
  };

  function renderDayCellContent(dayCell) {
    return (
      <div >
        <div>{dayCell.dayNumberText} </div>

        
        
        <CustomizedProgressBars   value={getDayAppCount(dayCell.dayNumberText)*10}  />
             

      </div>
    );
  }

  return (
    <div className="App">
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
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next'
        }}
       
       // validRange={validRange}
        
      //  select={handleDateClick}
      />

      </Box>
    
    </div>
  );
}

export default MyFullCalendar;
