import React from 'react'
import Dialog from '@mui/material/Dialog';
import { TextField } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';

export default function DoctorAddDrugs(props) {
    const { openBox, setOpenBox } = props;
    
    const handleClose = () => {
      setOpenBox(false);
    };
  return (
    <div >
        <Dialog open={openBox} >
        <DialogContent dividers  sx={{'&::before': {
              content: "''",
              position: 'absolute',
              top: 0,
              right: 0,
              width: '35px',
              height: '100%',
              background: 'hsl(0, 0%, 90%)',
            },}}>
      <CloseIcon onClick={handleClose} style={{ position: 'absolute', right: '8px', top: '8px', cursor: 'pointer',}} />
      <SearchIcon
              sx={{
                position: 'absolute',
               left: '41%',
                top: '43px',
                cursor: 'pointer',
              }}
            />
      <TextField variant="outlined" size="small" sx={{ m: 1,width:'45%',top: '10px', '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#0099cc',  // Change to your desired border color
        borderWidth: '2px',
        borderRadius:'25px',  
      },
    },}}/>
   

      <TextField   variant="outlined" size="small" sx={{ m: 1,width:'10%',top: '10px',
     '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#0099cc',
        borderWidth: '2px',  
      },
    },
    }}/>
            
        <Select sx={{ m: 1 ,top: '10px',  border: '2px solid #0099cc',width:'55px',height: '40px',}} variant="standard" >         
          <MenuItem value={10}>BD</MenuItem>
          <MenuItem value={20}>BD</MenuItem>
          <MenuItem value={30}>BD</MenuItem>
        </Select>      
            
        <Select sx={{ m: 1 ,top: '10px',border: '2px solid #0099cc',width:'50px',height: '40px',}} variant="standard">         
          <MenuItem value={10}>mg</MenuItem>
          <MenuItem value={20}>mg</MenuItem>         
        </Select>                
        <Button variant="outlined" sx={{top: '10px',color:'Green', borderColor: 'Green', borderWidth: '3px', }} >OK</Button>        
         </DialogContent>
      </Dialog>
      
    </div>
  )
}
