import React , { useState } from 'react';
import { TextField, Button, IconButton, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { Grid, Typography,Card } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import Autocomplete from '@mui/material/Autocomplete';

export default function LabRequest(props) {
  const { openpopBox, setOpenpopBox ,rep, setrep} = props;   
  //const [rep, setrep] = useState([]);
  const [name, setName] = useState('');
  const [selectedLabTestName, setSelectedLabTestName] = useState(null);
 
  const Labs = [ 
  { TestId: 1, labTestName: 'Full Blood Count' },
  { TestId: 2, labTestName: 'Urine Analysis' },
  {  TestId:3,labTestName:'Blood Glucose Test'},
  { TestId: 4, labTestName: '	Liver Function Test' },
  {TestId: 5, labTestName: 'Kidney Function Test' },
  {TestId: 6, labTestName: 'Electrolyte Panel' },
  {TestId: 7, labTestName: 'Lipid Profile' },
  { TestId: 8, labTestName: 'Thyroid Function Test' }];
    
  const handleClose = () => {
    setOpenpopBox(false);   
  }; 
  
  const handleSubmit = (e) => {
      e.preventDefault();
    };
 
  const handleAddLabRequest = () => {
    const selectedLabTest = Labs.find(test => test.labTestName === selectedLabTestName); 
     const newRep = {
      DateTime:null, // Placeholder for date and time
      TestId: selectedLabTest ? selectedLabTest.TestId : null,
      Status: "new",   
      LbAstID: 1      
  };
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
      <form style={{ display: 'flex', alignItems: 'center' }} onClick={handleSubmit}> 
      <Autocomplete
      sx={{ flex: '1', marginRight: '10px', width: '200px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#0099cc', borderWidth: '2px' } } }}
        id="free-solo-demo"        
        options={Labs.map(option => option.labTestName)}
        value={selectedLabTestName}
        onChange={(event, newValue) => {
          setSelectedLabTestName(newValue);
        }}
        renderInput={(params) =>(
           <TextField {...params} 
           label="LabReport"     
            variant="outlined"
            size="small" // Decrease the size of TextField
            sx={{ width: '100%', fontSize: '14px' }}            
            InputProps={{
                ...params.InputProps,
                endAdornment: null // Remove the end adornment (clear icon)
            }}
        />
          )}
          /> 
        <Button variant="outlined" sx={{ top: '0.1px', color: 'Green', borderColor: 'Green', borderWidth:'3px',marginRight: '30px'}} 
         onClick={() => {handleAddLabRequest(); handleClose()}}> OK </Button>        
      </form>      
     </DialogContent>      
      </Dialog> 
     <div >
      {rep.map((drug, index) => (
      <Grid key={index} container spacing={1} sx={{ marginTop: "5px",}}>
                        <Grid item xs={3}>
                            <Card sx={{ backgroundColor: '#48EC4F', color: 'white', fontSize: '19px',height:'32px',marginleft:'90%',}}>
                            <Typography gutterBottom variant="p" sx={{ marginLeft: '15px'}}>{Labs.find(test => test.TestId === drug.TestId)?.labTestName}</Typography>
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
