import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import {Checkbox,Dialog,DialogActions,DialogContent,DialogTitle,FormControl,FormControlLabel,FormGroup,FormHelperText,Grid,InputLabel,MenuItem,Select,TextField,Typography,} from "@mui/material";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from 'axios';
import { useEffect } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { baseURL, endPoints } from '../../../Services/Admin';


const EditPatientDialog = ({ editOpen, handleEditClose, formFields, formErrors, isDisabled, formData, setFormData, handleInputChange, deletePopUp, handleEditClick,rows,setFormErrors,pData,settype,setNotiMessage,setNotificationOpen,setShowPatient,forceUpdate,setEditOpen,setIsDisabled}) => {

  
  const handleEditSave = () => {
    // Validate form fields
    let errors = {};
    let isValid = true;
  
    // Check if any of the required fields are empty or null
    formFields.forEach((field) => {
      if (!formData[field.key] || formData[field.key].trim() === '') {
        errors[field.key] = `${field.label} is required`;
        isValid = false;
      }
    });
  
    // Check for duplicates only if the required fields are not empty
    if (isValid) {
      const isDuplicateName = rows.some((row) => row.id !== formData.id && row.name.toLowerCase() === formData.name.toLowerCase());
      const isDuplicateFullName = rows.some((row) => row.id !== formData.id && row.fullName.toLowerCase() === formData.fullName.toLowerCase());
      const isDuplicateContactNumber = rows.some((row) => row.id !== formData.id && row.contactNumber === formData.contactNumber);
      const isDuplicateNIC = rows.some((row) => row.id !== formData.id && row.nic.toLowerCase() === formData.nic.toLowerCase());
    
      if (isDuplicateName) {
        errors.name = 'Name already exists';
        isValid = false;
      }
      if (isDuplicateFullName) {
        errors.fullName = 'Full Name already exists';
        isValid = false;
      }
  
      if (isDuplicateContactNumber) {
        errors.contactNumber = 'Contact number already exists';
        isValid = false;
      }
  
      if (isDuplicateNIC) {
        errors.nic = 'NIC already exists';
        isValid = false;
      }
  
      if (!(/^[0-9]{9}[vV]$/.test(formData.nic) || /^[0-9]{12}$/.test(formData.nic))) {
        errors.nic = 'invalid NIC';
        isValid = false;
      }
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        errors.email = 'Invalid email';
        isValid = false;
      }

    //dob validation
    const dob = new Date(formData.dob);
    const today = new Date();
    const hundredYearsAgo = new Date();
    hundredYearsAgo.setFullYear(today.getFullYear() - 100);
    
    if (isNaN(dob.getTime())) {
      errors.dob = "Invalid date of birth";
      isValid = false;
    } else if (dob > today) {
      errors.dob = "Date of birth cannot be in the future";
      isValid = false;
    } else if (dob < hundredYearsAgo) {
      errors.dob = "Date of birth cannot be more than 100 years ago";
      isValid = false;
    }
      if (!/^\d+$/.test(formData.contactNumber)) {
        errors.contactNumber = 'Invalid contact number, only integers allowed';
        isValid = false;
      }
    }
  
    // If any errors are found, set form errors and return
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
  try {
    
    console.log(pData)
            // Assuming you have an API endpoint for updating a patient
            axios.put(baseURL+endPoints.PatientList+ `/${pData.id}` , pData)
            .then(response => {
              settype('success')
              setNotiMessage("Patient Edited successfully");
              setNotificationOpen(true);
              // Handle success, maybe update local state or dispatch an action
              console.log('Patient updated successfully:', response.data);
              handleEditClose();
              // Assume the Axios request is successful, then set showPatient to true
              setShowPatient(true);
              forceUpdate(prevCount => prevCount + 1); // Trigger a re-render
              // Close the edit dialog
              setEditOpen(false);
            })
  } catch (error) {
    // Handle error, show an error message or dispatch an error action
    console.error('Error updating patient:', error);
    
  }
          
      setEditOpen(false);
      setIsDisabled(true);
  
    };

    return (
        <Grid>
        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle
            sx={{
              backgroundColor: "rgb(222, 244, 242)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Edit Patient
            <CloseIcon onClick={handleEditClose} sx={{ cursor: 'pointer' }} />
          </DialogTitle>
          <DialogContent>
            {formFields.map((field) => (
              <TextField
                key={field.key}
                error={!!formErrors[field.key]}
                helperText={formErrors[field.key]}
                disabled={isDisabled}
                label={field.label}
                fullWidth={field.isfull}
                margin="dense"
                value={formData[field.key] || ''}
                onChange={(e) =>
                  setFormData({ ...formData, [field.key]: e.target.value })
                }
                sx={field.sx}
              />
            ))}
            <div style={{ display: 'flex' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  label="Date Of Birth"
                  error={!!formErrors.dob}
                  helperText={formErrors.dob}
                  value={formData.dob ? dayjs(formData.dob) : null}
                  onChange={(newValue) => handleInputChange('dob', newValue)}
                  renderInput={(props) => <TextField {...props} />}
                  sx={{ mr: 1,mt:1}}
                  disabled={isDisabled}
                />
              </LocalizationProvider>
              <Select
                id="gender"
                value={formData.gender || ''}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                label="Gender"
                disabled={isDisabled}
                sx={{ mt: 1, width: '38%'}}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
              {formErrors.gender && (
              <FormHelperText error>{formErrors.gender}</FormHelperText>
            )}
            </div>
          </DialogContent>
          <DialogActions>
            {!isDisabled && (
              <Button
                onClick={deletePopUp}
                variant="outlined"
                color="error"
                sx={{ m: 2 }}
              >
                Delete
              </Button>
            )}
            <Button
              onClick={isDisabled ? handleEditClick : handleEditSave}
              variant="contained"
              sx={{ backgroundColor: "rgb(121, 204, 190)", m: 2 }}
            >
              {isDisabled ? 'Edit' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
}

export default EditPatientDialog;
