import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import './steper.css'



export default function Steper(props) {


  function getTime(dateTimeString) {
    // Create a Date object from the date-time string
    const dateTime = new Date(dateTimeString);
  
    // Get hours
    let hours = dateTime.getHours();
    // Convert hours to 12-hour format
    hours = hours % 12 || 12; // Convert 0 to 12
  
    // Get minutes
    const minutes = dateTime.getMinutes();
  
    // Get AM or PM
    const amOrPm = dateTime.getHours() >= 12 ? 'PM' : 'AM';
  
    // Format the time string
    const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amOrPm}`;
  
    return timeString;
  }




    console.log(props.items)
  return (
    <Box >
      <Stepper orientation='vertical' activeStep={0} >
        {props.items && props.items.filter((item)=>{
           return props.search.toLowerCase()===''?item:item.patient.fullName.toLowerCase().includes(props.search.toLowerCase())
        }).map((label) => (
          <Step key={label.patient.nic}>
            <StepLabel  >{getTime(label.appointment?.dateTime)}</StepLabel>


          </Step>
        ))}
      </Stepper>
    </Box>
  );
}