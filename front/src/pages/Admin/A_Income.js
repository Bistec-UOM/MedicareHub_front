import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { LineChart, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis, Label } from "recharts";

const pdata = [
  { datefor: "1999.10.20", income: 2500.00 },
  { datefor: "1990.10.21", income: 400.00 },
  { datefor: "1990.10.22", income: 300.00 },
  { datefor: "1990.10.23", income: 100.00 },
  { datefor: "1990.10.24", income: 5000.00 },
  { datefor: "1990.10.25", income: 300.00 },
  { datefor: "1990.10.24", income: 5030.00 }
];

const AIncome = () => {
  return (
    <div>
      <Typography fontSize={25} fontWeight={10} sx={{textAlign:'center'}}>Income</Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper style={{textAlign:'center',height:'35vh', paddingTop:"6%"}} >
            <Typography fontSize={30}>Income of day</Typography>
            <Typography fontSize={90}>{pdata[0].income.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{padding:'30px'}}>
            <Typography fontSize={20} sx={{textAlign:'center'}}>income of time</Typography>
            <ResponsiveContainer aspect={2}>
              <LineChart data={pdata} style={{ padding: '0px'}} >
                <XAxis dataKey="datefor" interval={"preserveStartEnd"} >
                  <Label value="Date" position="insideBottom" offset={-5} />
                </XAxis>
                <YAxis >
                  <Label value="Income" angle={-90} position="insideLeft" offset={-1}/>
                </YAxis>
                {/* <Legend /> */}
                <Tooltip />
                <Line dataKey="income" name="Income" stroke="green" activeDot={{ r: 6 }} type="monotone" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default AIncome;
