import { Typography } from '@mui/material'
import React from 'react'
import LensIcon from '@mui/icons-material/Lens';

export default function Fieldcom({field,unit,value,status,enterData,indx}) {

  const statColor=()=>{
    if (status==null){
      return 'grey'
    }else if(status=='low'||status=='high'){
      return 'red'
    }else{
      return 'lime'
    }
  }

  return (
    <div style={{
      display:'flex',
      width:'100%'
      }}
    >
        <Typography sx={{fontSize:'15px',flex:6}}>{field}</Typography>
        
        <input type='number' 
          style={{
            width:'80px',
            height:'20px',
            flex:1,
            borderRadius:'3px',
            border:'1px solid blue'
            }} 
          onChange={(e)=>enterData(indx,e.target.value)} 
          value={value}
        ></input>
        
        <Typography sx={{ml:'10px',fontSize:'14px',flex:1,color:'grey'}}>{unit}</Typography>
        <LensIcon fontSize='5px' sx={{color:statColor()}} ></LensIcon>
    </div>
  )
}
