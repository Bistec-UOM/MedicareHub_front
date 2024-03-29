import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { LineChart, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis, Label } from "recharts";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(name,peratten, attendance,reason) {
  return { name,peratten, attendance,reason };
}

const rows = [
  createData('chamath','80%', 159 ,12),
  createData('kasun','90%', 237 ,5),
  createData('wimal','94%', 262 ,12),
  createData('kanchana','98%', 305 ,2),
  createData('manula','100%', 356 ,0),
];

const AOther = () => {
    return (
        <div>
              <Typography sx={{textAlign:'center',fontWeight:'bolder',fontSize:'20px'}}>Attendance of Staff</Typography>
            <Paper sx={{margin:'20px'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center' sx={{ fontWeight: 'bold' }}>Name </TableCell>
          <TableCell align='center' sx={{ fontWeight: 'bold' }}>Attendance(%)</TableCell>
          <TableCell align="center" sx={{ fontWeight: 'bold' }}>Attendance</TableCell>
          <TableCell align="center" sx={{ fontWeight: 'bold' }}>Reasonable Leaves</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center' component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.attendance}</TableCell>
              <TableCell align="center">{row.peratten}</TableCell>
              <TableCell align="center">{row.reason}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>
        </div>
    );
}

export default AOther;
