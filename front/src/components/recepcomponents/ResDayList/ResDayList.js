import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Stack, Typography, Button, Container, Box } from "@mui/material";
import Navbar from "../../navbar/Navbar";
import AppointmentCard from "../AppointmentCard/AppointmentCard";
import SearchBar from "../Searchbar/Searchbar";
import Steper from "../Setper/Steper";
import { SidebarContainer } from "../../sidebar/Sidebar";
import { SidebarTop, SidebarList } from "../../sidebar/Sidebar";
import { Sideunit_Doctor } from "../../sidebar/Sideunits";

import AppAddPopup from "../AppAddPopup/AppAddPopup";
import AllAppDeletePopup from "../AllAppDeletePopup/AllAppDeletePopup";
import '../../../recep.css'






const ResDayList = (props) => {
  const [dayapp, setDayApp] = useState([]);
 
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [search,setSearch]=useState("")

  const [apopen, setApopen] = useState(false);
  const [dopen, setDopen] = useState(false);

  const [delcount,setDelcount]=useState(0)

  const [isDisabled, setIsDisabled] = useState(true);

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
    const newappointments=appointments.filter((item)=>item.did===props.docid)
    setFilteredAppointments(newappointments);
    setIsDisabled(newappointments.length === 0);
  }, [delcount]);

  return (
    
    <Box sx={{height:'100%'}}>
      <Box 
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
          position:'fixed',
          backgroundColor:'white',
          width:{sm:'70%',xs:'90%'},
          flexWrap:'wrap-reverse',
          paddingTop:{xs:'7px',sm:'0'}
         // paddingTop:10,
          //marginLeft:-10
        }}
      >
        <SearchBar 
          search={search}
          setSearch={setSearch}
          mgl="20%"
          isDisabled={isDisabled}
          placename="Patient name or id..."
        />
        <Stack
          sx={{
            justifyContent: "flex-end",
            marginBottom: 3,
            marginRight: {
                md:3,
                xs:-3
            },
            width:{xs:'100%',sm:'auto'}
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
         
        }}
      >
        <Box sx={{ padding:{
            sm: "3% 0 0 8%",
            xs:"5% 0 0 2%"

        },marginRight:{xs:'3%',sm:'0%'},marginTop:{xs:'50%',sm:'7%'} }}>
          <Steper search={search} items={filteredAppointments}></Steper>
        </Box>

        {
          <Box sx={{ width: "80%",marginTop:{xs:'40%',sm:'7%'}}}>
            {filteredAppointments.filter((item)=>{
              return search.toLowerCase()===''?item:item.name.toLowerCase().includes(search.toLowerCase())
            }).map((item) => (
              <div key={item.nic}>
                <AppointmentCard 
                  delcount={delcount}
                  setDelcount={setDelcount}
                  filteredAppointments={filteredAppointments}
                  setFilteredAppointments={setFilteredAppointments}
                  item={item}
                />
              </div>
            ))}
          </Box>
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

export default ResDayList;
