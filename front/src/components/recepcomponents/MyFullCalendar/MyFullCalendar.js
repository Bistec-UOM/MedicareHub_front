
import FullCalendar from '@fullcalendar/react';
import { Box } from '@mui/material';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import moment from 'moment';

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
        
        <LinearProgress variant="determinate" value={50} style={{ width:'90%', height: '10px',position:'absolute',bottom:'5%' }}  color="success" />
             

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
