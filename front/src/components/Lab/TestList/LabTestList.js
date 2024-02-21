import { Paper, Toolbar, Typography,InputBase,Divider,IconButton, Button } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from "@mui/icons-material/Search";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TestDialogBox from './TestDialogBox';
import CloseIcon from "@mui/icons-material/Close";

export default function LabTestList({setPage,settId,Tdata}) {

    //Pop up dialog box------------------------------------------------------------
    const [open, setOpen] = useState(false)
    const handleClickOpen = (x) => {
        setOpen(true)
        settId(x)
        let t= Tdata.filter((e)=>{return e.id==x})
        setTest(t[0])
    }
    const handleClose = () => {setOpen(false)}  

    const [test,setTest]=useState()
    //----------------------------------------------------------------------------

  return (
    <div>
        <Toolbar sx={{width:{xs:'100%',sm:'70%'},justifyContent:'space-between',position:'fixed',backgroundColor:'white',pt:{xs:'10px'}}}>
            <ArrowBackIcon sx={{cursor:'pointer'}} onClick={()=>setPage(1)}></ArrowBackIcon>

            {/*-------Search bar--------------- */}
            <Paper component="form" sx={{p: "2px 4px",display: "flex",alignItems: "center",height:'30px',width:{xs:'40%',sm:'40%'},borderRadius: "20px",boxShadow: 1}}>
            <InputBase type="text" className="form-control" sx={{ flex: 1 }} placeholder="Search"/>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            </Paper>  

            {/*-------Add new button--------------- */}
            <Button size='small' variant='contained' onClick={()=>setPage(3)} sx={{mr:{xs:'5px',sm:'10%'}}} >Add new</Button>
            
        </Toolbar>

        <Stack sx={{paddingTop:{xs:'60px',sm:'80px'},paddingLeft:{xs:'5%',sm:'8%'}}}>
            {
                Tdata.map((el)=>{
                    return(
                    <Paper sx={{display:'flex',width:{xs:'95%',sm:'80%'},justifyContent:'space-between',cursor:'pointer',padding:{xs:1,sm:2},borderRadius:'12px',mb:'10px'}} 
                    onClick={()=>handleClickOpen(el.id)}>
                        <Typography sx={{fontSize:'16px',flex:{xs:3,sm:1}}}>{el.name}</Typography>
                        <Typography sx={{fontSize:'16px',flex:{xs:2,sm:1}}}>{el.provider}</Typography>
                        <Typography sx={{fontSize:'16px',flex:{xs:1,sm:1}, textAlign:'right'}}>{el.price}</Typography>
                    </Paper>
                    )
                })
            }
        </Stack>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{backgroundColor: "rgb(222, 244, 242)",display: "flex",justifyContent: "space-between"}}>
            Edit test
          <CloseIcon onClick={handleClose} sx={{cursor:'pointer'}} />
          </DialogTitle>
       <TestDialogBox test={test} setPage={setPage}></TestDialogBox>
      </Dialog>

    </div>
  )
}