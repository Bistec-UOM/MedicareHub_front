import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Doctor_analytics from '../Doctor_analytics';

export default function AnaliticalReports(props) {
  
    const {openAreports,setOpenAreports} = props;

    const [load,setLoad]=useState(false)

    useEffect(()=>{
      setTimeout(() => {
        setLoad(true)
      }, 4000);
    })
    
  const handleClose = () => {
    setOpenAreports(false);
  };
  return (
    <div>
      <Dialog open={openAreports}>
      <CloseIcon onClick={handleClose} style={{ position: 'absolute', right: '8px', top: '8px', cursor: 'pointer' }} />
        <DialogTitle sx={{ m: 0, p: 2 }}>PATIENT ANALITICAL RECORDS</DialogTitle>
        <DialogContent dividers  sx={{height: '350px', overflowY: 'auto' }}>
          {load?<Doctor_analytics></Doctor_analytics>:''}
         </DialogContent>
      </Dialog>
    </div>
  );
}
