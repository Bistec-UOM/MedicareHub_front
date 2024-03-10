import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import { Button, Divider, Typography } from '@mui/material';
import axios from 'axios';
import Fieldcom from './Fieldcom';

export default function Testcom({test,handleClose}) {

  const [Fload,setFload]=useState([])//field set according to the needed test
  const [loading,setloading]=useState(true)

  const enterData=(indx,x)=>{
    let tmp=[...Fload]
    tmp.map((el,ind)=>{
      if(ind==indx){
       el.value=x
      }
    })
    console.log(tmp)
    setFload(tmp)
  }

  useEffect(()=>{
    axios.get('http://localhost:7205/api/Template/'+`${test[0].testId}`)
    .then(res=>{
      setFload(res.data)

      //Adding value property to every object in Fload
      let tmp=[...res.data]
      tmp.map((el,ind)=>{
        let tmp2={...el}
        tmp2.value=''
        tmp[ind]=tmp2
      })
      setFload(tmp)

      setloading(false)
    })
    .catch(er=>{})
  },[])

  const submitData=()=>{
    handleClose()
  }
  return (
    <Box sx={{p:'10px',width:'450px'}}>
      <Typography>{test[0].test} Test</Typography>
      <Divider></Divider>
      {
        !loading ? Fload.map((el,indx)=>{
          return <Fieldcom field={el.fieldname} unit={el.unit} value={el.value} indx={indx} enterData={enterData}> </Fieldcom>
        }) : ''
      }
    <Box sx={{display:'flex',flexDirection:'row-reverse',alignItems:'center'}}>
        <Button variant='contained'onClick={submitData} size='small' sx={{ml:'10px'}}>Submit</Button>
        <Button variant='outlined'onClick={submitData} size='small' >Clear</Button>
    </Box>
    </Box>
  )
}
