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
import AskDelete from "./DialogComponents/AskDelete";
import SuccessNotification from "../recepcomponents/SnackBar/SuccessNotification";



function createData(id,fullName,name,nic,address,contactNumber,qualifications,role,email,dob,gender,password) {
    return {id,fullName,name,nic,address,contactNumber,qualifications,role,email,dob,gender,password};
  }
export default function Staff() {
  const [notificationOpen,setNotificationOpen]=useState(false);
  const [notiMessage,setNotiMessage]=useState("");
  const [typenoti, settypenoti] = useState('success');

// calling for edit
const [isDisabled, setIsDisabled] = useState(true);

  const [formData, setFormData] = useState({
    id:0,
    name: "",
    fullName: "",
    nic: "",
    address: "",
    contactNumber: "",
    email: "",
    dob: "",
    gender: "",
    role:"",
    qualifications:"",
    password:""
  });
  const [update,forceUpdate]=useState(0);
  useEffect(() => {
    axios.get(`https://localhost:7205/api/User`)
    .then(res => {
      const apiData = res.data.map((data,index) => createData(
        // index+1,
        data.id,
        data.fullName,
        data.name,
        data.nic,
        data.address,
        data.contactNumber,
        data.qualifications,
        data.role,
        data.email,
        data.dob,
        data.gender,
        data.role,
        data.password
        // data.dob
      ));
      setStaffData(apiData);
    })
    .catch(err=>{
      if (err.message === 'Network Error') { 
          console.error('You are not connected to internet');
          setNotiMessage("You are not connected to internet");
          settypenoti('error')
          setNotificationOpen(true);
      } else {
        console.error(err);
      }
    });
    
  }, [update]);

  const [row2, setStaffData] = useState([]);



  const pData = {
    id:formData.id,
    name: formData.name,
    fullName: formData.fullName,
    nic: formData.nic,
    address: formData.address,
    contactNumber: formData.contactNumber,
    email: formData.email,
    dob: formData.dob,
    gender: formData.gender,
    qualifications:formData.qualifications,
    password:formData.password,
    role:formData.role,
  };

const [Role, setRole] = useState("");
  const handleAddSaveClose = () =>{
    let temp = pData
    temp.id = 0;
    temp.role = Role;
    console.log(temp.role)
    axios.post(`https://localhost:7205/api/User`,temp)
    .then(res => {
      console.log('success')
          forceUpdate(prevCount => prevCount + 1); // Trigger a re-render

    }).catch(er => {
      console.error(er);
    });
    setOpen(false);
  };

  const handleAddClickOpen = (buttonNumber) => {
    setType(`Add ${buttonNumber}`);
    setRole(buttonNumber);
    console.log(Role)
    setOpen(true);
  };


  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [Type, setType] = useState('');

  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
    setDeleteOpen(false);
  };


  const handleEditClick = () =>{
    setIsDisabled(false)
  }
  const handleEditSave = () => {
    // Handle saving edited data here
    console.log("Edited data:", selectedPaper);

    
try {
  console.log(pData,"fid",pData.id);

          // Assuming you have an API endpoint for updating a patient
          axios.put(`https://localhost:7205/api/User/`+`${pData.id}` , pData)
          .then(response => {
            // Handle success, maybe update local state or dispatch an action
            console.log('Patient updated successfully:', response.data);
            handleEditClose();
            setIsDisabled(true);
            forceUpdate(prevCount => prevCount + 1); // Trigger a re-render

                // Assume the Axios request is successful, then set showPatient to true
    // Close the edit dialog
    setEditOpen(false);
          })
} catch (error) {
  // Handle error, show an error messdob or dispatch an error action
  console.error('Error updating patient:', error.response.data);
  
}
    setEditOpen(false);
  };

  const handleEditClickOpen = (row) => {
    // setType(`Edit ${buttonNumber}`);
    setFormData({...formData,id: row.id, name: row.name,role:row.role, fullName: row.fullName, nic: row.nic,address: row.address,contactNumber:row.contactNumber,email:row.email,dob:row.dob,gender:row.gender,qualifications:row.qualifications,password:row.password});
console.log(pData.id)
    // setSelectedPaper(row);
    setEditOpen(true);
    setIsDisabled(true);
  };

  const handleEditClose = () => {
    setSelectedPaper(null);
    setEditOpen(false);
    setDeleteOpen(false);
    // setIsDisabled(en);
  };

  const handleInputChange = (field, value) => {
    console.log('update values');
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  const handleRemove = () => {
    console.log('removed'+formData.id)
    axios.delete(`https://localhost:7205/api/User/${pData.id}`)
      .then(res => {
        forceUpdate(prevCount => prevCount + 1); // Trigger a re-render
        console.log("success", formData);
      })
      .catch(error => {
        console.error("Error deleting user:", error);
      });
  
    setEditOpen(false);
    setDeleteOpen(false);
  };
  
  // const [Gender, setGender] = React.useState('');
const deletePopUp = () =>{
  setDeleteOpen(true);
}

const fields = [
  { label: "Full Name", key: "fullName", fullWidth: true},
  { label: "Usual Name", key: "name" },
  { label: "NIC", key: "nic",style:{ml:'20px'} },
  { label: "Address", key: "address", fullWidth: true },
  { label: "Contact Number", key: "contactNumber" },
  { label: "Qualifications", key: "qualifications" ,style:{ml:'20px'}},
  { label: "Email Address", key: "email" },
  { label: "Password", key: "password" },
];
const RoleFields = ["Doctor", "Receptionist", "Lab Assistant", "Cashier"];

  return (
    <div>
      

      {/* data adding */}

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
          {/* Add form fields or other content here */}
          <TextField required label="Full Name" fullWidth sx={{mb:2}}  onChange={(e) => handleInputChange("fullName", e.target.value)}/>
          <TextField required label="Usual Name"  sx={{ mb: 1 }} onChange={(e) => handleInputChange("name", e.target.value)}/>
          <TextField required  label="NIC" sx={{ ml: 4, mb: 1 }} onChange={(e) => handleInputChange("nic", e.target.value)}/>
          <TextField required label="Address" fullWidth sx={{ mb: 1 }} onChange={(e) => handleInputChange("address", e.target.value)}/>
          <TextField required label="Contact Number" sx={{ mb: 1 }} onChange={(e) => handleInputChange("contactNumber", e.target.value)}/>
          <TextField required label="qualifications" sx={{ ml: 4, mb: 1 }} onChange={(e) => handleInputChange("qualifications", e.target.value)}/>
          <TextField required label="E-mail"  sx={{ mb: 1 }} onChange={(e) => handleInputChange("email", e.target.value)}/>
          <TextField required label="Password"  sx={{ mb: 1 }} onChange={(e) => handleInputChange("password", e.target.value)}/>
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

      {/* data editing */}
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
        label={field.label}
        sx={field.style}
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
            style={{width:'200px',marginTop:'9px'}}
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
      style={{width:"200px",height:'8vh'}}
      sx={{m:1,mt:2}}
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

 {/*mapping data*/}
 {RoleFields.map((rolefild) => (
     
<div>

<Paper
  sx={{
    mt:2,
    m: 1,
    backgroundColor: "rgb(59, 135, 122)",
    color: "white",
    margin: "10 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 2,
    paddingRight: 2,
  }}
>
  <Typography
    variant="h5"
    sx={{ paddingTop: 0.75, paddingBottom: 0.75, fontWeight: "bolder" }}
  >
    {rolefild}
  </Typography>
  <Button
    variant="contained"
    size="small"
    sx={{
      backgroundColor: "rgb(121, 204, 190)",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      fontWeight: "bolder",
    }}
    onClick={() =>handleAddClickOpen(rolefild)}
  >
    Add
  </Button>
</Paper>
{/* recep Paper */}
{row2.filter(row=>row.role === rolefild).map((row)=>

//role data in here
<Paper
key={row.Id}

  sx={{
    cursor:'Pointer',
    mt: 1.1,
    display: "flex",
    flexDirection: "column", // Set to 'column' for vertical display
    paddingLeft: 2,
    paddingRight: 2,
  }}
  onClick={() => handleEditClickOpen(row)} // Open the edit window when clicking on the paper
>
  <Typography variant="h6" sx={{ paddingTop: 0.75 }}>
    {row.fullName}
  </Typography>
  <Typography
    variant="h10"
    sx={{ fontSize: 10, color: "rgb(186, 177, 177)" }}
  >
    {row.qualifications}
  </Typography>
  <Typography
    variant="h10"
    sx={{
      fontSize: 10,
      paddingBottom: 0.75,
      color: "rgb(186, 177, 177)",
    }}
  >
    {row.role}
  </Typography>
</Paper>)}
</div>

 ))}  
<AskDelete deleteOpen={deleteOpen} handleClose={handleClose} handleRemove={handleRemove}></AskDelete>
<SuccessNotification setNotificationOpen={setNotificationOpen} notiMessage={notiMessage} notificationOpen={notificationOpen} type={typenoti}></SuccessNotification>

    </div>
  );
}
