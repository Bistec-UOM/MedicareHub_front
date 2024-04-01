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
import axios from 'axios';
import { useEffect } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';


const EditPatientDialog = ({ editOpen, handleEditClose, formFields, formErrors, isDisabled, formData, setFormData, handleInputChange, deletePopUp, handleEditClick, handleEditSave }) => {
    
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
                  value={formData.dob ? dayjs(formData.dob) : null}
                  onChange={(newValue) => handleInputChange('dob', newValue)}
                  renderInput={(props) => <TextField {...props} />}
                  sx={{ mr: 1,mt:1}}
                  disabled={isDisabled}
                />
              </LocalizationProvider>
              <Select
                labelId="gender-label"
                id="gender"
                value={formData.gender || ''}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                label="Gender"
                disabled={isDisabled}
                sx={{ mt: 1, width: '38%'}}
              >
                <MenuItem>Select Gender</MenuItem>
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
