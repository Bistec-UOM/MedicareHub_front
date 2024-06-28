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
import { LoadingButton } from "@mui/lab";
import WarningIcon from '@mui/icons-material/Warning';
import theme from "../../../Style";

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

  const minTime = dayjs(selectedDay).set("hour", 8).set("minute", 55); // 9:00 AM
  const maxTime = dayjs(selectedDay).set("hour", 17).set("minute", 0); // 5:00 PM
  const [startTime, setStartTime] = useState(dayjs(selectedDay).hour(9).minute(0).second(0)); //starttime of blocked time period
  const [endTime, setEndTime] = useState(dayjs(selectedDay).hour(10).minute(0).second(0)); //endtime of blocked time period
  const [timeBlockLoading, setTimeBlockLoading] = useState(false); //var for loaing prop of confirm button

  //addig blocked date and doctor id to the table
  async function handleSubmit(event) {
    setTimeBlockLoading(true);
    event.preventDefault();
    const date = new Date(selectedDay);
    const startTimeDate = new Date(startTime);
    const endTImeDate = new Date(endTime);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}.${date.getMilliseconds().toString().padStart(3, "0")}`;
    const formattedStartTime = `${startTimeDate.getFullYear()}-${(
      startTimeDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${startTimeDate
      .getDate()
      .toString()
      .padStart(2, "0")}T${startTimeDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${startTimeDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${startTimeDate
      .getSeconds()
      .toString()
      .padStart(2, "0")}.${startTimeDate
      .getMilliseconds()
      .toString()
      .padStart(3, "0")}`;
    const formattedEndTIme = `${endTImeDate.getFullYear()}-${(
      endTImeDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${endTImeDate
      .getDate()
      .toString()
      .padStart(2, "0")}T${endTImeDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${endTImeDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${endTImeDate
      .getSeconds()
      .toString()
      .padStart(2, "0")}.${endTImeDate
      .getMilliseconds()
      .toString()
      .padStart(3, "0")}`;
    let obj = {
      doctorId: doctorId,
      Date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTIme,
    };
    try {
      await axios.post(baseURL + endPoints.UnableDates, obj, setHeaders());
      setTimeBlockLoading(false);
      handleNotification("Time Blocked succesfully!", "success");
      setTimeSelection(false);
    } catch (err) {
      setTimeBlockLoading(false);
      handleNotification("Network Error Occured!", "error");
    }
  }

  return (
    <React.Fragment>
      <Dialog open={timeSelection} onClose={handleClose}>
        <Box sx={{ width: { xs: "100%", sm: "450px" }, height: "230px" }}>
        <div style={{display:'flex',alignItems:'start',margin:'8px',paddingBottom:'5px',borderBottom:'1px solid lightgrey'}}>
      <MoreTimeIcon color='warning' sx={{mr:'10px'}}></MoreTimeIcon>
      <Typography data-testid="timeperiodtext"> Select the Time Period</Typography>
    </div>
          {/* <Box>
            <Box
              sx={{
                //backgroundColor: theme.palette.custom.greenH,
                height: "40px",
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
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
          </Box> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingRight: "5%",
              margin: "2%",
            }}
          >
            <BasicTimePicker
              size="small"
              sx={{ overflow: { xs: "hidden" } }}
              selectedTime={startTime}
              setSelectedTime={setStartTime}
              label="StartTime"
              minTime={minTime}
              maxTime={maxTime}
            ></BasicTimePicker>
            <BasicTimePicker
              selectedTime={endTime}
              setSelectedTime={setEndTime}
              label="EndTIme"
              minTime={minTime}
              maxTime={maxTime}
            ></BasicTimePicker>
             <Box
      sx={{
        display: "flex",
        justifyContent: "space-between", // Distribute space between the buttons
        alignItems: "center", // Align items vertically centered
        marginTop: "2%", // Add margin to the top if needed
      }}
    >
      <Button
        variant="outlined"
        sx={{ width: "90px" }}
        size="small"
        endIcon={<CloseIcon />}
        onClick={handleClose}
      >
        No
      </Button>
      <LoadingButton
        data-testid="timeconfirm"
        loading={timeBlockLoading}
        onClick={handleSubmit}
        sx={{
          width: "90px",
        }}
        variant="contained"
        type="submit"
      >
        Confirm
      </LoadingButton>
    </Box>
          </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
