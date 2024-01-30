import { Grid,Card, Typography, Paper, IconButton, Divider, InputBase } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {SidebarContainer,SidebarTop,SidebarList} from '../components/sidebar/Sidebar'
import { CustomScroll } from '../components/CustomScroll';
import Navbar from '../components/navbar/Navbar'
import { Sideunit_Test } from '../components/sidebar/Sideunits';
import LabSearch from '../components/Lab/LabSearch';
import LabTestList from '../components/Lab/LabTestList';

export default function Lab() {

  {/*to navigate between pages   1:fill test   2:test list*/}
  const [page,setPage]=useState(1)

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
       <Grid item xs={3} style={{height:'100%',backgroundColor:'#DEF4F2'}}>
         <SidebarContainer>
           <SidebarTop>
              <LabSearch setPage={setPage}></LabSearch>
           </SidebarTop>
           <SidebarList>
           {
              loadIn.map((elm)=>{
                 return(
                  <>
                   <Sideunit_Test key={elm.id} id={elm.id} name={elm.name} test={elm.test} setSelect={setSelect} selected={elm.id==select?true:''}></Sideunit_Test>
                   <div style={{borderBottom:'1px solid #c2c8d1',height:'1px',width:'90%'}}></div>
                  </>
                 )
              })
            }
           </SidebarList>
         </SidebarContainer>
       </Grid>

       <Grid item xs={9} style={{height:'100%',overflowY:'scroll'}}>
            {
              page==1?

              select ? 
              <Card sx={{width:'100%',height:'30px'}} square>
                <Typography variant='h6'>{
                  showSelect(select)
                }</Typography>
              </Card>
              : ''

              :page==2?<LabTestList></LabTestList>:''

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