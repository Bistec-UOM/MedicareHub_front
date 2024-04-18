import {Button,Dialog,DialogTitle,DialogContent,DialogActions,TextField,FormControl,InputLabel,Select,MenuItem} from "@mui/material";
import { useState,useEffect } from "react";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { baseURL, endPoints } from "../../../Services/Admin";
import Avatar from '@mui/material/Avatar';
import DropBox from "./DropBox";
const EditUserDialog = ({editOpen,handleEditClose,fields,formErrors,formData,isDisabled,setFormData,handleInputChange,deletePopUp,handleEditClick,row2,setFormErrors,pData,settypenoti,setNotiMessage,setNotificationOpen,setIsDisabled,setEditOpen,forceUpdate}) => {
  const handleEditSave = () => {
    let errors = {};
    let isValid = true;
    // Handle saving edited data here
    console.log("Edited data:", row2);

    // Check if any of the required fields are empty
    const fieldsName = [
      "fullName",
      "name",
      "address",
      "contactNumber",
      "gender",
      "nic",
      "dob",
      "email",
    ];

    fieldsName.forEach((field) => {
      if (
        !formData[field] ||
        (typeof formData[field] === "string" && formData[field].trim() === "")
      ) {
        errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
        isValid = false;
      }
    });

    // Check for duplicates only if the required fields are not empty
    if (isValid) {
      const isDuplicateName = row2.some(
        (row) =>
          row.id !== formData.id &&
          row.name.toLowerCase() === formData.name.toLowerCase()
      );
      const isDuplicateFullName = row2.some(
        (row) =>
          row.id !== formData.id &&
          row.fullName.toLowerCase() === formData.fullName.toLowerCase()
      );
      const isDuplicateContactNumber = row2.some(
        (row) =>
          row.id !== formData.id && row.contactNumber === formData.contactNumber
      );
      const isDuplicateNIC = row2.some(
        (row) =>
          row.id !== formData.id &&
          row.nic.toLowerCase() === formData.nic.toLowerCase()
      );

      if (isDuplicateName) {
        errors.name = "Name already exists";
        isValid = false;
      }
      if (isDuplicateFullName) {
        errors.fullName = "Full Name already exists";
        isValid = false;
      }

      if (isDuplicateContactNumber) {
        errors.contactNumber = "Contact number already exists";
        isValid = false;
      }

      if (isDuplicateNIC) {
        errors.nic = "NIC already exists";
        isValid = false;
      }
      if (
        !(
          /^[0-9]{9}[vV]$/.test(formData.nic) ||
          /^[0-9]{12}$/.test(formData.nic)
        )
      ) {
        errors.nic = "invalid NIC";
        isValid = false;
      }
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        errors.email = "Invalid email";
        isValid = false;
      }
      const dob = new Date(formData.dob);

      if (isNaN(dob)) {
        errors.dob = "Invalid date of birth";
        isValid = false;
      }
      if (!/^\d+$/.test(formData.contactNumber)) {
        errors.contactNumber = "Invalid contact number, only integers allowed";
        isValid = false;
      }
    }
    // If any errors are found, set form errors and return
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
    try {
      console.log(pData, "fid", pData.id);

      // Assuming you have an API endpoint for updating a patient
      axios
        .put(baseURL + endPoints.StaffList + `/${pData.id}`, pData)
        .then((response) => {
          settypenoti("success");
          setNotiMessage("Member Edited successfully");
          setNotificationOpen(true);
          // Handle success, maybe update local state or dispatch an action
          console.log("Patient updated successfully:", response.data);
          handleEditClose();
          setIsDisabled(true);
          forceUpdate((prevCount) => prevCount + 1); // Trigger a re-render

          // Assume the Axios request is successful, then set showPatient to true
          // Close the edit dialog
          setEditOpen(false);
        });
    } catch (error) {
      // Handle error, show an error messdob or dispatch an error action
      console.error("Error updating patient:", error.response.data);
    }
    setEditOpen(false);
  };



  const [dataUrl, setDataUrl] = useState(null);
  useEffect(() => {
    handleInputChange("imageUrl", dataUrl);
    setdropOpen(false)
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
    <Dialog open={editOpen} onClose={handleEditClose}>
      <DialogTitle
        sx={{
          backgroundColor: "rgb(222, 244, 242)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Edit User
        <CloseIcon onClick={handleEditClose} sx={{ cursor: "pointer" }} />
      </DialogTitle>
      <DialogContent>
      <Avatar
        onClick={isDisabled ? null : handleDropBoxOpen}
        src={formData.imageUrl}
        sx={{ width:130, height:130 ,margin:'auto',marginTop:'2vh'}}
      />
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
            onChange={(e) =>
              setFormData({ ...formData, [field.key]: e.target.value })
            }
          />
        ))}
        <FormControl sx={{ m: 2, ml: 4 }}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        </FormControl>
        <div style={{ display: "flex" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField"]}>
              <DateField
                label="Date Of Birth"
                value={formData.dob ? dayjs(formData.dob) : null} // Ensure formData.dob is a valid date or null
                onChange={(newValue) => handleInputChange("dob", newValue)}
                renderInput={(props) => <TextField {...props} />}
                style={{ width: "210px", marginTop: "9px" }}
                disabled={isDisabled}
                // format="YYYY/MM/DD" // You can add this line back if it's needed
              />
            </DemoContainer>
          </LocalizationProvider>
          <Select
            labelId="gender-label"
            id="gender"
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            label="Gender"
            disabled={isDisabled}
            style={{ width: "200px", height: "6vh" }}
            sx={{ ml: 3, mt: 2 }}
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
          onClick={isDisabled ? handleEditClick : handleEditSave}
          variant="contained"
          sx={{ backgroundColor: "rgb(121, 204, 190)", m: 2 }}
        >
          {isDisabled ? "Edit" : "Save"}
        </Button>
      </DialogActions>


    </Dialog>
    <Dialog open={dropOpen} onClose={handleDropBoxClose}>
        <DialogContent>
        <DropBox handleDropBoxClose={handleDropBoxClose} setDataUrl={setDataUrl} />
        
        </DialogContent>
      </Dialog>    </>
  );
};

export default EditUserDialog;
