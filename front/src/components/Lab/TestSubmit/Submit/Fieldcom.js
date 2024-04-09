import { Typography } from '@mui/material'
import React from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function Fieldcom({field,unit,value,status,min,max,enterData,indx}) {

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
      width:'100%',
      marginT:'2px',
      marginBottom:'5px',
      alignItems:'center'
      }}
    >
        <Typography sx={{fontSize:'15px',flex:5}}>{field}</Typography>
        <Typography sx={{fontSize:'12px',flex:3,color:'grey'}}>{min}-{max}</Typography>
        
        <input type='text' 
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
        
        <Typography sx={{ml:'5px',fontSize:'14px',flex:1,mr:'10px'}}>{unit}</Typography>
        <FiberManualRecordIcon fontSize='5px' sx={{color:statColor()}} ></FiberManualRecordIcon>
    </div>
  )
}
