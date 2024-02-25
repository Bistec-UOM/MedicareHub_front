import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { LineChart, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis, Label } from "recharts";

const pdata = [
  { datefor: "1999.10.20", child_male: 12, child_female: 2, adult_male: 12, adult_female: 2, old_male: 12, old_female: 2 },
  { datefor: "1990.10.21", child_male: 12, child_female: 2, adult_male: 12, adult_female: 2, old_male: 12, old_female: 2 },
  { datefor: "1990.10.22", child_male: 12, child_female: 2, adult_male: 12, adult_female: 2, old_male: 12, old_female: 2 },
  { datefor: "1990.10.23", child_male: 12, child_female: 2, adult_male: 12, adult_female: 2, old_male: 12, old_female: 2 },
  { datefor: "1990.10.24", child_male: 12, child_female: 2, adult_male: 12, adult_female: 2, old_male: 12, old_female: 2 },
  { datefor: "1990.10.24", child_male: 12, child_female: 2, adult_male: 12, adult_female: 2, old_male: 12, old_female: 2 },
  { datefor: "1990.10.25", child_male: 12, child_female: 2, adult_male: 12, adult_female: 2, old_male: 12, old_female: 2 },
  { datefor: "1990.10.24", child_male: 12, child_female: 2, adult_male: 12, adult_female: 2, old_male: 12, old_female: 2 }
];

const APatient = () => {
    return (
        <div>
          <Typography fontSize={25} fontWeight={10} sx={{textAlign:'center'}}>Patient</Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Paper style={{textAlign:'center', paddingTop:"6%"}} >
                <Typography fontSize={30}>Patient count within day</Typography>
                <Typography fontSize={90}>{pdata[0].child_male}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper sx={{padding:'10px'}}>
              <Typography fontSize={20} sx={{textAlign:'center'}}>Patient count within a time period</Typography>
                <ResponsiveContainer aspect={3}>
                  <LineChart data={pdata} style={{ padding: '0px'}} >
                    <XAxis dataKey="datefor" fontSize={10} interval={"preserveStartEnd"} >
                      <Label value="Date" position="insideBottom" offset={-5} />
                    </XAxis>
                    <YAxis >
                      <Label value="Patients" angle={-90} position="insideLeft" offset={4}/>
                    </YAxis>
                    <Tooltip />
                    <Line dataKey="child_male" fill='#afe0d8' name="Child Male" stroke="rgb(121, 204, 190)" activeDot={{ r: 6 }} type="monotone" />
                    <Line dataKey="child_female" fill='#f4acb7' name="Child Female" stroke="rgb(244, 172, 183)" activeDot={{ r: 6 }} type="monotone" />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </div>
      );
}

export default APatient;
