import { Grid,Card, Typography, CssBaseline, Box, Drawer } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {SidebarContainer,SidebarTop,SidebarList} from '../components/sidebar/Sidebar'
import { Sideunit_Test } from '../components/sidebar/Sideunits';
import LabSearch from '../components/Lab/LabSearch';
import LabTestList from '../components/Lab/LabTestList';
import CreateLabTemplate from '../components/Lab/CreateLabTemplate';
import '../components/CustomScroll.css'
import '../components/Lab/Lab.css'
import ResNavBar from '../components/recepcomponents/ResNavBar/ResNabBar';

export default function Lab() {

  {/*to navigate between pages   1:fill test   2:test list*/}
  const [page,setPage]=useState(1)

  let x=[
    {id:1,"name": "Hande ercel", "test": ['Thyroxin']},
    {id:2,"name": "Hazal kaya", "test":['FBC','hCG']},
    {id:3,"name": "Ozge yagiz", "test": ['FBC']},
    {id:4,"name": "Ozge gurel", "test": ['BMT']},
    {id:5,"name": "Turkan sorey", "test":['HBC','Thyroxin']},
    {id:6,"name": "Saadet akzoy", "test": ['Urine']},
    {id:7,"name": "Ezgi mola", "test": ['FBC']},
    {id:8,"name": "Deniz beysal", "test":['FBC']},
    {id:9,"name": "Ozgu kaya", "test": ['FBC']},
    {id:10,"name": "Zehra yilmaz", "test": ['Lipid']},
    {id:11,"name": "Serenay Sarikaya", "test":['Lipid','Glucose']},
    {id:12,"name": "Yuzra geyik", "test": ['FBC']}
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

 //mobile responsive part
 const style={
  
 }
 const drawerW=320
 const [mobileOpen, setMobileOpen] = React.useState(false)
 const [isClosing, setIsClosing] = React.useState(false)

 const handleDrawerClose = () => {
  setIsClosing(true)
  setMobileOpen(false)
  }

 const handleDrawerTransitionEnd = () => {
   setIsClosing(false)
 }

 const drawer=(
  <Grid  item spacing={0} style={{paddingTop:'64px',backgroundColor:'#DEF4F2',height:'100%'}}>
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
 )

  return (
   <div>
    <Box sx={{ display: 'flex' ,height:'100%'}}>
      <CssBaseline />
      <ResNavBar isClosing={isClosing} setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} />
      <Box component="nav" sx={{ width: { sm: drawerW },  flexShrink: { sm: 0 } }}
       aria-label="mailbox folders">
      </Box>
    </Box>

    <Grid container spacing={0} sx={{paddingTop:'64px',height:'100vh'}}>

    <Drawer variant="temporary" open={mobileOpen} onTransitionEnd={handleDrawerTransitionEnd} 
     onClose={handleDrawerClose} ModalProps={{keepMounted: true}}
    sx={{display: { xs: 'block', sm: 'none' },'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerW-30 },height:'100%'}} >
          
      {drawer}
        
    </Drawer>
    <Drawer variant="permanent" sx={{display: { xs: 'none', sm: 'block' },marginTop:'20px','& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerW }}} open>

      {drawer}

    </Drawer>

    <Grid item sm={9} spacing={0} sx={{height:'100%',marginLeft:{sm:'320px',xs:'0px'},width:{xs:'100vw',sm:'60vw'}}}>
    {
              page==1?

              select ? 
              <Card sx={{width:'100%',height:'30px'}} square>
                <Typography variant='h6'>{
                  showSelect(select)
                }</Typography>
              </Card>
              : ''

              :page==2?<LabTestList setPage={setPage}></LabTestList>
              :page==3?<CreateLabTemplate setPage={setPage}></CreateLabTemplate>
              :''
      }

    </Grid>

    </Grid>
   </div>
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