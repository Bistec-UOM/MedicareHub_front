import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { TextField } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { Grid, Card, Typography } from '@mui/material';


export default function DoctorAddDrugs(props) {
    const { openBox, setOpenBox } = props;
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [quantitytype, setQuantitytype] = useState('');
    const [hour, setHour] = useState('');
    const [pres, setPres] = useState([]);

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
                <DialogContent dividers 
                    sx={{ '&::before': { content: "''", position: 'absolute', top: 0, right: 0, width: '35px', height: '100%', background: 'hsl(0, 0%, 90%)', }, }}>

                    <CloseIcon onClick={handleClose} style={{ position: 'absolute', right: '8px', top: '8px', cursor: 'pointer', }} />                   
      
                    <TextField variant="outlined" size="small"
                     sx={{ m: 1, width: '43%', top: '10px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#0099cc', borderWidth: '2px', borderRadius: '25px', }, }, }} 
                     value={name} onChange={(e) => setName(e.target.value)} />
                    <SearchIcon sx={{ position: 'absolute', left: '39%', top: '43px', cursor: 'pointer', }} />
                    <TextField variant="outlined" size="small" 
                    sx={{ m: 1, width: '10%', top: '10px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#0099cc', borderWidth: '2px', }, }, }}
                     value={quantity} onChange={(e) => setQuantity(e.target.value)} />

                    <Select 
                    sx={{ m: 1, top: '10px', border: '2px solid #0099cc', width: '50px', height: '40px', }}
                     variant="standard" value={quantitytype} onChange={(e) => setQuantitytype(e.target.value)}>
                        {quantityOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                    <Select
                     sx={{ m: 1, top: '10px', border: '2px solid #0099cc', width: '65px', height: '40px', }}
                      variant="standard" value={hour} onChange={(e) => setHour(e.target.value)}>
                        {hourOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>{option}</MenuItem>
                        ))}
                    </Select>

                    <Button variant="outlined" sx={{ top: '10px', color: 'Green', borderColor: 'Green', borderWidth: '3px', }} onClick={handleAddDrug}>OK</Button>
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
