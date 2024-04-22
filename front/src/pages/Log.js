import React, { useEffect, useState } from 'react'
import { Box} from '@mui/system'
import { Button,TextField, Typography,Snackbar,Alert, Link } from '@mui/material'
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseURL,deleteLog,endPoints } from '../Services/Auth';
import { jwtDecode } from "jwt-decode";
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';

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

  //======================================================================================================

  const [count,setCount]=useState(0)

  const setData=()=>{
    if(password==="" || user===""){
      handleClick("Fill the empty fields",'warning')
      return
    }
    let obj={
      UserId:user,
      Password:password
    }
    deleteLog()
    setLoadingB(true)
    axios.post(baseURL+endPoints.LOG,obj)
    .then((res)=>{
      localStorage.setItem('medicareHubToken', res.data)
      //Navigate User
      let tmp=jwtDecode(localStorage.getItem('medicareHubToken')).Role
      switch(tmp){
        case 'Admin':navigate('admin');break
        case 'Doctor':navigate('doct'); break
        case 'Receptionist':navigate('res'); break
        case 'Cashier':navigate('pharm'); break
        case 'Lab Assistant':navigate('lab'); break
      }
      setLoadingB(false)
    })
    .catch((er)=>{
      if(er.hasOwnProperty('response')){
        if(count<=2){//allow only three errors
          setCount((prev)=>prev+1)
          handleClick(er.response.data,'error')
        }else{
          handleClick('Forgot Password? Try Reset','warning')
          setCount(0)
        }
        setLoadingB(false)
      }else{
        console.log(er)
        setLoadingB(false)
      }
    })
  }

  const clearData=()=>{
    setUser("")
    setPassword("")
  }
  const [password,setPassword]=useState("")
  const [user,setUser]=useState("")

  useEffect(()=>{
    document.body.style.margin = '0';
    deleteLog()
   },[])

   const [loadingB, setLoadingB] = useState(false)//Loading button states

  return (
    <Box 
      sx={{
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        backgroundImage:'linear-gradient(to bottom,#DEF4F2, #DEF4F2 30%, white 30%, white)'
        }}
    >

      <Box sx={{position:'fixed',mt:'5vh'}}>
        <LocalHospitalIcon sx={{color:'red',mt:'10px'}} fontSize='large'></LocalHospitalIcon>
        <Typography sx={{fontSize:'40px',display:'inline',color:'#09D636'}}>Medicare</Typography>
        <Typography sx={{fontSize:'40px',display:'inline',color:'#AFDCB9'}}>Hub</Typography>
      </Box>

      <Box 
        sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-evenly',
          padding:'10px',
          pr:'30px',
          pl:'30px', 
          backgroundColor:'white',
          height:'200px',
          alignSelf:'center',
          border:'1px solid lightgrey'
          }}
      >
        <Typography sx={{fontSize:'20px',alignSelf:'center',backgroundColor:'white'}}>User login</Typography>

        <TextField size="small" sx={{mt:'5px',mb:'10px'}} id="1" label="User Id" type="text" autoComplete="current-password" onChange={(e)=>setUser(e.target.value)} value={user}/>
        <TextField size="small" sx={{mt:'5px',mb:'10px'}} id="2" label="Password" type="password" autoComplete="current-password" onChange={(e)=>setPassword(e.target.value)} value={password}/>

        <div style={{display:'flex',flexDirection:'row-reverse',alignItems:'center'}}>
          <LoadingButton           
            size="small"
            endIcon={<LoginIcon />}
            loading={loadingB}
            loadingPosition="end"
            variant="contained" onClick={setData} 
            sx={{ml:'5px'}}
            >Log</LoadingButton>
          <Button 
            variant="outlined" 
            sx={{ml:'5px'}} 
            onClick={clearData} 
            color='warning'
            size="small"
            >Clear</Button>
          <Link href="#" variant="body2" sx={{mr:'20%',color:'grey',textDecorationColor:'grey'}}>Reset</Link>
        </div>
        
      </Box>


        {/* ----------------- snack bar ----------------------------------------------------------------*/}
        <Snackbar           
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          sx={{mt:'100px'}}
          open={open} autoHideDuration={2000} onClose={handleClose} 
        >
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
