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


export default function DoctorAddDrugs(props) {
    const { openBox, setOpenBox } = props;
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [quantitytype, setQuantitytype] = useState('');
    const [hour, setHour] = useState('');
    const [pres, setPres] = useState([]);
    const [nameError, setNameError] = useState(false);
    const [quantityError, setQuantityError] = useState(false);
    const [quantitytypeError, setQuantitytypeError] = useState(false);
    const [hourError, setHourError] = useState(false);
    const validate = () => {
        let isValid = true;
        if (name.trim() === '') {
          setNameError(true);
          isValid = false;
        } else {
          setNameError(false);
        }
        if (quantity.trim() === '') {
          setQuantityError(true);
          isValid = false;
        } else {
          setQuantityError(false);
        }
        if (quantitytype.trim() === '') {
          setQuantitytypeError(true);
          isValid = false;
        } else {
          setQuantitytypeError(false);
        }
        if (hour.trim() === '') {
          setHourError(true);
          isValid = false;
        } else {
          setHourError(false);
        }
        return isValid;
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
          // Proceed with form submission
          console.log('Form submitted successfully!');
        } else {
          console.log('Form submission failed. Please check the fields.');
        }
      };
    const handleClose = () => {
        setOpenBox(false);
    };

    const handleAddDrug = () => {
        // Perform validation
        if (name.trim() === '' || quantity.trim() === '' || quantitytype.trim() === '' || hour.trim() === '') {          
          return;
        }
      
        // If all fields are filled, add the drug
        const newDrug = { name, quantity, quantitytype, hour };
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
        <CloseIcon onClick={handleClose} style={{ position: 'absolute', right: '8px', top: '8px', cursor: 'pointer' }} />
        <SearchIcon sx={{ position: 'absolute', left: '30%', top: '35px', cursor: 'pointer', }} />

        <form onSubmit={handleSubmit}>
          <TextField variant="outlined" size="small"
             sx={{ m: 1, width: '33%', top: '1px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#0099cc', borderWidth: '2px', borderRadius: '25px', }, }, }} 
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError}
            helperText={nameError ? 'Name is required' : ''}
          />
          <TextField variant="outlined" size="small"
                     sx={{ m: 1, width: '13%', top: '1px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#0099cc', borderWidth: '2px',  }, }, }} 
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            error={quantityError}
            helperText={quantityError ? ' required' : ''}
          />
          <Select sx={{ m: 1, top: '1px', border: '2px solid #0099cc', width: '75px', height: '40px', }}
            size="small"
            value={quantitytype}
            onChange={(e) => setQuantitytype(e.target.value)}
            error={quantitytypeError}
            helperText={quantitytypeError ? ' required fields' : ''}
          >
            {quantityOptions.map((option, index) => (
              <MenuItem key={index} value={option}>{option}</MenuItem>
            ))}
          </Select>
           <Select  sx={{ m: 1, top: '1px', border: '2px solid #0099cc', width: '75px', height: '40px', }}
            size="small"                       
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            error={hourError}
            helperText={hourError ? ' required' : ''}
          >
            {hourOptions.map((option, index) => (
              <MenuItem key={index} value={option}>{option}</MenuItem>
            ))}
          </Select>
          <Button type="submit" variant="outlined"  sx={{ top: '0.5px', color: 'Green', borderColor: 'Green', borderWidth:'3px'}} onClick={handleAddDrug}>OK</Button>
        </form>
      </DialogContent>
    </Dialog>
  

            <div>
                {pres.map((drug, index) => (
                    <Grid key={index} container spacing={1} sx={{ marginTop: "5px",}}>
                        <Grid item xs={7} sx={{ marginLeft: "15px",}}>
                            <Card sx={{ backgroundColor: '#0099cc', color: 'white', fontSize: '19px',height:'30px',}}>
                                <Typography gutterBottom variant="p" sx={{ marginLeft: '10px', }}>{drug.name}</Typography>                               
                                <Typography gutterBottom variant="p" sx={{ marginLeft: '100px', }}>{drug.quantity}  {drug.quantitytype}</Typography>                            
                               <Typography gutterBottom variant="p" sx={{ marginLeft: '150px', }}>{drug.hour}</Typography>                                
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
