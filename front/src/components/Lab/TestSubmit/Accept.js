import { Button, Paper, Typography,Card,Box, Chip} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { baseURL, endPoints } from '../../../Services/Lab';
import { PersonDetail } from '../../Other';

export default function Accept({req,reqOK,RLoad,setRLoad}) {

  // SnackBar component====================================================================================
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
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

  //Set sample to accepted
  const AccIdSet=(id)=>{
    axios.post(baseURL+endPoints.SET_ACCEPT+'?id='+id)
    .then((res)=>{
      handleClick()
      remTest(id)
    })
    .catch(()=>{

    })
  }


  return (
    <div>
       { reqOK?<PersonDetail name={req.name} gender={req.gender} age={req.age}></PersonDetail>:''}
        
        <Box sx={{width:'100%',padding:'40px',paddingTop:'90px'}}>

        {reqOK?<Typography sx={{fontSize:'16px',mb:'30px',color:'gray'}}>Accept samples & payments</Typography>:''}
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
                            pr:'30px'
                          }} 
                          elevation={3}
                        
                        >
                <Box>
                    <Typography sx={{fontSize:'18px',mb:'5px'}}>{i.testName} Test</Typography>
                    <Typography sx={{fontSize:'15px',display:'flex',alignItems:'center'}}>
                        Token No: <Chip label={i.repId} 
                                    sx={{
                                      height:'20px',
                                      borderRadius:'5px',
                                      color:'white',
                                      backgroundColor:'#568a91'
                                      }}
                                    ></Chip>
                    </Typography>
                    <Typography sx={{fontSize:'15px'}}>Rs. {i.price}</Typography>
                </Box>
                <Button variant='contained' onClick={()=>AccIdSet(i.repId)}>Accept</Button>
            </Paper>
            })
        }
    
        </Box>



        {/* ----------------- snack bar ----------------------------------------------------------------*/}
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Sample accepted
        </Alert>
      </Snackbar>

    </div>
  )
}
