import * as React from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { IconButton, Typography, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import BasicTimePicker from "../../TimePicker/TimePicker";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import { useState } from "react";
import dayjs from "dayjs";
import { baseURL, endPoints } from "../../../../Services/Appointment";
import { setHeaders } from "../../../../Services/Auth";

//dayTime block popup

export default function BlockTimeSelectionPopup({
  selectedDay,
  doctorId,
  handleNotification,
  item,
  delcount,
  setDelcount,
  docDayBlockPopup,
  timeSelection,
  setTimeSelection,
  setDocDayBlockPopup,
  filteredAppointments,
  setFilteredAppointments,
  isDisabled,
  setIsDisabled,
}) {
  const handleClose = () => {
    setTimeSelection(false);
  };

  const [startTime, setStartTime] = useState(new dayjs(selectedDay));  //starttime of blocked time period
  const [endTime, setEndTime] = useState(new dayjs(selectedDay));  //endtime of blocked time period

  //addig blocked date and doctor id to the table
  async function handleSubmit(event) {
    event.preventDefault();
    const date = new Date(selectedDay);
    const startTimeDate=new Date(startTime);
    const endTImeDate=new Date(endTime);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}.${date.getMilliseconds().toString().padStart(3, "0")}`;
      const formattedStartTime = `${startTimeDate.getFullYear()}-${(startTimeDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${startTimeDate.getDate().toString().padStart(2, "0")}T${startTimeDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${startTimeDate.getMinutes().toString().padStart(2, "0")}:${startTimeDate
        .getSeconds()
        .toString()
        .padStart(2, "0")}.${startTimeDate.getMilliseconds().toString().padStart(3, "0")}`;
        const formattedEndTIme = `${endTImeDate.getFullYear()}-${(endTImeDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${endTImeDate.getDate().toString().padStart(2, "0")}T${endTImeDate
          .getHours()
          .toString()
          .padStart(2, "0")}:${endTImeDate.getMinutes().toString().padStart(2, "0")}:${endTImeDate
          .getSeconds()
          .toString()
          .padStart(2, "0")}.${endTImeDate.getMilliseconds().toString().padStart(3, "0")}`;
    let obj = {
      doctorId: doctorId,
      Date: formattedDate, 
      startTime:formattedStartTime,
      endTime:formattedEndTIme
    };
    try {
      await axios.post(baseURL + endPoints.UnableDates, obj,setHeaders());
      handleNotification("Time Blocked succesfully!", "success");
      setTimeSelection(false);
    } catch (err) {
      handleNotification(err.response.data, "error");
    }
  }

  return (
    <React.Fragment>
      <Dialog open={timeSelection} onClose={handleClose}>
        <Box sx={{ width: { xs: "100%", sm: "450px" }, height: "280px" }}>
          <Box>
            <Box
              sx={{
                backgroundColor: "#DEF4F2",
                height: "40px",
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItem: "center",
              margin: "3%",
            }}
          >
            <MoreTimeIcon
              sx={{ color: "orange", marginRight: "2%", fontSize: "2rem" }}
            />
            <Typography sx={{ marginTop: "1%", color: "#000000" }}>
              Select the Time Period?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingRight: "5%",
              margin: "2%",
            }}
          >
            <BasicTimePicker
              sx={{ overflow: { xs: "hidden" } }}
              selectedTime={startTime}
              setSelectedTime={setStartTime}
              label="StartTime"
            ></BasicTimePicker>
            <BasicTimePicker 
             selectedTime={endTime}
             setSelectedTime={setEndTime}
            label="EndTIme"></BasicTimePicker>
            <Button
               onClick={handleSubmit}
              sx={{
                backgroundColor: "#79CCBE",
                "&:hover": {
                  backgroundColor: "#79CCBE",
                },
                marginLeft: "80%",
                marginTop:"2%",
                width: "90px",
              }}
              variant="contained"
              type="submit"
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
