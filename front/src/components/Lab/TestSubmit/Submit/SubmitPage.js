import { Paper, Typography, InputBase, IconButton, Divider, Toolbar,Stack, Dialog, DialogTitle, Snackbar, Alert} from '@mui/material'
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Testcom from './Testcom';
import axios from 'axios';
import { baseURL, endPoints } from '../../../../Services/Lab';
import { Load } from '../../../Other';
import ScienceIcon from '@mui/icons-material/Science';

export default function SubmitPage({setpage}) {

    // SnackBar component====================================================================================
    const [open1, setOpen1] = React.useState(false);

    const handleClick1 = (x) => {
      setOpen1(true);
      let tmp=load.filter((el)=>{return el.id!==x})
      setLoad(tmp)
    };
  
    const handleClose1 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen1(false);
    }


    //Pop up dialog box===========================================================================
    const [open, setOpen] = useState(false)
    const handleClickOpen = (x) => {
        let t= load.filter((e)=>{return e.id===x})
        settest(t); 
        setOpen(true)
    }
    const handleClose = () => {setOpen(false)}  

    //----------------------------------------------------------------------------

    const [test,settest]=useState(0)//selected test (out of accepted tests)
    const [load,setLoad]=useState([])
    const [loadOK,setLoadOk]=useState(true)

    useEffect(()=>{
      if(loadOK){
        axios.get(baseURL+endPoints.GET_ACCEPT)
      .then((res)=>{
        setLoad(res.data)
        setLoadOk(false)
      })
      .catch((er)=>{
        console.log(er.message)
      })
      }
    },[loadOK])

  return (
    <div>

          <Toolbar sx={{width:{xs:'100%',sm:'70%'},justifyContent:'space-between',position:'fixed',backgroundColor:'white',pt:{xs:'10px'}}}>
            <ArrowBackIcon sx={{cursor:'pointer'}} onClick={()=>setpage(1)}></ArrowBackIcon>    

          </Toolbar>

      {/*------------------ List of accepted samples ---------------------------------------------- */}

        <Stack sx={{paddingTop:{xs:'40px',sm:'60px'},paddingLeft:{xs:'5%',sm:'8%'}}}>
        {loadOK?<Load></Load>:''}
        {
            load.map((i,ind)=>{
                return <Paper 
                          sx={{
                            width:'70%',
                            display:'flex',
                            justifyContent:'space-between',
                            alignItems:'center',
                            mt:'10px',
                            p:'10px',
                            cursor:'pointer',
                            borderRadius:'0px'
                            }} 
                          onClick={()=>handleClickOpen(i.id)}
                        >
                    <div style={{flex:'1'}}>
                      <Typography sx={{fontSize:'15px',color:'#ffffff',fontWeight:'bold',flex:'1',display:'inline',backgroundColor:'#568a91',pl:'10px',pr:'10px',pt:'2px',pb:'2px',borderRadius:'4px'}}>{i.id}</Typography>
                    </div>
                    <Typography sx={{fontSize:'15px',flex:'3'}}>{`${i.abb} (${i.testName})`}</Typography>
            </Paper>
            })
        }
        </Stack>

      {/*------------------ Enter values pop up box ---------------------------------------------- */}

      <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{display: "flex",justifyContent: "space-between", backgroundColor:'#438ad1',color:'white'}}>
            <div style={{display:'flex',justifyContent:'start'}}>
              <ScienceIcon></ScienceIcon>
              <Typography sx={{fontSize:'18px',fontWeight:'medium'}}>Enter test results</Typography>
            </div>
          <CloseIcon onClick={handleClose} sx={{cursor:'pointer'}} />
          </DialogTitle>
      <Testcom handleClose={handleClose} handleClick1={handleClick1} test={test} settest={settest}></Testcom>
      </Dialog>
        
    {/* ----------------- snack bar ----------------------------------------------------------------*/}
    <Snackbar open={open1} autoHideDuration={2000} onClose={handleClose1}>
        <Alert
          onClose={handleClose1}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Results added successfuly
        </Alert>
    </Snackbar>
    </div>
  )
}
