import React from 'react';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import SuccessNotification from '../recepcomponents/SnackBar/SuccessNotification';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';import { useState,useEffect } from 'react';
import { Grid, Paper,MenuItem,InputLabel,Select,FormControl, Typography,TableCell,TableRow,TableHead,TableBody,Table, Box } from '@mui/material';
import { AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Label, Area } from "recharts";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { Button } from '@mui/material';
import { baseURL, endPoints } from '../../Services/Admin';

const AOther = () => {
  
  const [notificationOpen,setNotificationOpen]=useState(false);
  const [notiMessage,setNotiMessage]=useState("");
  const [typenoti, settypenoti] = useState('success');


  const [rows, setRows] = useState([]);
  const [date, setDate] = useState(null); 


  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  
  const HandleSearch = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Months are zero-based
    setYear(year);
    setMonth(month);
  }
  //for attendance
  useEffect(() => {
    if (year && month) {
      axios.get(baseURL+endPoints.A_Attendance+`${year}-${month}`)
        .then(response => {
          console.log(response.data);
          setRows(response.data);
          // Add a date field to each item
        })
        .catch(error => {
          if (error.message === 'Network Error') { 
            console.error('You are not connected to internet');
            setNotiMessage("You are not connected to internet");
            settypenoti('error')
            setNotificationOpen(true);
        } else {
          console.error(error);
        }
        });
    }
  }, [year, month]);

  const rolekey = ['Doctor','Receptionist','Lab Assistant','Cashier']; 



//for lab reports
const [labReports, setLabReports] = useState([]);

useEffect(() => {
  axios.get(baseURL+endPoints.A_LabReports)
    .then(response => {
      console.log(response.data);
      setLabReports(response.data);
    })
    .catch(error => {
      if (error.message === 'Network Error') { 
        console.error('You are not connected to the internet');
        // Handle error notification or logging
      } else {
        console.error(error);
        // Handle other errors
      }
    });
}, []);

// Extract test names from labReports
const testNames = labReports.map(report => report.testName);




  return (
    <div>
      <Typography sx={{textAlign:'center',fontWeight:'bolder',fontSize:'20px'}}>Attendance of Staff</Typography>
      <Paper sx={{margin:'20px'}}>
        <Grid>
          <Box display="flex" justifyContent="center" alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField label="Enter Date" format="YYYY-MM" size='small' value={date} onChange={(newValue) => {
                setDate(newValue); // Update the date state
              }} />
            </LocalizationProvider>
            <Button variant="contained" onClick={() => HandleSearch(date)} sx={{marginLeft:5,paddingLeft:5,paddingRight:5,padding:1}}>Find <PlayArrowIcon sx={{marginLeft:1}}></PlayArrowIcon></Button>
          
          </Box>
        </Grid>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>Name </TableCell>
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
                      {item.date}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">{item.count}</TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </Paper>
     <Paper>

     <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={testNames}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Test Name" />}
    />
     </Paper>
      <SuccessNotification setNotificationOpen={setNotificationOpen} notiMessage={notiMessage} notificationOpen={notificationOpen} type={typenoti}></SuccessNotification>
    </div>
  );
}

export default AOther;