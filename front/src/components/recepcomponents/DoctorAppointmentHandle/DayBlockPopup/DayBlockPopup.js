import * as React from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { baseURL, endPoints } from "../../../../Services/Appointment";
import { setHeaders } from "../../../../Services/Auth";
import DoneIcon from "@mui/icons-material/Done";
import WarningIcon from "@mui/icons-material/Warning";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

//day block popup

export default function DayBlockPopup({
  selectedDay,
  doctorId,
  handleNotification,
  item,
  delcount,
  setDelcount,
  blockSelectionPopup,
  setBlockSelectionPopup,
  docDayBlockPopup,
  setDocDayBlockPopup,
  filteredAppointments,
  setFilteredAppointments,
  isDisabled,
  setIsDisabled,
}) {
  const [dayBlockLoading, setDayBlockLoading] = useState(false); //var for loading prop of day block confirm button
  const handleClose = () => {
    setDocDayBlockPopup(false);
  };
  //addig blocked date and doctor id to the table
  async function handleSubmit(event) {
    setDayBlockLoading(true);
    event.preventDefault();
    const date = new Date(selectedDay);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}.${date.getMilliseconds().toString().padStart(3, "0")}`;
    const startTime = new Date(selectedDay); //set start time as 12AM
    startTime.setHours(0, 0, 0, 0);
    const endTime = new Date(selectedDay);
    endTime.setHours(23, 59, 0, 0);
    console.log("start", startTime); //set end time as 11.59pm

    const formattedStartedDate = `${startTime.getFullYear()}-${(
      startTime.getMonth() + 1
    ) //convert start time to the correct time zone
      .toString()
      .padStart(2, "0")}-${startTime
      .getDate()
      .toString()
      .padStart(2, "0")}T${startTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${startTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${startTime
      .getSeconds()
      .toString()
      .padStart(2, "0")}.${startTime
      .getMilliseconds()
      .toString()
      .padStart(3, "0")}`;

    const formattedendDate = `${endTime.getFullYear()}-${(
      endTime.getMonth() + 1
    ) //convert end time to the correct time zone
      .toString()
      .padStart(2, "0")}-${endTime
      .getDate()
      .toString()
      .padStart(2, "0")}T${endTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${endTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${endTime
      .getSeconds()
      .toString()
      .padStart(2, "0")}.${endTime
      .getMilliseconds()
      .toString()
      .padStart(3, "0")}`;
    let obj = {
      doctorId: doctorId,
      Date: formattedDate,
      startTime: formattedStartedDate,
      endTime: formattedendDate,
    };
    try {
      await axios.post(baseURL + endPoints.UnableDates, obj, setHeaders());
      setDayBlockLoading(false);
      setDocDayBlockPopup(false);
      setBlockSelectionPopup(false);
      handleNotification("Day Blocked succesfully!", "success");
    } catch (err) {
      setDayBlockLoading(false);
      handleNotification("Network Error Occured!", "error");
    }
  }

  return (
    <Dialog open={docDayBlockPopup} onClose={handleClose}>
      <div
        style={{
          display: "flex",
          alignItems: "start",
          margin: "8px",
          paddingBottom: "5px",
          borderBottom: "1px solid lightgrey",
        }}
      >
        <WarningIcon color="warning" sx={{ mr: "10px" }}></WarningIcon>
        <Typography data-testid="dayblocktitle">
          {" "}
          Are you sure you want to Block the Date?
        </Typography>
      </div>
      <div
        style={{
          width: "100%",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          sx={{ mr: "40px" }}
          size="small"
          endIcon={<CloseIcon></CloseIcon>}
          onClick={handleClose}
        >
          No
        </Button>
        <LoadingButton
          data-testid="dayblockconfirm"
          variant="contained"
          size="small"
          endIcon={<DoneIcon></DoneIcon>}
          loading={dayBlockLoading}
          loadingPosition="end"
          onClick={handleSubmit}
        >
          Yes
        </LoadingButton>
      </div>
    </Dialog>
  );
}
