import {Button,Dialog,DialogTitle,DialogContent,DialogActions,TextField,FormControl,InputLabel,Select,MenuItem, FormHelperText, Grid} from "@mui/material";
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
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import theme from "../../Style";
import { setHeaders } from "../../../Services/Auth";

const EditUserDialog = ({editOpen,handleEditClose,fields,formErrors,formData,isDisabled,setFormData,handleInputChange,deletePopUp,handleEditClick,row2,setFormErrors,pData,settypenoti,setNotiMessage,setNotificationOpen,setIsDisabled,setEditOpen,forceUpdate}) => {
  const [loadingB, setloadingB] = useState(false);
  const handleEditSave = () => {
    setloadingB(true);
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
        errors.contactNumber = "Number already exists";
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
        errors.contactNumber = "Invalid contact number";
        isValid = false;
      }
    }
    // If any errors are found, set form errors and return
    if (!isValid) {
      setFormErrors(errors);
      setloadingB(false);
      return;
    }
    try {
      console.log(pData, "fid", pData.id);

      // Assuming you have an API endpoint for updating a patient
      axios
        .put(baseURL + endPoints.StaffList + `/${pData.id}`, pData,setHeaders())
        .then((response) => {
          settypenoti("success");
          setNotiMessage("Member Edited successfully");
          setNotificationOpen(true);
          // Handle success, maybe update local state or dispatch an action
          console.log("Patient updated successfully:", response.data);
          handleEditClose();
          setIsDisabled(true);
          forceUpdate((prevCount) => prevCount + 1); // Trigger a re-render
          setloadingB(false);

          // Assume the Axios request is successful, then set showPatient to true
          // Close the edit dialog
          setEditOpen(false);
          // setEditOpen(false);
        });
    } catch (error) {
      // Handle error, show an error messdob or dispatch an error action
      console.error("Error updating patient:", error.response.data);
    }
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
    <Dialog open={editOpen} sx={{width: {md:'39.5vw',xs:"100%",sm:"100%"},margin:"auto"}}  onClose={handleEditClose}>
      <DialogTitle
        sx={{
          backgroundColor:theme.palette.custom.greenH,
          color: "white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Edit User
        <CloseIcon onClick={handleEditClose} sx={{ cursor: "pointer" }} />
      </DialogTitle>
      <DialogContent >
      <Avatar
        onClick={isDisabled ? null : handleDropBoxOpen}
        src={formData.imageUrl}
        sx={{ width:100, height:100 ,cursor:'pointer',margin:'auto',marginTop:'2vh'}}
      />
        {fields.map((field) => (
          <TextField
            key={field.key}
            label={field.label}
            sx={field.style}
            error={!!formErrors[field.key]}
            helperText={formErrors[field.key]}
            fullWidth={field.fullWidth || false}
            margin="dense"
            size="small"
            value={formData[field.key]}
            disabled={isDisabled}
            onChange={(e) =>
              setFormData({ ...formData, [field.key]: e.target.value })
            }
          />
        ))}
     
        <Grid sx={{ display: {sm:"flex" ,xs:"flow"} }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField"]}>
              <DateField
                label="Date Of Birth"
                value={formData.dob ? dayjs(formData.dob) : null} // Ensure formData.dob is a valid date or null
                onChange={(newValue) => handleInputChange("dob", newValue)}
                renderInput={(props) => <TextField {...props} />}
                disabled={isDisabled}
                size="small"
                // format="YYYY/MM/DD" // You can add this line back if it's needed
              />
            </DemoContainer>
          </LocalizationProvider>
          <FormControl sx={{  ml: {md:2,xs:0},width:{md:"50%",xs:"100%"} }}>
          <InputLabel sx={{left:{md:"1.6vw"},top:"0.9vh",opacity:"60%"}} id="demo-simple-select-label">Gender</InputLabel>
        
          <Select
            labelId="gender-label"
            id="gender"
            size="small"
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            label="Gender"
            disabled={isDisabled}
            sx={{ ml: {md:3,xs:0}, mt: 1 }}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
          </FormControl>
          {formErrors.gender && (
              <FormHelperText error>{formErrors.gender}</FormHelperText>
            )}
        </Grid>
      </DialogContent>
      <DialogActions>
        {!isDisabled && (
          <Button
            onClick={deletePopUp}
            variant="outlined"
            endIcon={<DeleteIcon/>}
            color="error"
            sx={{ m: 2 }}
          >
            Delete
          </Button>
        )}
        {/* <Button
          onClick={isDisabled ? handleEditClick : handleEditSave}
          variant="contained"
          sx={{  m: 2 }}
        >
          {isDisabled ? "Edit" : "Save"}
        </Button> */}
        <LoadingButton 
            sx={{ m: 2 }}
            variant='contained' 
            size='small' 
            endIcon={isDisabled ? <EditIcon /> : <DoneIcon/>}           
            loading={loadingB}
            loadingPosition="end"
            onClick={isDisabled ? handleEditClick : handleEditSave}
          >
             {isDisabled ? 'Edit' : 'Save '}
              {/* {isDisabled ? <EditIcon fontSize="small" sx={{ml:1}}/> : <DoneIcon fontSize="small" sx={{ml:1}}/>} */}
          </LoadingButton>
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
