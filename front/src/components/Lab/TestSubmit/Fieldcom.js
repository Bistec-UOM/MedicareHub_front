import { TextField, Typography } from '@mui/material'
import React from 'react'

export default function Fieldcom({field,unit}) {
  return (
    <div style={{display:'flex',height:'40px',width:'80%'}}>
        <Typography sx={{fontSize:'16px',flex:3}}>{field}</Typography>
        <input style={{width:'40px',height:'20px',flex:1,borderRadius:'3px',border:'1px solid blue'}}></input>
        <Typography sx={{ml:'10px',fontSize:'16px',flex:1}}>{unit}</Typography>
    </div>
  )
}
