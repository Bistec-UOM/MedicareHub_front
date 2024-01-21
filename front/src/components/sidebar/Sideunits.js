import React from 'react'
import Typography from '@mui/material/Typography'
import { Chip } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import Divider from '@mui/material/Divider';

function Sideunit_Doctor({name,title}) {
  return (
    <div style={{width:'90%',margin:'3px'}}>
        <Typography sx={{color:'black'}} variant='h6'>Dr. {name}</Typography>
        <p style={{color:'#9F9D9D'}}>{title}</p>
        <Divider variant="middle" />
    </div>
  )
}

function Sideunit_Patient({name,status,time}) {
    return (
      <div style={{width:'90%',backgroundColor:'beige'}}>
          <Typography variant='h6'>{name}</Typography>
          <div>
                  <Chip>{time}</Chip>
                  {status=='done'||status=='pending'?<CheckIcon color={status=='done'?'success':'warning'}></CheckIcon>:''}
          </div>
      </div>
    )
}

function Sideunit_Test({name,test}) {
    return (
      <div style={{width:'90%',backgroundColor:'beige'}}>
          <Typography variant='h5'>{name}</Typography>
          <p>{test}</p>
      </div>
    )
}

export {Sideunit_Doctor,Sideunit_Patient,Sideunit_Test}