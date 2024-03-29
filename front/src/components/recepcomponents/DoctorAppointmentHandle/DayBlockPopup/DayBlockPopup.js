import * as React from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { IconButton, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";

export default function DayBlockPopup({
  selectedDay,
  doctorId,
  handleNotification,
  item,
  delcount,
  setDelcount,
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
    let obj = {
      doctorId: doctorId,
      Date: formattedDate,
    };
    try {
      await axios.post(
        "https://localhost:7205/api/Appointment/unableDates",
        obj
      );
      setDocDayBlockPopup(false);
      handleNotification("Day Blocked succesfully!", "success");
    } catch (err) {
      var msg = err.response.data;
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
                backgroundColor: "#F44336", // Replace with your desired color
                "&:hover": {
                  backgroundColor: "#F44336", // Replace with your desired hover color
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
