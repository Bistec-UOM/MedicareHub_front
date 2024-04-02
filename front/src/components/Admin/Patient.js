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
import SuccessNotification from "../recepcomponents/SnackBar/SuccessNotification";
import EditPatientDialog from "./DialogComponents/EditPatientDialog";
import AskDelete from "./DialogComponents/AskDelete";
import { baseURL,endPoints } from "../../Services/Admin";
import AddPatientDialog from "./DialogComponents/AddPatientDialog";


function createData(id, name, nic, address,dob, email,gender,fullName,contactNumber) {
  return { id, name, nic, address,dob, email,gender,fullName,contactNumber };
}


function Patient() {
  const [notificationOpen,setNotificationOpen]=useState(false);
  const [notiMessage,setNotiMessage]=useState("");
  const [type, settype] = useState('success');



const [update,forceUpdate]=useState(0);

  useEffect(() => {
    axios.get(baseURL+endPoints.PatientList)
      .then(response => {
        const apiData = response.data.map((data, index) => createData(
          data.id,
          data.name,
          data.nic,
          data.address,
          data.dob,
          data.email,
          data.gender,
          data.fullName,
          data.contactNumber
        ));
        setData(apiData);
        setRecords(apiData); // Initialize records with the fetched data
      })
      .catch(error => {
        if (error.message === 'Network Error') {
          console.error('You are not connected to internet');
          setNotiMessage("You are not connected to internet");
          settype('error')
          setNotificationOpen(true);
        } else {
          console.error(error);
        }
      });
  }, [update]);
  const [rows, setData] = useState([]);
 


  
  //open add button functionalities
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id:0,
    name: "",
    fullName: "",
    nic: "",
    address: "",
    contactNumber: "",
    email: "",
    dob: "",
    gender: ""
  });
  const handleAddClose = () => {
    setOpen(false);
  };
  const handleAddOpen = () => {
    setOpen(true);
  };
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
  };

  const handleAddSaveClose = () => {
    // Validate form fields
    let errors = {};
    let isValid = true;
    console.log(formData)

    // Check if any of the required fields are empty
    const fields = ['fullName', 'name', 'address', 'contactNumber', 'gender', 'nic','dob','email'];
  
    fields.forEach(field => {
      if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        isValid = false;
      }
    });
  

  
    // Check for duplicates only if the required fields are not empty
    const isDuplicateName = rows.some((row) => row.name.toLowerCase() === formData.name.toLowerCase());
    const isDuplicateFullName = rows.some((row) => row.fullName.toLowerCase() === formData.fullName.toLowerCase());
    const isDuplicateContactNumber = rows.some((row) => row.contactNumber === formData.contactNumber);
    const isDuplicateNIC = rows.some((row) => row.nic.toLowerCase() === formData.nic.toLowerCase());
  
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
      errors.contactNumber = 'Invalid contact number, only integers allowed';
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
  console.log("level last"+newData)
    axios.post(baseURL+endPoints.PatientList, newData)
      .then(response => {
        settype('success')
        setNotiMessage("Patient Added successfully");
        setNotificationOpen(true);
        setOpen(false);
        console.log('Data added successfully:', response.data);
        forceUpdate(prevCount => prevCount + 1); // Trigger a re-render
        // Optionally, fetch updated data from the API and update the state
      })
      .catch(error => {
        if (error.message === 'Network Error') {
          setNotiMessage("You are not connected to internet");
          settype('error')
          setNotificationOpen(true);
        } else {
          console.error(error);
        }
      });
  };
 
  const [deleteOpen, setDeleteOpen] = useState(false);


  const handleEditClose = () => {
    setOpen(false);
    setEditOpen(false);
    setDeleteOpen(false);
  };
  const deletePopUp = () =>{
    setDeleteOpen(true);
  }
  const handleRemove = () => {
    axios.delete(baseURL+endPoints.PatientList+`/${pData.id}`)
      .then(res => {
        settype('success')
        setNotiMessage("Patient removed successfully");
        setNotificationOpen(true);
        console.log("success");
        forceUpdate(prevCount => prevCount + 1); // Trigger a re-render
      })
      .catch(err => {
        console.error(err);
        setNotiMessage("Patient has Assigned for Appointment So we cant remove this patient patient");
        settype('error')
        setNotificationOpen(true);
      });
      setDeleteOpen(false);
    setEditOpen(false);
  }



// calling for edit
const [isDisabled, setIsDisabled] = useState(true);
//edit dialogbox functionalities
  const [editOpen, setEditOpen] = useState(false);
  const [showPatient, setShowPatient] = useState(false); // State to control visibility



  const handleEditSave = () => {
  // Validate form fields
  let errors = {};
  let isValid = true;

  // Check if any of the required fields are empty or null
  formFields.forEach((field) => {
    if (!formData[field.key] || formData[field.key].trim() === '') {
      errors[field.key] = `${field.label} is required`;
      isValid = false;
    }
  });

  // Check for duplicates only if the required fields are not empty
  if (isValid) {
    const isDuplicateName = rows.some((row) => row.id !== formData.id && row.name.toLowerCase() === formData.name.toLowerCase());
    const isDuplicateFullName = rows.some((row) => row.id !== formData.id && row.fullName.toLowerCase() === formData.fullName.toLowerCase());
    const isDuplicateContactNumber = rows.some((row) => row.id !== formData.id && row.contactNumber === formData.contactNumber);
    const isDuplicateNIC = rows.some((row) => row.id !== formData.id && row.nic.toLowerCase() === formData.nic.toLowerCase());
  
    if (isDuplicateName) {
      errors.name = 'Name already exists';
      isValid = false;
    }
    if (isDuplicateFullName) {
      errors.name = 'Name already exists';
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
      errors.contactNumber = 'Invalid contact number, only integers allowed';
      isValid = false;
    }
  }

  // If any errors are found, set form errors and return
  if (!isValid) {
    setFormErrors(errors);
    return;
  }
try {
  
  console.log(pData)
          // Assuming you have an API endpoint for updating a patient
          axios.put(baseURL+endPoints.PatientList+ `/${pData.id}` , pData)
          .then(response => {
            settype('success')
            setNotiMessage("Patient Edited successfully");
            setNotificationOpen(true);
            // Handle success, maybe update local state or dispatch an action
            console.log('Patient updated successfully:', response.data);
            handleEditClose();
            // Assume the Axios request is successful, then set showPatient to true
            setShowPatient(true);
            forceUpdate(prevCount => prevCount + 1); // Trigger a re-render
            // Close the edit dialog
            setEditOpen(false);
          })
} catch (error) {
  // Handle error, show an error message or dispatch an error action
  console.error('Error updating patient:', error);
  
}
        
    setEditOpen(false);
    setIsDisabled(true);

  };
  const handleEditOpen = (row) => {
    setFormData({...formData,id: row.id, name: row.name, fullName: row.fullName, nic: row.nic,address: row.address,contactNumber:row.contactNumber,email:row.email,dob:row.dob,gender:row.gender});
    // setSelectedPaper(row);
    setEditOpen(true);
    setIsDisabled(true);
  };
  // const handleEditClose = () => {
  //   // setSelectedPaper(null);
  //   setIsDisabled(true);
  //   setEditOpen(false);
  // };
  //edit asking button
  const handleEditClick = () => {
    setIsDisabled(false);
  };
  
  
  const formFields = [
    { label: "Full Name", key: "fullName" ,isfull:true},
    { label: "Name", key: "name" },
    { label: "NIC", key: "nic", sx: { ml: 1 } },
    { label: "Address", key: "address" ,isfull:true},
    { label: "Contact Number", key: "contactNumber" },
    { label: "Email", key: "email", sx: { ml: 1 } },
  ];
  

  const handleInputChange = (field, value) => {

      setFormData({
        ...formData,
        [field]: value,
      });
    
  };
  


  //this is record details for filtering
  const [records,setRecords] = useState(rows)
// creating filter function
const Filter = (event) => {
  const searchTerm = event.target.value.toLowerCase();
  
  setRecords(
    rows.filter(
      (f) =>
        (typeof f.name === 'string' && f.name.toLowerCase().includes(searchTerm)) ||
        (typeof f.address === 'string' && f.address.toLowerCase().includes(searchTerm)) ||
        (typeof f.nic === 'string' && f.nic.toLowerCase().includes(searchTerm)) ||
        (typeof f.gender === 'string' && f.gender.toLowerCase().includes(searchTerm)) ||
        (typeof f.email === 'string' && f.email.toLowerCase().includes(searchTerm)) ||
        (typeof f.contactNumber === 'string' && f.contactNumber.toLowerCase().includes(searchTerm))
    )
  );
};
const [formErrors, setFormErrors] = useState({
  fullName: '',
  name: '',
  nic: '',
  address: '',
  contactNumber: '',
  email: '',
  dob: '',
  gender: ''
});



useEffect(() => {
  if (!open || !editOpen) {
    setFormErrors({
      fullName: '',
      name: '',
      nic: '',
      address: '',
      contactNumber: '',
      email: '',
      dob: '',
      gender: ''
    });
  }
}, [open,editOpen]);
useEffect(() => {
  if (open) {
    setFormData({
      fullName: '',
      name: '',
      nic: '',
      address: '',
      contactNumber: '',
      email: '',
      dob: '',
      gender: ''
    });
  }
}, [open]);


  return (
    <div >

<Grid sx={{width:{xs:'80.5vw'},paddingLeft:{xs:'0vw',sm:'0px'}}}>
        {/* search bar */}
        <Grid sx={{ display: "flex", justifyContent: "space-between",mb:4 }}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "40vh",
            borderRadius: "20px",
            boxShadow: 3,
          }}
        >
          <InputBase type="text" className="form-control" onChange={Filter} sx={{ ml: 3, flex: 1 }} placeholder="Search Patient" />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

        {/* adding patient */}
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "rgb(121, 204, 190)",
            width: "10vh",
            height: "5vh",
            fontWeight: "bolder",
            marginLeft:{ xs:"20px"},
          }}
          onClick={handleAddOpen}
        >
          Add
        </Button>
      </Grid>


     
<Grid>
{/* for popup when adding */}
<AddPatientDialog open={open} handleAddClose={handleAddClose} handleInputChange={handleInputChange} formErrors={formErrors} formData={formData} handleAddSaveClose={handleAddSaveClose}></AddPatientDialog>
</Grid>
      <Grid>
      <Paper
      sx={{
        display: {sm:'flex',xs:'none'},
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: "10px",
        padding: 2,
        paddingLeft:'2vw',
        boxShadow: 5,
        borderRadius:'12px'
      }}
      >
      <Typography sx={{ flex: 1 }}>Full Name</Typography>
      <Typography sx={{ flex: 1 }}>NIC</Typography>
      <Typography sx={{ flex: 1 }}>E-mail</Typography>
      <Typography sx={{ flex: 1 }}>Address</Typography>
      </Paper>
      {records.sort((a, b) => a.fullName.localeCompare(b.fullName)).map((row) => (
  <Paper
    key={row.Id}
    sx={{
      cursor:'pointer',
      display: {sm:'flex',xs:'gird'},
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
      padding: 2,
      boxShadow: 2,
      borderRadius:'12px',
      pl:{sm:'2',xs:'30px'}
    }}
    onClick={() => handleEditOpen(row)} // Pass the row to handleEditClickOpen
  >
    <Typography sx={{ flex: 1 }}>{row.fullName}</Typography>
    <Typography sx={{ flex: 1 }}>{row.nic}</Typography>
    <Typography sx={{ flex: 1 }}>{row.email}</Typography>
    <Typography sx={{ flex: 1 }}>{row.address}</Typography>
  </Paper>
))}
      </Grid>

      {/* pop up data editing */}
  <EditPatientDialog editOpen={editOpen} handleEditClose={handleEditClose} formFields={formFields} formErrors={formErrors} isDisabled={isDisabled} formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} deletePopUp={deletePopUp} handleEditClick={handleEditClick} handleEditSave={handleEditSave}></EditPatientDialog>
  <SuccessNotification setNotificationOpen={setNotificationOpen} notiMessage={notiMessage} notificationOpen={notificationOpen} type={type}></SuccessNotification>
</Grid>
<AskDelete deleteOpen={deleteOpen} handleEditClose={handleEditClose} handleRemove={handleRemove}></AskDelete>
    </div>
  );
}

export default Patient;