import { Grid,CssBaseline, Box, Drawer, Alert} from '@mui/material'
import React, { useEffect, useState } from 'react'
import {SidebarContainer,SidebarTop,SidebarList} from '../components/sidebar/Sidebar'
import { Sideunit_Test } from '../components/sidebar/Sideunits';
import LabSearch from '../components/Lab/LabSearch';
import LabTestList from '../components/Lab/TestList/LabTestList';
import CreateLabTemplate from '../components/Lab/CreateLabTemplate';
import '../components/CustomScroll.css'
import ResNavBar from '../components/recepcomponents/ResNavBar/ResNabBar';
import Edittemplate from '../components/Lab/Edittemplate';
import SubmitPage from '../components/Lab/TestSubmit/Submit/SubmitPage';
import Accept from '../components/Lab/TestSubmit/Accept';
import axios from 'axios';
import { baseURL, endPoints } from '../Services/Lab';
import { Load } from '../components/Other';

export default function Lab() {

  const [page,setPage]=useState(1)//Navigate pages  [1:dashboard  2:testlist  3:createtetmplt  4:edittmplt
                                  //                 5:submit list]
  const [date,setDate]=useState(2)
  const [tId,settId]=useState()//selected test <----------- from LabTestList
  const [selectedT,setSelectedT]=useState()//selected req <---------- from Sideunit
  const [query, setQuery] = useState('')//searchbar value

/*   const x=[
  {date:1,id:51,name: "Sarah Johnson", load:[{repId:23,test: 'Thyroxin',testId:3}]},
  {date:1,id:52,name: "Michael Smith", load:[{repId:24,test:'urine',testId:2}]},
  {date:1,id:54,name: "John Davis", load:[{repId:25,test: 'BMT',testId:8}]},
  {date:1,id:55,name: "Emily Wilson", load:[{repId:26,test:'Thyroxin',testId:3},{repId:27,test: 'FBC',testId:1}]},
  {date:1,id:56,name: "David Martinez", load:[{repId:28,test: 'Urine',testId:2}]},
  {date:1,id:57,name: "Jessica Anderson", load:[{repId:29,test: 'FBC',testId:1}]},
  {date:1,id:58,name: "William Thompson", load:[{repId:30,test:'FBC',testId:1}]},
  {date:1,id:59,name: "Jennifer Garcia", load:[{repId:31,test: 'FBC',testId:1}]},
  {date:1,id:60,name: "Robert Rodriguez", load:[{repId:31,test: 'Lipid',testId:7}]},
  {date:1,id:61,name: "Ashley Lopez", load:[{repId:33,test:'Lipid',testId:7}]},
  {date:1,id:62,name: "Matthew Lee", load:[{repId:34,test: 'FBC',testId:1}]},
  {date:2,id:73,name: "Jacob Baker", load:[{repId:35,test: 'Lipid',testId:7},{repId:36,test: 'Urine',testId:2}]},
  {date:2,id:74,name: "Ava Green", load:[{repId:37,test: 'FBC',testId:1},{repId:38,test: 'Urine',testId:2}]},
  {date:2,id:75,name: "Alexander Adams", load:[{repId:39,test:'FBC',testId:1}]},
  {date:2,id:76,name: "Charlotte Hill", load:[{repId:40,test: 'FBC',testId:1}]},
  {date:2,id:77,name: "William Murphy", load:[{repId:41,test: 'Lipid',testId:7}]},
  {date:3,id:88,name: "Olivia Anderson", load:[{repId:42,test:'hCG',testId:7},{repId:43,test: 'Urine',testId:2}]},
  {date:3,id:89,name: "Joshua Taylor", load:[{repId:44,test: 'FBC',testId:1}]},
  {date:3,id:90,name: "Sophia Thomas", load:[{repId:45,test: 'FBC',testId:1}]},
  {date:3,id:91,name: "Ethan Walker", load:[{repId:46,test:'HBC',testId:2}]},
  {date:3,id:92,name: "Isabella Clark", load:[{repId:47,test: 'Urine',testId:2}]},
  {date:3,id:93,name: "James Young", load:[{repId:48,test: 'FBC',testId:1}]}
   ]

   let y=[
    {repId:11,test:'Urine',testId:2},
    {repId:12,test:'BMT',testId:8},
    {repId:13,test:'Thyroxin',testId:3},
    {repId:14,test:'Urine',testId:2},
    {repId:15,test:'FBC',testId:1},
    {repId:16,test:'FBC',testId:1},
    {repId:17,test:'FBC',testId:1},
    {repId:18,test:'Lipid',testId:7},
    {repId:19,test:'Lipid',testId:7},
    {repId:20,test:'FBC',testId:1},
   ]
 */
    const [Tload,setTload]=useState([])//Lab test list <----- from back end
    const [RLoad,setRLoad]=useState([])
    const [RloadDone,setRloadDone]=useState(false)
    const [Er,setEr]=useState(false)

    //const [Fields,setFields]=useState([])//store set of fields by the selected test
    const [Test,setTest]=useState([])//store the selected test
    const [accLoad,setAccLoad]=useState([])//set sample accepted test list
    const [req,setReq]=useState()//store selected reqs details
    const [reqOK,setReqOk]=useState(true)//to stop keeping previous reqs details after it poped up

    const filteredData = RLoad.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))//filtered Rload data by the search

    useEffect(()=>{
      document.body.style.margin = '0';
      let tmp=localStorage.getItem('token')
      if(tmp==null){tmp=''}
      if(!RloadDone){
      axios.get(baseURL+endPoints.REPORT,
        {headers:
          {
          'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Authorization': `Basic MTExNjM4NzU6NjAtZGF5ZnJlZXRyaWFs`,
          'Content-Type': 'application/json'
          }
        }
      )
      .then((res)=>{
        setRLoad(res.data)
        setRloadDone(true)
        setEr(false)
      })
      .catch((er)=>{
        setEr(true)
        setRloadDone(true)
        console.log(er)
      })
     }

      //selected test name
      let t=Tload.filter(el=>{
        return el.id===tId
      })
      setTest(t[0])

      //select a lab request
      let found=false
      RLoad.forEach((x)=>{
        if(x.id===selectedT){
          setReq(x)
          found=true
        }
      })
      if(!found){setReqOk(false)}else{setReqOk(true)}//to not render previous req details
     },[date,tId,page,Tload,selectedT,RLoad,RloadDone])

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
         <LabSearch setPage={setPage} setDate={setDate} date={date} query={query} setQuery={setQuery}></LabSearch>
      </SidebarTop>
      <SidebarList>
      {!RloadDone?<Load></Load>:''}
      {Er?<Alert severity="error" variant='outlined'>Error occured</Alert>:''}
      {
         filteredData.map((elm)=>{
          if(elm.date===date){
            return(
              <Sideunit_Test key={elm.id} id={elm.id} name={elm.name} load={elm.load} setSelectedT={setSelectedT} selectedT={selectedT}></Sideunit_Test>
            )
          }
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

    {/*=============== Selected data is displayed below (active area) ================================ */}

    <Grid item sm={9} spacing={0} sx={{height:'100%',marginLeft:{sm:'320px',xs:'0px'},width:{xs:'100vw',sm:'60vw'}}}>
    {
              page===1 && req!=null ? <Accept req={req} accLoad={accLoad} setAccLoad={setAccLoad} RLoad={RLoad} setRLoad={setRLoad} reqOK={reqOK}></Accept>
              :page===2?<LabTestList settId={settId} setPage={setPage} Tload={Tload} setTload={setTload}></LabTestList>
              :page===3?<CreateLabTemplate setPage={setPage} setTload={setTload}></CreateLabTemplate>
              :page===4?<Edittemplate setPage={setPage} tId={tId} Tdata={Test} setTload={setTload}></Edittemplate>
              :page===5?<SubmitPage setpage={setPage} load={accLoad} setLoad={setAccLoad}></SubmitPage>
              :''
      }

    </Grid>

    </Grid>
   </div>
  )
}




