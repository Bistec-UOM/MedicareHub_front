import React from "react";
import { Grid, Stack, Typography, Button, Container, Box } from "@mui/material";
import { useState } from "react";
import Calender from "../Calender/MyCalender";
import MyCalendar from "../Calender/MyCalender";

const AppointmentCalender = () => {
    const [appointmentlist,setAppointmentList]=useState([])
   // const []
  return (
    <div>
      <Box sx={{ marginTop: 10 }}>
        <Grid container direction="row">
          <Grid item md={3}>
            <Typography>
              einter took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also
              the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently
              with desktop pubLorem Ipsum is simply dummy text of the printing
              and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer
              took a galley of type and scrambled it to make a type specimen
              book. It has survived not only five centuries, but also the leap
              into electronic typesetting, remaining essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem IpsumLorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
            ypesetting, remaining essentially unchanged. It was
             
              Ipsum
            </Typography>
          </Grid>

          <Grid item md={9}>
           <MyCalendar/>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AppointmentCalender;
