import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';

const TotalPatientCount = ({count}) => {
    return (
        <div>
            
                       
              <Paper style={{textAlign:'center', padding:"6%",height:'30vh'}} >
                <Typography fontSize={20}>Patient count within today</Typography>
                <Typography fontSize={90}>{count? count:'0'}</Typography>
              </Paper>
         
        </div>
    );
}

export default TotalPatientCount;
