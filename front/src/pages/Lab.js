import { Grid,Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {SidebarContainer,SidebarTop,SidebarList} from '../components/sidebar/Sidebar'
import { CustomScroll } from '../components/CustomScroll';
import Navbar from '../components/navbar/Navbar'
import { Sideunit_Test } from '../components/sidebar/Sideunits';

export default function Lab() {

  let x=[
    {id:1,"name": "John Doe", "test": ['Thyroxin']},
    {id:2,"name": "Jane Smith", "test":['FBC','Thyroxin']},
    {id:3,"name": "Bob Johnson", "test": ['FBC']}
   ]

 useEffect(()=>{
  document.body.style.margin = '0';
  setLoadIn(x)
 },[])

 const [select,setSelect]=useState(null)
 const [loadIn,setLoadIn]=useState([])

 function showSelect(id){
  const matchingItem = loadIn.find(item => item.id === id);
  return matchingItem ? matchingItem.name : null;
 }


  return (
   <CustomScroll>
     <Navbar></Navbar>
     <Grid container spacing={0} sx={{paddingTop:'64px',height:'100vh'}}>
       <Grid item xs={3} style={{height:'100%'}}>
         <SidebarContainer>
           <SidebarTop>
           </SidebarTop>
           <SidebarList>
           {
              loadIn.map((elm)=>{
                 return(<Sideunit_Test key={elm.id} id={elm.id} name={elm.name} test={elm.test} setSelect={setSelect}></Sideunit_Test>)
              })
            }
           </SidebarList>
         </SidebarContainer>
       </Grid>

       <Grid item xs={9} style={{height:'100%',overflowY:'scroll'}}>
            {
              select ? 
              <Card sx={{width:'100%',height:'30px'}}>
                <Typography variant='h6'>{
                  showSelect(select)
                }</Typography>
              </Card>
              : ''
            }
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