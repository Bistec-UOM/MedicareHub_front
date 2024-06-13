import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { baseURL, endPoints } from '../Services/Doctor'
import { Card, Toolbar, Typography } from '@mui/material'
import { Load, SearchBarSM } from './Common'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/system'
import { setHeaders } from '../Services/Auth'
import PrintIcon from '@mui/icons-material/Print';
import html2pdf from 'html2pdf.js';

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
  },[])

  const ViewPatientProfile=(id)=>{
    console.log(patientList.filter(item=>item.id==id))
      setSelectedPatient(patientList.filter(item=>item.id==id))
      setMode(2)
  }

   //filtered Rload data by the search===========================================
   const [filter, setFilter] = useState('');
   const filteredPatient = patientList.filter(item => item.fullName.toLowerCase().includes(filter.toLowerCase()))
 

   const elementRef = useRef();

   const exportAsPDF = async () => {
    const element = elementRef.current;
    const options = {
      margin: 0.3,
      filename: 'Medical Report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(options).save();
   }

  return (
    <div>
    <Toolbar sx={{justifyContent:'space-between',width:'70%',backgroundColor:'white',position:'absolute',top:'64px'}}>
        {mode==1?<SearchBarSM height='1px' placeholder="Search Patients" value={filter} onChange={(e)=>setFilter(e.target.value)}></SearchBarSM>:<div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
            <ArrowBackIcon sx={{cursor:'pointer'}} onClick={()=>setMode(1)}></ArrowBackIcon>
            <PrintIcon sx={{cursor:'pointer'}} onClick={exportAsPDF}></PrintIcon>
        </div>}
    </Toolbar>
    {mode==1?<Box sx={{pt:'70px'}}>
    {!loading?filteredPatient.map((row,ind) => (
    <Card 
    sx={{width:'90%',marginTop:"5px",marginLeft:"20px",marginRight:"20px",height:'40px',display:'flex',alignItems:'center',cursor:'pointer'}}
    key={ind} onClick={()=>ViewPatientProfile(row.id)}
    >
    <Typography sx={{flex:3,ml:'20px'}}>{row.fullName}</Typography>
    <Typography sx={{flex:1}}>{row.gender}</Typography>
    <Typography sx={{flex:1}}>{row.dob}</Typography>
    </Card>
    )):<Box sx={{mt:'80px'}}>
        <Load></Load>
    </Box>}
    </Box>:<Box sx={{pt:'64px'}}>
        <Patient_profile_detail Pdata={selectedPatient[0]} elementRef={elementRef}></Patient_profile_detail>
        </Box>}
    </div>
  )
}

const Patient_profile_detail = ({Pdata,elementRef}) => {

    const [drugs,setDrugs] = useState([])
    const [reports,setReports] = useState([])
    const [loading, setLoaidng] = useState(true)


    useEffect(()=>{
        axios.get(baseURL+endPoints.REC+`?Pid=${Pdata.id}`,setHeaders())
        .then((res)=>{
            setLoaidng(false)
            let filteredDrugs = res.data.drgs.filter(item => item.drugs.length > 0);
            filteredDrugs = filteredDrugs.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
            setDrugs(filteredDrugs)
            setReports(res.data.rprts)
            console.log(res.data)
        })
        .catch((er)=>{
            console.log(er)
            setLoaidng(false)
        })
    },[])

    return (
        <div style={{paddingLeft:'15px',paddingRight:'15px'}} ref={elementRef}>
            <Box sx={{borderBottom:'1px solid lightGrey',mb:'20px'}}>
            <Typography sx={{fontSize:'14px'}}>Full Name : {Pdata.fullName}</Typography>
            <Typography sx={{fontSize:'14px'}}>NIC : {Pdata.nic}</Typography>
            <Typography sx={{fontSize:'14px'}}>Gender : {Pdata.gender}</Typography>
            <Typography sx={{fontSize:'14px'}}>Age : {calculateAge(Pdata.dob)+' years'}</Typography>
            </Box>
            {loading?<Load></Load>:<Box>
            <Typography sx={{mb:'10px',fontWeight:"bold"}}>Drugs issued</Typography>
                {drugs.map((elm,ind)=>(
                    <DrugCard data={elm}></DrugCard>
                ))}
            <Typography sx={{mb:'10px',mt:'15px',fontWeight:"bold"}}>Lab reports</Typography>
                {reports.map((elm,ind)=>(
                    <LabCard data={elm}></LabCard>
                ))}
                </Box>}
        </div>
    )
}


const DrugCard = ({data}) => {
    return(
        <Box sx={{mb:'15px'}}>
            <Typography sx={{fontSize:'13px',backgroundColor:'#f5f6f7',color:'grey'}}>{data.dateTime.slice(0,10)}</Typography>
            {data.drugs.map((elm,ind)=>(<div style={{display:'flex',alignItems:'center'}}>
                <Typography sx={{fontSize:'14px',flex:'2'}}>{elm.genericN}</Typography>
                <Typography sx={{fontSize:'14px',flex:'1'}}>{elm.weight+' '}{elm.unit}</Typography>
                <Typography sx={{fontSize:'14px',flex:'1'}}>{elm.period}</Typography>
            </div>))}
        </Box>
    )
}

const LabCard =({data})=>{
    console.log(data)
    return(
        <Box sx={{mb:'15px'}}>
            <div style={{backgroundColor:'#f5f6f7',display:'flex'}}>
                <Typography sx={{fontSize:'13px',color:'grey'}}>{data.dateTime.slice(0,10)}</Typography>
                <Typography sx={{ml:'60px',fontSize:'13px',color:'grey'}}>{'['+data.testName+']'}</Typography>
            </div>
            {data.results.map((elm,ind)=>(
                <div style={{display:'flex',alignItems:'center'}}>
                    <Typography sx={{fontSize:'14px',flex:'3'}}>{elm.fieldname}</Typography>
                    <Typography sx={{fontSize:'14px',flex:'1'}}>{elm.value+' '+elm.unit}</Typography>
                    <Typography sx={{fontSize:'14px',flex:'1'}}>{elm.minRef+' - '+elm.maxRef}</Typography>
                    <Typography sx={{fontSize:'14px',flex:'1'}}>{elm.status}</Typography>
                </div>))
            }
        </Box>
    )
}

function calculateAge(dateString) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
  
    let age = currentDate.getFullYear() - givenDate.getFullYear();
    const monthDifference = currentDate.getMonth() - givenDate.getMonth();
    const dayDifference = currentDate.getDate() - givenDate.getDate();
  
    // Adjust age if the current date is before the given date's birthday in the current year
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
  
    return age;
  }