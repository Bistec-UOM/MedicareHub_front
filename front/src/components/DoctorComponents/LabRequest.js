import React from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import {Card, CardContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

export default function LabRequest(props) {
  const { setShowForm } = props;   
  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <Card elevation={3} style={{ marginBottom: '5px',width:'45%',height: '70px', marginLeft: '20px', }}>
    <CardContent>
    <IconButton
              sx={{ position: 'absolute', left:'57%',}}
              onClick={handleClose}
            >
            <CloseIcon />
            </IconButton>
      <form sx={{marginLeft: 'auto',}} >        
        <TextField
          variant="outlined"
          size="small"
          sx={{
            m: 1,
            width: '75%',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#0099cc',
                borderWidth: '2px',
                borderRadius: '25px',
              },
            },
          }}
          placeholder="Enter Lab Request"
        />
         <SearchIcon
              sx={{
              position: 'absolute',
              left:'49%', 
              top:'52%',            
              cursor: 'pointer',
              }}
            />
        <Button variant="outlined" sx={{ top: '10px', color: 'Green', borderColor: 'Green', borderWidth: '3px' }}>
          OK
        </Button>        
      </form>      
      </CardContent>
      </Card>
   
  );
}
