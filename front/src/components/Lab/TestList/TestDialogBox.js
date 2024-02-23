import React, {useState } from 'react'
import { Button, TextField } from '@mui/material'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

export default function TestDialogBox({test,setPage}) {

  const [isDisabled,setIsDisabled]=useState(true)

  return (
    <div style={{padding:'20px',display:'flex',flexDirection:'column'}}>
        <TextField disabled={isDisabled} label="Name" margin="dense" value={test.testName}/>
        <TextField disabled={isDisabled} label="Provider" margin="dense" value={test.provider}/>
        <TextField disabled={isDisabled} label="Price" margin="dense" value={test.price}/>
        <div style={{paddingTop:'10px',display:'flex',justifyContent:'flex-end',alignItems:'center'}} >
          {
            isDisabled==false?<Button sx={{ml:'20%',height:'25px'}} variant='contained' startIcon={<DashboardCustomizeIcon></DashboardCustomizeIcon>}  onClick={()=>setPage(4)}></Button>:''
          }
          <Button sx={{ml:'10%'}} variant='contained' onClick={()=>setIsDisabled(false)}>{isDisabled?'Edit':'Save'}</Button>
        </div>
    </div>
  )
}
