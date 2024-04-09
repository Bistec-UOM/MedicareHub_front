import { Grid, Paper,MenuItem,FormControl,InputLabel,Select, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { LineChart,BarChart,Bar, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis, Label } from "recharts";
import axios from 'axios';
import { useState } from 'react';
import TotalPatientCount from './AnalyticsComponents.js/TotalPatientCount';
import SuccessNotification from '../recepcomponents/SnackBar/SuccessNotification';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import { baseURL, endPoints } from '../../Services/Admin';

const APatient = () => {
  const [notificationOpen,setNotificationOpen]=useState(false);
  const [notiMessage,setNotiMessage]=useState("");
  const [typenoti, settypenoti] = useState('success');


  const [pdata, setPdata] = useState([]);

  useEffect(() => {
    axios.get(baseURL+endPoints.A_patient_count)
      .then(response => {
        console.log('data is ');
        console.log(response.data);
        setPdata(response.data);
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
  }, []); // Empty dependency array means this effect runs once on mount


  // const dummyData = [
  //   { datefor: "2024-03-31", child_male: 10, child_female: 15, adult_male: 20, adult_female: 25, old_male: 5, old_female: 8 },
  //   { datefor: "2024-03-30", child_male: 8, child_female: 12, adult_male: 18, adult_female: 22, old_male: 4, old_female: 6 },
  //   { datefor: "2024-03-29", child_male: 12, child_female: 18, adult_male: 22, adult_female: 28, old_male: 6, old_female: 10 },
  //   // Add more dummy data entries as needed
  // ];
  
  // Assuming you have a state variable 'pdata' to store the data
  // const [pdata, setPdata] = useState(dummyData);
  

  
  const [count, setcount] = React.useState();
  //date filter
  const currentDate = new Date(); // Initialize currentDate
  const [TimeGap, setTimeGap] = React.useState(new Date(currentDate)); // Initialize TimeGap with current date
  const [Value, setValue] = React.useState('day'); // Initialize Value state with 'day'
  const [Value1, setValue1] = React.useState('day'); // Initialize Value state with 'day'


  const handleChange = (event) => {
    setValue(event.target.value);
    // change(event.target.value); // Call change function with selected value
  };

useEffect(() => {
  const change = (Gap) => {
    const newTimeGap = new Date(currentDate);
    if (Gap === 'day') {
      newTimeGap.setDate(currentDate.getDate() - 1);
    } else if (Gap === 'month') {
      newTimeGap.setMonth(currentDate.getMonth() - 1);
    } else if (Gap === 'year') {
      newTimeGap.setFullYear(currentDate.getFullYear() - 1);
    } else if (Gap === '5') {
      newTimeGap.setFullYear(currentDate.getFullYear() - 5);
    }
    setTimeGap(newTimeGap);
  };
  change(Value);
  // change(Value1);
}, [Value]); // Run the effect whenever Value changes


  const filteredData = pdata.filter(entry => {
    const entryDate = new Date(entry.datefor);
    return entryDate >= TimeGap && entryDate <= currentDate;
  });


  const tickFormatter = (value) => {
    const date = new Date(value);
    if (Value === 'day') {
      return date.toLocaleTimeString(); // Show time only when 'Last Day' is selected
    } else {
      return date.toLocaleDateString(); // Show date for other options
    }
  };
//end of date filter

//type filter
const [Type, setType] = React.useState('child');
const [Agemale, setAgemale] = React.useState('');
const [Agefemale, setAgefemale] = React.useState('');


useEffect(() => {
  const changed = (gap) => {
    let Agemale = '';
    let Agefemale = '';
    if (gap === 'child') {
      Agemale = 'child_male';
      Agefemale = 'child_female';
    } else if (gap === 'young') {
      Agemale = 'adult_male';
      Agefemale = 'adult_female';
    } else if (gap === 'old') {
      Agemale = 'old_male';
      Agefemale = 'old_female';
    }
    setAgemale(Agemale);
    setAgefemale(Agefemale);
  };
  changed(Type);
}, [Type]);


const [TimeGap1, setTimeGap1] = React.useState(new Date(currentDate)); // Initialize TimeGap1 with current date

const handleChange1 = (event) => {
  setValue1(event.target.value);
  change1(event.target.value); // Call change1 function with selected value
};

const change1 = (Gap) => {
  const newTimeGap = new Date(currentDate);
  if (Gap === 'day') {
    newTimeGap.setDate(currentDate.getDate() - 1);
  } else if (Gap === 'month') {
    newTimeGap.setMonth(currentDate.getMonth() - 1);
  } else if (Gap === 'year') {
    newTimeGap.setFullYear(currentDate.getFullYear() - 1);
  } else if (Gap === '5') {
    newTimeGap.setFullYear(currentDate.getFullYear() - 5);
  }
  setTimeGap1(newTimeGap);
};

useEffect(() => {
  change1(Value1);
}, [Value1]); // Run the effect whenever Value1 changes

const filteredData1 = pdata.filter(entry => {
  const entryDate = new Date(entry.datefor);
  return entryDate >= TimeGap1 && entryDate <= currentDate;
});



const handletypeChange = (event) => {
  setType(event.target.value);
};


//end of type filter



  const totalperday = [];
  // let currentDate1 = new Date().toISOString().slice(0,10).replace(/-/g, '.');
  pdata.forEach((data) => {
    const date = data.datefor;
    const total = data.child_male + data.child_female + data.adult_female + data.adult_male + data.old_male + data.old_female;
    // Check if the date already exists in totalperday, if not, initialize it to 0
    if (!totalperday[date]) {
      totalperday[date] = 0;
    }
      totalperday[date] = total;
    });
// Assuming you have a state variable for totalPatientsForCurrentDay
let todaysData;
const today = new Date();
const todaydate = today.getFullYear()+'-'+(today.getMonth()+1).toString().padStart(2, '0')+'-'+today.getDate().toString().padStart(2, '0');
console.log(todaydate,'today date')
todaysData = totalperday[todaydate];
if (!todaysData) {
  todaysData = 0;
}
console.log('all data for today', todaysData)

  
  // console.log(totalperday,'current date',currentDate1,'data','total')

     const dataForChart = filteredData1.map(data => ({
      totalPatients: totalperday[data.datefor], // Add total patients for the corresponding day
      datefor : data.datefor
    }));


    return (
        <div>
          <Grid container spacing={2}>
          <Grid item xs={4}>
          <TotalPatientCount count={todaysData}></TotalPatientCount>
          </Grid>
            <Grid item xs={8}>
              <Paper sx={{padding:'10px'}}>
              <Typography fontSize={20} sx={{textAlign:'center'}}>Patient count within a time period</Typography>
                <ResponsiveContainer aspect={3} style={{textAlign:'right'}}>
                <FormControl sx={{ width: '20%',marginRight:'2vw' }}>
        <InputLabel>Gap</InputLabel>
        <Select
          style={{ textAlign: 'left' }}
          id="demo-simple-select"
          value={Value1} // Change value prop to Value
          label="Gap"
          onChange={handleChange1}
        >
          <MenuItem value={'day'}>Last Day</MenuItem>
          <MenuItem value={'month'}>Last Month</MenuItem>
          <MenuItem value={'year'}>Last Year</MenuItem>
          <MenuItem value={'5'}>Last 5 Year</MenuItem>
        </Select>
      </FormControl>
      <LineChart data={dataForChart} style={{ padding: '0px'}} >
  <XAxis dataKey="datefor" fontSize={10} interval={"preserveStartEnd"} >
    <Label value="Date" position="insideBottom" offset={-5} />
  </XAxis>
  <YAxis >
    <Label value="Patients" angle={-90} position="insideLeft" offset={4}/>
  </YAxis>
  <Tooltip />
  <Line 
    dataKey="totalPatients" 
    fill='#f4acb7' 
    name="Total Patients" 
    stroke="rgb(244, 172, 183)" 
    activeDot={{ r: 6 }} 
    type="monotone" 
    isAnimationActive={true} // Enable animation
  />
</LineChart>
                </ResponsiveContainer>
              </Paper>
  
            </Grid>
  
          </Grid>
          <Grid>
          <Paper style={{padding:'15px 5px 60px 5px',textAlign:'right',marginTop:'20px'}}>
              <Typography fontSize={20} sx={{textAlign:'center',margin:'20px'}}>Patient count within today</Typography>
              <ResponsiveContainer width="90%" height={400}>

      <FormControl sx={{ width: '20%',marginRight:'2vw' }}>
        <InputLabel>Gap</InputLabel>
        <Select
          style={{ textAlign: 'left' }}
          id="demo-simple-select"
          value={Value} // Change value prop to Value
          label="Gap"
          onChange={handleChange}
        >
          <MenuItem value={'day'}>Last Day</MenuItem>
          <MenuItem value={'month'}>Last Month</MenuItem>
          <MenuItem value={'year'}>Last Year</MenuItem>
          <MenuItem value={'5'}>Last 5 Year</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: '20%' }}>
        <InputLabel>Age</InputLabel>
        <Select
          style={{ textAlign: 'left' }}
          id="demo-simple-select"
          value={Type}
          label="Gap"
          onChange={handletypeChange}
        >
          <MenuItem value={'child'}>Child(-18)</MenuItem>
          <MenuItem value={'young'}>Adult(18-45)</MenuItem>
          <MenuItem value={'old'}>Old(45+)</MenuItem>

        </Select>
      </FormControl>
        <BarChart
          data={filteredData}
          margin={{ top: 5, right: 30, left: 20, bottom: 1 }}
        >
          <XAxis
            dataKey="datefor"
            tickFormatter={tickFormatter}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={Agemale} name={Agemale} fill="#8884d8" background={{ fill: '#eee' }}/>
          <Bar dataKey={Agefemale} fill="#82ca9d" name={Agefemale} />
        </BarChart>
      </ResponsiveContainer>

              </Paper>
          </Grid>
          <SuccessNotification setNotificationOpen={setNotificationOpen} notiMessage={notiMessage} notificationOpen={notificationOpen} type={typenoti}></SuccessNotification>
        </div>
      );
}

export default APatient;
