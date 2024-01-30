import React from 'react'
import {Card, Typography, Paper, IconButton, Divider, InputBase } from '@mui/material'
import {useEffect, useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ViewListIcon from '@mui/icons-material/ViewList';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function LabSearch({setPage}) {
  return (
      <div style={{display:'flex',justifyContent:'space-between'}}>

      <ViewListIcon sx={{cursor:'pointer'}}></ViewListIcon>

      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
    
      {/* ----------date navigator-------------------------------------- */}
      <div style={{display:'flex',justifyContent:'center'}}>
          <ArrowBackIosIcon fontSize='small' sx={{mr:'15px',cursor:'pointer'}}></ArrowBackIosIcon>
          <Typography sx={{fontSize:'14px',mb:'6px'}}>21 Nov 2024</Typography>
          <ArrowForwardIosIcon fontSize='small' sx={{ml:'15px',cursor:'pointer'}}></ArrowForwardIosIcon>
      </div>
  
    {/*---------------------searchbar---------------------------------------*/}
     <Paper component="form"
     sx={{p: "2px 4px",display: "flex",alignItems: "center",height:'30px',width: "90%",borderRadius: "20px",
       boxShadow: 1}}>
    
     <InputBase type="text" className="form-control" sx={{ flex: 1 }} placeholder="Search"/>
     <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
     <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
       <SearchIcon />
     </IconButton>
     </Paper>  
     </div>

     <InsertDriveFileIcon sx={{cursor:'pointer'}} onClick={()=>setPage(2)}></InsertDriveFileIcon>

    </div>
  )
}
