import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { TextField } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { Grid, Card, Typography,Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function DoctorAddDrugs(props) {
    const { openBox, setOpenBox ,pres , setPres} = props;
    const [genericN, setGenericN] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('mg');    
    const [period, setPeriod] = useState('BD');
    
    //const [pres, setPres] = useState([]);//---------------------------prescription array------------------------ 
    
    
    const drugNames = ['Paracetamol', 'Aspirin', 'Ibuprofen', 'Amoxicillin', 'Lisinopril', 'Atorvastatin', 'Metformin', 'Simvastatin'];
    
      const handleSubmit = (e) => {
        e.preventDefault();
      
      };
    const handleClose = () => {
        setOpenBox(false);
    };

    const handleAddDrug = () => {
      const newDrug = { 
        genericN:genericN,
        weight:weight,
        unit:unit,
        period :period
    }
      setPres([...pres, newDrug]);
      setGenericN('');
      setWeight('');
      setUnit('');
      setPeriod('');
  };
    const handleDeleteDrug = (index) => {
      const updatedPres = [...pres];
      updatedPres.splice(index, 1);
      setPres(updatedPres);
  };

    const quantityOptions = ['mg', 'ml', 'g'];
    const hourOptions = ['BD', 'OD', 'TDS'];

    return (
        <div>
<Dialog open={openBox}>
      <DialogContent dividers>
        <CloseIcon onClick={handleClose} style={{ position: 'absolute', right: '3px', top: '5px', cursor: 'pointer',}} />
        <SearchIcon sx={{ position: 'absolute', left: '30%', top: '35px', cursor: 'pointer', }} />

        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', }}>
        {openBox && (
       <div style={{ position: 'relative' }}>      
      <Autocomplete
      sx={{ flex: '1', marginRight: '10px', width: '200px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#0099cc', borderWidth: '2px' } } }}
      freeSolo
      options={drugNames}
      value={genericN}
      onChange={(event, newValue) => {
      setGenericN(newValue);
    }}
      renderInput={(params) => (
        <TextField
            {...params}
            label="Search"
            variant="outlined"
            size="small" 
            sx={{ width: '100%', fontSize: '14px' }}            
            InputProps={{
                ...params.InputProps,
                endAdornment: null // Remove the end adornment (clear icon)
            }}
        />
    )}
/>
    </div>
        )}
          <div>
          </div>
          <TextField size="small"  label="Amount"
                    sx={{ flex: '1',fontSize: '13px', marginRight: '11px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#0099cc', borderWidth: '2px' } } }} 
            value={weight}
            onChange={(e) => setWeight(e.target.value)}            
          />
            <Select 
                    sx={{ border: '1px solid #0099cc', width: '60px', height: '40px', borderRadius:'4px'}}
                     variant="standard" value={unit} onChange={(e) => setUnit(e.target.value)}>
                        {quantityOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>{option}</MenuItem>
                        ))}
            </Select>
            <Select
                     sx={{ m: 1, top: '1px', border: '1px solid #0099cc', width: '60px', height: '40px',borderRadius:'4px' }}
                      variant="standard" value={period} onChange={(e) => setPeriod(e.target.value)}>
                        {hourOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>{option}</MenuItem>
                        ))}
            </Select>
                    
          <Button type="submit" variant="contained"  sx={{ top: '0.5px'}}  
            onClick={() => {handleAddDrug();handleClose()}}
            endIcon={<AddIcon/>}
          >Add</Button>
          </form>
          </DialogContent>
          
</Dialog>
          
{/*-----------------------Rendered Drug list----------------------------------------------------*/}
            <div>
                {pres.map((drug, index) => (
                    <Box key={index} sx={{ marginTop: "5px",width:'80%',display:'flex',ml:'5%',alignItems:'center'}}>
                        <Box xs={12} sm={7} sx={{width:'500px', display: 'flex', flexDirection: 'row',backgroundColor: '#0099cc', color: 'white',fontSize: '18px',borderRadius:'4px',alignItems:'center'}}>
                          <Typography gutterBottom sx={{ flex: '3', marginLeft: '10px' }}>{drug.genericN}</Typography>
                          <Typography gutterBottom sx={{ flex: '2'}}>{drug.weight} {drug.unit}</Typography>
                          <Typography gutterBottom  sx={{ flex: '1'}}>{drug.period}</Typography>
    
                        </Box>
       {/*............delete button ................................... */}
                        <HighlightOffIcon sx={{marginLeft: '5px',cursor: 'pointer' }} color='error'fontSize='small'onClick={() => handleDeleteDrug(index)} />
                    </Box>
                ))}
            </div>
            
        </div>
    )
}
