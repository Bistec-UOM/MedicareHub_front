import React from 'react'
import {Card, Typography,Box,Button} from '@mui/material'

export default function SubmitPage({report}) {
  return (
    <div>
        <Card sx={{width:'100%',height:'30px',pl:'35px',height:'50px',pt:'20px',position:'fixed',zIndex:'10'}} square>
            <Typography>{report.name}</Typography>
        </Card>
        <Box sx={{width:'100%',padding:'40px',paddingTop:'90px'}}>

    
        </Box>
    </div>
  )
}
