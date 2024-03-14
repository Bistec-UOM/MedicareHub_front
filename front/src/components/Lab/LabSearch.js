import React from 'react'
import {Card, Typography, Paper, IconButton, Divider, InputBase } from '@mui/material'
import {useEffect, useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ViewListIcon from '@mui/icons-material/ViewList';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function LabSearch({setPage,setDate,date,query,setQuery}) {
  return (
      <div style={{display:'flex',justifyContent:'space-between'}}>

      <ViewListIcon sx={{cursor:'pointer',ml:'10px'}} onClick={()=>setPage(5)}></ViewListIcon>

      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
    
      {/* ----------date navigator-------------------------------------- */}
      <div style={{display:'flex',justifyContent:'center'}}>
          <ArrowBackIosIcon fontSize='small' sx={{mr:'15px',cursor:'pointer'}} onClick={()=>setDate(date-1)}></ArrowBackIosIcon>
          <Typography sx={{fontSize:'14px',mb:'6px'}}>2{date} Nov 2024</Typography>
          <ArrowForwardIosIcon fontSize='small' sx={{ml:'15px',cursor:'pointer'}} onClick={()=>setDate(date+1)}></ArrowForwardIosIcon>
      </div>
  
    {/*---------------------searchbar---------------------------------------*/}
     <Paper component="form"
     sx={{p:2.3,display: "flex",alignItems: "center",height:'40px',width: "90%",borderRadius: "13px",
       boxShadow: 1}}>
    
     <InputBase type="text" className="form-control" sx={{ flex: 1 }} placeholder="Search by Patient" value={query}  onChange={(e)=>setQuery(e.target.value)}/>
     <Divider sx={{ height: 20,position:'relative',left:'10px'}} orientation="vertical" />
     <IconButton type="button"  aria-label="search">
       <SearchIcon sx={{position:'relative',left:'10px'}}/>
     </IconButton>
     </Paper>  
     </div>

     <InsertDriveFileIcon sx={{cursor:'pointer',mr:'10px'}} onClick={()=>setPage(2)}></InsertDriveFileIcon>

    </div>
  )
}
