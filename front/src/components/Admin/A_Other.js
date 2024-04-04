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
import SearchGraph from './AnalyticsComponents.js/SearchGraph';

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

const labReportTypes = labReports.flatMap(data => data.reports);
const uniqueLabReportTypes = labReportTypes.reduce((unique, item) =>
  unique.some(report => report.name === item.name) ? unique : [...unique, item], []);

  //const date
  const currentDate = new Date();
  const [selectedLabReport, setSelectedLabReport] = useState(null);
  const [Value, setValue] = React.useState('month'); // Initialize Value state with 'day'
  const selectLabReportType = (value) => {
    setSelectedLabReport(value);
  }

  const initialTimeGap = new Date();
  initialTimeGap.setDate(currentDate.getDate() - 30);
  const [TimeGap, setTimeGap] = React.useState(initialTimeGap);

  const handleChange = (event) => {
    setValue(event.target.value);
    const newDate = new Date(currentDate);
    if (event.target.value === 'month') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else if (event.target.value === 'year') {
      newDate.setFullYear(currentDate.getFullYear() - 1);
    }
    setTimeGap(newDate);
  }

  const filteredData = labReports.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= TimeGap && entryDate <= currentDate;
  });

const TestData = selectedLabReport?
  filteredData.flatMap(data => 
  data.reports
    .filter(type => type.name === selectedLabReport.name)
    .map(type=>({
      ...type,
      date:data.date
    }))
    ):[];
const labReportCounter = filteredData.flatMap(data => data.reports);
useEffect(() => {
  const freqMap = labReportCounter.reduce((map, report) => {
    map[report.name] = (map[report.name] || 0) + report.count;
  return map;
}, {});



});
let graph = {
  x: 'date',
  y: 'count',
  var:'select a type'
};



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
     <SearchGraph uniqueModelTypes={uniqueLabReportTypes} selectModelType={selectLabReportType} Value={Value} handleChange={handleChange} ModelData={TestData} graph={graph}></SearchGraph>
     </Paper>
      <SuccessNotification setNotificationOpen={setNotificationOpen} notiMessage={notiMessage} notificationOpen={notificationOpen} type={typenoti}></SuccessNotification>
    </div>
  );
}

export default AOther;