import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { LineChart, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis, Label } from "recharts";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(name, attendance) {
  return { name, attendance };
}

const rows = [
  createData('chamath', 159),
  createData('kasun', 237),
  createData('wimal', 262),
  createData('kanchana', 305),
  createData('manula', 356),
];

const AOther = () => {
    return (
        <div>
            <Paper sx={{margin:'20px',boxShadow:5}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name </TableCell>
            <TableCell align="right">Attendance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.attendance}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>
        </div>
    );
}

export default AOther;
