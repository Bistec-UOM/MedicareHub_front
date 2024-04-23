import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Doctor_analytics from '../Doctor_analytics';

export default function AnaliticalReports(props) {
  
    const {openAreports,setOpenAreports,pId} = props;

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

      <Dialog open={openAreports} maxWidth="md">
        <DialogTitle sx={{ backgroundColor: "#438ad1",color:'white',display: "flex",justifyContent: "space-between"}}>Patient Analytics
        <CloseIcon onClick={handleClose} style={{cursor: 'pointer' }} />
        </DialogTitle>
        <DialogContent dividers>
          {load?<Doctor_analytics pId={pId}></Doctor_analytics>:''}
         </DialogContent>
      </Dialog>

  );
}
