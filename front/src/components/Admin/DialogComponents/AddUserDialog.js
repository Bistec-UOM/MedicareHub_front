import {Paper,Typography,Button,Dialog,DialogTitle,DialogContent,DialogActions,TextField,FormControl,InputLabel,Select,MenuItem, Box} from "@mui/material";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState,useEffect } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

const AddUserDialog = ({ open, handleClose, handleInputChange, formErrors, handleAddSaveClose, Type }) => {
    return (
        <Dialog open={open} onClose={handleClose} >
        <DialogTitle
          sx={{
            backgroundColor: "rgb(222, 244, 242)",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
         <Typography style={{textAlign:"center"}}>{Type}</Typography>
          <CloseIcon onClick={handleClose} sx={{cursor:'pointer'}}/>
        </DialogTitle>
        <DialogContent>
          {/* Add form fields or other content here */}
          <TextField required label="Full Name" fullWidth sx={{mb:1}}  onChange={(e) => handleInputChange("fullName", e.target.value)} error={!!formErrors.fullName}helperText={formErrors.fullName}/>
          <TextField required label="Usual Name"  sx={{ mb: 1 }} onChange={(e) => handleInputChange("name", e.target.value)} error={!!formErrors.name} helperText={formErrors.name}/>
          <TextField required label="NIC" sx={{ ml: 4, mb: 1 }} onChange={(e) => handleInputChange("nic", e.target.value)} error={!!formErrors.nic} helperText={formErrors.nic}/>
          <TextField required label="Address" fullWidth sx={{ mb: 1 }} onChange={(e) => handleInputChange("address", e.target.value)} error={!!formErrors.address} helperText={formErrors.address}/>
          <TextField required label="Contact Number" sx={{ mb: 1 }} onChange={(e) => handleInputChange("contactNumber", e.target.value)} error={!!formErrors.contactNumber} helperText={formErrors.contactNumber}/>
          <TextField required label="qualifications" sx={{ ml: 4, mb: 1 }} onChange={(e) => handleInputChange("qualifications", e.target.value)} error={!!formErrors.qualifications} helperText={formErrors.qualifications}/>
          <TextField required label="E-mail"  sx={{ mb: 1 }} onChange={(e) => handleInputChange("email", e.target.value)} error={!!formErrors.email} helperText={formErrors.email}/>
          <TextField required label="Password"  sx={{ mb: 1 ,ml:4}} onChange={(e) => handleInputChange("password", e.target.value)} error={!!formErrors.password} helperText={formErrors.password}/>
          <div style={{display:'flex'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateField']}>
        <DateField
          label="Date Of Birth"
          style={{width:'200px'}}
          required
          onChange={(newValue) => handleInputChange('dob', newValue)}
          renderInput={(props) => <TextField {...props} />} // You may need to import TextField from '@mui/material/TextField'
          // format="YYYY/MM/DD"
          error={!!formErrors.dob} helperText={formErrors.dob}
        />
      </DemoContainer>
    </LocalizationProvider>
          <Box>
  <FormControl style={{ width: '200px',margin:'9px',marginLeft:'40px' }}>
    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      required
      // value={handleInputChange("gender", e.target.value)} // Ensure you're using the correct value here
      label="Gender"
      onChange={(e) => handleInputChange("gender", e.target.value)}
      error={!!formErrors.gender} helperText={formErrors.gender}
    >
      <MenuItem value={'Female'}>Female</MenuItem>
      <MenuItem value={'Male'}>Male</MenuItem>
    </Select>
  </FormControl>
</Box>
          </div>
    
          {/* Add more fields as needed */}
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

export default AddUserDialog;
