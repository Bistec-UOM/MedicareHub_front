import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import {Checkbox,Dialog,DialogActions,DialogContent,DialogTitle,FormControl,FormControlLabel,FormGroup,Grid,InputLabel,MenuItem,Select,TextField,Typography,} from "@mui/material";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

const AddPatientDialog = ({ open, handleAddClose, handleInputChange, formErrors, formData, handleAddSaveClose }) => {
    return (
        <Dialog open={open} onClose={handleAddClose}>
        <DialogTitle
          sx={{
            backgroundColor: "rgb(222, 244, 242)",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Add Patient
          <CloseIcon onClick={handleAddClose} sx={{cursor:'pointer'}}/>
        </DialogTitle>
        <DialogContent>
          {/* Add form fields or other content here */}
          <TextField required label="Full Name" fullWidth sx={{ mb: 1, mt: 3 }} onChange={(e) => handleInputChange("fullName", e.target.value)} error={!!formErrors.fullName}helperText={formErrors.fullName}/>          
          <TextField required label="Name" sx={{ mb: 1 }}  onChange={(e) => handleInputChange("name", e.target.value)} error={!!formErrors.name}helperText={formErrors.name}/>
          <TextField required label="Address" fullWidth sx={{ mb: 1 }}  onChange={(e) => handleInputChange("address", e.target.value)} error={!!formErrors.address}helperText={formErrors.address}/>
          <TextField required label="NIC" sx={{  mb: 1 }}  onChange={(e) => handleInputChange("nic", e.target.value)} error={!!formErrors.nic}helperText={formErrors.nic}/>
          <TextField required label="Contact Number" sx={{ mb: 1 ,ml:2}}  onChange={(e) => handleInputChange("contactNumber", e.target.value)} error={!!formErrors.contactNumber}helperText={formErrors.contactNumber}/>
          <TextField required label="E-mail" fullWidth sx={{ mb: 1 }} onChange={(e) => handleInputChange("email", e.target.value)} error={!!formErrors.email} helperText={formErrors.email}/>
<div style={{display:'flex'}}>
<LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateField']}>
            <DateField
              label="Date Of Birth"
              value={formData.dob ? dayjs(formData.dob) : null}
              onChange={(newValue) => handleInputChange('dob', newValue)}
              renderInput={(props) => <TextField {...props} />}
              style={{ width: '225px' }}
              error={!!formErrors.dob} helperText={formErrors.dob}
              required // Ensure date of birth is required
            />
          </DemoContainer>
        </LocalizationProvider>
          <FormControl style={{marginLeft:'15px',marginTop:'8px'}}>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
        required
        style={{width:'200px'}}
        labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Gender"
          onChange={(e) => handleInputChange("gender", e.target.value)}
          error={!!formErrors.gender} helperText={formErrors.gender}
        >
          <MenuItem value={'Female'}>Female</MenuItem>
          <MenuItem value={'Male'}>Male</MenuItem>

        </Select>
      </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAddSaveClose}
            variant="contained"
            sx={{ backgroundColor: "rgb(121, 204, 190)", m: 2 }}
          >
            Add
          </Button>

        </DialogActions>
      </Dialog>
    );
}

export default AddPatientDialog;
