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

function Sideunit_Test({id,name,test,setSelect}) {
    return (
      <div style={{width:'90%',backgroundColor:'beige',marginTop:'5px'}} onClick={()=>setSelect(id)}>
          <Typography sx={{fontSize:'16px'}}>{name}</Typography>
          {
            test.map((el)=>{
              return(
              <div key={el} style={{display:'inline',border:'1px solid black',paddingLeft:'4px',paddingLeft:'4px',borderRadius:'15px',marginLeft:'4px'}}>{el}</div>
              )
            })
          }
      </div>
    )
}

export {Sideunit_Doctor,Sideunit_Patient,Sideunit_Test}