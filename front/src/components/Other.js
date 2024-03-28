import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const Load=()=> {
  return (
    <div style={{display:'flex',justifyContent:'center',width:'100%'}}>
    <CircularProgress></CircularProgress>
    </div>
  )
}


export {Load}