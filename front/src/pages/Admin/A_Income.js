import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Label, Area, Tooltip } from 'recharts';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const pdata = [
  { datefor: "2023.05.17 10:30:00", income: 250.00 },
  { datefor: "2024.01.07 11:45:00", income: 200.00 },
  { datefor: "2024.01.17 14:20:00", income: 2500.00 },
  { datefor: "2024.01.18 15:30:00", income: 400.00 },
  { datefor: "2024.01.19 12:00:00", income: 300.00 },
  { datefor: "2024.01.21 16:45:00", income: 100.00 },
  { datefor: "2024.01.22 09:00:00", income: 5000.00 },
  { datefor: "2024.01.25 09:15:00", income: 2500.00 },
  { datefor: "2024.02.23 17:20:00", income: 300.00 },
  { datefor: "2024.02.24 6:19:00", income: 130.00 },
  { datefor: "2024.02.24 16:21:00", income: 130.00 },
  { datefor: "2024.02.24 16:21:00", income: 30.00 },
  { datefor: "2024.02.24 16:22:00", income: 5030.00 },
  { datefor: "2024.02.24 16:24:00", income: 5130.00 },
  { datefor: "2024.02.24 16:25:00", income: 5030.00 },
  { datefor: "2024.02.24 16:26:00", income: 5130.00 },
  { datefor: "2024.02.24 17:26:00", income: 5130.00 },
];
const totalIncome = pdata.reduce((total, entry) => {
  if (entry.datefor.startsWith("2024.02.24")) {
    return total + entry.income;
  }
  return total;
}, 0);

const currentDate = new Date();
let TimeGap = new Date(currentDate);
TimeGap.setDate(currentDate.getDate() - 1);

const AIncome = () => {
  const [Value, setValue] = React.useState('day'); // Initialize Value state with 'day'
  const handleChange = (event) => {
    setValue(event.target.value);
    change(event.target.value); // Call change function with selected value
  };

  const change = (Gap) => {
    if (Gap === 'day') {
      TimeGap = new Date(currentDate); // Reset TimeGap to current date
      TimeGap.setDate(currentDate.getDate() - 1);
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
  return (
    <div>
      <Typography fontSize={25} fontWeight={10} sx={{textAlign:'center'}}>Income</Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper style={{textAlign:'center',height:'35vh', paddingTop:"6%"}} >
            <Typography fontSize={30}>Income of day</Typography>
            <br></br>
            <Typography fontSize={50}>{totalIncome.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={8} style={{textAlign:'right'}}>
          <Paper sx={{padding:'10px'}}>
            <FormControl sx={{width:'20%'}}>
              <InputLabel>Gap</InputLabel>
              <Select
                style={{textAlign:'left'}}
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
            <Typography fontSize={20} sx={{textAlign:'center'}}>Income</Typography>
            <ResponsiveContainer aspect={3} >
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
    </div>
  );
}

export default AIncome;
