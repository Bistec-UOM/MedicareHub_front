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


export default function AppAddPopup({ appAddPopupCount,setAppAddPopupCount, activeId,patientList,apopen, setApopen ,activeD}) {
  // const [enameError,seteNameError]=useState(false)
  // const [eaddressError,seteAddressError]=useState(false)
  //console.log(activeD)
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
   // console.log(activeId);
  
    if (patientList && Array.isArray(patientList)) {
      const filteredData = patientList.find((patient) => patient.nic === activeId);
      setActiveData(filteredData);
    }
  }, [appAddPopupCount, activeId, patientList]);
  
  useEffect(() => {
   // console.log("Updated Active Data:", activeData);
  }, [activeData]);
  



  return (
    <React.Fragment>
      <Dialog open={apopen} onClose={handleClose}>
        <Box sx={{ width: {sm:"600px",xs:"280px"}}}>
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
                        height:{md:'125px',xs:'180px'},
                        marginBottom:{xs:'5%',sm:0},
                        width:'100%',
                        marginRight:{
                          sm:0,
                          xs:5
                        }
                        
                        
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
                            <Typography sx={{padding:'2%'}} variant="h5">{activeData?.name}</Typography>
                          </Stack>
                          <Stack>
                            <Typography sx={{padding:'2%'}} color="text.secondary">{activeData?.nic}</Typography>
                          </Stack>
                          <Stack
                            sx={{
                              justifyContent: "space-between",
                              alignItem: "center",
                              flexDirection:{xs:'column',sm:'row'}
                            }}
                           
                          >
                            <Typography sx={{padding:'2%'}} variant="body2" color="text.secondary">
                            { activeData?.city}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                            {activeData?.phone}
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
                 // marginBottom:{xs:'2%',sm:0},
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
