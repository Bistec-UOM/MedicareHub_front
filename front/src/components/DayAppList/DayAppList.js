import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Stack, Typography, Button, Container, Box } from "@mui/material";
import Navbar from "../navbar/Navbar";
import AppointmentCard from "../AppointmentCard/AppointmentCard";
import SearchBar from "../Searchbar/Searchbar";
import Steper from "../Setper/Steper";
import { SidebarContainer } from "../sidebar/Sidebar";
import { SidebarTop, SidebarList } from "../sidebar/Sidebar";
import { Sideunit_Doctor } from "../sidebar/Sideunits";
import { CustomScroll } from "../CustomScroll";
import AppAddPopup from "../AppAddPopup/AppAddPopup";
import AllAppDeletePopup from "../AllAppDeletePopup/AllAppDeletePopup";
import DayAppList from "../DayAppList/DayAppList";

const DayList = (props) => {
  const [dayapp, setDayApp] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const [apopen, setApopen] = useState(false);
  const [dopen, setDopen] = useState(false);

  const handleDeleteAll = () => {
    setDopen(true);
  };

  var location = useLocation();
  var loc = location.state;

  const handleAppAd = () => {
   // setApopen(true);
    props.setRenderVal(true);
  };
  useEffect(() => {
    document.body.style.margin = "0";
    const appointments = props.appointlist.filter((item) => item.today === loc.today);
    setFilteredAppointments(appointments);
    setIsDisabled(appointments.length === 0);
  }, [props.appointlist, loc]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
        }}
      >
        <SearchBar
          mgl="10%"
          isDisabled={isDisabled}
          placename="Patient name or id..."
        />
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
            onClick={handleAppAd}
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
            onClick={handleDeleteAll}
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
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxHeight: "75vh",
          overflowY: "scroll",
        }}
      >
        <Box sx={{ padding: "3% 0 0 8%" }}>
          <Steper items={filteredAppointments}></Steper>
        </Box>

        {
          <div style={{ width: "80%" }}>
            {filteredAppointments.map((item) => (
              <div key={item.nic}>
                <AppointmentCard
                  filteredAppointments={filteredAppointments}
                  setFilteredAppointments={setFilteredAppointments}
                  item={item}
                />
              </div>
            ))}
          </div>
        }
      </div>
      <AppAddPopup apopen={apopen} setApopen={setApopen} />
      <AllAppDeletePopup
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        filteredAppointments={filteredAppointments}
        setFilteredAppointments={setFilteredAppointments}
        dopen={dopen}
        setDopen={setDopen}
      />
    </Box>
  );
};

export default DayList;
