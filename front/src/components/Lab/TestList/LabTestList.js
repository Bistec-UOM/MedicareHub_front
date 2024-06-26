import { Paper, Toolbar, Typography,InputBase,Divider,IconButton, Button,Box, Snackbar, Alert } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from "@mui/icons-material/Search";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TestDialogBox from './TestDialogBox';
import CloseIcon from "@mui/icons-material/Close";
import axios from 'axios'
import { baseURL,endPoints} from '../../../Services/Lab';
import { Load } from '../../Other';
import AddIcon from '@mui/icons-material/Add';
import { SearchBarLR } from '../../Common';
import theme from '../../Style';
import { setHeaders } from '../../../Services/Auth';

export default function LabTestList({setPage,settId,Tload,setTload}) {

    // SnackBar component====================================================================================
    const [open1, setOpen1] = useState(false);
    const [msg,setMsg] = useState('')
    const [col,setCol] = useState('')

    const handleClick1 = (msg,col) => {
      setMsg(msg)
      setCol(col)
      setOpen1(true)
    };
  
    const handleClose1 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen1(false);
    }


    //Pop up dialog box========================================================================
    const [open, setOpen] = useState(false)
    const handleClickOpen = (x) => {
        setOpen(true)
        settId(x)
        let t= Tload.filter((e)=>{return e.id===x})
        setTest(t[0])
    }
    const handleClose = () => {setOpen(false)}  

    const [test,setTest]=useState()
    //----------------------------------------------------------------------------

    const [query, setQuery] = useState('')//searchbar value

    const [loading,setLoading]=useState(true)
    //const [Tload,setTload]=useState([])
    const filteredData = Tload.filter(item => item.testName.toLowerCase().includes(query.toLowerCase()))//filtered Rload data by the search

    useEffect(()=>{
        axios.get(baseURL+endPoints.TEST,setHeaders())
        .then(res=>{
          setTload(res.data)
          setLoading(false)
        })
        .catch(er=>{
          console.log(er)
          setLoading(false)
        })
    },[Tload,setTload])

  return (
    <div>
        <Toolbar 
          sx={{
            width:{xs:'100%',sm:'70%'},
            justifyContent:'space-between',
            position:'fixed',
            backgroundColor:'white',
            pt:{xs:'10px'}
            }}
        >
            <ArrowBackIcon sx={{cursor:'pointer'}} onClick={()=>setPage(1)}></ArrowBackIcon>

            {/*-------Search bar--------------- */}
            <SearchBarLR placeholder="Search tests" onChange={(e)=>setQuery(e.target.value)} value={query}></SearchBarLR>

            {/*-------Add new button--------------- */}
            <Button size='small' 
              variant='contained' 
              onClick={()=>setPage(3)} 
            sx={{mr:{xs:'5px',sm:'10%'}}} 
            endIcon={<AddIcon/>}
            >New</Button>

        </Toolbar>


        {loading?<div style={{paddingTop:'60px'}}>
          <Load></Load>
        </div>:''}
        {!loading?<Stack sx={{paddingTop:{xs:'60px',sm:'80px'},paddingLeft:{xs:'5%',sm:'8%'}}}>
            {
                filteredData.map((el)=>{
                    return(
                    <Paper testId={el.id} sx={{display:'flex',width:{xs:'95%',sm:'80%'},justifyContent:'space-between',cursor:'pointer',padding:{xs:1,sm:2},borderRadius:'12px',mb:'10px'}} 
                    onClick={()=>handleClickOpen(el.id)}>
                        <Typography sx={{fontSize:'16px',flex:{xs:3,sm:2}}}>{el.testName}</Typography>
                        <Typography sx={{fontSize:'16px',flex:{xs:2,sm:1}}}>{el.provider}</Typography>
                        <Typography sx={{fontSize:'16px',flex:{xs:1,sm:1}, textAlign:'right'}}>Rs.{' '+el.price}</Typography>
                    </Paper>
                    )
                })
            }
        </Stack>:''
        }

      {/*------------------ Enter values pop up box ---------------------------------------------- */}

      <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{backgroundColor:theme.palette.custom.greenH,display: "flex",justifyContent: "space-between",color:'white'}}>
            <Typography sx={{fontSize:'18px'}}>Edit test</Typography>
          <CloseIcon onClick={handleClose} sx={{cursor:'pointer'}} />
          </DialogTitle>
       <TestDialogBox test={test} setPage={setPage} setTload={setTload} handleClose={handleClose} handleClick1={handleClick1}></TestDialogBox>
      </Dialog>


    {/* ----------------- snack bar ----------------------------------------------------------------*/}
    <Snackbar open={open1} autoHideDuration={2000} onClose={handleClose1}>
        <Alert
          onClose={handleClose1}
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
