import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Card,Box,Typography} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Load=()=> {
  return (
    <div style={{display:'flex',justifyContent:'center',width:'100%'}}>
    <CircularProgress></CircularProgress>
    </div>
  )
}

const PersonDetail=({name,gender,age})=>{
return(
      <Box 
      sx={{
        width:'100%',
        pl:'40px',
        pt:'10px',
        pb:'5px',
        position:'fixed',
        zIndex:'10',
        display:'flex',
        alignItems:'baseline',
        borderBottom:'1px solid grey'
      }} square
    >
        <PersonIcon sx={{alignSelf:'end',pb:'2px'}}></PersonIcon>
        <Typography sx={{fontSize:'18px',ml:'5px'}}>{name}</Typography>
        <Typography sx={{fontSize:'20px',mr:'5px',ml:'5px'}}>|</Typography>
        <Typography sx={{fontSize:'15px',mr:'8px',color:'grey'}}>{gender}</Typography>
        <Typography sx={{color:'grey'}}>{age}</Typography>
    </Box>
)
}

export {Load,PersonDetail}