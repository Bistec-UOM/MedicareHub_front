import React, { useEffect, useState } from 'react'
import { SidebarContainer, SidebarTop, SidebarList } from '../../../sidebar/Sidebar'
import Navbar from '../../../navbar/Navbar'
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
import PatientsRecords from '../../../Doctor/PatientsRecords';
import DoctorAddDrugs from '../../../Doctor/DoctorAddDrugs';
import AnaliticalReports from '../../../Doctor/AnaliticalReports';
import '../../../../components/CustomScroll.css'
import LabRequest from '../../../Doctor/LabRequest';
import { Sideunit_Patient } from '../../../sidebar/Sideunits';
import DoctorAppCalender from '../DoctorAppCalender/DoctorAppCalender';
import TopUnit from '../../../Doctor/TopUnit';
import { jwtDecode } from 'jwt-decode';

export default function DoctorPage() {
  const [select,setSelect]=useState(null)
  useEffect(() => {
    document.body.style.margin = '0';
  }, [])

  const Item = styled(Paper)(({ theme }) => ({

    padding: theme.spacing(1),
    textAlign: 'center',

  }));

  const load = [
    { name: 'Nethmi Eranga Wijeweera', age: '30', gender: 'Female' },
  ];

  let tmpDocId=jwtDecode(localStorage.getItem('medicareHubToken')).RoleId;
  

  const [openPopup, setOpenPopup] = useState(false);
  const [openBox, setOpenBox] = useState(false);
  const [openpopBox, setOpenpopBox] = useState(false);
  const [openAreports, setOpenAreports] = useState(false);
  


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

 
  let x=[
    {
      "id": 1,
      "name": "Nethmi Eranga Wijeweera",
      "time": "09:00",
      "status": "done"
    },
    {
      "id": 2,
      "name": "Amal Rathnayake",
      "time": "10:30",
      "status": "done"
    },
    {
      "id": 3,
      "name": "Chathumini Wanasignhe",
      "time": "11:45",
      "status": "done"
    },
    {
      "id": 4,
      "name": "Thushari Fernando",
      "time": "13:15",
      "status": "done"
    },
    {
      "id": 5,
      "name": "Infas Mohomad",
      "time": "14:30",
      "status": "done"
    },
    {
      "id": 6,
      "name": "Dhammika Mahendra",
      "time": "15:45",
      "status": "done"
    },
    {
      "id": 7,
      "name": "Yasiru Ramosh",
      "time": "16:30",
      "status": "done"
    },
    {
      "id": 8,
      "name": "Chathura Ishara",
      "time": "17:15",
      "status": "done"
    },
    {
      "id": 9,
      "name": "Yasiru Ramosh",
      "time": "18:00",
      "status": "done"
    },
    {
      "id": 10,
      "name": "Chathura Ishara",
      "time": "19:00",
      "status": "done"
    },
    {
      "id": 11,
      "name": "Infas Mohomad",
      "time": "20:00",
      "status": "done"
    },
    {
      "id": 12,
      "name": "Thushari Fernando",
      "time": "21:00",
      "status": "done"
    }
  ]
  
  

  return (
    <div>
      <Navbar></Navbar>
      <Grid container spacing={0} sx={{ paddingTop: '64px', height: '100vh'}}>
        <Grid item xs={3} style={{ height: '100%',backgroundColor:'#DEF4F2'}}>
          <SidebarContainer sx={{backgroundColor:'#DEF4F2'}}>
            <SidebarTop>
            <TopUnit></TopUnit>
            </SidebarTop>
            <SidebarList>
            {
         x.map((elm,ind)=>{
            return(
             <>
              <Sideunit_Patient key={ind} id={elm.id} name={elm["name"]} time={elm["time"]} status={elm["status"]}  setSelect={setSelect} selected={elm.id==select?true:''}></Sideunit_Patient>
             </>
            )
         })
       }
            </SidebarList>
          </SidebarContainer>
        </Grid>
        
        <Grid item xs={9} style={{ height: '100%', overflowY: 'scroll' }}>
        <DoctorAppCalender doctorId={tmpDocId}/>
          
         
        </Grid>
      </Grid>
    </div>
    
  )
}