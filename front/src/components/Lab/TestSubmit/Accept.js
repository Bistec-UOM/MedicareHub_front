import { Button, Paper, Typography,Card,Box} from '@mui/material'
import React from 'react'

export default function Accept({req,setAccLoad,accLoad}) {

  const addToAcc=(x)=>{

  }

  return (
    <div>
        <Card sx={{width:'100%',height:'30px',pl:'35px',height:'50px',pt:'20px',position:'fixed',zIndex:'10'}} square>
            <Typography>{req.name}</Typography>
        </Card>


        <Box sx={{width:'100%',padding:'40px',paddingTop:'90px'}}>
        <Typography sx={{fontSize:'16px'}}>Accept samples & payments</Typography>
        {
            req.load.map((i)=>{
                return <Paper sx={{width:'70%',display:'flex',justifyContent:'space-between',alignItems:'center',mt:'10px',p:'10px'}}>
                <Box>
                    <Typography sx={{fontSize:'18px'}}>{i.test}</Typography>
                    <Typography sx={{fontSize:'15px'}}>Token no: 24</Typography>
                    <Typography sx={{fontSize:'22px'}}>Rs. 1200</Typography>
                </Box>
                <Button variant='contained' onClick={()=>addToAcc()}>Accept</Button>
            </Paper>
            })
        }
    
        </Box>
    </div>
  )
}
