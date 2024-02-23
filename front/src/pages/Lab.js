import { Grid,Card, Typography, CssBaseline, Box, Drawer, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {SidebarContainer,SidebarTop,SidebarList} from '../components/sidebar/Sidebar'
import { Sideunit_Test } from '../components/sidebar/Sideunits';
import LabSearch from '../components/Lab/LabSearch';
import LabTestList from '../components/Lab/TestList/LabTestList';
import CreateLabTemplate from '../components/Lab/CreateLabTemplate';
import '../components/CustomScroll.css'
import ResNavBar from '../components/recepcomponents/ResNavBar/ResNabBar';
import Edittemplate from '../components/Lab/Edittemplate';

export default function Lab() {

  const [page,setPage]=useState(1)//Navigate pages  [1:dashboard  2:testlist  3:createtetmplt  4:edittmplt]

  const [date,setDate]=useState(2)
  const [tId,settId]=useState()//selected test <----------- from LabTestList
  const [selectedT,setSelectedT]=useState()//selected report <---------- from Sideunit

  const [loadIn,setLoadIn]=useState([]) //selected reports by a date

  let x=[
    {date:1,id:51,name: "Sarah Johnson", test: ['Thyroxin'],testId:[3]},
    {date:1,id:52,name: "Michael Smith", test:['FBC','urine'],testId:[1,5]},
    {date:1,id:54,name: "John Davis", test: ['BMT'],testId:[8]},
    {date:1,id:55,name: "Emily Wilson", test:['HBC','Thyroxin'],testId:[2,3]},
    {date:1,id:56,name: "David Martinez", test: ['Urine'],testId:[5]},
    {date:1,id:57,name: "Jessica Anderson", test: ['FBC'],testId:[1]},
    {date:1,id:58,name: "William Thompson", test:['FBC'],testId:[1]},
    {date:1,id:59,name: "Jennifer Garcia", test: ['FBC'],testId:[1]},
    {date:1,id:60,name: "Robert Rodriguez", test: ['Lipid'],testId:[6]},
    {date:1,id:61,name: "Ashley Lopez", test:['Lipid','Glucose'],testId:[6,4]},
    {date:1,id:62,name: "Matthew Lee", test: ['FBC'],testId:[1]},

    {date:2,id:73,name: "Jacob Baker", test: ['Urine'],testId:[5]},
    {date:2,id:74,name: "Ava Green", test: ['FBC'],testId:[1]},
    {date:2,id:75,name: "Alexander Adams", test:['FBC'],testId:[1]},
    {date:2,id:76,name: "Charlotte Hill", test: ['FBC'],testId:[1]},
    {date:2,id:77,name: "William Murphy", test: ['Lipid'],testId:[6]},

    {date:3,id:88,name: "Olivia Anderson", test:['hCG'],testId:[7]},
    {date:3,id:89,name: "Joshua Taylor", test: ['FBC'],testId:[1]},
    {date:3,id:90,name: "Sophia Thomas", test: ['FBC'],testId:[1]},
    {date:3,id:91,name: "Ethan Walker", test:['HBC','Thyroxin'],testId:[2,3]},
    {date:3,id:92,name: "Isabella Clark", test: ['Urine'],testId:[5]},
    {date:3,id:93,name: "James Young", test: ['FBC'],testId:[1]}
   ]

   const [Tload,setTload]=useState([])

   const [Fload,setFload]=useState([])

    const [Fields,setFields]=useState([])//store set of fields by the selected test
    const [Tests,setTests]=useState([])//store the selected test

    const TloadSet=(xLoad)=>{//Add newly created test
      let T={
        id:Tload.length+1,
        name:xLoad.name,
        provider:xLoad.provider,
        price:xLoad.price
      }
      setTload([...Tload,T])
    }

    const FloadSet=(xLoad)=>{//set created field data <----- from CreatLabtemplate
      let T={
        id:(Tload.length+1),
        load:xLoad
      }
      setFload([...Fload,T])
    }

    const FloadEdit=(id,xLoad)=>{//set edited field data <----- from Edittemplate
      setFload({...Fload,[id]:xLoad})
    }

    useEffect(()=>{
      document.body.style.margin = '0';
      let a=x.filter((el)=>{
        return el.date==date
      })
      setLoadIn(a)

     },[date,tId,page])

//Responsive drawer==================================================================================
 const drawerW=320
 const [mobileOpen, setMobileOpen] = useState(false)
 const [isClosing, setIsClosing] = useState(false)

 const handleDrawerClose = () => {
  setIsClosing(true)
  setMobileOpen(false)
  }

 const handleDrawerTransitionEnd = () => {
   setIsClosing(false)
 }

 const drawer=(
  <Grid  item spacing={0} style={{paddingTop:'64px',backgroundColor:'#E7FFF9',height:'100%'}}>
    <SidebarContainer>
      <SidebarTop>
         <LabSearch setPage={setPage} setDate={setDate} date={date}></LabSearch>
      </SidebarTop>
      <SidebarList>
      {
         loadIn.map((elm)=>{
            return(
             <>
              <Sideunit_Test key={elm.id} id={elm.id} name={elm.name} test={elm.test} setSelectedT={setSelectedT} selectedT={selectedT}></Sideunit_Test>

             </>
            )
         })
       }
      </SidebarList>
    </SidebarContainer>
  </Grid>
 )
//============================================================================================================
  return (
   <div>
    <Box sx={{ display: 'flex' ,height:'100%'}}>
      <CssBaseline />
      <ResNavBar isClosing={isClosing} setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} />
      <Box component="nav" sx={{ width: { sm: drawerW },  flexShrink: { sm: 0 } }}
       aria-label="mailbox folders">
      </Box>
    </Box>

    <Grid container spacing={0} sx={{paddingTop:{xs:'48px',sm:'64px'},height:'100vh'}}>

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

              selectedT!=null ? 
              <div>
              <Card sx={{width:'100%',height:'30px',pl:'35px',height:'50px',pt:'20px',position:'fixed',zIndex:'10'}} square>
                  {loadIn.map((x)=>{
                    if(x.id==selectedT){return <Typography>{x.name}</Typography>}
                  })
                }
              </Card>
              <Box sx={{width:'100%',padding:'40px',paddingTop:'90px'}}>

    
              </Box>
             </div>
              : ''

              :page==2?<LabTestList settId={settId} setPage={setPage} Tload={Tload} setTload={setTload}></LabTestList>
              :page==3?<CreateLabTemplate setPage={setPage} TloadSet={TloadSet} FloadSet={FloadSet} PK={Tload.length}></CreateLabTemplate>
              :page==4?<Edittemplate setPage={setPage} tId={tId} Tdata={Tests} FloadEdit={FloadEdit}></Edittemplate>
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

