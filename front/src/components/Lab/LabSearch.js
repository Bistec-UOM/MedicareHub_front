import React, { useEffect } from 'react'
import {Typography} from '@mui/material'
import {useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ViewListIcon from '@mui/icons-material/ViewList';
import ScienceIcon from '@mui/icons-material/Science';
import { SearchBarSM } from '../Common';

export default function LabSearch({setPage,setDate,query,setQuery}) {

  const [dt,setDt]=useState(new Date())
  const [fDt,setFDt]=useState(`${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}`)

  const incrementDate=()=>{
    dt.setDate(dt.getDate() + 1);
    let tmp=`${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}`
    setFDt(tmp)
    setDate(tmp)
  }

  const decerementDate=()=>{
    dt.setDate(dt.getDate() - 1);
    let tmp=`${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}`
    setFDt(tmp)
    setDate(tmp)
  }


  return (
      <div style={{display:'flex',justifyContent:'space-between'}}>

      <ViewListIcon sx={{cursor:'pointer',ml:'10px'}} onClick={()=>setPage(5)}></ViewListIcon>

      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
    
      {/* ----------date navigator-------------------------------------- */}
      <div style={{display:'flex',justifyContent:'center'}}>
          <ArrowBackIosIcon fontSize='small' sx={{mr:'15px',cursor:'pointer'}} onClick={decerementDate}></ArrowBackIosIcon>
          <Typography sx={{fontSize:'14px',mb:'6px'}}>{fDt}</Typography>
          <ArrowForwardIosIcon fontSize='small' sx={{ml:'15px',cursor:'pointer'}} onClick={incrementDate}></ArrowForwardIosIcon>
      </div>
  
    {/*---------------------searchbar---------------------------------------*/}
     <SearchBarSM value={query}  onChange={(e)=>setQuery(e.target.value)} placeholder="Search patients"></SearchBarSM>
     </div>

     <ScienceIcon sx={{cursor:'pointer',mr:'10px'}} onClick={()=>setPage(2)}></ScienceIcon>

    </div>
  )
}
