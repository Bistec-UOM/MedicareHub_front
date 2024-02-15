import React , { useState } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import {Card, CardContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { Grid, Typography } from '@mui/material'

export default function LabRequest(props) {
  const { setShowForm } = props;  
  const [pres, setPres] = useState([]);
  const [name, setName] = useState('');

  const handleClose = () => {
    setShowForm(false);
    setPres([]);
  };
 
  const handleAddLabRequest = () => {
    const newDrug = { name };
    setPres([...pres, newDrug]);
    setName('');
    
};
const handleDeleteLabRequest = (index) => {
  const updatedPres = [...pres];
  updatedPres.splice(index, 1);
  setPres(updatedPres);
};

  return (
    <div>
    <Card elevation={3} style={{ marginBottom:'50px',width:'45%',height: '70px', marginLeft: '20px',}}>
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
          value={name} onChange={(e) => setName(e.target.value)}
        />
        
        <Button variant="outlined" sx={{top: '10px', color: 'Green', borderColor: 'Green', borderWidth: '3px' }}  onClick={handleAddLabRequest}>
          OK
        </Button>        
      </form>      
      </CardContent>
      </Card>      
      <div>
      {pres.map((drug, index) => (
      <Grid key={index} container spacing={1} sx={{ marginTop: "5px",}}>
                        <Grid item xs={4}>
                            <Card sx={{ backgroundColor: '#48EC4F', color: 'white', fontSize: '19px',height:'32px',marginleft:'90%',}}>
                                <Typography gutterBottom variant="p" sx={{ marginLeft: '15px',}}>{drug.name}</Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <DoNotDisturbOnIcon sx={{ color: 'red', fontSize: '30px', float: 'Left' }}  onClick={() => handleDeleteLabRequest(index)}/>
                        </Grid>
                    </Grid>
      ))}
      </div>      
      </div>
   
  );
}
