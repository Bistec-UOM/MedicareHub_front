import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Stack } from "@mui/material";
import {IconButton} from "@mui/material";
import Steper from "../Setper/Steper";
import AppAddPopup from "../AppAddPopup/AppAddPopup";
import AppDeletePopup from "../AppDeletePopup/AppDeletePopup";
import AppEditPopup from "../AppEditPopup/AppEditPopup";
import { useEffect } from "react";
import axios from "axios";

const AppointmentCard = ({docid,appointlist,setAppointList,handleNotification,filteredAppointments,setFilteredAppointments, item ,delcount,setDelcount}) => {
  const [daopen,setDaopen]=useState(false);
  const [appEditOpen,setAppEditOpen]=useState(false);

  const [patientData,setPatientData]=useState(null);

  const handleEditAppointment=()=>
  {
    setAppEditOpen(true);
  }

  // useEffect(() => {
  //   axios.get(`https://localhost:7205/api/User/${item.patitenId}`)
  //     .then((response) => {
  //       console.log(response);
  //       setPatientData(response.data);
  //      // console.log(patientData)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

 
  

 

  const handleDeleteAppointment = () => {
    setDaopen(true)
    
    
  };

  const handleEdit = () => {
   // setApopen(true);
  };

  return (
    
    <div>
      

     
        
        <Box  sx={{ width: { md:"80%",xs:'100%'}, marginLeft: "auto", marginRight: "auto"}}>
          <Card
            sx={{
              backgroundColor: "#FFFF",
              textAlign: "left",
              marginBottom: 2,
              border: "1px solid #3B877A",
              borderRadius: 5,
            
        
            }}
          >
            <Stack direction={'column'}>
            <CardContent>
              <Stack direction={'row'} sx={{justifyContent:'space-between',alignItem:'center'}}>
        
                  <Typography variant="h5" >
                    {item.patient?.fullName}
                  </Typography>
        
                <Box>
        
                 <IconButton onClick={handleDeleteAppointment}><DeleteIcon  sx={{ marginLeft: "auto", color: "#E60000" }} /></IconButton>
                  <IconButton onClick={handleEditAppointment}><EditIcon  sx={{ color: "#F66444", }} /></IconButton>
        
        
                </Box>
              </Stack>
              <Stack sx={{justifyContent:'space-between',alignItem:'center',flexDirection:{xs:'column',md:'row'}}} >
                <Typography variant="body2" color="text.secondary">
                {item.patient?.address}
                </Typography>
                <Typography  color="text.secondary">
                {item.patient?.nic}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {item.patient?.contactNumber}
                </Typography>
                <Typography sx={{display:{xs:'flex',sm:'flex',md:'none'}}} variant="body2" color="text.secondary">
                  {item.appointment.time}
                </Typography>
        
              </Stack>
              </CardContent>
            </Stack>
        
          </Card>
          
         
        </Box>
        <AppDeletePopup appointlist={appointlist} setAppointList={setAppointList} handleNotification={handleNotification} delcount={delcount} setDelcount={setDelcount} item={item} daopen={daopen} setDaopen={setDaopen} filteredAppointments={filteredAppointments} setFilteredAppointments={setFilteredAppointments}/>
        <AppEditPopup  appEditOpen={appEditOpen} setAppEditOpen={setAppEditOpen}  setAppointList={setAppointList} handleNotification={handleNotification} appointlist={appointlist} docid={docid} item={item} />
      
    </div>
   
  );
};

export default AppointmentCard;
