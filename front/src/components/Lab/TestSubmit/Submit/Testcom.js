import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
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
    <Box sx={{p:'10px'}}>
      <Typography>{test[0].test}</Typography>
      {
        !loading ? Fload.map((el)=>{
          return <Fieldcom field={el.fieldname} unit={el.unit}></Fieldcom>
        }) : ''
      }
      <Button variant='contained'onClick={submitData}>Clear</Button>
      <Button variant='contained'onClick={submitData}>Submit</Button>
    </Box>
  )
}
