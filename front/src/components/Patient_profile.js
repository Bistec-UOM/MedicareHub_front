import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseURL, endPoints } from '../Services/Doctor'
import { Card, Toolbar, Typography } from '@mui/material'
import { Load, SearchBarSM } from './Common'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/system'

export default function Patient_profile() {

    const [loading,setLoading] = useState(true)
    const [patientList,setPatientList] = useState([])
    const [mode,setMode] = useState(1)//  1-> list    2-> profile
    const [selectedPatient,setSelectedPatient] = useState()

  useEffect(() => {
    axios.get(baseURL+endPoints.PROFILE)
    .then((res)=>{
        setLoading(false)
        setPatientList(res.data)
    })
    .catch((err)=>{
        setLoading(false)
        console.log(err)
    })
  })

  const ViewPatientProfile=(ind)=>{
      setSelectedPatient(patientList[ind])
      setMode(2)
  }

   //filtered Rload data by the search===========================================
   const [filter, setFilter] = useState('');
   const filteredPatient = patientList.filter(item => item.fullName.toLowerCase().includes(filter.toLowerCase()))
 

  return (
    <div>
    <Toolbar sx={{justifyContent:'space-between',width:'70%',backgroundColor:'white',position:'absolute',top:'64px'}}>
        {mode==1?<SearchBarSM height='1px' placeholder="Search Patients" value={filter} onChange={(e)=>setFilter(e.target.value)}></SearchBarSM>:<ArrowBackIcon sx={{cursor:'pointer'}} onClick={()=>setMode(1)}></ArrowBackIcon>}
    </Toolbar>
    {mode==1?<Box sx={{pt:'70px'}}>
    {!loading?filteredPatient.map((row,ind) => (
    <Card 
    sx={{width:'90%',marginTop:"5px",marginLeft:"20px",marginRight:"20px",height:'40px',display:'flex',alignItems:'center',cursor:'pointer'}}
    key={ind} onClick={()=>ViewPatientProfile(ind)}
    >
    <Typography sx={{flex:3,ml:'20px'}}>{row.fullName}</Typography>
    <Typography sx={{flex:1}}>{row.gender}</Typography>
    <Typography sx={{flex:1}}>{row.dob}</Typography>
    </Card>
    )):<Box sx={{mt:'80px'}}>
        <Load></Load>
    </Box>}
    </Box>:<Box sx={{pt:'64px'}}>
        <Patient_profile_detail Pdata={selectedPatient}></Patient_profile_detail>
        </Box>}
    </div>
  )
}

const Patient_profile_detail = ({Pdata}) => {
    return (
        <div>
            <Box>
            <Typography>Name: {Pdata.name}</Typography>
            <Typography>NIC: {Pdata.nic}</Typography>
            <Typography>Gender: {Pdata.gender}</Typography>
            <Typography>Age: {Pdata.dob}</Typography>
            </Box>
        </div>
    )
}