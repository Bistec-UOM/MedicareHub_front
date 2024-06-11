import React , { useState } from 'react';
import { TextField, Button, IconButton, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Grid, Typography,Card } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';

export default function LabRequest(props) {
  const { openpopBox, setOpenpopBox ,rep, setrep, labtestlist} = props;   
  //const [rep, setrep] = useState([]);
  const [name, setName] = useState('');
  const [selectedLabTestName, setSelectedLabTestName] = useState(null);//hold the selected labtest name
 
/*   const Labs = [ 
  { TestId: 1, labTestName: 'Full Blood Count' },
  { TestId: 2, labTestName: 'Urine Analysis' },
  { TestId:3,labTestName:'Blood Glucose Test'},
  { TestId: 4, labTestName: '	Liver Function Test' },
  {TestId: 5, labTestName: 'Kidney Function Test' },
  {TestId: 6, labTestName: 'Electrolyte Panel' },
  {TestId: 7, labTestName: 'Lipid Profile' },
  { TestId: 24, labTestName: 'Thyroid Function Test' }]; */

  const Labs = labtestlist;

  console.log(labtestlist);
    
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
      testId: selectedLabTest ? selectedLabTest.testId : null,
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
  <DialogContent
              sx={{position: 'relative'}}>
  
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
        <Button size='small' variant="contained" sx={{ top: '0.1px',marginRight: '30px'}} 
         onClick={() => {handleAddLabRequest(); handleClose()}} endIcon={<AddIcon></AddIcon>}> Add </Button>        
      </form>  
      <IconButton
              sx={{ position: 'absolute', top:'5px',right:'5px'}}
              onClick={handleClose}
        >
        <CloseIcon />
      </IconButton>    
  </DialogContent>      
</Dialog> 
<div >
      {/*---- rendered lab request list-------------------------*/}
      {rep.map((drug, index) => (
      <Box key={index} sx={{marginTop: "5px",width:'80%',display:'flex',ml:'5%',alignItems:'center'}}>
            <Box sx={{backgroundColor: '#48EC4F', width:'500px', display: 'flex', flexDirection: 'row',color: 'white',fontSize: '18px',borderRadius:'4px',alignItems:'center'}}>
                <Typography gutterBottom sx={{ marginLeft: '15px'}}>{Labs.find(test => test.testId === drug.testId)?.labTestName}</Typography>
            </Box>
     {/*.....delete buttun ..................................... */}
            <Box item xs={8}>
            <HighlightOffIcon sx={{marginLeft: '5px',cursor: 'pointer' }} color='error'fontSize='small'  onClick={() => handleDeleteLabRequest(index)}/>
            </Box>
        </Box>
      ))}
      </div>        
      </div>   
  );
}
