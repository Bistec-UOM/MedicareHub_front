import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Label, Area, Tooltip } from 'recharts';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const pdata = [
  { datefor: "2022.05.17 10:30:00", income: 250.00 },
  { datefor: "2022.07.01 11:45:00", income: 200.00 },
  { datefor: "2022.09.17 14:20:00", income: 2500.00 },
  { datefor: "2022.11.18 15:30:00", income: 400.00 },
  { datefor: "2022.12.19 12:00:00", income: 300.00 },
  { datefor: "2023.01.21 16:45:00", income: 100.00 },
  { datefor: "2023.02.22 09:00:00", income: 5000.00 },
  { datefor: "2023.02.25 09:15:00", income: 2500.00 },
  { datefor: "2023.09.02 17:20:00", income: 300.00 },
  { datefor: "2023.09.05 06:19:00", income: 130.00 },
  { datefor: "2023.09.08 16:21:00", income: 130.00 },
  { datefor: "2023.09.09 16:21:00", income: 30.00 },
  { datefor: "2023.09.10 08:00:00", income: 500.00 },
  { datefor: "2023.09.11 14:30:00", income: 700.00 },
  { datefor: "2023.09.12 12:45:00", income: 900.00 },
  { datefor: "2023.09.13 16:00:00", income: 1200.00 },
  { datefor: "2023.09.14 09:30:00", income: 800.00 },
  { datefor: "2023.09.15 11:20:00", income: 450.00 },
  { datefor: "2023.09.16 13:45:00", income: 600.00 },
  { datefor: "2023.09.17 16:10:00", income: 300.00 },
  { datefor: "2023.09.18 10:00:00", income: 150.00 },
  { datefor: "2023.09.19 14:45:00", income: 200.00 },
  { datefor: "2023.09.20 17:30:00", income: 350.00 },
  { datefor: "2023.09.21 09:15:00", income: 500.00 },
  { datefor: "2023.09.22 14:20:00", income: 250.00 },
  { datefor: "2023.09.23 15:30:00", income: 400.00 },
  { datefor: "2023.09.24 12:00:00", income: 300.00 },
  { datefor: "2023.09.25 16:45:00", income: 100.00 },
  { datefor: "2023.09.26 09:00:00", income: 5000.00 },
  { datefor: "2023.09.27 09:15:00", income: 2500.00 },
  { datefor: "2023.09.28 17:20:00", income: 300.00 },
  { datefor: "2023.09.29 06:19:00", income: 130.00 },
  { datefor: "2023.09.30 16:21:00", income: 130.00 },
  { datefor: "2023.09.31 16:21:00", income: 30.00 },
  { datefor: "2023.10.01 16:22:00", income: 5030.00 },
  { datefor: "2023.10.02 16:24:00", income: 5130.00 },
  { datefor: "2023.10.03 16:25:00", income: 5030.00 },
  { datefor: "2023.10.04 16:26:00", income: 5130.00 },
  { datefor: "2023.10.05 17:26:00", income: 5130.00 },
  { datefor: "2023.10.06 10:30:00", income: 600.00 },
  { datefor: "2023.10.07 12:45:00", income: 1000.00 },
  { datefor: "2023.10.08 14:20:00", income: 250.00 },
  { datefor: "2023.10.09 15:30:00", income: 400.00 },
  { datefor: "2023.10.10 12:00:00", income: 300.00 },
  { datefor: "2023.10.11 16:45:00", income: 100.00 },
  { datefor: "2023.10.12 09:00:00", income: 5000.00 },
  { datefor: "2023.10.13 09:15:00", income: 2500.00 },
  { datefor: "2023.10.14 17:20:00", income: 300.00 },
  { datefor: "2023.10.15 06:19:00", income: 130.00 },
  { datefor: "2023.10.16 16:21:00", income: 130.00 },
  { datefor: "2023.10.17 16:21:00", income: 30.00 },
  { datefor: "2023.10.18 16:22:00", income: 5030.00 },
  { datefor: "2023.10.19 16:24:00", income: 5130.00 },
  { datefor: "2023.10.20 16:25:00", income: 5030.00 },
  { datefor: "2023.10.21 16:26:00", income: 5130.00 },
  { datefor: "2023.10.22 17:26:00", income: 5130.00 },
  { datefor: "2023.10.23 10:30:00", income: 600.00 },
  { datefor: "2023.10.24 12:45:00", income: 1000.00 },
  { datefor: "2023.10.25 14:20:00", income: 250.00 },
  { datefor: "2023.10.26 15:30:00", income: 400.00 },
  { datefor: "2023.10.27 12:00:00", income: 300.00 },
  { datefor: "2023.10.28 16:45:00", income: 100.00 },
  { datefor: "2023.10.29 09:00:00", income: 5000.00 },
  { datefor: "2023.10.30 09:15:00", income: 2500.00 },
  { datefor: "2023.11.02 17:20:00", income: 300.00 },
  { datefor: "2023.11.05 06:19:00", income: 130.00 },
  { datefor: "2023.11.08 16:21:00", income: 130.00 },
  { datefor: "2023.11.09 16:21:00", income: 30.00 },
  { datefor: "2023.11.10 16:22:00", income: 5030.00 },
  { datefor: "2023.11.11 16:24:00", income: 5130.00 },
  { datefor: "2023.11.12 16:25:00", income: 5030.00 },
  { datefor: "2023.11.13 16:26:00", income: 5130.00 },
  { datefor: "2023.11.14 17:26:00", income: 5130.00 },
  { datefor: "2023.11.15 10:30:00", income: 600.00 },
  { datefor: "2023.11.16 12:45:00", income: 1000.00 },
  { datefor: "2023.11.17 14:20:00", income: 250.00 },
  { datefor: "2023.11.18 15:30:00", income: 400.00 },
  { datefor: "2023.11.19 12:00:00", income: 300.00 },
  { datefor: "2023.11.20 16:45:00", income: 100.00 },
  { datefor: "2023.11.21 09:00:00", income: 5000.00 },
  { datefor: "2023.11.22 09:15:00", income: 2500.00 },
  { datefor: "2023.11.23 17:20:00", income: 300.00 },
  { datefor: "2023.11.26 06:19:00", income: 130.00 },
  { datefor: "2023.11.28 16:21:00", income: 130.00 },
  { datefor: "2023.11.29 16:21:00", income: 30.00 },
  { datefor: "2023.11.30 16:22:00", income: 5030.00 },
  { datefor: "2023.11.31 16:24:00", income: 5130.00 },
  { datefor: "2023.12.01 16:25:00", income: 5030.00 },
  { datefor: "2023.12.02 16:26:00", income: 5130.00 },
  { datefor: "2023.12.03 17:26:00", income: 5130.00 },
  { datefor: "2023.12.04 10:30:00", income: 600.00 },
  { datefor: "2023.12.05 12:45:00", income: 1000.00 },
  { datefor: "2023.12.06 14:20:00", income: 250.00 },
  { datefor: "2023.12.07 15:30:00", income: 400.00 },
  { datefor: "2023.12.08 12:00:00", income: 300.00 },
  { datefor: "2023.12.09 16:45:00", income: 100.00 },
  { datefor: "2023.12.10 09:00:00", income: 5000.00 },
  { datefor: "2023.12.11 09:15:00", income: 2500.00 },
  { datefor: "2023.12.12 17:20:00", income: 300.00 },
  { datefor: "2023.12.13 06:19:00", income: 130.00 },
  { datefor: "2023.12.14 16:21:00", income: 130.00 },
  { datefor: "2023.12.15 16:21:00", income: 30.00 },
  { datefor: "2023.12.16 16:22:00", income: 5030.00 },
  { datefor: "2023.12.17 16:24:00", income: 5130.00 },
  { datefor: "2023.12.18 16:25:00", income: 5030.00 },
  { datefor: "2023.12.19 16:26:00", income: 5130.00 },
  { datefor: "2023.12.20 17:26:00", income: 5130.00 },
  { datefor: "2023.12.21 10:30:00", income: 600.00 },
  { datefor: "2023.12.22 12:45:00", income: 1000.00 },
  { datefor: "2023.12.23 14:20:00", income: 250.00 },
  { datefor: "2023.12.24 15:30:00", income: 400.00 },
  { datefor: "2023.12.25 12:00:00", income: 300.00 },
  { datefor: "2023.12.26 16:45:00", income: 100.00 },
  { datefor: "2023.12.27 09:00:00", income: 5000.00 },
  { datefor: "2023.12.28 09:15:00", income: 2500.00 },
  { datefor: "2023.12.29 17:20:00", income: 300.00 },
  { datefor: "2023.12.30 06:19:00", income: 130.00 },
  { datefor: "2024.01.01 16:21:00", income: 130.00 },
  { datefor: "2024.01.02 16:21:00", income: 30.00 },
  { datefor: "2024.01.03 16:22:00", income: 5030.00 },
  { datefor: "2024.01.04 16:24:00", income: 5130.00 },
  { datefor: "2024.01.05 16:25:00", income: 5030.00 },
  { datefor: "2024.01.06 16:26:00", income: 5130.00 },
  { datefor: "2024.01.07 17:26:00", income: 5130.00 },
  { datefor: "2024.01.08 10:30:00", income: 600.00 },
  { datefor: "2024.01.09 12:45:00", income: 1000.00 },
  { datefor: "2024.01.10 14:20:00", income: 250.00 },
  { datefor: "2024.01.11 15:30:00", income: 400.00 },
  { datefor: "2024.01.12 12:00:00", income: 300.00 },
  { datefor: "2024.01.13 16:45:00", income: 100.00 },
  { datefor: "2024.01.14 09:00:00", income: 5000.00 },
  { datefor: "2024.01.15 09:15:00", income: 2500.00 },
  { datefor: "2024.01.16 17:20:00", income: 300.00 },
  { datefor: "2024.01.17 06:19:00", income: 130.00 },
  { datefor: "2024.01.18 16:21:00", income: 130.00 },
  { datefor: "2024.01.19 16:21:00", income: 30.00 },
  { datefor: "2024.01.20 16:22:00", income: 5030.00 },
  { datefor: "2024.01.21 16:24:00", income: 5130.00 },
  { datefor: "2024.01.22 16:25:00", income: 5030.00 },
  { datefor: "2024.01.23 16:26:00", income: 5130.00 },
  { datefor: "2024.01.24 17:26:00", income: 5130.00 },
  { datefor: "2024.01.25 10:30:00", income: 600.00 },
  { datefor: "2024.01.26 12:45:00", income: 1000.00 },
  { datefor: "2024.01.27 14:20:00", income: 250.00 },
  { datefor: "2024.01.28 15:30:00", income: 400.00 },
  { datefor: "2024.01.29 12:00:00", income: 300.00 },
  { datefor: "2024.01.30 16:45:00", income: 100.00 },
  { datefor: "2024.01.31 09:00:00", income: 5000.00 },
  { datefor: "2024.02.01 09:15:00", income: 2500.00 },
  { datefor: "2024.02.02 17:20:00", income: 300.00 },
  { datefor: "2024.02.03 06:19:00", income: 130.00 },
  { datefor: "2024.02.04 16:21:00", income: 130.00 },
  { datefor: "2024.02.05 16:21:00", income: 30.00 },
  { datefor: "2024.02.06 16:22:00", income: 5030.00 },
  { datefor: "2024.02.07 16:24:00", income: 5130.00 },
  { datefor: "2024.02.08 16:25:00", income: 5030.00 },
  { datefor: "2024.02.09 16:26:00", income: 5130.00 },
  { datefor: "2024.02.10 17:26:00", income: 5130.00 },
  { datefor: "2024.02.11 10:30:00", income: 600.00 },
  { datefor: "2024.02.12 12:45:00", income: 1000.00 },
  { datefor: "2024.02.13 14:20:00", income: 250.00 },
  { datefor: "2024.02.14 15:30:00", income: 400.00 },
  { datefor: "2024.02.15 12:00:00", income: 300.00 },
  { datefor: "2024.02.16 16:45:00", income: 100.00 },
  { datefor: "2024.02.17 09:00:00", income: 5000.00 },
  { datefor: "2024.02.18 09:15:00", income: 2500.00 },
  { datefor: "2024.02.19 17:20:00", income: 300.00 },
  { datefor: "2024.02.20 06:19:00", income: 130.00 },
  { datefor: "2024.02.21 16:21:00", income: 130.00 },
  { datefor: "2024.02.22 16:21:00", income: 30.00 },
  { datefor: "2024.02.23 16:22:00", income: 5030.00 },
  { datefor: "2024.02.24 16:24:00", income: 5130.00 },
  { datefor: "2024.02.25 16:25:00", income: 5030.00 },
  { datefor: "2024.02.26 16:26:00", income: 5130.00 },
  { datefor: "2024.02.27 17:26:00", income: 5130.00 },
  { datefor: "2024.02.28 10:30:00", income: 600.00 },
  { datefor: "2024.02.29 12:45:00", income: 1000.00 },
  { datefor: "2024.02.30 14:20:00", income: 250.00 },
  { datefor: "2024.02.31 15:30:00", income: 400.00 },
  { datefor: "2024.03.01 12:00:00", income: 300.00 },
  { datefor: "2024.03.02 16:45:00", income: 100.00 },
  { datefor: "2024.03.03 09:00:00", income: 5000.00 },
  { datefor: "2024.03.04 09:15:00", income: 2500.00 },
  { datefor: "2024.03.05 17:20:00", income: 300.00 },
  { datefor: "2024.03.06 06:19:00", income: 130.00 },
  { datefor: "2024.03.07 16:21:00", income: 130.00 },
  { datefor: "2024.03.08 16:21:00", income: 30.00 },
  { datefor: "2024.03.09 16:22:00", income: 5030.00 },
  { datefor: "2024.03.13 16:24:00", income: 5130.00 },
  { datefor: "2024.03.13 16:25:00", income: 5030.00 },
  { datefor: "2024.03.13 16:26:00", income: 5130.00 },
  { datefor: "2024.03.13 17:26:00", income: 5130.00 },
  { datefor: "2024.03.13 10:30:00", income: 600.00 },
  { datefor: "2024.03.13 12:45:00", income: 1000.00 },
  { datefor: "2024.03.13 14:20:00", income: 250.00 },
  { datefor: "2024.03.13 15:30:00", income: 400.00 },
  { datefor: "2024.03.13 12:00:00", income: 300.00 },
  { datefor: "2024.03.13 16:45:00", income: 100.00 },
  { datefor: "2024.03.13 09:00:00", income: 5000.00 },
  { datefor: "2024.03.13 09:15:00", income: 2500.00 },
  { datefor: "2024.03.13 17:20:00", income: 300.00 },
  { datefor: "2024.03.13 06:19:00", income: 130.00 },
  { datefor: "2024.03.13 16:21:00", income: 130.00 },
  { datefor: "2024.03.13 16:21:00", income: 30.00 },
  { datefor: "2024.03.13 16:22:00", income: 5030.00 },
  { datefor: "2024.03.13 16:24:00", income: 5130.00 },
  { datefor: "2024.03.13 16:25:00", income: 5030.00 },
  { datefor: "2024.03.13 16:26:00", income: 5130.00 },
  { datefor: "2024.03.13 17:26:00", income: 5130.00 },
];

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
