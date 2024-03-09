import React, { useEffect, useState } from 'react'
import SideDrawer from '../components/recepcomponents/sidedrawer/SideDrawer'
import { Box, fontSize } from '@mui/system'
import { Button, Divider, Paper, TextField, Typography } from '@mui/material'
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";


export default function Log() {

  const validate=()=>{

  }

  const setData=()=>{
    console.log(password+' '+user)
  }

  const clearData=()=>{
    setUser("")
    setPassword("")
  }
  const [password,setPassword]=useState()
  const [user,setUser]=useState()

  useEffect(()=>{
    document.body.style.margin = '0';
   },[])

  return (
    <Box sx={{height:'100vh',display:'flex',justifyContent:'center',backgroundImage:'linear-gradient(to bottom,#DEF4F2, #DEF4F2 30%, white 30%, white)'}}>

      <Box sx={{position:'fixed',mt:'5vh'}}>
        <LocalHospitalIcon sx={{color:'red',mt:'10px'}} fontSize='large'></LocalHospitalIcon>
        <Typography sx={{fontSize:'40px',display:'inline',color:'#09D636'}}>Medicare</Typography>
        <Typography sx={{fontSize:'40px',display:'inline',color:'#AFDCB9'}}>Hub</Typography>
      </Box>

      <Box sx={{display:'flex',flexDirection:'column',justifyContent:'space-evenly',padding:'10px',pr:'5%',pl:'5%', backgroundColor:'white',height:'200px',alignSelf:'center',borderRadius:'8px',border:'1px solid lightgrey'}}>
        <Typography sx={{fontSize:'20px',alignSelf:'center',backgroundColor:'white',p:'10px'}}>User login</Typography>

        <TextField size="small" sx={{mt:'10px',mb:'10px'}} id="1" label="User Id" type="text" autoComplete="current-password" onChange={(e)=>setUser(e.target.value)} value={user}/>
        <TextField size="small" sx={{mt:'10px',mb:'10px'}} id="2" label="Password" type="password" autoComplete="current-password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
        <div style={{display:'flex',flexDirection:'row-reverse',alignItems:'center'}}>
          <Button variant="contained" sx={{ml:'5px'}} onClick={setData}>OK</Button>
          <Button variant="outlined" sx={{ml:'5px'}} onClick={clearData} color='warning'>Clear</Button>
        </div>
      </Box>
    </Box>
  )
}
