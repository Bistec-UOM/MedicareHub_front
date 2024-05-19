import * as React from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import { IconButton, Typography } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import { baseURL, endPoints } from "../../../../Services/Appointment";
import { setHeaders } from "../../../../Services/Auth";

export default function DoctorAllAppDeletePopup({
  cancelAll,
  setCancelAll,
  selectedDay,
  delcount,
  setDelcount,
  docid,
  handleNotification,
  dopen,
  setDopen,
  filteredAppointments,
  setFilteredAppointments,
  isDisabledCancel,
  setIsDisabledCancel,
}) {
  const [etimevalueError, seteTimeValueError] = useState(false);

  const [timevalue, setTimeValue] = useState("");
  const [rdelete, setRdelete] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notiMessage, setNotiMessage] = useState("");

  //for cancelling all prescheduled appoints of day by doctor
  async function handleAllAppDelete() {
    try {
      await axios.put(
        baseURL + endPoints.AppDay + `${docid}` + "/day/" + `${selectedDay}`,setHeaders()
      );
      setDelcount(delcount + 1);
      setCancelAll(false);
      handleNotification("All appointment Cancelled succesfully!");
    } catch (err) {
      handleNotification(err.response.data, "error");
    }
  }


  const handleClose = () => {
    setCancelAll(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <Dialog open={cancelAll} onClose={handleClose}>
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
              Are you sure the entire list to be Canceled?
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
              onClick={handleAllAppDelete}
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
