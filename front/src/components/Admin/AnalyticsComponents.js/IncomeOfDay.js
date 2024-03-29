import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';


const IncomeOfDay = ({ totalIncome }) => {
    return (
        <Grid item xs={4}>
        <Paper style={{textAlign:'center',height:'35vh', paddingTop:"6%"}} >
          <Typography fontSize={30}>Income of day</Typography>
          <br></br>
          <Typography fontSize={50}>{totalIncome.toFixed(2)}</Typography>
        </Paper>
        
      </Grid>
    );
}

export default IncomeOfDay;
