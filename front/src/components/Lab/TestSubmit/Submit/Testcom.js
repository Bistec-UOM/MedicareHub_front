import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import { Button, Divider, Typography } from '@mui/material';
import axios from 'axios';
import Fieldcom from './Fieldcom';

export default function Testcom({test,handleClose}) {

  const [Fload,setFload]=useState([])//field set according to the needed test
  const [loading,setloading]=useState(true)

  useEffect(()=>{
    axios.get('http://localhost:5220/api/Template/'+`${test[0].testId}`)
    .then(res=>{setFload(res.data);setloading(false);console.log(res.data)})
    .catch(er=>{})
  },[])

  const submitData=()=>{
    handleClose()
  }
  return (
    <Box sx={{p:'10px',width:'300px'}}>
      <Typography>{test[0].test} Test</Typography>
      {
        !loading ? Fload.map((el)=>{
          return <Fieldcom field={el.fieldname} unit={el.unit}></Fieldcom>
        }) : ''
      }
    <Divider></Divider>
    <Box sx={{display:'flex',flexDirection:'row-reverse',alignItems:'center'}}>
        <Button variant='contained'onClick={submitData} size='small'>Submit</Button>
        <Button variant='outlined'onClick={submitData} size='small'>Clear</Button>
    </Box>
    </Box>
  )
}
