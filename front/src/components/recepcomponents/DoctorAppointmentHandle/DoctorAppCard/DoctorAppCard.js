import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import MarkAsCompleted from "../MarkAsCompletedPopup/MarkAsCompleted";
import AppCancelPopup from "../AppCancelPoplup/AppCancelPopup";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";

const DoctorAppCard = ({
  selectedDay,
  docid,
  appointlist,
  setAppointList,
  handleNotification,
  filteredAppointments,
  setFilteredAppointments,
  item,
  delcount,
  setDelcount,
}) => {
  const [markAsCompleted, setMarkAsCompleted] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const handleMarkAsCompelted = () => {
    setMarkAsCompleted(true);
  };

  const completedStatus = (item) => {
    if (item.appointment.status == "Completed") {
      return (
        <CheckCircleRoundedIcon color="success" sx={{ fontSize: "38px" }} />
      );
    } else if (item.appointment.status == "cancelled") {
      return <BlockRoundedIcon color="warning" sx={{ fontSize: "38px" }} />;
    }
  };

  const handleCancelAppointment = () => {
    setCancelOpen(true);
  };

  const isCompletedOrCancelled =
    item.appointment?.status === "Completed" ||
    item.appointment?.status === "cancelled";
  return (
    <div>
      <Box
        sx={{
          width: { md: "80%", xs: "100%" },
          marginLeft: "auto",
          marginRight: "auto",
          opacity: isCompletedOrCancelled ? 0.5 : 1,
          pointerEvents: isCompletedOrCancelled ? "none" : "auto",
        }}
      >
        <Card
          sx={{
            backgroundColor: "#FFFF",
            textAlign: "left",
            marginBottom: 2,
            border: "1px solid #3B877A",
            borderRadius: 5,
          }}
        >
          <Stack direction={"column"}>
            <CardContent>
              <Stack
                direction={"row"}
                sx={{ justifyContent: "space-between", alignItem: "center" }}
              >
                <Typography variant="h5">{item.patient?.fullName}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center" }}
                >
                  {item.patient?.contactNumber}
                </Typography>
                {completedStatus(item)}
              </Stack>
              <Stack
                sx={{
                  justifyContent: "space-between",
                  alignItem: "center",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {item.patient?.address}
                </Typography>
                {isCompletedOrCancelled ? (
                  <div></div>
                ) : (
                  <Box>
                    <IconButton onClick={handleMarkAsCompelted}>
                      <TaskAltRoundedIcon color="success" />
                    </IconButton>

                    <IconButton onClick={handleCancelAppointment}>
                      <HighlightOffRoundedIcon
                        sx={{ marginLeft: "auto", color: "#E60000" }}
                      />
                    </IconButton>
                  </Box>
                )}
                <Typography
                  sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
                  variant="body2"
                  color="text.secondary"
                >
                  {item.appointment.dateTime}
                </Typography>
              </Stack>
            </CardContent>
          </Stack>
        </Card>
      </Box>
      <MarkAsCompleted
        handleNotification={handleNotification}
        delcount={delcount}
        setDelcount={setDelcount}
        item={item}
        markOpen={markAsCompleted}
        setMarkAsCompleted={setMarkAsCompleted}
      />
      <AppCancelPopup
        handleNotification={handleNotification}
        item={item}
        delcount={delcount}
        setDelcount={setDelcount}
        cancelOpen={cancelOpen}
        setCancelOpen={setCancelOpen}
      ></AppCancelPopup>
    </div>
  );
};

export default DoctorAppCard;
