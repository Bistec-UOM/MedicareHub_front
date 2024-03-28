import { Paper, Typography, InputBase, IconButton, Divider, Toolbar,Stack, Dialog, DialogTitle, Snackbar, Alert} from '@mui/material'
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Testcom from './Testcom';
import axios from 'axios';
import { baseURL, endPoints } from '../../../../Services/Lab';
import { Load } from '../../../Other';


export default function SubmitPage({setpage}) {

  
    // SnackBar component====================================================================================
    //----- for submit test result successfully
    const [open1, setOpen1] = React.useState(false);

    const handleClick1 = () => {
      setOpen1(true);
    };
  
    const handleClose1 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen1(false);
    }
    //======================================================================================================

    //Pop up dialog box------------------------------------------------------------
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

            {/*-------Search bar------------------------------------ */}
            <Paper component="form" 
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                height:'30px',
                width:{xs:'40%',sm:'40%'},
                borderRadius: "10px",
                boxShadow: 1,
                mr:'300px'
                }}
            >
            <InputBase type="text" className="form-control" sx={{ flex: 1 }} placeholder="Search"/>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            </Paper>  

        </Toolbar>

      {/*------------------ List of accepted samples ---------------------------------------------- */}

        <Stack sx={{paddingTop:{xs:'60px',sm:'80px'},paddingLeft:{xs:'5%',sm:'8%'}}}>
        {loadOK?<Load></Load>:''}
        {
            load.map((i,ind)=>{
                return <Paper sx={{width:'70%',display:'flex',justifyContent:'space-between',alignItems:'center',mt:'10px',p:'10px',cursor:'pointer'}} onClick={()=>handleClickOpen(i.id)}>
                    <Typography sx={{fontSize:'12px',flex:'1',color:'grey'}}>{ind+1}</Typography>
                    <Typography sx={{fontSize:'15px',flex:'1'}}>{i.id}</Typography>
                    <Typography sx={{fontSize:'15px',flex:'1'}}>{i.abb}</Typography>
                    <Typography sx={{fontSize:'15px',flex:'2'}}>{i.testName}</Typography>
            </Paper>
            })
        }
        </Stack>

      {/*------------------ Enter values pop up box ---------------------------------------------- */}

      <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{backgroundColor: "rgb(222, 244, 242)",display: "flex",justifyContent: "space-between"}}>
            <Typography sx={{fontSize:'16px'}}>Enter test results</Typography>
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
