import React, { useEffect, useState } from 'react'
import SideDrawer from '../components/recepcomponents/sidedrawer/SideDrawer'
import { Box, fontSize } from '@mui/system'
import { Button, Divider, Paper, TextField, Typography,Snackbar,Alert } from '@mui/material'
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useNavigate } from 'react-router-dom'

export default function Log() {
  const navigate=useNavigate()

  // SnackBar component====================================================================================
  const [open, setOpen] = React.useState(false);
  const [msg,setMsg]=useState('Init')
  const [col,setCol]=useState('Primary')

  const handleClick = (x,c) => {
    setOpen(true);
    setMsg(x)
    setCol(c)
  };
    
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const usar=[
    '123','4567','2839','4840','8409'
  ]
  //======================================================================================================

  const validate=()=>{
    if(password=="" || user==""){
      handleClick("Fill the empty fields",'warning')
      return
    }
    if(user>5){
      setTimeout(() => {
        handleClick("Invalid user",'error')
      }, 2500);
      return
    }
    if(password!=usar[user-1]){
      setTimeout(() => {
        handleClick("Wrong password",'error')
      }, 2500);
      return
    }else{
      setTimeout(() => {
        navigate('admin')
      }, 2500);
    }
  }

  const setData=()=>{
    validate()
  }

  const clearData=()=>{
    setUser("")
    setPassword("")
  }
  const [password,setPassword]=useState("")
  const [user,setUser]=useState("")

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


        {/* ----------------- snack bar ----------------------------------------------------------------*/}
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} >
        <Alert
          onClose={handleClose}
          severity={col}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </Box>
  )
}
