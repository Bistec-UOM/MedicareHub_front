import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import './steper.css'



export default function Steper(props) {
    console.log(props.items)
  return (
    <Box >
      <Stepper orientation='vertical' activeStep={0} >
        {props.items && props.items.filter((item)=>{
           return props.search.toLowerCase()===''?item:item.name.toLowerCase().includes(props.search.toLowerCase())
        }).map((label) => (
          <Step key={label.nic}>
            <StepLabel >{label.time}</StepLabel>


          </Step>
        ))}
      </Stepper>
    </Box>
  );
}