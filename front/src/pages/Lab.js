import React from 'react'
import {Grid} from "@mui/material"
import Navbar from '../components/navbar/Navbar'

export default function Lab() {

  return (    
    <div>
      <Navbar></Navbar>
       <Grid container spacing={0} sx={{paddingTop:'64px',height:'100vh'}}>
         <Grid item xs={3} style={{height:'100%'}}>
           
         </Grid>
         <Grid item xs={9} style={{height:'100%',overflowY:'scroll'}}>

         </Grid>
       </Grid>
    </div>
  )
}
