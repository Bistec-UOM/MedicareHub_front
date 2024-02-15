import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, Card, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';;
export default function PatientsRecords(props) {
  
    const {openPopup,setOpenPopup} = props;
    
  const handleClose = () => {
    setOpenPopup(false);
  };
  return (
    <div>
      <Dialog open={openPopup} maxWidth="xl">
      <CloseIcon onClick={handleClose} style={{ position: 'absolute', right: '8px', top: '8px', cursor: 'pointer' }} />
        <DialogTitle sx={{ m: 0, p: 2 ,}}>6 days ago</DialogTitle>
        <DialogContent dividers  sx={{ maxHeight: '500px', overflowY: 'auto' }}>
        <Grid container spacing={1} sx={{ marginTop: "5px",}}>
                        <Grid item xs={12}>
                            <Card sx={{m:1, backgroundColor: '#0099cc', color: 'white', fontSize: '19px',height:'30px', }}>
                                <Typography gutterBottom variant="p" sx={{ marginLeft: '10px', }}>name</Typography>
                                <Typography gutterBottom variant="p" sx={{ marginLeft: '100px', }}>quantity</Typography>
                                <Typography gutterBottom variant="p" sx={{ marginLeft: '150px', }}>hour</Typography>
                            </Card>
                            
                            <Card sx={{m: 2, backgroundColor: '#0099cc', color: 'white', fontSize: '19px',height:'30px', }}>
                                <Typography gutterBottom variant="p" sx={{ marginLeft: '10px', }}>name</Typography>
                                <Typography gutterBottom variant="p" sx={{ marginLeft: '100px', }}>quantity</Typography>
                                <Typography gutterBottom variant="p" sx={{ marginLeft: '150px', }}>hour</Typography>
                            </Card>
                            <Card sx={{m: 2, backgroundColor: '#0099cc', color: 'white', fontSize: '19px',height:'30px', }}>
                                <Typography gutterBottom variant="p" sx={{ marginLeft: '10px', }}>name</Typography>
                                <Typography gutterBottom variant="p" sx={{ marginLeft: '100px', }}>quantity</Typography>
                                <Typography gutterBottom variant="p" sx={{ marginLeft: '150px', }}>hour</Typography>
                            </Card>
                            <Card sx={{m: 2, backgroundColor: 'rgb(209, 224, 250)', color: 'blue', fontSize: '20px',height:'200px',width:'600px', }}>
                                                           
                              </Card> 
                        </Grid>                 
                             
                                          
                    </Grid>                  
         </DialogContent>
      </Dialog>
    </div>
  );
}
