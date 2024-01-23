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
import PatientDetailCard from "../PatientDetailCard/PatientDetailCard";

const SearchPatientPage = (props) => {
  const [dayapp, setDayApp] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const [apopen, setApopen] = useState(false);
  const [dopen, setDopen] = useState(false);

  const handleBackToList = () => {
    props.setRenderVal(false);
  };

  const patientList = [
    {
      name: "Dammika jayalath",
      city: "Colombo",
      nic: "21433454325",
      phone: "0774733245",
    },
    {
      name: "Saman Perera",
      city: "Colombo",
      nic: "4524523",
      phone: "0774733245",
    },
    {
      name: "Namal Sanka",
      city: "Colombo",
      nic: "452452343",
      phone: "0774733245",
    },
    {
      name: "Sachith Perera",
      city: "Colombo",
      nic: "4524543223",
      phone: "0774733245",
    },
    {
      name: "Vihanga Madugalla",
      city: "Colombo",
      nic: "45244332523",
      phone: "0774733245",
    },
    {
      name: "Ranil Charuka",
      city: "Moratuwa",
      nic: "54325324",
      phone: "0742314567",
    },
    {
      name: "Kasun Amnda",
      city: "kandy",
      nic: "54243252",
      phone: "0774733245",
    },

    {
      name: "Nipun Madushan",
      city: "galle",
      nic: "5243525",
      phone: "0774733245",
    },
  ];

  const handleDeleteAll = () => {
    setDopen(true);
  };

  const [activeId, setActiveId] = useState("");
  

 

//  console.log(activeData[0] && activeData[0].name )
  

  var location = useLocation();
  var loc = location.state;

  const handleAppAd = () => {
    // setApopen(true);
    props.setRenderVal(true);
  };

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
            New
          </Button>
          <Button
            onClick={handleBackToList}
            // disabled={isDisabled}
            sx={{
              backgroundColor: "#F44336",
              fontWeight: 25,
              "&:hover": {
                backgroundColor: "#F34436", // Set hover background color to be the same
              },
            }}
            variant="contained"
          >
            Back To List
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
        {
          <div style={{ width: "80%" }}>
            {patientList.map((item) => (
              <div key={item.nic}>
                <PatientDetailCard
                  setActiveId={setActiveId}
                  apopen={apopen}
                  setApopen={setApopen}
                  item={item}
                />
              </div>
            ))}
          </div>
        }
        <AppAddPopup patientList={patientList} activeId={activeId} apopen={apopen} setApopen={setApopen} />
      </div>
    </Box>
  );
};

export default SearchPatientPage;
