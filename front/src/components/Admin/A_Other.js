import { Grid, Paper, Typography,Box,Button } from '@mui/material';
import React from 'react';
import { LineChart, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis, Label } from "recharts";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

const AOther = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7205/api/Analytic/users')
      .then(response => {
        console.log(response.data);
        setRows(response.data); 
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const HandleSearch = (id) => {
    console.log("Search ID: " + id + ", Date: " + date);
}
const [date, setDate] = useState(null);
  const rolekey = ['Doctor','Receptionist','Pharmacist','Lab Assistant','Cashier']; 
    return (
        <div>
              <Typography sx={{textAlign:'center',fontWeight:'bolder',fontSize:'20px'}}>Attendance of Staff</Typography>
            <Paper sx={{margin:'20px'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center' sx={{ fontWeight: 'bold' }}>Name </TableCell>
            <TableCell align='center' sx={{ fontWeight: 'bold' }}>Date</TableCell>
          <TableCell align='center' sx={{ fontWeight: 'bold' }}>Attendance</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {rolekey.map((role) => (
          <>
            <TableRow>
              <TableCell align='center' colSpan={3} sx={{backgroundColor:'rgb(244, 244, 244)'}}>{role}</TableCell>
            </TableRow>
            {rows.filter(item=>item.role === role).map((item) => (
              <TableRow key={item.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align='center' component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align='center' component="th" scope="row">
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateField']}>
                      <DateField label="Enter Date" format="YYYY-MM" size='small' value={date} onChange={(newValue) => setDate(newValue)} />                      </DemoContainer>
                    </LocalizationProvider>
                    <Button variant="contained" onClick={() => HandleSearch(item.id)} sx={{width:"40px",height:'30px',marginLeft:5}}>Find</Button>                  </Box>
                </TableCell>
                <TableCell align="center" component="th" scope="row">{item.count}</TableCell>
              </TableRow>
            ))}
          </>
        ))}
        </TableBody>
      </Table>
      </Paper>
        </div>
    );
}

export default AOther;