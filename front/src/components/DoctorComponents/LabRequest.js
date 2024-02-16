import React , { useState } from 'react';
import { TextField, Button, IconButton, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { Grid, Typography,Card } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';


export default function LabRequest(props) {
  const { openpopBox, setOpenpopBox } = props;
   
  const [rep, setrep] = useState([]);
  const [name, setName] = useState('');

  const handleClose = () => {
    setOpenpopBox(false);   
  };
 
 
  //error
  const handleAddLabRequest = () => {
    const newRep = { name };
    setrep([...rep, newRep]);
    setName('');
    // setOpen(true)
    
};
const handleDeleteLabRequest = (index) => {
  const updatedrep = [...rep];
  updatedrep.splice(index, 1);
  setrep(updatedrep);
};

  return (
    <div>
       <Dialog open={openpopBox}>
      <DialogContent dividers 
                    sx={{ '&::before': { content: "''", position: 'absolute', top: 0, right: 0, width: '35px', height: '100%', background: 'hsl(0, 0%, 90%)', }, }}>
    
    <IconButton
              sx={{ position: 'absolute', left:'87%',}}
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
            width: '65%',
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
     </DialogContent>  
     
      </Dialog>
 
     <div >
      {rep.map((drug, index) => (
      <Grid key={index} container spacing={1} sx={{ marginTop: "5px",}}>
                        <Grid item xs={3}>
                            <Card sx={{ backgroundColor: '#48EC4F', color: 'white', fontSize: '19px',height:'32px',marginleft:'90%',}}>
                                <Typography gutterBottom variant="p" sx={{ marginLeft: '15px',}}>{drug.name}</Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <DoNotDisturbOnIcon sx={{ color: 'red', fontSize: '30px', float: 'Left',cursor: 'pointer' }}  onClick={() => handleDeleteLabRequest(index)}/>
                        </Grid>
                    </Grid>
      ))}
      </div>
        
      </div>
   
  );
}
