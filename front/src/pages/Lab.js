import { Grid, Toolbar, Typography, Paper } from '@mui/material'
import React, { useEffect } from 'react'
import {SidebarContainer,SidebarTop,SidebarList} from '../components/sidebar/Sidebar'
import {Sideunit_Doctor} from '../components/sidebar/Sideunits'
import SearchIcon from '@mui/icons-material/Search';
import { CustomScroll } from '../components/CustomScroll';
import Navbar from '../components/navbar/Navbar'

export default function Lab() {

  const data=[
    {'name':'Amal Rathnayaka','title':'MBBS, MD, MRCP(UK)'},
    {'name':'Bimasara Herath','title':'MBBS, MD, MRCP(UK), PRCP-E'},
    {'name':'Tharushi Fernando','title':'MBBS, MD'},
    {'name':'Infas Mohomad','title':'MBBS, FCGP(SL), MD-CH(UK), MBS-CH(UK), C.ht(USA)'}
 ] 

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
             <Toolbar>
               <SearchIcon></SearchIcon>
               <Paper sx={{width:'150px',height:'20px'}}>Search here</Paper>
             </Toolbar>
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


//backup code
/* {
<CustomScroll>
<Navbar></Navbar>
<Grid container spacing={0} sx={{paddingTop:'64px',height:'100vh'}}>
  <Grid item xs={3} style={{height:'100%',backgroundColor:'gray'}}>
    <SidebarContainer>
      <SidebarTop>
        <Toolbar>
          <SearchIcon></SearchIcon>
          <Paper sx={{width:'150px',height:'20px'}}>Search here</Paper>
        </Toolbar>
      </SidebarTop>
      <SidebarList>
        {data.map(el=>{
          return(
            <Sideunit_Doctor name={el.name} title={el.title}></Sideunit_Doctor>
          )
        })}
        {data.map(el=>{
          return(
            <Sideunit_Doctor name={el.name} title={el.title}></Sideunit_Doctor>
          )
        })}

      </SidebarList>
    </SidebarContainer>
  </Grid>
  <Grid item xs={9} style={{height:'100%',overflowY:'scroll',backgroundColor:'yellow'}}>

  </Grid>
</Grid>
</CustomScroll>
} */