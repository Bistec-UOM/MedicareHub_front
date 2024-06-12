import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Doctor_analytics from '../Doctor_analytics';

export default function AnaliticalReports(props) {
  
    const {openAreports,setOpenAreports,pId} = props;
    
  const handleClose = () => {
    setOpenAreports(false);
  };
  return (

      <Dialog open={openAreports} maxWidth="md">
        <DialogTitle sx={{ backgroundColor: "#438ad1",color:'white',display: "flex",justifyContent: "space-between"}}>Patient Analytics
        <CloseIcon onClick={handleClose} style={{cursor: 'pointer' }} />
        </DialogTitle>
        <DialogContent dividers>
          <Doctor_analytics pId={pId}></Doctor_analytics>
         </DialogContent>
      </Dialog>

  );
}
