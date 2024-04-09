import {Paper,Typography,Button,Dialog,DialogTitle,DialogContent,DialogActions,TextField,FormControl,InputLabel,Select,MenuItem, Box} from "@mui/material";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState,useEffect } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

const EditUserDialog = ({ editOpen, handleEditClose, fields, formErrors, formData, isDisabled, setFormData, handleInputChange, deletePopUp, handleEditClick, handleEditSave }) => {
    return (
        <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle
          sx={{
            backgroundColor: "rgb(222, 244, 242)",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Edit User
          <CloseIcon onClick={handleEditClose} sx={{cursor:'pointer'}} />
        </DialogTitle>
        <DialogContent>
          {fields.map((field) => (
            <TextField
              key={field.key}
              label={field.label}
              sx={field.style}
              error={!!formErrors[field.key]}
              helperText={formErrors[field.key]}
              fullWidth={field.fullWidth || false}
              margin="normal"
              value={formData[field.key]}
              disabled={isDisabled}
              onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
            />
          ))}
          <FormControl sx={{m:2,ml:4}}>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          </FormControl>
          <div style={{display:'flex'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateField']}>
                <DateField
                  label="Date Of Birth"
                  value={formData.dob ? dayjs(formData.dob) : null} // Ensure formData.dob is a valid date or null
                  onChange={(newValue) => handleInputChange('dob', newValue)}
                  renderInput={(props) => <TextField {...props} />}
                  style={{width:'210px',marginTop:'9px'}}
                  disabled= {isDisabled}
                  // format="YYYY/MM/DD" // You can add this line back if it's needed
                />
              </DemoContainer>
            </LocalizationProvider>
          <Select
            labelId="gender-label"
            id="gender"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            label="Gender"
            disabled={isDisabled}
            style={{width:"200px",height:'6vh'}}
            sx={{ml:3,mt:2}}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
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
            onClick={isDisabled? handleEditClick : handleEditSave}
            variant="contained"
            sx={{ backgroundColor: "rgb(121, 204, 190)", m: 2 }}
          >
            {isDisabled ? 'Edit' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default EditUserDialog;
