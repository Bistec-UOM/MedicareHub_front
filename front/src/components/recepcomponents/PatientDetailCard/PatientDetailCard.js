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
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from "react";

const PatientDetailCard = ({ appAddPopupCount,setAppAddPopupCount,setActiveId,item,apopen, setApopen }) => {

 

  const handleDeleteAppointment = () => {
   // setFilteredAppointments(filteredAppointments.filter((itemf)=>itemf.nic!==item.nic));
    
  };

  const handleAppAddPopup = () => {
    // setActiveId(item.nic)
    setAppAddPopupCount(appAddPopupCount+1);
   setApopen(true)
   setActiveId(item.nic)
  };
  useEffect(()=>{
    setActiveId(item.nic)

  },[]);

  return (
    
    <div>
        
        <div classname="test" style={{ width: "80%", marginLeft: "auto", marginRight: "auto"}}>
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
                    {item.name}
                  </Typography>
        
                <Box>
        
                
                  <IconButton onClick={handleAppAddPopup}><AddIcon  sx={{ color: "#F66444", }} /></IconButton>
        
        
                </Box>
              </Stack>
              <Stack sx={{justifyContent:'space-between',alignItem:'center'}} direction={'row'}>
                <Typography variant="body2" color="text.secondary">
                  {item.city}
                </Typography>
                <Typography  color="text.secondary">
                  {item.nic}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.phone}
                </Typography>
        
              </Stack>
              </CardContent>
            </Stack>
        
          </Card>
          
         
        </div>
       
    </div>
  );
};

export default PatientDetailCard;
