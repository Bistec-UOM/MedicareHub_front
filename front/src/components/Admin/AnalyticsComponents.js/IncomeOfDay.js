import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';

const IncomeOfDay = ({ totalIncome }) => {
    return (
        <Grid>
        <Paper style={{textAlign:'center',height:'30vh', paddingTop:"6%"}} >
          <Typography sx={{ textAlign: "center", fontWeight: "bolder", fontSize: "30px" }} >Income of day</Typography>
          <br></br>
          <Typography fontSize={50}>{totalIncome ? totalIncome.toFixed(2) : '0.00'}</Typography>
        </Paper>
        
      </Grid>
    );
}

export default IncomeOfDay;