import React, {useState } from 'react'
import { Button, TextField } from '@mui/material'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import axios from 'axios'


export default function TestDialogBox({test,setPage,setTload,handleClose}) {

  const [testName,settestName]=useState(test.testName)
  const [provider,setProvider]=useState(test.provider)
  const [price,setPrice]=useState(test.price)

  const saveButtonAction=()=>{
    if(isDisabled){
      setIsDisabled(false)
    }else{
      let obj={
        id:test.id,
        testName:testName,
        abb:test.abb,
        price:price,
        provider:provider
      }
      axios.put('http://localhost:5220/api/Test',obj)
      .then(res=>{
        setTload([])//make test list empty to reload again
        handleClose()
      })
    }
  }

  const [isDisabled,setIsDisabled]=useState(true)

  return (
    <div style={{padding:'20px',display:'flex',flexDirection:'column'}}>
        <TextField disabled={isDisabled} label="Name" margin="dense" value={testName} onChange={(e)=>settestName(e.target.value)}/>
        <TextField disabled={isDisabled} label="Provider" margin="dense" value={provider} onChange={(e)=>setProvider(e.target.value)}/>
        <TextField disabled={isDisabled} label="Price" margin="dense" value={price} onChange={(e)=>setPrice(e.target.value)}/>
        <div style={{paddingTop:'10px',display:'flex',justifyContent:'flex-end',alignItems:'center'}} >
          {
            isDisabled==false?<Button sx={{ml:'20%',height:'25px'}} variant='contained' startIcon={<DashboardCustomizeIcon></DashboardCustomizeIcon>}  onClick={()=>setPage(4)}></Button>:''
          }
          <Button sx={{ml:'10%'}} variant='contained' onClick={saveButtonAction}>{isDisabled?'Edit':'Save'}</Button>
        </div>
    </div>
  )
}
