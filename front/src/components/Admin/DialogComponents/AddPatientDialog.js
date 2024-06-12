import * as React from "react";
import {Dialog,DialogActions,DialogContent,DialogTitle,FormControl,FormHelperText,Grid,InputLabel,MenuItem,Select,TextField} from "@mui/material";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { baseURL, endPoints } from "../../../Services/Admin";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import theme from "../../Style";

const AddPatientDialog = ({open,rows,handleAddClose,handleInputChange,formErrors,formData,setFormErrors,settype,setNotiMessage,setNotificationOpen,setOpen,forceUpdate,}) => {
  const [loadingB, setLoadingB] = useState(false);

  const handleAddSaveClose = () => {
    // Validate form fields
    let errors = {};
    let isValid = true;
    console.log(formData);
    setLoadingB(true);
    // Check if any of the required fields are empty
    const fields = [
      "fullName",
      "name",
      "address",
      "contactNumber",
      "gender",
      "nic",
      "dob",
      "email",
    ];
    //check validation in formadata is empty
    fields.forEach((field) => {
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
    const isDuplicateFullName = rows.some((row) => row.fullName.toLowerCase() === formData.fullName.toLowerCase());
    const isDuplicateName = rows.some((row) => row.name.toLowerCase() === formData.name.toLowerCase());
    const isDuplicateContactNumber = rows.some((row) => row.contactNumber === formData.contactNumber);
    const isDuplicateNIC = rows.some((row) => row.nic.toLowerCase() === formData.nic.toLowerCase());

    if (isDuplicateFullName) {
      errors.fullName = "Full Name already exists";
      isValid = false;
    }
    if (isDuplicateName) {
      errors.name = "Name already exists";
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
      !(/^[0-9]{9}[vV]$/.test(formData.nic) || /^[0-9]{12}$/.test(formData.nic))
    ) {
      errors.nic = "invalid NIC";
      isValid = false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email";
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
      errors.contactNumber = "Invalid contact number";
      isValid = false;
    }

    // If any duplicates are found, set form errors and return
    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    // If no errors, proceed with creating data object and sending POST request
    const newData = {
      name: formData.name,
      fullName: formData.fullName,
      nic: formData.nic,
      address: formData.address,
      contactNumber: formData.contactNumber,
      email: formData.email,
      dob: formData.dob,
      gender: formData.gender,
    };
    // console.log("level last" + newData);

    // Send POST request to add new data
    axios
      .post(baseURL + endPoints.PatientList, newData)
      .then((response) => {
        settype("success");
        setNotiMessage("Patient Added successfully");
        setNotificationOpen(true);
        setOpen(false);
        console.log("Data added successfully:", response.data);
        forceUpdate((prevCount) => prevCount + 1); // Trigger a re-render
        setLoadingB(false);
        // Optionally, fetch updated data from the API and update the state
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          setNotiMessage("You are not connected to internet");
          settype("error");
          setNotificationOpen(true);
        } else {
          console.error(error);
        }
      });
  };

  return (
    <Dialog sx={{width: {md:'39.5vw',sm:"100%"},margin:"auto"}} open={open}  onClose={handleAddClose}>
      <DialogTitle
        sx={{
          backgroundColor:theme.palette.custom.greenH,
          color: "white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Add Patient
        <CloseIcon onClick={handleAddClose} sx={{ cursor: "pointer" }} />
      </DialogTitle>
      <DialogContent >
        {/* Add form fields or other content here */}
        <TextField
          required
          label="Full Name"
          fullWidth

          sx={{ mb: 1, mt: 3 }}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
          size="small"
          //!! use for convert value into a boolean btw error is a boolean data value
          error={!!formErrors.fullName}
          helperText={formErrors.fullName}
        />
        <TextField
          required
          size="small"
          label="Name"
          sx={{
            mb: 1,
            width: {
              xs: '100%', // Full width on extra-small (mobile) devices
              sm: 'auto' // Default width on devices larger than extra-small
            }
          }}
          onChange={(e) => handleInputChange("name", e.target.value)}
          error={!!formErrors.name}
          helperText={formErrors.name}
        />
        <TextField
          required
          label="Address"
          size="small"
          fullWidth
          sx={{ mb: 1 }}
          onChange={(e) => handleInputChange("address", e.target.value)}
          error={!!formErrors.address}
          helperText={formErrors.address}
        />
        <TextField
          required
          size="small"
          label="NIC"
          sx={{ mb: 1 ,            
            width: {
            xs: '100%', // Full width on extra-small (mobile) devices
            sm: 'auto' // Default width on devices larger than extra-small
          }}}
          onChange={(e) => handleInputChange("nic", e.target.value)}
          error={!!formErrors.nic}
          helperText={formErrors.nic}
        />
        <TextField
          required
          size="small"
          label="Contact Number"
          sx={{ mb: 1,marginLeft:{md:'2.9vw',sm:0},            
            width: {
            xs: '100%', // Full width on extra-small (mobile) devices
            sm: 'auto' // Default width on devices larger than extra-small
          } }}
          onChange={(e) => handleInputChange("contactNumber", e.target.value)}
          error={!!formErrors.contactNumber}
          helperText={formErrors.contactNumber}
        />
        <TextField
          required
          size="small"
          label="E-mail"
          fullWidth
          sx={{ mb: 1 }}
          onChange={(e) => handleInputChange("email", e.target.value)}
          error={!!formErrors.email}
          helperText={formErrors.email}
        />
        <Grid sx={{ display: {md:"flex",sm:"flow"} }} >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField"]}>
              <DateField
                label="Date Of Birth"
                value={formData.dob ? dayjs(formData.dob) : null}
                onChange={(newValue) => handleInputChange("dob", newValue)}
                renderInput={(props) => <TextField {...props} />}
                sx={{ width: {md:"215px"} }}
                error={!!formErrors.dob}
                size="small"
                helperText={formErrors.dob}
                required // Ensure date of birth is required
              />
            </DemoContainer>
          </LocalizationProvider>
          <FormControl sx={{ marginLeft: {sm:"25px",xs:"10px"}, marginTop: "8px" }}>
            <InputLabel sx={{top:'-1vh',marginLeft:".9vw"}} id="demo-simple-select-label">Gender *</InputLabel>
            <Select
              size="small"
              required
              sx={{ width: {md:"210px",xs:"69vw"},marginLeft:{md:'.9vw',xs:"-10px"} }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Gender"
              onChange={(e) => handleInputChange("gender", e.target.value)}
              error={!!formErrors.gender}
            >
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Male"}>Male</MenuItem>
            </Select>
            {formErrors.gender && (
              <FormHelperText error>{formErrors.gender}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </DialogContent>
      <DialogActions>
        {/* <Button
          onClick={handleAddSaveClose}
          variant="contained"
          size="small"
          sx={{ m: 1 }}
        >
          Add
        </Button> */}

<LoadingButton 
            sx={{ m: 2 }}
            variant='contained' 
            size='small' 
            endIcon={<AddIcon/>}           
            loading={loadingB}
            loadingPosition="end"
            onClick={handleAddSaveClose}
          >Add</LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddPatientDialog;
