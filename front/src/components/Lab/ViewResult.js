import { Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ScienceIcon from '@mui/icons-material/Science';
import { Box } from '@mui/system';
import axios from 'axios';
import { baseURL,endPoints } from '../../Services/Lab';
import { setHeaders } from '../../Services/Auth';

export default function ViewResult({id}) {

  const [data,setData]=useState([]) 
  const [done,setDone]=useState(false)
  const [open,setOpen]=useState([])

  const handleView=(ind,status)=>{
    let tmp=[...open]
    tmp[ind]=status
    setOpen(tmp)
  }

  useEffect(()=>{
    axios.get(baseURL+endPoints.RESULT+`?Pid=${id}`,setHeaders())
    .then((res)=>{
      setData(res.data)
      setDone(true)
      let tmp=[]//assigning hide-view status for each report
      if(res.data.length>1){
        res.data.forEach((el,ind)=>{
          tmp.push(false)
        })
      }else{
        tmp.push(true)
      }
      setOpen(tmp)
    })
    .catch((er)=>{
      console.log(er.message)
    })
  })

  return (
    <div>
      {done ? data.map((el,ind) => {
        return (
        <Box>
          <Paper square sx={{p:'5px',display:'flex',justifyContent:'space-between',pr:'10px'}}>
            <div style={{display:'flex',alignItems:'start'}}>
              <ScienceIcon fontSize='small' sx={{color:'#438ad1',mr:'5px'}}></ScienceIcon>
              <Typography>{el.testName}</Typography>
            </div>
            {open[ind]?<VisibilityOffIcon sx={{cursor:'pointer'}} onClick={()=>handleView(ind,false)}></VisibilityOffIcon>:<RemoveRedEyeIcon sx={{cursor:'pointer'}} onClick={()=>handleView(ind,true)}></RemoveRedEyeIcon>}
          </Paper>
          <Box sx={{p:'8px'}}>
            {open[ind] ? el.results.map((elm,indx)=>{
              return (
                <Field field={elm.fieldname} unit={elm.unit} value={elm.value} status={elm.status} min={elm.minRef} max={elm.maxRef}></Field>
              )
            }) : ''}
          </Box>
        </Box>
        )
      }) : ''}
    </div>
  )
}


function Field({field,unit,value,status,min,max}) {

  const statColor=()=>{
    if(status=='low'||status=='high'){
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
      alignItems:'center',
      borderBottom:'1px solid lightgrey',
      }}
    >
        <Typography sx={{fontSize:'15px',flex:5}}>{field}</Typography>
        <Typography sx={{fontSize:'12px',flex:3,color:'grey'}}>{min}-{max}</Typography>
        <Typography sx={{fontSize:'15px',flex:1,fontWeight:'bold'}}>{value}</Typography>
        <Typography sx={{ml:'5px',fontSize:'14px',flex:1,mr:'10px'}}>{unit}</Typography>
        <FiberManualRecordIcon fontSize='5px' sx={{color:statColor()}} ></FiberManualRecordIcon>
    </div>
  )
}
