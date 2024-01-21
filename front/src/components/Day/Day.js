import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Stack, Typography, Button, Container, Box } from "@mui/material";
import Navbar from "../navbar/Navbar";
import AppointmentCard from "../AppointmentCard/AppointmentCard";
import SearchBar from "../Searchbar/Searchbar";
import Steper from "../Setper/Steper";

const Day = ({ appointlist, setAppointList }) => {
  var location = useLocation();
  var loc = location.state;
  const [dayapp, setDayApp] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    const appointments = appointlist.filter((item) => item.today === loc.today);
    setFilteredAppointments(appointments);
    setIsDisabled(appointments.length === 0);
  }, [appointlist, loc]);
  return (
    <div>
      <Navbar />
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
             
            </Typography>
          </Grid>

          <Grid  item md={9}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItem: "center",
              }}
            >
              <SearchBar isDisabled={isDisabled} />

              <Stack
                sx={{
                  justifyContent: "flex-end",
                  marginBottom: 3,
                  marginRight: 3,
                }}
                spacing={2}
                direction="row"
              >
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
                  disabled={isDisabled}
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
            </Box>
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%",maxHeight:'75vh' ,overflowY:'scroll'}}
            >
                <Box sx={{padding:"3% 0 0 8%"}}>
                    <Steper  items={filteredAppointments}></Steper>
                </Box>
              

              { <div style={{ width: "80%" }}>
                {filteredAppointments.map((item) => (
                  <div key={item.nic}>
                    <AppointmentCard item={item} />
                  </div>
                ))}
              </div> }
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );

  // return <div>
  //    {
  //     dayapp.map((item)=>(
  //         <div>

  //              <h1 key={item.name}>{item.name}-{item.city}</h1>

  //         </div>

  //     ))

  //    }
  // </div>
};

export default Day;
