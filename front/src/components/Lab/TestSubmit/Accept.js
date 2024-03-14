import { Button, Paper, Typography,Card,Box} from '@mui/material'
import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Accept({req,reqOK,setAccLoad,accLoad,RLoad,setRLoad}) {

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

  const [ok,setok]=useState(true)

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

  const addToAcc=(x)=>{
    handleClick()
    req.load.map((i)=>{
        if(i.repId==x){
           setAccLoad([...accLoad,i]) 
        }
      })
    remTest(x)
  }

  return (
    <div>
       { reqOK?<Card sx={{width:'100%',height:'30px',pl:'35px',height:'50px',pt:'20px',position:'fixed',zIndex:'10'}} square>
            <Typography>{req.name}</Typography>
        </Card>:''
      }

        <Box sx={{width:'100%',padding:'40px',paddingTop:'90px'}}>
        {reqOK?<Typography sx={{fontSize:'16px'}}>Accept samples & payments</Typography>:''}
        {
            req.load.map((i)=>{
                return <Paper sx={{width:'70%',display:'flex',justifyContent:'space-between',alignItems:'center',mt:'10px',p:'10px'}}>
                <Box>
                    <Typography sx={{fontSize:'18px'}}>{i.test}</Typography>
                    <Typography sx={{fontSize:'15px'}}>taoken No:{i.repId}</Typography>
                    <Typography sx={{fontSize:'22px'}}>{i.test=='FBC'?'Rs. 1200':i.test=='Lipid'?'Rs. 1390':'Rs.1340'}</Typography>
                </Box>
                <Button variant='contained' onClick={()=>addToAcc(i.repId)}>Accept</Button>
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
