import { Button, Paper, Typography,Card,Box, Chip} from '@mui/material'
import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { baseURL, endPoints } from '../../../Services/Lab';
import { PersonDetail } from '../../Other';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LoadingButton from '@mui/lab/LoadingButton';
import DoneIcon from '@mui/icons-material/Done';
import theme from '../../Style';

export default function Accept({req,reqOK,RLoad,setRLoad}) {

  // SnackBar component====================================================================================
  const [open, setOpen] = useState(false);
  const [msg,setMsg] = useState('')
  const [col,setCol] = useState('')

  const handleClick = (msg,col) => {
    setMsg(msg)
    setCol(col)
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }
  //=======================================================================================================


  const remTest=(x)=>{//remove acceptes sample form req list
    let tmp=RLoad
    tmp.map((i)=>{
      if(i.id==req.id){
        let obj=i.load.filter((el)=>{
          return el.repId!=x
        })
        i.load=obj
      }
    })
    setRLoad(RLoad.filter((el)=>{
      return el.load.length!=0
    }))

  }

  const [loadingB, setLoadingB] = useState(false)//Loading button states

  //Set sample to accepted
  const AccIdSet=(id)=>{
    setLoadingB(true)
    axios.post(baseURL+endPoints.SET_ACCEPT+'?id='+id)
    .then((res)=>{
      handleClick('Sample Accepted','success')
      remTest(id)
      setLoadingB(false)
    })
    .catch((er)=>{
      handleClick('Error occured! Try again','error')  
      console.log(er)
      setLoadingB(false)
    })
  }


  return (
    <div>
       { reqOK?<PersonDetail name={req.name} gender={req.gender} age={req.age}></PersonDetail>:''}
        
        <Box sx={{width:'100%',padding:'40px',paddingTop:'70px'}}>

        {reqOK?<div style={{display:'flex',alignItems:'start'}}>
          <KeyboardArrowDownIcon sx={{color:'#3f50b5'}}></KeyboardArrowDownIcon>
          <Typography sx={{fontSize:'16px',mb:'10px',color:'gray'}}>Accept samples & payments</Typography>
        </div>:''}
        {
            req.load.map((i)=>{
                return <Paper 
                          sx={{
                            width:'70%',
                            display:'flex',
                            justifyContent:'space-between',
                            alignItems:'center',
                            mt:'10px',
                            p:'10px',
                            pr:'30px',
                            borderRadius:0
                          }} 
                          elevation={1}
                        
                        >
                <Box>
                    <Typography sx={{fontSize:'18px',mb:'5px'}}>{i.testName} Test</Typography>
                    <Typography sx={{fontSize:'15px',display:'flex',alignItems:'center'}}>
                        Token No: <Chip label={i.repId} 
                                    sx={{
                                      height:'20px',
                                      borderRadius:'5px',
                                      color:'white',
                                      backgroundColor:theme.palette.custom.Token,
                                      ml:'5px'
                                      }}
                                    ></Chip>
                    </Typography>
                    <Typography sx={{fontSize:'15px'}}>Rs. {i.price}</Typography>
                </Box>

                <LoadingButton           
                  size="small"
                  endIcon={<DoneIcon/>}
                  loading={loadingB}
                  loadingPosition="end"
                  variant="contained" onClick={()=>AccIdSet(i.repId)} 
                  sx={{ml:'5px'}}
                >Accept</LoadingButton>
            </Paper>
            })
        }
    
        </Box>



        {/* ----------------- snack bar ----------------------------------------------------------------*/}
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={col}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {msg}
        </Alert>
      </Snackbar>

    </div>
  )
}
