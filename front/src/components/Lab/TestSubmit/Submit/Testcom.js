import React from 'react'
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';

export default function Testcom({detail,Fload,handleClose}) {

  const submitData=()=>{
    handleClose()
  }
  return (
    <Box>
      <Typography>{detail}</Typography>
      <Typography>{Fload}</Typography>
      <Button variant='contained'onClick={submitData}>Submit</Button>
    </Box>
  )
}
