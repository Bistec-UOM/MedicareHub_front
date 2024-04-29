import * as React from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { IconButton, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import { baseURL, endPoints } from "../../../../Services/Appointment";

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
  const handleClose = () => {
    setDocDayBlockPopup(false);
  };
  //addig blocked date and doctor id to the table
  async function handleSubmit(event) {
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
        const startTime=new Date(selectedDay);  //set start time as 12AM
        startTime.setHours(0,0,0,0);
        const endTime=new Date(selectedDay);
        endTime.setHours(23,59,0,0);
        console.log("start",startTime); //set end time as 11.59pm

        const formattedStartedDate = `${startTime.getFullYear()}-${(startTime.getMonth() + 1)  //convert start time to the correct time zone
          .toString()
          .padStart(2, "0")}-${startTime.getDate().toString().padStart(2, "0")}T${startTime
          .getHours()
          .toString()
          .padStart(2, "0")}:${startTime.getMinutes().toString().padStart(2, "0")}:${startTime
          .getSeconds()
          .toString()
          .padStart(2, "0")}.${startTime.getMilliseconds().toString().padStart(3, "0")}`;

          const formattedendDate = `${endTime.getFullYear()}-${(endTime.getMonth() + 1) //convert end time to the correct time zone
            .toString()
            .padStart(2, "0")}-${endTime.getDate().toString().padStart(2, "0")}T${endTime
            .getHours()
            .toString()
            .padStart(2, "0")}:${endTime.getMinutes().toString().padStart(2, "0")}:${endTime
            .getSeconds()
            .toString()
            .padStart(2, "0")}.${endTime.getMilliseconds().toString().padStart(3, "0")}`;
    let obj = {
      doctorId: doctorId,
      Date: formattedDate,
      startTime:formattedStartedDate,
      endTime:formattedendDate
    };
    try {
      await axios.post(baseURL + endPoints.UnableDates, obj);
      setDocDayBlockPopup(false);
      setBlockSelectionPopup(false);
      handleNotification("Day Blocked succesfully!", "success");
    } catch (err) {
      handleNotification(err.response.data, "error");
    }
  }

  return (
    <React.Fragment>
      <Dialog open={docDayBlockPopup} onClose={handleClose}>
        <Box sx={{ width: { xs: "100%", sm: "500px" }, height: "150px" }}>
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
            <ErrorIcon
              sx={{ color: "red", marginRight: "2%", fontSize: "2rem" }}
            />
            <Typography sx={{ marginTop: "1%", color: "#000000" }}> 
              Are you sure you want to Block the Date?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "5%",
            }}
          >
            <Button
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#F44336",
                "&:hover": {
                  backgroundColor: "#F44336",
                },
                marginLeft: "20px",
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
