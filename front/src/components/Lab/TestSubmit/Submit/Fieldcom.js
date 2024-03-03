import { Typography } from '@mui/material'
import React from 'react'

export default function Fieldcom({field,unit}) {
  return (
    <div style={{display:'flex',height:'40px',width:'100%'}}>
        <Typography sx={{fontSize:'15px',flex:6}}>{field}</Typography>
        <input style={{width:'40px',height:'20px',flex:1,borderRadius:'3px',border:'1px solid blue'}}></input>
        <Typography sx={{ml:'10px',fontSize:'14px',flex:1}}>{unit}</Typography>
    </div>
  )
}
