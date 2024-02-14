import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

export default function TestDialogBox({data,setPage}) {

  const [isDisabled,setIsDisabled]=useState(true)

  return (
    <div>
        <TextField disabled={isDisabled} label="Name" margin="dense" value={data.name}/>
        <TextField disabled={isDisabled} label="Name" margin="dense" value={data.provider}/>
        <TextField disabled={isDisabled} label="Name" margin="dense" value={data.price}/>
        <Button variant='contained' onClick={()=>setIsDisabled(false)}>{isDisabled?'Edit':'Save'}</Button>
        <Button variant='contained' startIcon={<DashboardCustomizeIcon></DashboardCustomizeIcon>} onClick={()=>setPage(4)}></Button>
    </div>
  )
}
