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
import Edittemplate from '../components/Lab/Edittemplate';

export default function Lab() {

  const [select,setSelect]=useState(null)
  const [date,setDate]=useState(1)
  const [loadIn,setLoadIn]=useState([]) 

  useEffect(()=>{
    document.body.style.margin = '0';
    console.log(x[date])
    setLoadIn(x[date])
   },[date])

  {/*to navigate between pages   1:fill test   2:test list   3:create tmplt   4:edit tmplt*/}
  const [page,setPage]=useState(1)
  const [tId,settId]=useState()
  const [RId,setRId]=useState()

  let x=[
    [{id:13,"name": "Olivia Anderson", "test":['hCG'],"testId":[]},
    {id:14,"name": "Joshua Taylor", "test": ['FBC'],"testId":[1]},
    {id:15,"name": "Sophia Thomas", "test": ['FBC'],"testId":[1]},
    {id:16,"name": "Ethan Walker", "test":['HBC','Thyroxin'],"testId":[2,3]},
    {id:17,"name": "Isabella Clark", "test": ['Urine'],"testId":[5]},
    {id:18,"name": "James Young", "test": ['FBC'],"testId":[1]}],

    [{id:1,"name": "Sarah Johnson", "test": ['Thyroxin'],"testId":[3]},
    {id:2,"name": "Michael Smith", "test":['FBC','hCG'],"testId":[1,7]},
    {id:3,"name": "Lisa Brown", "test": ['FBC'],"testId":[1]},
    {id:4,"name": "John Davis", "test": ['BMT'],"testId":[8]},
    {id:5,"name": "Emily Wilson", "test":['HBC','Thyroxin'],"testId":[2,3]},
    {id:6,"name": "David Martinez", "test": ['Urine'],"testId":[5]},
    {id:7,"name": "Jessica Anderson", "test": ['FBC'],"testId":[1]},
    {id:8,"name": "William Thompson", "test":['FBC'],"testId":[1]},
    {id:9,"name": "Jennifer Garcia", "test": ['FBC'],"testId":[1]},
    {id:10,"name": "Robert Rodriguez", "test": ['Lipid'],"testId":[6]},
    {id:11,"name": "Ashley Lopez", "test":['Lipid','Glucose'],"testId":[6,4]},
    {id:12,"name": "Matthew Lee", "test": ['FBC'],"testId":[1]}],

    [{id:6,"name": "Jacob Baker", "test": ['Urine'],"testId":[5]},
    {id:7,"name": "Ava Green", "test": ['FBC'],"testId":[1]},
    {id:8,"name": "Alexander Adams", "test":['FBC'],"testId":[1]},
    {id:9,"name": "Charlotte Hill", "test": ['FBC'],"testId":[1]},
    {id:10,"name": "William Murphy", "test": ['Lipid'],"testId":[6]}]
   ]

   const [Tload,setTload]=useState([
    {id:1,name:'Full blood test',provider:'Hemas',price:500.00},
    {id:2,name:'Half blood test',provider:'Hemas',price:500.00},
    {id:3,name:'Thyroxin test',provider:'Durdance',price:2400.00},
    {id:4,name:'Glucose test',provider:'Hemas',price:750.00},
    {id:5,name:'Urine test',provider:'Hemas',price:1200.00},
    {id:6,name:'Lipid profile',provider:'Asiri',price:1500.00},
    {id:7,name:'hCG test',provider:'Durdance',price:500.00},
    {id:8,name:'Basic metabolic test',provider:'Asiri',price:1700.00},
    {id:9,name:'Full blood test',provider:'Hemas',price:500.00},
    {id:10,name:'Half blood test',provider:'Hemas',price:500.00},
    {id:11,name:'Thyroxin test',provider:'Durdance',price:2400.00},
    {id:12,name:'Glucose test',provider:'Hemas',price:750.00},
    {id:13,name:'Urine test',provider:'Hemas',price:1200.00},
    {id:14,name:'Lipid profile',provider:'Asiri',price:1500.00},
    {id:15,name:'hCG test',provider:'Durdance',price:500.00},
    {id:16,name:'Basic metabolic test',provider:'Asiri',price:1700.00}
])

   const [Fload,setFload]=useState({
    0:
    [{'field':'Himoglobin','min':11.5,'max':13.5,'unit':'g/DL'},
    {'field':'Himatocrit','min':34,'max':40,'unit':'%'},
    {'field':'Red blod cell','min':3.9,'max':5.3,'unit':'10^6/ML'},
    {'field':'White blod cell','min':150,'max':450,'unit':'10/uL'},
    {'field':'Paletes','min':75,'max':87,'unit':'g/DL'},
    {'field':'MCV','min':24,'max':30,'unit':'fL'},
    {'field':'MHC','min':31,'max':37,'unit':'pG'},
    {'field':'Eesinophil','min':0,'max':4,'unit':''},
    {'field':'Neutrophil','min':3,'max':5,'unit':'%'},
    {'field':'Monocyte','min':300,'max':308,'unit':'%'}],
    4:
    [{'field':'Epinephrine','min':0,'max':20,'unit':'mg/L'},
    {'field':'Metanephrine','min':0,'max':1000,'unit':'%'},
    {'field':'Nerophineprine','min':15,'max':80,'unit':'ug/L'},
    {'field':'Normetanaphrine','min':108,'max':500,'unit':'%'},
    {'field':'Dopamine','min':65,'max':450,'unit':'%'}],
    7:
    [{'field':'Glucose','min':65,'max':99,'unit':'mg/DL'},
    {'field':'Glucose','min':65,'max':99,'unit':'mg/DL'},
    {'field':'BUN','min':6,'max':20,'unit':'mg/DL'},
    {'field':'Creatinine','min':0.57,'max':1,'unit':'mg/DL'},
    {'field':'Sodium','min':134,'max':144,'unit':'mol/L'},
    {'field':'Potassium','min':3.5,'max':5.2,'unit':'mol/L'},
    {'field':'Chloride','min':96,'max':106,'unit':'mol/L'},
    {'field':'Calsium','min':20,'max':29,'unit':'mol/L'},
    {'field':'Chloride','min':8.7,'max':10.2,'unit':'mol/L'},
    ]
    })

    const TloadSet=(xLoad)=>{
      setTload([...Tload,xLoad])
    }

    const FloadSet=(xLoad)=>{
      setFload({...Fload,[Tload.length]:xLoad})
    }

    const TloadEdit=(id,xLoad)=>{

    }

    const FloadEdit=(id,xLoad)=>{
      setFload({...Fload,[id]:xLoad})
    }


  const [selectedT,setSelectedT]=useState()

 function showSelect(id){

  const matchingItem = loadIn.find(item => item.id === id);
  return matchingItem ? matchingItem.name : null;
 }

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
  <Grid  item spacing={0} style={{paddingTop:'64px',backgroundColor:'#DEF4F2',height:'100%'}}>
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

              select ? 
              <Card sx={{width:'100%',height:'30px'}} square>
                <Typography variant='h6'>{
                  showSelect(select)
                }</Typography>
              </Card>
              : ''

              :page==2?<LabTestList settId={settId} setPage={setPage} Tdata={Tload}></LabTestList>
              :page==3?<CreateLabTemplate setPage={setPage} TloadSet={TloadSet} FloadSet={FloadSet} PK={Tload.length}></CreateLabTemplate>
              :page==4?<Edittemplate setPage={setPage} Fdata={Fload[tId]} tId={tId} Tdata={Tload[tId]} FloadEdit={FloadEdit}></Edittemplate>
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