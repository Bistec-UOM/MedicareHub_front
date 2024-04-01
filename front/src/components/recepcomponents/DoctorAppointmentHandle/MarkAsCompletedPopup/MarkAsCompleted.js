import * as React from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { CardContent, IconButton, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";

export default function MarkAsCompleted({
  item,
  handleNotification,
  delcount,
  setDelcount,
  setMarkAsCompleted,
  markOpen,
}) {
  const handleClose = () => {
    setMarkAsCompleted(false);
  };
  async function handleMarkAsCompelted(item) {
    try {
      await axios.put(
        `https://localhost:7205/updateStatus/${item.appointment.id}`,  //update the status of app to completed
        {
          id: item.appointment.id,
          Datetime: item.appointment.dateTime,
          status: "Completed",
          patientId: item.appointment.patientId,
          doctorId: item.appointment.doctorId,
          recepId: item.appointment.recepId,
        }
      );
      setDelcount(delcount + 1);
      setMarkAsCompleted(false);
      handleNotification("Appointment Completed succesfully!","success");
    } catch (err) {
      handleNotification(err.response.data,"error");
    }
  }
  return (
    <React.Fragment>
      <Dialog open={markOpen} onClose={handleClose}>
        <Box
          sx={{
            width: { xs: "100%", sm: "500px" },
            height: "160px",
            paddingBottom: "20px",
          }}
        >
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
              color="success"
              sx={{ marginRight: "2%", fontSize: "2rem" }}
            />
            <Typography sx={{ marginTop: "1%", color: "#000000" }}>
              Are you sure you want mark as completed the appointment?
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
              onClick={() => handleMarkAsCompelted(item)}
              color="success"
              sx={{
                marginLeft: "20px",
                marginBottom: "20px",
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
