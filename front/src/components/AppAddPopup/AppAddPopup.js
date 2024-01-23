import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { CardContent, IconButton, TextField, Typography } from "@mui/material";

import { useState } from "react";
import { useEffect } from "react";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Button from "@mui/material/Button";
import SearchBar from "../Searchbar/Searchbar";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Stack } from "@mui/material";


export default function AppAddPopup({ activeId,patientList,apopen, setApopen ,activeD}) {
  // const [enameError,seteNameError]=useState(false)
  // const [eaddressError,seteAddressError]=useState(false)
  console.log(activeD)
  // const [enicError,seteNicError]=useState(false)
  const [etimevalueError, seteTimeValueError] = useState(false);

  // const [ename,setEName]=useState(item.name)
  // const [eaddress,setEAddress]=useState(item.address)
  // const [enic,setENic]=useState(item.nic)
  const [timevalue, setTimeValue] = useState("");

  const [activeData, setActiveData] = useState({});

  const handleClickOpen = () => {
    setApopen(true);
  };

  const handleClose = () => {
    setApopen(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
  }
  useEffect(() => {
   
    if (patientList && Array.isArray(patientList)) {
      setActiveData(patientList.filter((patient) => patient.nic === activeId));
  }
  console.log(activeData)
   // setActiveData(output);
    

}, []);


  return (
    <React.Fragment>
      <Dialog open={apopen} onClose={handleClose}>
        <Box sx={{ width: "600px"}}>
          <form autoComplete="false" noValidate onSubmit={handleSubmit}>
            <Box >
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
              <Stack
                direction={"column"}
                sx={{
                  justifyContent: "space-between",
                  padding: "20px",
                  alignItem: "center",
                }}
              >
               
                <Grid container sx={{ marginTop: "3%" }}>
                  <Grid md={6} item>
                    <Box
                      sx={{
                        backgroundColor: "#FFFF",
                        textAlign: "left",
                        padding:'2%',
                        border: "1px solid #3B877A",
                        borderRadius: 5,
                        height:'125px',
                      }}
                    >
                        <Stack direction={"column"}>
                          <Stack
                            direction={"row"}
                            sx={{
                              justifyContent: "space-between",
                              alignItem: "center",
                            }}
                          >
                            <Typography sx={{padding:'2%'}} variant="h5">{activeData.name}</Typography>
                          </Stack>
                          <Stack>
                            <Typography sx={{padding:'2%'}} color="text.secondary">{activeData.nic}</Typography>
                          </Stack>
                          <Stack
                            sx={{
                              justifyContent: "space-between",
                              alignItem: "center",
                            }}
                            direction={"row"}
                          >
                            <Typography sx={{padding:'2%'}} variant="body2" color="text.secondary">
                            { activeData.city}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                            {activeData.phone}
                            </Typography>
                          </Stack>
                        </Stack>
                    </Box>
                  </Grid>
                  <Grid md={2} item sx={{ padding: "0 2%" }}>
                  <Box
                      sx={{
                        backgroundColor: "#FFFF",
                        textAlign: "left",
                        padding:'2%',
                        border: "1px solid #3B877A",
                        borderRadius: 5,
                        height:'125px',
                        display:"flex",
                        alignItems:'center'
                      }}
                    ><Typography sx={{color:'#3B877A'}} variant="h2">08</Typography></Box>
                  </Grid>
                  <Grid md={2} item sx={{ padding: "0 2%" }}>
                   
                  <Box
                      sx={{
                        backgroundColor: "#FFFF",
                        textAlign: "left",
                        padding:'2%',
                        border: "1px solid #3B877A",
                        borderRadius: 5,
                        height:'125px',
                        display:"flex",
                        alignItems:'center'
                      }}
                    ><Typography sx={{color:'#3B877A'}} variant="h2">57</Typography></Box>
                  </Grid>
                  <Grid md={2} item sx={{ padding: "0 2%" }}>
                  <Box
                      sx={{
                        backgroundColor: "#FFFF",
                        textAlign: "left",
                        padding:'2%',
                        border: "1px solid #3B877A",
                        borderRadius: 5,
                        height:'125px',
                        display:"flex",
                        justifyContent:'center',
                        alignItems:'center'
                      }}
                    ><Typography sx={{color:'#3B877A'}} variant="h4">AM</Typography></Box>
                  </Grid>
                </Grid>
                
              </Stack>
            </Box>
            <DialogActions>
              <Button
                sx={{
                  backgroundColor: "#79CCBE", // Replace with your desired color
                  "&:hover": {
                    backgroundColor: "#79CCBE", // Replace with your desired hover color
                  },
                }}
                variant="contained"
                type="submit"
              >
                Confirm
              </Button>
            </DialogActions>
          </form>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
