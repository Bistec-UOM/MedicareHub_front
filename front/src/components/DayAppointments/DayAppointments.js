import React from "react";
import { Grid, Stack, Typography, Button, Container, Box } from "@mui/material";
import { useState } from "react";
import AppointmentCard from "../AppointmentCard/AppointmentCard";


const DayAppointments = () => {
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
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker ince the 1500s, when an
              unknown proftware like Aldus PageMaker including versions of Lorem
              Ipsum
            </Typography>
          </Grid>

          <Grid item md={9}>
            <Stack sx={{
      
        justifyContent: "flex-end",
      }} spacing={2} direction="row">
              <Button
                sx={{
                  backgroundColor: "#79CCBE",
                  fontWeight: 25,
                  "&:hover": {
                    backgroundColor: "#79CCBE", // Set hover background color to be the same
                  },
                }}
                variant="contained"
              >
                Add
              </Button>
              <Button
                sx={{
                  backgroundColor: "#F44336",
                  fontWeight: 25,
                  "&:hover": {
                    backgroundColor: "#F34436", // Set hover background color to be the same
                  },
                }}
                variant="contained"
              >
                Cancel
              </Button>
            </Stack>
            <Container>
            {appointmentlist.map((item)=>(
                <AppointmentCard ></AppointmentCard>
            ))}
           
        </Container>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default DayAppointments;
