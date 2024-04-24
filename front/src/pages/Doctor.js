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
 
  let obj = { //strore the all data in this object after click the confirm button
    id: select,
    drugs: pres, // drug array: from DoctorAddDrugs component
    labs: rep,  // lab test array: from Labrequest component
    description: description
  }
  console.log(JSON.stringify(obj))  
  axios.post(baseURL+endPoints.PRESCRIPTION, obj)
  .then(response => {
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
 //...............filter pending patients............................

 return (
  <div>
  <Navbar></Navbar>
  <Grid container spacing={0} sx={{ paddingTop: '64px', height: '100vh' }}>
      <Grid item xs={3} style={{ height: '100%', backgroundColor:'#E7FFF9'}}>
          <SidebarContainer sx={{ backgroundColor:'#E7FFF9'}}>
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
          </SidebarContainer>
      </Grid>

      <Grid item xs={9} style={{ height: '100%', overflowY: 'scroll' }}>
        
          {select ? (
              <>
                  <div sx={{ display: 'flex' ,}}>
{/*.............................................................patient profile Top field................................................................ */}
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
  {/*..................................*/}                           
                              <PatientsRecords openPopup={openPopup} setOpenPopup={setOpenPopup}   selectedPatientId={selectedAppointment[0].patient.id}/>
                          </Card>
                      ))}
                      </div>
                  <div>
{/*.................................................................Add Drugs..........................................................................*/}
                  
                  <DoctorAddDrugs pres={pres} setPres={setPres} openBox={openBox} setOpenBox={setOpenBox} />
                  <AddCircleIcon sx={{ color: '#00cc66', marginLeft: '10%', fontSize: '30px', float: 'left', marginTop: '27px', cursor: 'pointer' }} onClick={handleAddDrugsClick} />
                  </div>
 {/*................................................................Lab Request.......................................................................................*/}
                 
                  <ThermostatIcon sx={{ color: '#33cc33', marginLeft: '74%', fontSize: '45px', marginTop: '48px', cursor: 'pointer' }} onClick={() =>handleAddButtonClick(selectedAppointment)} />
                  <LabRequest openpopBox={openpopBox} setOpenpopBox={setOpenpopBox} rep={rep} setrep={setrep}/>

{/*..........................................................add patient extra details field..................................................*/}
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
                      <div>
{/*...............................................................confirm button..............................................................*/}
                      <br></br>
                      <Button variant="contained" sx={{ backgroundColor: '#00cca3', left: '80%',color:'white' }} onClick={handleClick}>Confirm</Button>
                     
 {/*............................................................snack bar component........................................................ */}
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