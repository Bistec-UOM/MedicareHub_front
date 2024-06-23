import React, { useState } from "react";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import axios from "axios";
import { baseURL, endPoints } from "../../../Services/Appointment";
import { setHeaders } from "../../../Services/Auth";
import theme from "../../../components/Style";
import { LoadingButton } from "@mui/lab";
import Style from '../../Style';
import DoneIcon from '@mui/icons-material/Done'; 
import SendIcon from '@mui/icons-material/Send'

const PatientRegpopup = ({
  handleNotification,
  regopen,
  setRegopen,
  setPatientList,
  patientList,
  patientCount,
  setPatientCount,
}) => {
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(null);

  const [nameError, setNameError] = useState(false);
  const [nicError, setNicError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [nameDisplayError, setNameDisplayError] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  const handleDob = (newvalue) => {
    setDob(newvalue);
  };

  const handleClose = () => {
    setRegopen(false);
  };

  const handleAddClose = () => {
    setRegopen(false);
  };

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
    setRegLoading(true);
    e.preventDefault();
    const agenumber = Number(age);
    if (!nameError && !nicError && !ageError && agenumber !== 0 && !phoneError) {
      let obj = {
        Id: 0,
        NIC: nic,
        Name: name,
        FullName: name,
        DOB: dob,
        ContactNumber: phone,
        Address: address,
        Email: email,
        Gender: gender,
      };
      try {
        await axios.post(
          baseURL + endPoints.PatientList,
          obj, setHeaders()
        );
        setRegLoading(false);
        setPatientCount(patientCount + 1);
        setRegopen(false);
        handleNotification("Patient Registered successfully!", "success");
      } catch (err) {
        handleNotification("Network Error Occurred!", "error");
      }
      setName("");
      setAge(0);
      setAddress("");
      setNic("");
      setEmail("");
      setPhone("");
      setDob(null);
      handleNotification("A new patient registered successfully!", "success");
      setRegopen(false);
    } else {
      setRegLoading(false);
    }
  }

  return (
    <React.Fragment>
      <Dialog open={regopen} onClose={handleClose} maxWidth="sm" fullWidth>
        <form autoComplete="false" onSubmit={handleSubmit}>
          <DialogTitle
            sx={{
              backgroundColor: theme.palette.custom.greenH,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "sticky",
              top: 0,
              zIndex: 1100,
             
            }}
          >
            <Typography
              variant="h5"
              sx={{ textAlign: "center", color: "white", flexGrow: 1 }}
            >
              Patient Registration Form
            </Typography>
            <IconButton onClick={handleAddClose} sx={{ color: "#20415C" }}>
              <CloseIcon  sx={{color:"white"}}/>
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ flex: 1, overflowY: "auto" }}>
            <TextField
              data-testid="fullname"
              size="small"
              error={nameError}
              required
              label="Full Name"
              helperText={
                nameDisplayError === 1
                  ? "Name is too short!"
                  : nameDisplayError === 2
                    ? "Invalid Name!"
                    : ""
              }
              fullWidth
              margin="dense"
              onChange={handleNameError}
              value={name}
              sx={{ marginTop: "3%" }}
            />
            <TextField
              data-testid="nic"
              size="small"
              label="NIC"
              margin="normal"
              error={nicError}
              value={nic}
              helperText={nicError ? "Invalid Nic!" : ""}
              onChange={handleNicError}
            />
            <TextField
              data-testid="address"
              size="small"
              label="Address"
              fullWidth
              required
              margin="normal"
              value={address}
              onChange={handleAddress}
            />
            <TextField
              data-testid="phone"
              size="small"
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
                  data-testid="birthday"
                  size="small"
                  label="Date Of Birth"
                  value={dob ? dayjs(dob) : null}
                  onChange={(newValue) => handleDob(newValue)}
                  renderInput={(props) => <TextField {...props} />}
                  style={{ width: "225px" }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              data-testid="email"
              size="small"
              type="email"
              label="Email Address"
              fullWidth
              margin="normal"
              value={email}
              onChange={handleEmail}
            />
            <TextField
              data-testid="age"
              size="small"
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
                data-testid="gender"
                size="small"
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
            <LoadingButton
             data-testid="sendbutton"
              loading={regLoading}
              sx={{
                margin: "2%",
              }}
              variant="contained"
              type="submit"
              endIcon={<SendIcon></SendIcon>}
            >
              Send
            </LoadingButton>
           
          </Box>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default PatientRegpopup;
