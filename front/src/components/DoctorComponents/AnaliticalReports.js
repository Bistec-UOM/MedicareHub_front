import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

export default function AnaliticalReports(props) {
  
    const {openAreports,setOpenAreports} = props;
    
  const handleClose = () => {
    setOpenAreports(false);
  };
  return (
    <div>
      <Dialog open={openAreports}>
      <CloseIcon onClick={handleClose} style={{ position: 'absolute', right: '8px', top: '8px', cursor: 'pointer' }} />
        <DialogTitle sx={{ m: 0, p: 2 }}>PATIENT ANALITICAL RECORDS</DialogTitle>
        <DialogContent dividers  sx={{ maxHeight: '500px', overflowY: 'auto' }}>
          <Typography>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
          <Typography>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
                
         </DialogContent>
      </Dialog>
    </div>
  );
}
