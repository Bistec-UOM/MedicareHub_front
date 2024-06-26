import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { Grid } from "@mui/material";
import { useState } from "react";
import { SidebarContainer } from "../../sidebar/Sidebar";
import { SidebarTop, SidebarList } from "../../sidebar/Sidebar";
import SearchBar from "../Searchbar/Searchbar";
import { useEffect } from "react";
import { Sideunit_Doctor } from "../../sidebar/Sideunits";
import ResNavBar from "../ResNavBar/ResNabBar";
import MyFullCalendar from "../MyFullCalendar/MyFullCalendar";
import { baseURL, endPoints } from "../../../Services/Appointment";
import { Load } from "../../Other";
import { setHeaders } from "../../../Services/Auth";
import theme from "../../Style";

const drawerWidth = 358.4;

function ResponseAppCalender() {
  const [notificationOpen, setNotificationOpen] = useState(false); //var for open of noti popup
  const [notiMessage, setNotiMessage] = useState(""); //var for notification message
  const [notiType, setNotiType] = useState("success"); //var for notification type

  const handleNotification = (msg, type) => {
    setNotiMessage(msg);
    setNotificationOpen(true);
    setNotiType(type);
  };

  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  const [doctorList, setDoctorList] = useState([]); //doctor list of sidebar
  const [doctorCount, setDoctorCount] = useState(1);
  const [epage, setEpage] = useState(false); //state for errorpage

  useEffect(() => {
    //fetching doctors list
    const fetchData = async () => {
      try {
        const response = await fetch(
          baseURL + endPoints.DoctorsList,
          setHeaders()
        );
        const responseData = await response.json();
        setDoctorCount((prevCount) => prevCount + 1);
        setDoctorList(responseData.result);
        setRloadDone(true);
        setSelectedTab(responseData.result[0].id);
      } catch (error) {
        if (error.hasOwnProperty("response")) {
          setRloadDone(true);
          handleNotification(error.response.data, "error");
        } else {
          console.log(error);
        }
      }
    };

    fetchData();
  }, []);
  const handleChanges = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const [mobileOpen, setMobileOpen] = React.useState(false); //variable for mobile screen drawer open
  const [isClosing, setIsClosing] = React.useState(false); //variable for mobile view navbar open
  const [selectedTab, setSelectedTab] = useState(0);
  const [RloadDone, setRloadDone] = useState(false); //state for doctorlist loading

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const [search, setSearch] = useState(""); //searching text var of searchbar of doctors
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Grid
        item
        xs={3}
        sm={1}
        md={3}
        sx={{ backgroundColor: theme.palette.custom.sideBar }}
      >
        <SidebarContainer>
          <SidebarTop>
            <SearchBar
              search={search}
              setSearch={setSearch}
              //mgl="10%"
              isDisabled={false}
              placename="Doctor name or id..."
            ></SearchBar>
          </SidebarTop>
          <SidebarList>
            {!RloadDone ? <Load></Load> : ""}
            {Array.isArray(doctorList) &&
              doctorList
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.name.toLowerCase().includes(search.toLowerCase());
                })
                .map((item, index) => (
                  <Sideunit_Doctor
                    onClick={() => setSelectedTab(item.id)}
                    selectedTab={selectedTab}
                    name={item.fullName}
                    title={item.qualifications}
                    index={item.id}
                    key={index}
                  ></Sideunit_Doctor>
                ))}
          </SidebarList>
        </SidebarContainer>
      </Grid>
    </div>
  );

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      <ResNavBar
        isClosing={isClosing}
        setMobileOpen={setMobileOpen}
        mobileOpen={mobileOpen}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth - 100,
            },
            height: "100%",
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            marginTop: "20px",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: {
            xs: "85vh",
            sm: "90vh",
            md: "100vh",
          },
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Grid
          sx={{
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "64px",
            width: "100%",
            height: "100%",
          }}
          item
          xs={9}
          sm={11}
          md={9}
        >
          <MyFullCalendar
            doctorsList={doctorList}
            epage={epage}
            setEpage={setEpage}
            doctorId={selectedTab}
          />
        </Grid>
      </Box>
    </Box>
  );
}
export default ResponseAppCalender;
