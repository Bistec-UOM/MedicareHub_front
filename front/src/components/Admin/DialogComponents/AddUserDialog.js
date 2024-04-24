import {Typography,Button,Dialog,DialogTitle,DialogContent,DialogActions,TextField,FormControl,InputLabel,Select,MenuItem, Box, DialogContentText, Paper} from "@mui/material";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import axios from "axios";
import { baseURL,endPoints } from "../../../Services/Admin";
import Avatar from '@mui/material/Avatar';
import { useState } from "react";
import DropBox from "./DropBox";
import { useEffect } from "react";


const AddUserDialog = ({ open, handleClose, handleInputChange, formErrors, Type,formData,row2,pData,setFormErrors,Role,settypenoti,setNotiMessage,setNotificationOpen,forceUpdate,setOpen }) => {
  const handleAddSaveClose = () =>{
    let errors = {};
    let isValid = true;

    const fields = ['fullName', 'name', 'address', 'contactNumber', 'gender', 'nic','dob','email','qualifications','password'];
   // Check if any of the required fields are empty
  
   fields.forEach(field => {
     if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
       errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
       isValid = false;
     }
   });
 



     // Check for duplicates only if row2 is not null
//  if (isValid) {
  const isDuplicateName = row2.some((row) => row.name.toLowerCase() === formData.name.toLowerCase());
  const isDuplicateFullName = row2.some((row) => row.fullName.toLowerCase() === formData.fullName.toLowerCase());
  const isDuplicateContactNumber = row2.some((row) => row.contactNumber === formData.contactNumber);
  const isDuplicateNIC = row2.some((row) => row.nic.toLowerCase() === formData.nic.toLowerCase());

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
  const dob = new Date(formData.dob);

  if (isNaN(dob)) {
    errors.dob = 'Invalid date of birth';
    isValid = false;
  }
  if (!/^\d+$/.test(formData.contactNumber)) {
    errors.contactNumber = 'Invalid contact number';
    isValid = false;
  }
// }
    // If any duplicates are found, set form errors and return
    if (!isValid) {
      setFormErrors(errors);
      return;
    }


    let temp = pData
    temp.id = 0;
    temp.role = Role;
    console.log(temp.role)
    axios.post(baseURL+endPoints.StaffList,temp)
    .then(res => {
      console.log('success')
      settypenoti('success')
      setNotiMessage("Member Added successfully");
      setNotificationOpen(true);
     
          forceUpdate(prevCount => prevCount + 1); // Trigger a re-render
          setOpen(false);

    }).catch(error => {
      if (error.message === 'Network Error') {
        setNotiMessage("You are not connected to internet");
        settypenoti('error')
        setNotificationOpen(true);
      } else {
        console.error(error);
      }
    });
  };  
  const [dataUrl, setDataUrl] = useState(null);
  useEffect(() => {
    handleInputChange("imageUrl", dataUrl);
  }, [dataUrl]);

const [dropOpen, setdropOpen] = useState(false);
const handleDropBoxOpen = () => { 
  console.log('dropbox');
  setdropOpen(true);
}
const handleDropBoxClose = () => { 
  setdropOpen(false);
}
  return (
       <>
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
    <Avatar
      onClick={handleDropBoxOpen}
      alt="Remy Sharp"
      src={dataUrl}
      sx={{ width:130, height:130 ,margin:'auto'}}
    />
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
      <Dialog open={dropOpen} onClose={handleDropBoxClose}>
        <DialogContent>
        <DropBox handleDropBoxClose={handleDropBoxClose} setDataUrl={setDataUrl} />
          
        </DialogContent>
      </Dialog>
      </>
    );
}

export default AddUserDialog;
