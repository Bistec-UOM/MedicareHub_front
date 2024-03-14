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

export default function DoctorAddDrugs(props) {
    const { openBox, setOpenBox ,pres , setPres} = props;
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [quantitytype, setQuantitytype] = useState('');
    const [hour, setHour] = useState('');
    //const [pres, setPres] = useState([]);//---------------------------prescription array------------------------ 
    
    
    const drugNames = ['Paracetamol', 'Aspirin', 'Ibuprofen', 'Amoxicillin', 'Lisinopril', 'Atorvastatin', 'Metformin', 'Simvastatin'];
    
      const handleSubmit = (e) => {
        e.preventDefault();
      
      };
    const handleClose = () => {
        setOpenBox(false);
    };

    const handleAddDrug = () => {
      const newDrug = { name, quantity,quantitytype, hour };
      setPres([...pres, newDrug]);
      setName('');
      setQuantity('');
      setQuantitytype('');
      setHour('');
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
        <CloseIcon onClick={handleClose} style={{ position: 'absolute', right: '3px', top: '4px', cursor: 'pointer',}} />
        <SearchIcon sx={{ position: 'absolute', left: '30%', top: '35px', cursor: 'pointer', }} />

        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', }}>
        {openBox && (
  <div style={{ position: 'relative' }}>      
      <Autocomplete
    sx={{ flex: '1', marginRight: '10px', width: '200px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#0099cc', borderWidth: '2px' } } }}
    freeSolo
    options={drugNames}
    value={name}
    onChange={(event, newValue) => {
        setName(newValue);
    }}
    renderInput={(params) => (
        <TextField
            {...params}
            label="Search"
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
    </div>
        )}
          <div>
          </div>
          <TextField variant="outlined" size="small"  label="Amount"
                    sx={{ flex: '1',fontSize: '13px', marginRight: '11px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#0099cc', borderWidth: '2px' } } }} 
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}            
          />
          <Select 
                    sx={{ m: 1, top: '1px', border: '2px solid #0099cc', width: '70px', height: '40px', }}
                     variant="standard" value={quantitytype} onChange={(e) => setQuantitytype(e.target.value)}>
                        {quantityOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                    <Select
                     sx={{ m: 1, top: '1px', border: '2px solid #0099cc', width: '70px', height: '40px', }}
                      variant="standard" value={hour} onChange={(e) => setHour(e.target.value)}>
                        {hourOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                    
          <Button type="submit" variant="outlined"  sx={{ top: '0.5px', color: 'Green', borderColor: 'Green', borderWidth:'3px'}}  onClick={() => {
             handleAddDrug();
              handleClose()}}>OK</Button>
          </form>
         
          </DialogContent>
          
          </Dialog>
          
            <div>
                {pres.map((drug, index) => (
                    <Grid key={index} container spacing={1} sx={{ marginTop: "5px",}}>
                        <Grid item xs={12} sm={7} sx={{ marginLeft: '50px', width: 'auto', }}>

                        <Card style={{ display: 'flex', flexDirection: 'row',backgroundColor: '#0099cc', color: 'white',fontSize: '18px' }}>
                          
                          <Typography gutterBottom variant="p" sx={{ flex: '3', marginLeft: '10px' }}>{drug.name}</Typography>
    
                          <Typography gutterBottom variant="p" sx={{ flex: '2', marginLeft: '100px' }}>{drug.quantity} {drug.quantitytype}</Typography>
    
                          <Typography gutterBottom variant="p" sx={{ flex: '1', marginLeft: '150px' }}>{drug.hour}</Typography>
    
                          </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <DoNotDisturbOnIcon sx={{ color: 'red', marginLeft: '5px', fontSize: '30px', float: 'Left',cursor: 'pointer' }} onClick={() => handleDeleteDrug(index)} />
                        </Grid>
                    </Grid>
                ))}
            </div>
            
        </div>
    )
}
