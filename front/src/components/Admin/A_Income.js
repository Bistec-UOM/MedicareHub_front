import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Label, Area, Tooltip } from 'recharts';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import IncomeOfDay from './AnalyticsComponents.js/IncomeOfDay';
import SuccessNotification from '../recepcomponents/SnackBar/SuccessNotification';
import { baseURL, endPoints } from '../../Services/Admin';

const AIncome = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notiMessage, setNotiMessage] = useState('');
  const [typenoti, settypenoti] = useState('success');
  const [Value, setValue] = useState('week');
  const [pdata, setPdata] = useState([]);
  const [TimeGap, setTimeGap] = useState(new Date());

  useEffect(() => {
    axios.get(baseURL + endPoints.A_income)
      .then(response => {
        console.log(response.data);
        setPdata(response.data);
      })
      .catch(err => {
        if (err.message === 'Network Error') {
          console.error('You are not connected to the internet');
          setNotiMessage('You are not connected to the internet');
          settypenoti('error');
          setNotificationOpen(true);
        } else {
          console.error(err);
        }
      });
  }, []);

  useEffect(() => {
    const changeTimeGap = (Gap) => {
      const currentDate = new Date();
      if (Gap === 'week') {
        const weekAgo = new Date(currentDate);
        weekAgo.setDate(currentDate.getDate() - 7);
        setTimeGap(weekAgo);
      } else if (Gap === 'month') {
        const monthAgo = new Date(currentDate);
        monthAgo.setMonth(currentDate.getMonth() - 1);
        setTimeGap(monthAgo);
      } else if (Gap === 'year') {
        const yearAgo = new Date(currentDate);
        yearAgo.setFullYear(currentDate.getFullYear() - 1);
        setTimeGap(yearAgo);
      } else if (Gap === '5') {
        const fiveYearsAgo = new Date(currentDate);
        fiveYearsAgo.setFullYear(currentDate.getFullYear() - 5);
        setTimeGap(fiveYearsAgo);
      }
    };
    changeTimeGap(Value);
  }, [Value]);

  const filteredData = pdata.filter(entry => {
    const entryDate = new Date(entry.datefor);
    return entryDate >= TimeGap && entryDate <= new Date();
  });

  var today = new Date();
  today.setHours(0, 0, 0, 0); // set time to 00:00:00.000
  
  const totalIncome = pdata.reduce((total, entry) => {
    const entryDate = new Date(entry.datefor);
    entryDate.setHours(0, 0, 0, 0); // set time to 00:00:00.000
  
    // If the entry date is today, add the entry's income to the total
    if (entryDate.getTime() === today.getTime()) {
      return total + entry.income;
    }
  
    // Otherwise, return the total as is
    return total;
  }, 0); // Start with a total of 0

  
  const tickFormatter = (value) => {
    const date = new Date(value);
    return date.toLocaleDateString();
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <Grid container spacing={3} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
        <Grid item xs={12} sm={4}>
          <IncomeOfDay totalIncome={totalIncome} />
        </Grid>
        <Grid item xs={12} sm={8} style={{ textAlign: 'right' }}>
          <Paper sx={{ padding: '10px' }}>
            <Typography fontSize={30} sx={{ textAlign: 'center' }}>Income</Typography>
            <FormControl sx={{ width: { xs: '40%', sm: '20%' } }}>
              <InputLabel>Gap</InputLabel>
              <Select
                style={{ textAlign: 'left' }}
                id="demo-simple-select"
                value={Value}
                label="Gap"
                onChange={handleChange}
              >
                <MenuItem value={'week'}>Last week</MenuItem>
                <MenuItem value={'month'}>Last Month</MenuItem>
                <MenuItem value={'year'}>Last Year</MenuItem>
                <MenuItem value={'5'}>Last 5 Year</MenuItem>
              </Select>
            </FormControl>
            <ResponsiveContainer aspect={2}>
              <AreaChart data={filteredData}>
                <XAxis
                  dataKey="datefor"
                  tickFormatter={tickFormatter}
                  fontSize={10}
                >
                  <Label value="Date" position="insideBottom" offset={-5} />
                </XAxis>
                <YAxis>
                  <Label value="Income" angle={-90} position="insideLeft" offset={1} />
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
};

export default AIncome;
