import React, { useEffect, useState } from 'react'
import { SidebarContainer, SidebarTop, SidebarList } from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'
import { Grid, Card, Typography } from '@mui/material'
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
          name:"dhgwhjdbjhw",
          age:30,
          gender:"male"
        },
        time: "13:15",
        status: "done"
    },
    {
      date:16,
      id:52,    
      patient:{
          name:"nethmi",
          age:18,
          gender:"female"
        },
        time: "14:15",
        status: "done"
    },
    {
      date:12,
      id:53,    
      patient:{
          name:"eranga",
          age:8,
          gender:"male",
        },
        time: "13:15",
        status: "done"
    },
    {
      date:19,
      id:54,    
      patient:{
          name:"wijeweera",
          age:22,
          gender:"female"
        },
        time: "13:15",
        status: "done"
    },
    {
      date:10,
      id:55,    
      patient:{
          name:"mihiran",
          age:38,
          gender:"male"
        },
        time: "13:15",
        status: "done"
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
              <SidebarList>
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
        <DoctorPage/>
         
      </Grid>
  </Grid>
</div>    
  )
}