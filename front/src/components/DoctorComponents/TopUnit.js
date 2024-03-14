import { Typography,Box } from '@mui/material';
import React from 'react'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function TopUnit() {

//display date
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();


 

  return (
    <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',p:'15px'}}>
      <Link to='/dpage'> <CalendarTodayIcon   sx={{cursor:'pointer'}}></CalendarTodayIcon></Link> 
        <Typography sx={{ fontWeight:'Bold',color:'grey' }}>{formattedDate}</Typography>
        <FormatListBulletedIcon sx={{cursor:'pointer'}}></FormatListBulletedIcon>
    </Box>
  )
}
