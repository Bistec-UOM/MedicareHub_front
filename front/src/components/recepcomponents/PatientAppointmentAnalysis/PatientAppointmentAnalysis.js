import React, { useEffect, useState } from "react";
import { Button, Container, Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PatientAnalysis from "../PatientAnalysis/PatientAnalysis";
import { baseURL, endPoints } from "../../../Services/Appointment";
import { setHeaders } from "../../../Services/Auth";
import SuccessNotification from "../SnackBar/SuccessNotification";

const PatientAppointmentAnalysis = ({
  analysisPatient,
  selectedDay,
  showAnalysis,
  setShowAnalysis,
}) => {
  const [previousApps, setPreviousApps] = useState([]); //previous appointments list
  const [analysisLoad, setAnalysisLoad] = useState(false); //var for analysis render loading

  const [notificationOpen, setNotificationOpen] = useState(false); //var for notification popup
  const [notiMessage, setNotiMessage] = useState(""); //var for notification message
  const [notiType, setNotiType] = useState("success"); //var for notification type
  const [patientCount, setPatientCount] = useState(0);

  var comCount = 0;
  var showOffCount = 0;

  useEffect(() => {
    axios
      .get(
        baseURL + endPoints.PreviousAppointments + `${analysisPatient.id}`,
        setHeaders()
      )
      .then((response) => {
        setPreviousApps(response.data);
        setAnalysisLoad(true);
        console.log("resprevi", response.data);
      })
      .catch((error) => {
        handleNotification("Network Error Occured!", "error");
        setAnalysisLoad(true);
      });
  }, [analysisPatient.id]);

  const prepareChartData = (appointments) => {
    //data formatting for barchart
    const dataMap = {};

    appointments.forEach(({ appointment, doctor }) => {
      const { status } = appointment;
      const doctorName = doctor.name;

      if (!dataMap[doctorName]) {
        dataMap[doctorName] = {
          doctor: doctorName,
          totalAppointments: 0,
          completedAppointments: 0,
          noShows: 0,
        };
      }

      dataMap[doctorName].totalAppointments += 1;

      if (status === "paid" || status === "completed") {
        dataMap[doctorName].completedAppointments += 1;
        comCount += 1;
      } else if (status === "noshow") {
        dataMap[doctorName].noShows += 1;
        showOffCount += 1;
      }
    });

    return Object.values(dataMap).map(
      ({ doctor, totalAppointments, completedAppointments, noShows }) => ({
        doctor,
        totalAppointments,
        completedAppointments,
        noShows,
      })
    );
  };

  const handleBackToList = () => {
    setShowAnalysis(false);
  };

  const handleNotification = (msg, type) => {
    setNotiMessage(msg);
    setNotificationOpen(true);
    setNotiType(type);
  };

  const chartData = prepareChartData(previousApps);

  return (
    <Box sx={{ height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          backgroundColor: "white",
          width: { sm: "70%", xs: "90%" },
          flexWrap: "wrap-reverse",
          paddingTop: { xs: "7px", sm: "10px", md: "10px" },
          zIndex: 10,
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "#d0d1cb", marginBottom: { md: "0px", xs: "5%" } }}
        >
          {selectedDay}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}>
          <Button
            onClick={handleBackToList}
            sx={{
              fontWeight: 25,
              whiteSpace: "nowrap",
              marginRight: { xs: 5, md: "0" },
            }}
            color="warning"
            variant="outlined"
            startIcon={
              <ArrowBackIosNewIcon
                sx={{ display: { md: "flex", xs: "none" } }}
              />
            }
          >
            Back To List
          </Button>
        </Box>
      </Box>
      <PatientAnalysis
        comCount={comCount}
        showOffCount={showOffCount}
        analysisPatient={analysisPatient}
        analysisLoad={analysisLoad}
        data={chartData}
      ></PatientAnalysis>
      <SuccessNotification
        id="analysisnotification"
        type={notiType}
        setNotificationOpen={setNotificationOpen}
        notiMessage={notiMessage}
        notificationOpen={notificationOpen}
      />
    </Box>
  );
};

export default PatientAppointmentAnalysis;
