import FullCalendar from '@fullcalendar/react';
import { Box } from '@mui/material';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import moment from 'moment';
import CustomizedProgressBars from '../CustomProgressBar/CustomProgressBar';
import interactionPlugin from '@fullcalendar/interaction';
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from 'react';
import '../../../recep.css'
import SuccessNotification from '../SnackBar/SuccessNotification';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Load } from '../../Other';

//full calender for receptionist
function MyFullCalendar({epage,setEpage,doctorId,selectedTab,setSelectedTab}) {
    let today;
    const [doctorList,setDoctorList]=useState([]);  //doctor list for sidebar
    const [doctorCount,setDoctorCount]=useState(0);  // changing state for fetching the doctor list
    const [dayAppCount,setDayAppCount]=useState([]);  //variable for getting the app count of a day for calculating the progress bar
    const [pasMonth,setPasMonth]=useState(null);   //variable for getting the current display month
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);  
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const [validRange, setValidRange] = useState({ start: firstDayOfMonth, end: lastDayOfMonth });
    const [disabledDates,setDisabledDates]=useState([]);  //var list for storing disabled dates
 

    const navigate = useNavigate();

    useEffect(()=>
    {
      axios.get(`https://localhost:7205/api/Appointment/BlockedDates/${doctorId}`)
      .then((response) => {
        setDisabledDates(response.data);  
      })
      .catch((error) => {
          console.error('Error fetching disabled dates:', error);
          setEpage(true);
      });
    },[doctorId]);

    // use effect for fetching the doctor list
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("https://localhost:7205/api/Appointment/doctors");
          if (!response.ok) {
            setEpage(true);
            //throw new Error("Network response was not ok");
          }
          const responseData = await response.json();
          setDoctorCount((prevCount) => prevCount + 1);
          setDoctorList(responseData.result);
        } catch (error) {
          console.error('Error fetching doctor data:', error);
          setEpage(true);
        }
      };
    
      fetchData();
    }, []);
    
    //  use effect for getting the app day count for the current displayed month
    useEffect(()=>
    {
      axios.get(`https://localhost:7205/api/Appointment/doctor/${doctorId}/month/${pasMonth}`)
      .then((response) => {
        setDayAppCount(response.data);
       
      })
      .catch((error) => {
          console.error('Error fetching appointments:', error);
          setEpage(true);
          
      });
    },[doctorId,pasMonth]);

    const [notificationOpen,setNotificationOpen]=useState(false);  //var for open day block notificatio
    const [notiMessage,setNotiMessage]=useState("");  //var for storig noti message
    const [notiType,setNotiType]=useState("success");
    const [RloadDone,setRloadDone]=useState(false)  //state for calender loading 


    const handleNotification=(msg,type)=>
   {  
      setNotiMessage(msg);
      setNotificationOpen(true);
      setNotiType(type);
   }
   function getDayAppCount(day)   //function for calculating the app daycount of a given day
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
    //function for navigating to the app list page when a day cell clicked
    const handleDateClick = (arg) => {
      const selectedDate = moment(arg.dateStr);
      today = selectedDate.format('MMMM D, YYYY');
      const displayedDate = arg.view.currentStart;
      const selectedMonth = selectedDate.month();
      const currentMonth = displayedDate.getMonth(); 

      const date=new Date(arg.date);
      const milliseconds = date.getMilliseconds();
      const millisecondsPart = milliseconds === 0 ? '' : `.${milliseconds.toString().padStart(3, '0')}`; //ensuring milisecond part has 3 digits
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}${millisecondsPart}`;
      if(!getDayStatus(formattedDate))  //check day is blocked or not
      {
      if (selectedMonth === currentMonth) {
        navigate('/resday', { state: { selectedDay: today ,doctorid:doctorId,doctorList:doctorList} });
      }
    }else{
       handleNotification("This date has been blocked!","error")
    }
    };
  //handle datesset for setting the valid date range
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
  };
  //for displaying day cell content
  function renderDayCellContent(dayCell) {
    const renderingDate = dayCell.date;
    const date=new Date(renderingDate);
    const milliseconds = date.getMilliseconds();
    const millisecondsPart = milliseconds === 0 ? '' : `.${milliseconds.toString().padStart(3, '0')}`;
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}${millisecondsPart}`;
    return (
      <div >
        <div>{dayCell.dayNumberText} </div>  
        <Box sx={{display:getDayStatus(formattedDate)?'none':'flex'}}>
        <CustomizedProgressBars  value={getDayAppCount(dayCell.dayNumberText)*10}  />       
        </Box>      
      </div>
    );
  }
const getDayStatus=(target)=>  //check date is in the disabledDates list
{
  return disabledDates.some(item=>item.date===target);  
}
  const getDayCellClassNames = (arg) => {  //return css class names for day cells
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

  return (
    <div className="App">
     
      <Box sx={{overflowY: 'hidden' }}>
      
      <FullCalendar
        plugins={[dayGridPlugin,interactionPlugin]}
        initialView='dayGridMonth'
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
      />
       <SuccessNotification type={notiType} setNotificationOpen={setNotificationOpen} notiMessage={notiMessage} notificationOpen={notificationOpen}/> 
      </Box> 
    </div>
  );
}

export default MyFullCalendar;
