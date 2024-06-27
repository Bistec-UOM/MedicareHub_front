import React from 'react';
import { Load } from '../../Other';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import {Paper} from '@mui/material';

const DoctorAppointmentStackedBarChart = ({comCount,showOffCount,analysisLoad, data,analysisPatient }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
    
      <Typography  fontSize={30} sx={{paddingTop:'7%',color:'gray'}}>{analysisPatient.name}'s Appointment Analysis</Typography>
      <ResponsiveContainer  width="100%" height={400}>
      {!analysisLoad ? <Load></Load> : <BarChart 
          data={data}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid   strokeDasharray="3 3" />
          <XAxis dataKey="doctor" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="completedAppointments" stackId="a" fill="#82ca9d" />
          <Bar dataKey="noShows" stackId="a" fill="#FF8042" />
        </BarChart>}
       
       
      </ResponsiveContainer>
      {!analysisLoad?'':<Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: {xs:'column',md:'row'}, gap: 10 }}>
      <Paper data-testid="chart-component" sx={{ textAlign: 'center', height: {md:'20vh',xs:'30vh'}, padding: '10px' }}>
        <Typography data-testid="completedappointments" fontSize={30} sx={{color:'gray'}}>Completed Appointments</Typography>
        <Typography fontSize={50} sx={{color:'gray'}}>{comCount}</Typography>
      </Paper>
      <Paper sx={{ textAlign: 'center', height: {md:'20vh',xs:'30vh'}, padding: '10px' }}>
        <Typography fontSize={30} sx={{color:'gray'}}>No-show Appointments</Typography>
        <Typography fontSize={50} sx={{color:'gray'}}>{showOffCount}</Typography>
      </Paper>
    </Box>}
      

    </Box>
  );
};

export default DoctorAppointmentStackedBarChart;
