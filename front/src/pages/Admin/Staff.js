import { Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import * as React from 'react';

export default function Staff() {
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: 'Dr.Amal Rathnayake',
    usualName: 'amal',
    nic: '992941687',
    address: 'japan',
    degree:'MBBS',
    speciality:'Cardiologist',
    contactNumber: 't487',
    emailAddress: 'bcw',
    age: '34',
    gender: 'male',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClickOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditSave = () => {
    // Handle saving edited data here
    console.log("Edited data:", formData);
    setEditOpen(false);
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div>
      <Paper
        sx={{
          m: 1,
          backgroundColor: 'rgb(59, 135, 122)',
          color: 'white',
          margin: '10 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 2,
          paddingRight: 2,
        }}
        onClick={handleEditClickOpen}
      >
        <Typography variant="h5" sx={{ paddingTop: 0.75, paddingBottom: 0.75, fontWeight: 'bolder' }}>
          Doctors
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: 'rgb(121, 204, 190)',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            fontWeight: 'bolder',
          }}
          onClick={handleClickOpen}
        >
          Add
        </Button>
      </Paper>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>Edit Doctor</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            fullWidth
            margin="dense"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
          />
          <TextField
            label="Usual Name"
            margin="normal"
            value={formData.usualName}
            onChange={(e) => handleInputChange('usualName', e.target.value)}
          />
          <TextField
            label="NIC"
            margin="normal"
            sx={{ ml: 4 }}
            value={formData.nic}
            onChange={(e) => handleInputChange('nic', e.target.value)}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
          <TextField
            label="Contact Number"
            margin="normal"
            value={formData.contactNumber}
            onChange={(e) => handleInputChange('contactNumber', e.target.value)}
          />
          <TextField
            label="Degree"
            margin="normal"
            sx={{ ml: 4 }}
            value={formData.degree}
            onChange={(e) => handleInputChange('degree', e.target.value)}
          />
          <TextField
            label="Speciality"
            margin="normal"
            value={formData.speciality}
            onChange={(e) => handleInputChange('speciality', e.target.value)}
          />
          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            value={formData.emailAddress}
            onChange={(e) => handleInputChange('emailAddress', e.target.value)}
          />
          <TextField
            label="Age"
            margin="normal"
            value={formData.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
          />
          <FormControl margin="normal">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              label="Gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditSave} variant="contained" sx={{ backgroundColor: 'rgb(121, 204, 190)' }}>
            Save
          </Button>
          <Button onClick={handleEditClose} variant="contained" sx={{ backgroundColor: 'red' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dr Data Paper */}
      <Paper
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: 'column', // Set to 'column' for vertical display
          paddingLeft: 2,
          paddingRight: 2,
        }}
        onClick={handleEditClickOpen} // Open the edit window when clicking on the paper
      >
        <Typography variant="h6" sx={{ paddingTop: 0.75 }}>
          Dr.Amal Rathnayake
        </Typography>
        <Typography variant="h10" sx={{ fontSize: 10, color: 'rgb(186, 177, 177)' }}>
          MBBS
        </Typography>
        <Typography variant="h10" sx={{ fontSize: 10, paddingBottom: 0.75, color: 'rgb(186, 177, 177)' }}>
          Consultant Neurologist
        </Typography>
      </Paper>
    </div>
  );
}
