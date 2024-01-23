import React, { useEffect } from 'react'
import {SidebarContainer,SidebarTop,SidebarList} from '../components/sidebar/Sidebar'
import { CustomScroll } from '../components/CustomScroll';
import Navbar from '../components/navbar/Navbar'
import { Grid,Card, Typography } from '@mui/material'
import { Sideunit_Patient } from '../components/sidebar/Sideunits';

export default function Pharmacy() {

  useEffect(()=>{
    document.body.style.margin = '0';

   },[]) 
  
  return (
    <CustomScroll>
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
     
      </Grid>


    </Grid>

  </CustomScroll>
  )
}


