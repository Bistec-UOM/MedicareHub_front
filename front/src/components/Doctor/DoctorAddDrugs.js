import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { TextField, Snackbar, Alert } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import { Typography, Button, Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function DoctorAddDrugs(props) {
    const { openBox, setOpenBox, pres, setPres } = props;
    const [genericN, setGenericN] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('mg');
    const [period, setPeriod] = useState('BD');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

//const [pres, setPres] = useState([]);//---------------------------prescription array------------------------ 
    
    
//const drugNames = ['Paracetamol', 'Aspirin', 'Ibuprofen', 'Amoxicillin', 'Lisinopril', 'Atorvastatin', 'Metformin', 'Simvastatin'];
    

    const fetchDrugSuggestions = async (query) => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(`https://rxnav.nlm.nih.gov/REST/approximateTerm.json?term=${query}&maxEntries=10`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.approximateGroup && data.approximateGroup.candidate) {
                const formattedSuggestions = data.approximateGroup.candidate.map(drug => ({ label: drug.name }));
                setSuggestions(formattedSuggestions);
            } else {
                setSuggestions([]);
            }
        } catch (error) {
            console.error('Error fetching drug suggestions:', error);
            setSuggestions([]);
        }
    };

    const handleInputChange = (event, newInputValue) => {
        setGenericN(newInputValue);
        if (newInputValue.length >= 3) {
            fetchDrugSuggestions(newInputValue);
        } else {
            setSuggestions([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddDrug();
    };

    const handleClose = () => {
        setOpenBox(false);
    };

    const handleAddDrug = () => {
        if (!genericN && !weight) {
            setError('Both fields are required');
            setSnackbarOpen(true);
            return;
        }
        else if (!genericN.trim() ) {
            setError('Genaric Name is required');
            setSnackbarOpen(true);
            return;
        }
        else if (!weight.trim() ) {
            setError('weight is a required field');
            setSnackbarOpen(true);
            return;
        }
        
        // Check if weight is not a valid integer
        else if (isNaN(parseInt(weight))) {
        setError('Weight must be a valid number');
        setSnackbarOpen(true);
        return;
        }

        
        const newDrug = {
            genericN: genericN,
            weight: weight,
            unit: unit,
            period: period
        };
        setPres([...pres, newDrug]);
        setGenericN('');
        setWeight('');
        setUnit('mg');
        setPeriod('BD');
        setOpenBox(false);
       
    };

    const handleDeleteDrug = (index) => {
        const updatedPres = [...pres];
        updatedPres.splice(index, 1);
        setPres(updatedPres);
    };

    const quantityOptions = ['mg', 'ml', 'g'];
    const hourOptions = ['BD', 'OD', 'TDS'];

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <div>
            <Dialog open={openBox}>
                <DialogContent>
                    <SearchIcon sx={{ position: 'absolute', left: '30%', top: '35px', cursor: 'pointer' }} />

                    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                        {openBox && (
                            <div style={{ position: 'relative' }}>
                                <Autocomplete
                                    sx={{ flex: '1', marginRight: '10px', width: '200px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#0099cc', borderWidth: '2px' } } }}
                                    freeSolo
                                    options={suggestions}
                                    value={suggestions.find(option => option.label === genericN) || null}
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            setGenericN(newValue.label);
                                        } else {
                                            setGenericN('');
                                        }
                                    }}
                                    onInputChange={handleInputChange}
                                    getOptionLabel={(option) => option.label} // Ensure to extract label from option
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Search"
                                            variant="outlined"
                                            size="small"
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: null
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        )}
                        <TextField
                            size="small"
                            label="Amount"
                            sx={{ flex: '1', fontSize: '13px', marginRight: '11px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#0099cc', borderWidth: '2px' } } }}
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <Select
                            sx={{ border: '1px solid #0099cc', width: '60px', height: '40px', borderRadius: '4px' }}
                            variant="standard" value={unit} onChange={(e) => setUnit(e.target.value)}>
                            {quantityOptions.map((option, index) => (
                                <MenuItem key={index} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                        <Select
                            sx={{ m: 1, top: '1px', border: '1px solid #0099cc', width: '60px', height: '40px', borderRadius: '4px' }}
                            variant="standard" value={period} onChange={(e) => setPeriod(e.target.value)}>
                            {hourOptions.map((option, index) => (
                                <MenuItem key={index} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                        <Button
                            type="submit"
                            variant="contained"
                            size='small'
                            sx={{ top: '0.5px' }}                            
                            endIcon={<AddIcon />}
                        >
                            Add
                        </Button>
                    </form>
                    <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer', ml: '10px', position: 'absolute', top: '5px', right: '5px' }} />
                </DialogContent>
            </Dialog>

            {/* Rendered Drug list */}
            <div>
                {pres.map((drug, index) => (
                    <Box key={index} sx={{ marginTop: "5px", width: '80%', display: 'flex', ml: '5%', alignItems: 'center' }}>
                        <Box xs={12} sm={7} sx={{ width: '500px', display: 'flex', flexDirection: 'row', backgroundColor: '#0099cc', color: 'white', fontSize: '18px', borderRadius: '4px', alignItems: 'center' }}>
                            <Typography gutterBottom sx={{ flex: '3', marginLeft: '10px' }}>{drug.genericN}</Typography>
                            <Typography gutterBottom sx={{ flex: '2' }}>{drug.weight} {drug.unit}</Typography>
                            <Typography gutterBottom sx={{ flex: '1' }}>{drug.period}</Typography>
                        </Box>
                        <HighlightOffIcon sx={{ marginLeft: '5px', cursor: 'pointer' }} color='error' fontSize='small' onClick={() => handleDeleteDrug(index)} />
                    </Box>
                ))}
            </div>
            {/* Snackbar for error messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%',backgroundColor:'#F0F841 ' }}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}
