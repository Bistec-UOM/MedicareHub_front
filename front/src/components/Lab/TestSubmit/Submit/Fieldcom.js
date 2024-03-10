import { Typography } from '@mui/material'
import React from 'react'

export default function Fieldcom({field,unit,value,enterData,indx}) {
  return (
    <div style={{display:'flex',height:'30px',width:'100%'}}>
        <Typography sx={{fontSize:'15px',flex:6}}>{field}</Typography>
        <input type='number' style={{width:'80px',height:'20px',flex:1,borderRadius:'3px',border:'1px solid blue'}} onChange={(e)=>enterData(indx,e.target.value)} value={value}></input>
        <Typography sx={{ml:'10px',fontSize:'14px',flex:2,color:'gray'}}>{unit}</Typography>
    </div>
  )
}
