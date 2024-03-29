import { Grid, Paper, Typography } from '@mui/material';
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
function createData(name,peratten, attendance,reason) {
  return { name,peratten, attendance,reason };
}

// const rows = [
//   createData('chamath','80%', 159 ,12),
//   createData('kasun','90%', 237 ,5),
//   createData('wimal','94%', 262 ,12),
//   createData('kanchana','98%', 305 ,2),
//   createData('manula','100%', 356 ,0),
// ];

const AOther = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7205/api/Analytic/attendance')
      .then(response => {
        console.log(response.data);
        setRows(response.data); 
      })
      .catch(error => {
        console.error(error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>
              <Typography sx={{textAlign:'center',fontWeight:'bolder',fontSize:'20px'}}>Attendance of Staff</Typography>
            <Paper sx={{margin:'20px'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center' sx={{ fontWeight: 'bold' }}>Name </TableCell>
          <TableCell align='center' sx={{ fontWeight: 'bold' }}>Attendance</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        
        <TableRow>
          <TableCell align='center' colSpan={2} sx={{backgroundColor:'rgb(244, 244, 244)'}}>Doctor</TableCell>
          </TableRow>
  {rows.map((row) => (
    row.d_at.map((item) => (
      <TableRow
        key={item.doctName}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell align='center' component="th" scope="row">
          {item.doctName}
        </TableCell>
        <TableCell align="center">{item.count}</TableCell>

      </TableRow>
    ))
  ))}
<TableRow>
          <TableCell align='center' colSpan={2} sx={{backgroundColor:'rgb(244, 244, 244)'}}>Lab Assistant</TableCell>
          </TableRow>
  {rows.map((row) => (
    row.l_at.map((item) => (
      <TableRow
        key={item.labAstName}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell align='center' component="th" scope="row">
          {item.labAstName}
        </TableCell>
        <TableCell align="center">{item.count}</TableCell>

      </TableRow>
    ))
  ))}

<TableRow>
          <TableCell align='center' colSpan={2} sx={{backgroundColor:'rgb(244, 244, 244)'}}>Receptionist</TableCell>
          </TableRow>
  {rows.map((row) => (
    row.r_at.map((item) => (
      <TableRow
        key={item.recepName}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell align='center' component="th" scope="row">
          {item.recepName}
        </TableCell>
        <TableCell align="center">{item.count}</TableCell>

      </TableRow>
    ))
  ))}
          <TableRow>
          <TableCell align='center' colSpan={2} sx={{backgroundColor:'rgb(244, 244, 244)'}}>Cashiers</TableCell>
          </TableRow>
  {rows.map((row) => (
    row.c_at.map((item) => (
      <TableRow
        key={item.cashierName}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell align='center' component="th" scope="row">
          {item.cashierName}
        </TableCell>
        <TableCell align="center">{item.count}</TableCell>

      </TableRow>
    ))
  ))}
</TableBody>
      </Table>
      </Paper>
        </div>
    );
}

export default AOther;
