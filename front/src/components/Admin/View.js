import { Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';    
import IncomeOfDay from './AnalyticsComponents.js/IncomeOfDay';
import TotalPatientCount from './AnalyticsComponents.js/TotalPatientCount';

const View = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            setTime('morning');
        } else if (currentHour < 17) {
            setTime('afternoon');
        } else if (currentHour < 20) {
            setTime('evening');
        } else {
            setTime('night');
        }
    }, []);

    return (
        <div>
            <Paper sx={{paddingLeft:4}}>
                <h1>Good {time}, Yasiru!</h1>
            </Paper>

                <Grid item xs={12} md={6}>
                    <IncomeOfDay  />
                </Grid>
                <br/>
                    <TotalPatientCount></TotalPatientCount>
        </div>
    );
}

export default View;