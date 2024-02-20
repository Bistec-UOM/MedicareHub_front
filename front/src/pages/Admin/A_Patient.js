import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { LineChart, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis, Label } from "recharts";

const pdata = [
  { datefor: "1999.10.20", patients: 20 },
  { datefor: "1990.10.21", patients: 4},
  { datefor: "1990.10.22", patients: 3},
  { datefor: "1990.10.23", patients: 1},
  { datefor: "1990.10.24", patients: 50 },
  { datefor: "1990.10.25", patients: 3},
  { datefor: "1990.10.24", patients: 50 }
];

const APatient = () => {
    return (
        <div>
          <Typography fontSize={25} fontWeight={10} sx={{textAlign:'center'}}>Patient</Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Paper style={{textAlign:'center',height:'35vh', paddingTop:"6%"}} >
                <Typography fontSize={30}>patient count within day</Typography>
                <Typography fontSize={90}>{pdata[0].patients}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper sx={{padding:'30px'}}>
              <Typography fontSize={20} sx={{textAlign:'center'}}>patient count within a time period</Typography>
                <ResponsiveContainer aspect={2}>
                  <LineChart data={pdata} style={{ padding: '0px'}} >
                    <XAxis dataKey="datefor" interval={"preserveStartEnd"} >
                      <Label value="Date" position="insideBottom" offset={-5} />
                    </XAxis>
                    <YAxis >
                      <Label value="patients" angle={-90} position="insideLeft" offset={-1}/>
                    </YAxis>
                    {/* <Legend /> */}
                    <Tooltip />
                    <Line dataKey="patients" name="Patients" stroke="green" activeDot={{ r: 6 }} type="monotone" />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </div>
      );
}

export default APatient;
