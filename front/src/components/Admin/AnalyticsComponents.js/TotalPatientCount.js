import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';

const TotalPatientCount = ({count}) => {
    return (
        <div>
            
                       
              <Paper style={{textAlign:'center', padding:"6%"}} >
                <Typography fontSize={20}>Patient count within today</Typography>
                <Typography fontSize={90}>{count}</Typography>
              </Paper>
         
        </div>
    );
}

export default TotalPatientCount;
