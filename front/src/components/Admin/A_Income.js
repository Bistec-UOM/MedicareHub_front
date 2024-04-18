import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Label, Area, Tooltip } from 'recharts';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import  { useEffect ,useState} from 'react';
import IncomeOfDay from './AnalyticsComponents.js/IncomeOfDay';
import SuccessNotification from '../recepcomponents/SnackBar/SuccessNotification';
import { baseURL, endPoints } from '../../Services/Admin';



let pdata = [];

const currentDate = new Date();
let TimeGap = new Date(currentDate);
TimeGap.setDate(currentDate.getDate() - 1);

const today = new Date();
today.setHours(0, 0, 0, 0); // set time to 00:00:00.000

const totalIncome = pdata.reduce((total, entry) => {
  const entryDate = new Date(entry.datefor);
  entryDate.setHours(0, 0, 0, 0); // set time to 00:00:00.000

  if (entryDate.getTime() === today.getTime()) {
    return total + entry.income;
  }

  return total;
}, 0);

const AIncome = () => {
  const [notificationOpen,setNotificationOpen]=useState(false);
  const [notiMessage,setNotiMessage]=useState("");
  const [typenoti, settypenoti] = useState('success');


  const [Value, setValue] = React.useState('week'); // Initialize Value state with 'day'
  const handleChange = (event) => {
    setValue(event.target.value);
    change(event.target.value); // Call change function with selected value
  };

  useEffect(() => {axios.get(baseURL+endPoints.A_income)
  .then(response => {
    console.log(response.data);
    pdata = response.data;
  })
  .catch(err => {
    if (err.message === 'Network Error') { 
      console.error('You are not connected to internet');
      setNotiMessage("You are not connected to internet");
      settypenoti('error')
      setNotificationOpen(true);
  } else {
    console.error(err);
  }
  });

    console.log("Hello world");
     
   }, []); // Empty dependency array means this effect runs once on mount

      const change = (Gap) => {
    if (Gap === 'week') {
      TimeGap = new Date(currentDate); // Reset TimeGap to current date
      TimeGap.setDate(currentDate.getDate() - 7);
    } else if (Gap === 'month') {
      TimeGap = new Date(currentDate);
      TimeGap.setMonth(currentDate.getMonth() - 1);
    } else if (Gap === 'year') {
      TimeGap = new Date(currentDate);
      TimeGap.setFullYear(currentDate.getFullYear() - 1);
    } else if (Gap === '5') {
      TimeGap = new Date(currentDate);
      TimeGap.setFullYear(currentDate.getFullYear() - 5);
    }
  };

  useEffect(() => {
    change(Value);
  }, [Value]); // Run the effect whenever Value1 changes
  

  const filteredData = pdata.filter(entry => {
    const entryDate = new Date(entry.datefor);
    return entryDate >= TimeGap && entryDate <= currentDate;
  });
  const tickFormatter = (value) => {
    const date = new Date(value);
  
      return date.toLocaleDateString(); // Show date for other options

  };
  return (
    <div>
      <Grid container spacing={3} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
        <Grid item  xs={12} sm={4}>
      <IncomeOfDay totalIncome={totalIncome} />
        </Grid>
        <Grid item xs={12} sm={8} style={{textAlign:'right'}}>
          <Paper sx={{padding:'10px'}}>
          <Typography fontSize={30} sx={{textAlign:'center'}}>Income</Typography>
            <FormControl sx={{width:{xs:'40%',sm:'20%'}}}>
              <InputLabel>Gap</InputLabel>
              <Select
                style={{textAlign:'left'}}
                id="demo-simple-select"
                value={Value} // Change value prop to Value
                label="Gap"
                onChange={handleChange}
              >
                <MenuItem value={'week'}>Last week</MenuItem>
                <MenuItem value={'month'}>Last Month</MenuItem>
                <MenuItem value={'year'}>Last Year</MenuItem>
                <MenuItem value={'5'}>Last 5 Year</MenuItem>
              </Select>
            </FormControl>
            <ResponsiveContainer aspect={2} >
              <AreaChart data={filteredData}>
                <XAxis 
                  dataKey="datefor" 
                  tickFormatter={tickFormatter} // Format the date with time
                  fontSize={10}
                >
                  <Label value="Date" position="insideBottom" offset={-5} />
                </XAxis>
                <YAxis>
                  <Label value="Income" angle={-90} position="insideLeft" offset={1}/>
                </YAxis>
                <Tooltip />
                <Area type="monotone" name='Income' dataKey="income" activeDot={{ r: 6 }} stroke="rgb(121, 204, 190)" fill="rgb(121, 204, 190)" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <SuccessNotification setNotificationOpen={setNotificationOpen} notiMessage={notiMessage} notificationOpen={notificationOpen} type={typenoti}></SuccessNotification>
    </div>
  );
}

export default AIncome;
