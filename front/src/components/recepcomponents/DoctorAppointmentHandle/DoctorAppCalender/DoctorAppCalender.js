import React, { useState } from "react";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import axios from "axios";
import "../../.././../recep.css";
import SuccessNotification from "../../SnackBar/SuccessNotification";
import CloseIcon from "@mui/icons-material/Close";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect } from "react";
import interactionPlugin from "@fullcalendar/interaction";
import "../../../../recep.css";
import CustomizedProgressBars from "../../CustomProgressBar/CustomProgressBar";
import { baseURL,endPoints } from "../../../../Services/Appointment";
import { setHeaders } from "../../../../Services/Auth";
import { jwtDecode } from "jwt-decode";
import DoctorAppList from "../DoctorAppList/DoctorAppList";
import DoneIcon from '@mui/icons-material/Done'
import WarningIcon from '@mui/icons-material/Warning';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";



const DoctorAppCalender = ({Mode,setMode,setAppListDetails}) => {

  const doctorId=jwtDecode(localStorage.getItem('medicareHubToken')).RoleId;

  const [doctorList, setDoctorList] = useState([]);
  const [doctorAppDeleteOpen, setDoctorAppDeleteOpen] = useState(false); //state variable for popup of the doctor appointment cancellation
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notiMessage, setNotiMessage] = useState("");
  const [notiType, setNotiType] = useState("success");
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1
  );
  const [validRange, setValidRange] = useState({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });
  const [dayAppCount, setDayAppCount] = useState([]);
  const [pasMonth, setPasMonth] = useState(currentDate.getMonth());
  const [disabledDates, setDisabledDates] = useState([]); //var list for storing disabled dates

  let newselectedDay;
  let today;
//------unblock popup------
const [blockConLoading,setBlockConLoading]=useState(false);  //var for loading prop of block confirm button
const [unblockOpen,setUnblockOpen]=useState(false); // var for unblock popup open
const [unblockedObject,setUnblockObjec]=useState(null); // var unblock date object
const [unblockCount,setUnblockCount]=useState(0);  //var for fetching new block dates



  const handleClose = () => {
    setUnblockOpen(false);
  };

  const handleUnblock=()=>
    {
      setBlockConLoading(true);
      axios.delete(baseURL+endPoints.UnblockDay+`${unblockedObject.id}`,setHeaders())
    .then(response => {
      setBlockConLoading(false);
      setUnblockCount(unblockCount+1);  //for fetching the newly updated block dates
      setUnblockOpen(false);
      handleNotification("Day Unblocked Succesfully","success");
    })
    .catch(error => {
      setBlockConLoading(false);
      handleNotification("Network error! Please check your internet connection.", "error");
    }
  )


    }
//--------------------------------unblock popup----------------

  useEffect(() =>
    //for fetching the appoinments of the month for a doctor
    {
      axios
        .get(
         baseURL+endPoints.AppDay+`${doctorId}`+"/month/"+`${pasMonth}`,setHeaders()
        )
        .then((response) => {
          setDayAppCount(response.data);
        })
        .catch((err) => {
          handleNotification("Network error occured1!","error");
        });
    }, [doctorId, pasMonth]);

  useEffect(() =>
    //for fetching the disable dates
    {
      axios
       // .get(`https://localhost:7205/api/Appointment/BlockedDates/${doctorId}`)
        .get(baseURL+endPoints.BlockedDates+`${doctorId}`)
        .then((response) => {
          setDisabledDates(response.data);
          console.log("disdate",response.data);
        })
        .catch((err) => {
          handleNotification("Network error occured!","error");
        });
    }, [doctorId,unblockCount]);
  function getDayAppCount(day) {
    var total = 0;
    const newDay = parseInt(day, 10);
    for (var i = 0; i < dayAppCount.length; i++) {
      const date = new Date(dayAppCount[i].dateTime);
      if (date.getDate() == newDay) {
        total += 1;
      }
    }
    return total;
  }
  const getDayStatus = (target) => {
    return disabledDates.some((item) => item.date === target);
  };
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }
  function renderDayCellContent(dayCell) {
    const renderingDate = dayCell.date;
    const date = new Date(renderingDate);
    const milliseconds = date.getMilliseconds();
    const millisecondsPart =
      milliseconds === 0 ? "" : `.${milliseconds.toString().padStart(3, "0")}`;
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}${millisecondsPart}`;
    
    return (
      <div>
        <div>{dayCell.dayNumberText} </div>
        <Box sx={{ display: getDayStatus(formattedDate) ? "none" : "flex" }}>
          <CustomizedProgressBars
            value={getDayAppCount(dayCell.dayNumberText) * 10}
          />
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
    const lastDayOfMonth = new Date(selectedYear, selectedMonth + 1, 1);
    const newValidRange = {
      start: new Date(selectedYear, selectedMonth, 1),
      end: new Date(selectedYear, selectedMonth + 1, 1),
    };
    if (
      validRange.start.getTime() !== newValidRange.start.getTime() ||
      validRange.end.getTime() !== newValidRange.end.getTime()
    ) {
      setValidRange({ start: firstDayOfMonth, end: lastDayOfMonth });
    }
  };
  const handleNotification = (msg, type) => {
    setDoctorAppDeleteOpen(false);
    setNotiMessage(msg);
    setNotificationOpen(true);
    setNotiType(type);
  };

  

  const getDayCellClassNames = (arg) => {
    const date = new Date(arg.date);
    const milliseconds = date.getMilliseconds();
    const millisecondsPart =
      milliseconds === 0 ? "" : `.${milliseconds.toString().padStart(3, "0")}`;
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}${millisecondsPart}`;
    if (getDayStatus(formattedDate)) {

      return "blocked-date";
    } else {
      return "nonblocked-date";
    }
  };

  const navigate = useNavigate();
  const [displayedRange, setDisplayedRange] = useState({
    start: moment().startOf("month"),
    end: moment().endOf("month"),
  });

  const [listMode,setListMode]=useState(false);
  const [selectedDay,setSelectedDay]=useState("")

  const handleDateClick = (arg) => {
    const selectedDate = moment(arg.dateStr);
    today = selectedDate.format("MMMM D, YYYY");
    const displayedDate = arg.view.currentStart;
    const selectedMonth = selectedDate.month();
    const currentMonth = displayedDate.getMonth();
    const date = new Date(arg.date);
    console.log("date",date);
    const milliseconds = date.getMilliseconds();
    const millisecondsPart =
      milliseconds === 0 ? "" : `.${milliseconds.toString().padStart(3, "0")}`;
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}${millisecondsPart}`;
    if (!getDayStatus(formattedDate)) {
      if (selectedMonth === currentMonth) {
        setSelectedDay(today);
        setAppListDetails([today,doctorId])
        setListMode(true);
        /* navigate("/dappList", {
          state: {
            selectedDay: today,
            doctorid: doctorId,
            doctorList: doctorList,
          },
        }); */
      }
    } else {
      const today=new Date();
      handleNotification("This date has been blocked!", "error");
      if(selectedDate>today)
        {
          var disabledObject=disabledDates.find((item)=>item.date==formattedDate);
          setUnblockObjec(disabledObject);
          setUnblockOpen(true);

        }
     
    }
  };

  return (
    <div>
      {!listMode?<Box sx={{ overflowY: "hidden" }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          eventContent={renderEventContent}
          dayCellContent={renderDayCellContent}
          dateClick={handleDateClick}
          datesSet={handleDatesSet}
          selectable={false}
          dayCellClassNames={getDayCellClassNames}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
        />
      </Box>:<DoctorAppList Mode={Mode} setMode={setMode} selectedDAy={selectedDay} docid={doctorId}></DoctorAppList>}
      <SuccessNotification
        type={notiType}
        setNotificationOpen={setNotificationOpen}
        notiMessage={notiMessage}
        notificationOpen={notificationOpen}
      />
       <Dialog open={unblockOpen} onClose={handleClose}>
    <div style={{display:'flex',alignItems:'start',margin:'8px',paddingBottom:'5px',borderBottom:'1px solid lightgrey'}}>
      <WarningIcon color='warning' sx={{mr:'10px'}}></WarningIcon>
      <Typography> If you want you can Unblock the day?</Typography>
    </div>
    <div style={{width:'100%',height:'60px',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Button variant='outlined' sx={{mr:'40px'}} size='small' endIcon={<CloseIcon></CloseIcon>} onClick={handleClose} >No</Button>
      <LoadingButton 
        variant='contained' 
        size='small' 
        endIcon={<DoneIcon></DoneIcon>}           
        loading={blockConLoading}
        loadingPosition="end"
        onClick={handleUnblock}
      >Yes</LoadingButton>
    </div>
  </Dialog>
    </div>
  );
};
export default DoctorAppCalender;
