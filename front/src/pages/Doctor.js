import React, { useEffect, useState } from 'react'
import { SidebarContainer, SidebarTop, SidebarList } from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'
import { Grid, Card, Typography, Switch} from '@mui/material'
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import UpdateIcon from '@mui/icons-material/Update';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import PatientsRecords from '../components/DoctorComponents/PatientsRecords';
import DoctorAddDrugs from '../components/DoctorComponents/DoctorAddDrugs';
import AnaliticalReports from '../components/DoctorComponents/AnaliticalReports';
import '../components/CustomScroll.css'
import LabRequest from '../components/DoctorComponents/LabRequest';
import { Sideunit_Patient } from '../components/sidebar/Sideunits';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TopUnit from '../components/DoctorComponents/TopUnit';

export default function Doctor() {

  const [select,setSelect]=useState(null);//---------------hold the selected appoinment patient-----------------------------
  const [openPopup, setOpenPopup] = useState(false);
  const [openBox, setOpenBox] = useState(false);
  const [openpopBox, setOpenpopBox] = useState(false);
  const [openAreports, setOpenAreports] = useState(false);
  const [description,setDescription] = useState ("");
  const [open, setOpen] = React.useState(false); //for snapbar
  
  useEffect(() => {
    document.body.style.margin = '0';
  }, [])

  const Item = styled(Paper)(({ theme }) => ({

    padding: theme.spacing(1),
    textAlign: 'center',

  }));

   const handleAddIconClick = () => {
    setOpenPopup(true);
  }; 

  const handleAddDrugsClick = () => {
    setOpenBox(true);
  }; 

  const handleViewReporsClick = () => {
    setOpenAreports(true);
  };  

  const handleAddButtonClick = () => {
    setOpenpopBox(true);
  };
  const handlesnapbarClick = () => {
    setOpen(true);
  };
 
  

  // Remove after click the confirm buttun
  const confirmRemoving = () => {
    if (select !== null) {
        const updatedAppointments = x.filter(appointment => appointment.id !== select); // Filter out the selected appointment          
        updatedAppointments.pres = [];
        updatedAppointments.rep = [];
        updatedAppointments.description = '';        
        setX(updatedAppointments); // remove the selected patient in the appointments array
        setSelect(null);
        setOpen(false); // Clear the selected patient account      
      }
};
const handleClick = () => {
 
  handlesnapbarClick();
  let obj = { //strore the all data in this object after click the confirm button
    id: select,
    drugs: pres, // drug array: from DoctorAddDrugs component
    labs: rep,  // lab test array: from Labrequest component
    descript: description
  }
  console.log(obj)
  // Call the confirmRemoving function after showing the Snackbar
  setTimeout(() => {
    confirmRemoving();
  }, 1500);
};
 
 //-------------------------->patients appointments Array<--------------------------------------------------------//

 const data=[
   {
     date:1,
      id:51,  // -----------------------------------> appointment Id-------  
      patient:{
          name:"Nethmi Eranga",
          age:23,
          gender:"female"
        },
        time: "13:15",
        status: "pending"
    },
    {
      date:2,
      id:52,    
      patient:{
          name:"Dammika mahendra",
          age:18,
          gender:"male"
        },
        time: "14:15",
        status: "pending"
    },
    {
      date:3,
      id:53,    
      patient:{
          name:"Yasiru Ramosh",
          age:8,
          gender:"male",
        },
        time: "13:15",
        status: "pending"
    },
    {
      date:4,
      id:54,    
      patient:{
          name:"Chathumini Pamodya",
          age:32,
          gender:"female"
        },
        time: "13:15",
        status: "pending"
    },
    {
      date:5,
      id:55,    
      patient:{
          name:"Chalana Mihiran",
          age:22,
          gender:"male"
        },
        time: "13:15",
        status: "pending"
    },
    {
      date:6,
      id:56,    
      patient:{
          name:"Dilini tharaka",
          age:42,
          gender:"female"
        },
        time: "13:15",
        status: "pending"
    },
    {
      date:7,
      id:57,    
      patient:{
          name:"Hasini Chamodi",
          age:52,
          gender:"female"
        },
        time: "13:15",
        status: "pending"
    },
    {
      date:8,
      id:58,    
      patient:{
          name:"Mihiran Iddamalgoda",
          age:38,
          gender:"male"
        },
        time: "13:15",
        status: "pending"
    },
    {
      date:9,
      id:59,    
      patient:{
          name:"Sunil Perera",
          age:22,
          gender:"male"
        },
        time: "13:15",
        status: "pending"
    },
    {
      date:10,
      id:60,    
      patient:{
          name:"Nimal Senarathna",
          age:16,
          gender:"male"
        },
        time: "13:15",
        status: "pending"
    },
    {
      date:11,
      id:61,    
      patient:{
          name:"Kasun Perera",
          age:60,
          gender:"male"
        },
        time: "13:15",
        status: "pending"
    },
    
  ]

  const [pres,setPres]=useState([]) // hold the pres details from doctoradd drug component
  const [rep,setrep]=useState([]) // hold the  lab request from doctoradd drug component

  const [x,setX]=useState(data)
  const selectedAppointment = select ? x.filter(appointment => appointment.id === select) : [];//------------filter  the selected patient----------
 
 return (
  <div>
  <Navbar></Navbar>
  <Grid container spacing={0} sx={{ paddingTop: '64px', height: '100vh' }}>
      <Grid item xs={3} style={{ height: '100%', backgroundColor:'#E7FFF9'}}>
          <SidebarContainer sx={{ backgroundColor:'#E7FFF9'}}>
              <SidebarTop>
                <TopUnit></TopUnit>
              </SidebarTop>
              <SidebarList >
                <Switch defaultChecked size="small" sx={{position:'fixed',left:'8px',top:'125px'}}/>
                {x.map((elm, ind) => {
                  return (
                  <Sideunit_Patient
                  key={ind} id={elm.id} name={elm.patient.name} time={elm["time"]} status={elm["status"]} setSelect={setSelect} selected={elm.id === select ? true : ''}></Sideunit_Patient>
                    );
                  })}
              </SidebarList>
          </SidebarContainer>
      </Grid>

      <Grid item xs={9} style={{ height: '100%', overflowY: 'scroll' }}>
          {select ? (
              <>
                  <div sx={{ display: 'flex' ,}}>
                     {selectedAppointment.map((index) => (
                          <Card key={index} sx={{ maxWidth: '100%', height: '100px',}}>
                           <CardContent>
                             <AudioFileIcon sx={{ color: 'rgb(0, 153, 255)', float: 'right', marginRight: '10px', fontSize: '30px', cursor: 'pointer', }} onClick={handleAddIconClick} />
                             <UpdateIcon sx={{ color: 'rgb(255, 153, 0)', float: 'right', marginRight: '10px', fontSize: '30px', cursor: 'pointer', }} onClick={handleViewReporsClick} />
                             <AnaliticalReports openAreports={openAreports} setOpenAreports={setOpenAreports} />
                             <>
                             <Typography gutterBottom variant="h6">{selectedAppointment[0].patient.name}</Typography>
                             <Typography gutterBottom variant="p" sx={{ color: '#808080' }}>{selectedAppointment[0].patient.age} years</Typography><br />
                             <Typography gutterBottom variant="p" sx={{ color: '#808080' }}>{selectedAppointment[0].patient.gender}</Typography>
                               </>
                              </CardContent>
                              <PatientsRecords openPopup={openPopup} setOpenPopup={setOpenPopup} />
                          </Card>
                      ))}
                      </div>
                  <div>
                  <DoctorAddDrugs pres={pres} setPres={setPres} openBox={openBox} setOpenBox={setOpenBox} />
                  <AddCircleIcon sx={{ color: '#00cc66', marginLeft: '10%', fontSize: '30px', float: 'left', marginTop: '27px', cursor: 'pointer' }} onClick={handleAddDrugsClick} />
                  </div>
                  <ThermostatIcon sx={{ color: '#33cc33', marginLeft: '74%', fontSize: '45px', marginTop: '48px', cursor: 'pointer' }} onClick={() =>handleAddButtonClick(selectedAppointment)} />
                  <LabRequest openpopBox={openpopBox} setOpenpopBox={setOpenpopBox} rep={rep} setrep={setrep}/>
                  <div sx={{ display: 'flex' }}>
                      <Box
                          component="form"
                          sx={{
                              '& .MuiTextField-root': { m: 1, width: '95%' }, marginLeft: '1%',
                          }}
                          noValidate
                          autoComplete="off">
                          <TextField id="outlined-multiline-flexible" placeholder="Patient extra details" multiline rows={7} onChange={(event) => setDescription(event.target.value)}
                          InputProps={{ style: { backgroundColor: 'rgb(209, 224, 250)', borderRadius: '15px', fontSize: '22px', color: 'blue', textAlign: 'center', }, }} />
                      </Box>
                      <br></br>
                      <Button variant="contained" sx={{ backgroundColor: '#00cca3', left: '80%' }} onClick={handleClick}>Confirm</Button>
                      <div>
      
      <Snackbar open={open} autoHideDuration={6000}  anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}} >
        <Alert             
          severity="success"
          variant="filled"          
          sx={{ width: '100%', }}
        >
           Successfully  Confirm  !
        </Alert>
      </Snackbar>
    </div>
                  </div>
              </>
          ) : (
              <Typography gutterBottom variant="p"></Typography>
          )}
      </Grid>
  </Grid>
</div>    
  )
}