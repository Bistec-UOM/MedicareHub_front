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
import PatientsRecords from '../components/Doctor/PatientsRecords';
import DoctorAddDrugs from '../components/Doctor/DoctorAddDrugs';
import AnaliticalReports from '../components/Doctor/AnaliticalReports';
import '../components/CustomScroll.css'
import LabRequest from '../components/Doctor/LabRequest';
import { Sideunit_Patient } from '../components/sidebar/Sideunits';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TopUnit from '../components/Doctor/TopUnit';
import { baseURL,endPoints } from '../Services/Doctor';
import axios from 'axios';
import { PersonDetail } from '../components/Other';
import DoneIcon from '@mui/icons-material/Done'
import { ConfirmPropmt } from '../components/Common';

export default function Doctor() {
  
  const [select,setSelect]=useState(null);//hold the selected appoinment patient
  const [openPopup, setOpenPopup] = useState(false);// for patient history records
  const [openBox, setOpenBox] = useState(false);// for add drugs
  const [openpopBox, setOpenpopBox] = useState(false);//for lab reports
  const [openAreports, setOpenAreports] = useState(false);//for analitical reports
  const [description,setDescription] = useState (""); // hold the text field descriptions(patient description)
  const [open, setOpen] = useState(false); //for snapbar
  const [showDonePatients, setShowDonePatients] = useState(false);// hold the patients when completed
  const [pres,setPres]=useState([]) ;// hold the pres details from doctoradd drug component
  const [rep,setrep]=useState([]); // hold the  lab request from component
  const [appointments, setAppointments] = useState([]);// hold the appoinment list
  
  useEffect(() => {
    document.body.style.margin = '0';
    fetchData();
  }, [])

  const Item = styled(Paper)(({ theme }) => ({

    padding: theme.spacing(1),
    textAlign: 'center',

  }));

   const handleAddIconClick = () => {//for patient history record popu up
    setOpenPopup(true);
  }; 

  const handleAddDrugsClick = () => {
    setOpenBox(true);
  }; 

  const handleAddButtonClick = () => {
    setOpenpopBox(true);
  };
  const handlesnapbarClick = () => {  
    setOpen(true);
  };
 
  const confirmRemoving = () => {
  if (select !== null) {
      const updatedAppointments = appointments.map(appointment => {
          if (appointment.id === select) {
              // Update status to "done"
              appointment.status = "done";
              // Clear other fields if needed
              appointment.drugs = [];
              appointment.labs = [];
              appointment.descript = '';
          }
          return appointment;
      });
      // Display updated appointments
      console.log("Updated Appointments:", updatedAppointments);
      setAppointments(updatedAppointments);
      setSelect(null);
      setOpen(false); // Clear the selected patient account      
  }
};


const handleClick = () => {
  setLoadingBConfirm(true)
  let obj = { //strore the all data in this object after click the confirm button
    id: select,
    drugs: pres, // drug array: from DoctorAddDrugs component
    labs: rep,  // lab test array: from Labrequest component
    description: description
  }
  console.log(JSON.stringify(obj))  
  axios.post(baseURL+endPoints.PRESCRIPTION, obj)
  .then(response => {
    setLoadingBConfirm(false)
    // Handle success
    handlesnapbarClick(); //show the snapbar component
    console.log('Response:', response.data);
    setPres([])
    setrep([])
    setDescription('')
    // Call the confirmRemoving function after showing the Snackbar
    setTimeout(() => {
      confirmRemoving();
    }, 1500);
  })
  .catch(er => {
    setLoadingBConfirm(false)
    if(er.hasOwnProperty('response')){
      console.log(er.response.data)
    }else{
      console.log(er)
    }
  });
};


const fetchData = async () => {
  try {
    const response = await axios.get(baseURL+endPoints.APPOINTMENTLIST); 
    setAppointments(response.data);
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 //-------------------------->patients appointments Array<--------------------------------------------------------// 
 /*const data=[
  {
    date:1,
     id:51,  // -----------------------------------> appointment Id-------  
     patient:{
         name:"Nethmi Eranga",
         age:23,
         gender:"female"
       },
       time: "9:15",
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
       time: "12:00",
       status: "pending"
   },   
    
 ]*/
 
const selectedAppointment = select ? appointments.filter(appointment => appointment.id === select) : [];
//------------filter  the selected patient---------------------------
const filteredAppointments = showDonePatients ? appointments.filter(appointment => appointment.status === "pending") : appointments;

//for confirmation popup box
const [loadingBConfirm, setLoadingBConfirm] = useState(false)//Loading button
   const [openConfirm, setOpenConfirm] = useState(false)
   const handleClickOpenConfirm = (x) => {
        setOpenConfirm(true)
  }
const handleCloseConfirm = () => {setOpenConfirm(false)}  

 return (
  <div>
  <Navbar></Navbar>
  <Grid container spacing={0} sx={{ height: '100vh',pt:'64px'}}>
      <Grid item xs={3} sx={{ height: '100%', backgroundColor:'#e7fff9'}}>
              <SidebarTop>
 {/*..................switch.......................... */}
              <TopUnit appointments={appointments} SwitchOnChange={() => setShowDonePatients(prev => !prev)}></TopUnit>
              </SidebarTop>
              <SidebarList >
{/*..........................................................show staus in done patients..................................................*/}
                {filteredAppointments.map((elm, ind) => (
                                <Sideunit_Patient
                                    key={ind}
                                    id={elm.id}
                                    name={elm.patient.name}
                                    time={elm.time}
                                    status={elm.status}
                                    setSelect={setSelect}
                                    selected={elm.id === select ? true : ''}
                                />                                
                            ))}
              </SidebarList>
      </Grid>

      <Grid item xs={9} style={{ height: '100%', overflowY: 'scroll' }}>
        
          {select ? (
              <>
{/*.............patient profile Top field.......................................... */}
                     {selectedAppointment.map((index) => (
                          <PersonDetail style={{backgroundColor:'white'}}
                            name={selectedAppointment[0].patient.name}
                            age={selectedAppointment[0].patient.age}
                            gender={selectedAppointment[0].patient.gender}
                            >
                          </PersonDetail>
                      ))}
                    <UpdateIcon sx={{position:'fixed',top:'10px',right:'20px',zIndex:'40',color:'rgb(255, 153, 0)',cursor:'pointer'}} onClick={handleAddIconClick}></UpdateIcon >
                    <PatientsRecords openPopup={openPopup} setOpenPopup={setOpenPopup}   selectedPatientId={selectedAppointment[0].patient.id}/>
{/*.........................Add Drugs...............................................*/}
 <div style={{paddingTop:'60px'}}>
                   <div style={{marginBottom:'80px'}}>
                   <DoctorAddDrugs pres={pres} setPres={setPres} openBox={openBox} setOpenBox={setOpenBox} />
                   <AddCircleIcon sx={{ color: '#00cc66', marginLeft: '5%', fontSize: '30px', float: 'left', marginTop: '10px', cursor: 'pointer' }} onClick={handleAddDrugsClick} />
                   </div>
  {/*........................Lab Request..............................................*/}
                  
                   <LabRequest openpopBox={openpopBox} setOpenpopBox={setOpenpopBox} rep={rep} setrep={setrep}/>
                   <ThermostatIcon sx={{ color: '#33cc33', marginLeft: '80%', fontSize: '45px', cursor: 'pointer' }} onClick={() =>handleAddButtonClick(selectedAppointment)} />
  
  {/*.................patient extra details ............................................*/}
                       <Box
                           component="form"
                           sx={{
                               '& .MuiTextField-root': { m: 1, width: '90%' }, marginLeft: '4%',
                           }}
                           noValidate
                           autoComplete="off">
                           <TextField id="outlined-multiline-flexible" placeholder="Patient extra details" multiline rows={7} onChange={(event) => setDescription(event.target.value)}
                           InputProps={{ style: { backgroundColor: '#fffed9', borderRadius: '4px', fontSize: '16px'}}} />
                       </Box>
  {/*..............confirm button.........................................*/}
                       <br></br>
                       <Button size='small' endIcon={<DoneIcon></DoneIcon>} variant="contained" sx={{ left: '80%' }} onClick={handleClickOpenConfirm}>Confirm</Button>
 </div>
                     
 {/*...........snack bar component....................................... */}
                   <Snackbar open={open} autoHideDuration={6000}  anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}} >
                   <Alert             
                   severity="success"
                   variant="filled"          
                   sx={{ width: '100%', }}
                  >
                 Successfully  Confirm  !
                 </Alert>
                </Snackbar>
 {/*.................... */}
              </>
          ) : (
              <Typography gutterBottom variant="p"></Typography>
          )}
      <ConfirmPropmt action={handleClick} message="Are you sure that prescription is ready?"
       handleClose={handleCloseConfirm} loadingB={loadingBConfirm} open={openConfirm}></ConfirmPropmt>
      </Grid>
  </Grid>
</div>    
  )
}