import React from 'react'
import Dialog from '@mui/material/Dialog';
import { TextField } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';

import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
export default function DoctorAddDrugs(props) {
    const { openBox, setOpenBox } = props;
    
    const handleClose = () => {
      setOpenBox(false);
    };
  return (
    <div>
        <Dialog open={openBox}>
        <DialogContent dividers  sx={{ maxHeight: '500px',}}>
      <CloseIcon onClick={handleClose} style={{ position: 'absolute', right: '8px', top: '8px', cursor: 'pointer' }} />
      <TextField variant="outlined" size="small" sx={{ m: 1,width:'45%',top: '10px',}}/>
      <TextField   variant="outlined" size="small" sx={{ m: 1,width:'10%',top: '10px',}}/>
            
        <Select sx={{ m: 1 ,top: '10px',  border: '1px solid #ced4da',width:'55px',height: '40px',}} variant="standard" >
          <MenuItem value="BD">           
          </MenuItem>
          <MenuItem value={10}>BD</MenuItem>
          <MenuItem value={20}>BD</MenuItem>
          <MenuItem value={30}>BD</MenuItem>
        </Select>
        
            
        <Select sx={{ m: 1 ,top: '10px',  border: '1px solid #ced4da',width:'50px',height: '40px',}} variant="standard">
          <MenuItem value="mg">           
          </MenuItem>
          <MenuItem value={10}>mg</MenuItem>
          <MenuItem value={20}>mg</MenuItem>         
        </Select>
      
           
        <Button variant="outlined" sx={{top: '10px',color:'Green', borderColor: 'Green', borderWidth: '3px', }} >OK</Button> 

       
         </DialogContent>
      </Dialog>
      
    </div>
  )
}
