import React from 'react';
import { Grid, Paper, Table, TableRow, Typography } from '@mui/material';
import { LineChart, ResponsiveContainer, Tooltip, Line, XAxis, YAxis, Label } from "recharts";

const pdata = [
  { datefor: "1999.10.20", amountOfUsed: 2500, drugType: 'folic' },
  { datefor: "1990.10.21", amountOfUsed: 400, drugType: 'b12' },
  { datefor: "1990.10.22", amountOfUsed: 300, drugType: 'seretonin' },
  { datefor: "1990.10.23", amountOfUsed: 100, drugType: 'digin' },
  { datefor: "1990.10.24", amountOfUsed: 5000, drugType: 'sulbuitimol' },
  { datefor: "1990.10.25", amountOfUsed: 300, drugType: 'amoxilin' }
];

const ADrugs = () => {
  // Find the drug with the maximum amountOfUsed
  const mostUsedDrug = pdata.reduce((max, current) => max.amountOfUsed > current.amountOfUsed ? max : current, pdata[0]);

  return (
    <div>
      <Typography fontSize={25} fontWeight={10} sx={{ textAlign: 'center' }}>Drugs</Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper style={{ textAlign: 'center', height: '35vh', paddingTop: "6%" }} >
            <Typography fontSize={30}>Most Used Drug</Typography>
            {/* Display the name of the most used drug */}
            <Typography fontSize={40}>{mostUsedDrug.drugType}</Typography>
            <Typography fontSize={30}>{mostUsedDrug.amountOfUsed}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ padding: '30px' }}>
            <ResponsiveContainer aspect={2}>
              <LineChart data={pdata} style={{ padding: '0px' }} >
                <XAxis dataKey="datefor" interval={"preserveStartEnd"} >
                  <Label value="Date" position="insideBottom" offset={-5} />
                </XAxis>
                <YAxis >
                  <Label value="amountOfUsed" angle={-90} position="insideLeft" offset={2} />
                </YAxis>
                <Tooltip />
                <Line dataKey="amountOfUsed" name="Used Amount" stroke="green" activeDot={{ r: 6 }} type="monotone" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

    </div>
  );
}

export default ADrugs;
