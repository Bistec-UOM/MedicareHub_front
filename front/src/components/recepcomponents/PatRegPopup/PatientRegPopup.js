import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { Box } from "@mui/material";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import axios from "axios";


const PatientRegpopup = ({
  handleNotification,
  regopen,
  setRegopen,
  setPatientList,
  patientList,
  patientCount,
  setPatientCount
}) => {
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [dob,setDob]=useState(null);

  const [nameError, setNameError] = useState(false);
  const [nicError, setNicError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [nameDisplayError, setNameDisplayError] = useState("");


  const handleDob=(newvalue)=>
  {
    setDob(newvalue);

  }

  // const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setRegopen(false);
  };
  //   const handleNameError=()=>
  //   {
  //     if(name==" ")
  //     {
  //         setNameError(true);
  //     }
  //     else{
  //         setNameError(false);
  //     }
  //   }

  //   const handleEditClickOpen = () => {
  //     setEditOpen(true);
  //   };

  const handleAddClose = () => {
    setRegopen(false);
  };

  const handleSave = () => {
    // Handle saving edited data here
    console.log("Saved data:");
    setRegopen(false);
  };

  //   const handleName=(e)=>{

  //   }
  const handleNic = (e) => {
    setNic(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleAge = (e) => {
    setAge(e.target.value);
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handleNameError = (e) => {
    setName(e.target.value);
    const nameregex = /^[a-zA-Z ]+$/;
    let len = e.target.value.length;
    if (len > 0) {
      if (len <= 5 || !nameregex.test(e.target.value)) {
        setNameError(true);
        if (len <= 5) {
          setNameDisplayError(1);
        } else if (!nameregex.test(e.target.value)) {
          setNameDisplayError(2);
        }
      } else {
        setNameError(false);
        setNameDisplayError(3);
      }
    }
  };
  const handleNicError = (e) => {
    setNic(e.target.value);

    let len = e.target.value.length;
    const nicRegex1 = /^[0-9]{9}v$/i;
    const nicRegex2 = /^\d{12}$/;
    if (len > 0) {
      if (nicRegex1.test(e.target.value) || nicRegex2.test(e.target.value)) {
        setNicError(false);
      } else {
        setNicError(true);
      }
    }
  };
  const handlePhoneError = (e) => {
    setPhone(e.target.value);

    let len = e.target.value.length;
    var phoneregex = /^[0-9]{10}$/;

    if (len > 0) {
      if (phoneregex.test(e.target.value)) {
        setPhoneError(false);
      } else {
        setPhoneError(true);
      }
    }
  };

  const handleAgeError = (e) => {
    setAge(e.target.value);
    if (e.target.value > 0 && e.target.value <= 100) {
      setAgeError(false);
    } else {
      setAgeError(true);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const agenumber = Number(age);
    console.log("inside handle submit");
    //handleNicError()
    if (!nameError && !nicError && !ageError && agenumber != 0 && !phoneError) {
      let obj= {
        Id: 0,
        NIC:nic,
        Name:name,
        FullName:name,
        DOB:dob,
        ContactNumber:phone,
        Address:address,
        Email:email,
        Gender:gender,
       
      }

      try{
          await axios.post("https://localhost:7205/api/Appointment/patients",obj
         );
         console.log(obj);
         setPatientCount(patientCount+1);
         console.log("inside post");
         setRegopen(false);
        handleNotification("Patient Registered succesfully!");

      }
      catch(err)
      {
      var msg=err.response.data;
      console.log("Inseide error");
         console.log(err.response.data);
         //setError(msg);
      }

      // setPatientList([
      //   ...patientList,
      //   {
      //     name: name,
      //     nic: nic,
      //     age: age,
      //     phone: phone,
      //     email: email,
      //     city: address,
      //   },
      // ]);
      setName("");
      setAge(0);
      setAddress("");
      setNic("");
      setEmail("");
      setPhone("");
      setDob(null);

      console.log("Data saved");
      handleNotification("A new patient registered succesfully!");
      setRegopen(false);
    } else {
      console.log("not saved");
      console.log(nicError);
    }
  };

  return (
    <React.Fragment>
      <Dialog open={regopen} onClose={handleClose}>
        <form autoComplete="false" onSubmit={handleSubmit}>
          <DialogTitle
            sx={{
              backgroundColor: "rgb(222, 244, 242)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "90%",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{ textAlign: "center", color: "#20415C" }}
              >
                {" "}
                Patient Registration Form
              </Typography>
            </Box>

            <IconButton sx={{ position: "absolute", top: 0, right: 0 }}>
              <CloseIcon onClick={handleAddClose} />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              //error={nameHelper && nameHelper.length ?true:false}
              error={nameError}
              required
              label="Full Name"
              helperText={
                nameDisplayError == 1
                  ? "Name is too short!"
                  : nameDisplayError == 2
                  ? "Invalid Name!"
                  : ""
              }
              fullWidth
              margin="dense"
              onChange={handleNameError}
              value={name}
              sx={{ marginTop: "3%" }}
              // onChange={handleName}
            />
            <TextField
              label="NIC"
              margin="normal"
              error={nicError}
              value={nic}
              helperText={nicError ? "Invalid Nic!" : ""}
              onChange={handleNicError}
            />
            <TextField
              label="Address"
              fullWidth
              required
              margin="normal"
              value={address}
              onChange={handleAddress}
            />
            <TextField
              type="text"
              label="Contact Number"
              margin="normal"
              required
              value={phone}
              error={phoneError}
              helperText={phoneError ? "Invalid Contact No!" : ""}
              onChange={handlePhoneError}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField"]}>
                <DateField
                  label="Date Of Birth"
                  value={dob ? dayjs(dob) : null} // Ensure formData.age is a valid date or null
                  onChange={(newValue) => handleDob(newValue)}
                  renderInput={(props) => <TextField {...props} />}
                  style={{ width: "225px" }}
                //  disabled={isDisabled}
                  // format="YYYY/MM/DD" // You can add this line back if it's needed
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              type="email"
              label="Email Address"
              fullWidth
              margin="normal"
              value={email}
              onChange={handleEmail}
            />
            <TextField
              type="number"
              label="Age"
              margin="normal"
              error={ageError}
              onChange={handleAgeError}
              helperText={ageError ? "Invalid Age" : ""}
              value={age}
            />
            <FormControl
              margin="normal"
              sx={{ width: "15vh", ml: { sm: 4, xs: 0 } }}
            >
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                value={gender}
                onChange={handleGender}
                label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 0 }}
          >
            <Button
              sx={{
                backgroundColor: "#79CCBE", // Replace with your desired color
                "&:hover": {
                  backgroundColor: "#79CCBE", // Replace with your desired hover color
                },
                margin: "2%",
              }}
              variant="contained"
              type="submit"
            >
              Save
            </Button>
          </Box>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default PatientRegpopup;
