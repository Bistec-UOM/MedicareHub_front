import React, { useEffect } from 'react'
import {SidebarContainer,SidebarTop,SidebarList} from '../components/sidebar/Sidebar'

import Navbar from '../components/navbar/Navbar'
import { Grid,Card, Typography, CardContent } from '@mui/material'
import { Sideunit_Patient } from '../components/sidebar/Sideunits';



export default function Pharmacy() {
  
  const data =[{name:"Dhammika Mahendra Wijesingha",age:"36",gender:"male"},
];

  useEffect(()=>{
    document.body.style.margin = '0';

   },[]) 
  
  return (
    <div>
    <Navbar></Navbar>

    <Grid container spacing={0} sx={{paddingTop:'64px',height:'100vh'}}>
      <Grid item xs={3} style={{height:'100%'}}>
        <SidebarContainer>
          <SidebarTop>

          </SidebarTop>
          <SidebarList>
            
          </SidebarList>
        </SidebarContainer>
      </Grid>

      <Grid item xs={9} style={{height:'100%',overflowY:'scroll'}}>
        <div>
          {data.map((patientdata, id) => (
      <Card  key={id} sx={{ minWidth: 275 }}>
        <CardContent>
         <div> <Typography gutterBottom variant='h6'>{patientdata.name}</Typography></div>
          <div><Typography gutterBottom variant='20px' sx={{color:"#8E8B8B"}}>{patientdata.age} years</Typography></div>
          <div><Typography gutterBottom variant='20px'sx={{color:"#8E8B8B"}}>{patientdata.gender}</Typography></div>
        </CardContent>
      </Card>
          ))}
      </div>

      </Grid>


    </Grid>

  </div>
  )
}


