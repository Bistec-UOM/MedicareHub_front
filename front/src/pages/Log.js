import React from 'react'
import SideDrawer from '../components/recepcomponents/sidedrawer/SideDrawer'
import { Box } from '@mui/system'
import { Button, TextField, Typography } from '@mui/material'

export default function Log() {
  return (
    <Box sx={{height:'100vh',display:'flex',justifyContent:'center'}}>
      <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',padding:'10px'}}>
        <Typography>User login</Typography>
        <TextField sx={{mt:'20px',mb:'20px'}} id="1" label="User Id" type="text" autoComplete="current-password"/>
        <TextField sx={{mt:'20px',mb:'20px'}} id="2" label="Password" type="password" autoComplete="current-password"/>
        <div style={{display:'flex',flexDirection:'row-reverse'}}>
          <Button variant="contained" sx={{ml:'5px'}}>Clear</Button>
          <Button variant="contained" sx={{ml:'5px'}}>OK</Button>
        </div>
      </Box>
    </Box>
  )
}
