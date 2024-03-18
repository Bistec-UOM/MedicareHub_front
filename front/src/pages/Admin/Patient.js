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
import SuccessNotification from "../../components/recepcomponents/SnackBar/SuccessNotification";


function createData(id, name, nic, address,dob, email,gender,fullName,contactNumber) {
  return { id, name, nic, address,dob, email,gender,fullName,contactNumber };
}


function Patient() {
  const [notificationOpen,setNotificationOpen]=useState(false);
  const [notiMessage,setNotiMessage]=useState("");


const [update,forceUpdate]=useState(0);

  useEffect(() => {
    axios.get('https://localhost:7205/api/Patient')
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
        console.error('Error fetching data from API:', error.message);
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
  
    // Check if any of the required fields are empty
    const fields = ['fullName', 'name', 'address', 'contactNumber', 'gender', 'nic'];

    fields.forEach(field => {
      if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        isValid = false;
      }
    });
    // if(fullName===''){
    //   errors.fullName="Full Name is required"
    //   isValid=false;
    // }

  
    // If any required field is empty, set form errors and return
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
  
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
  
    // If any duplicates are found, set form errors and return
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
    setNotiMessage("patient added successfully")
    // If no errors, proceed with creating data object and sending POST request
    let tmp = pData;
    tmp.id = 0;
    axios.post('https://localhost:7205/api/Patient', tmp)
      .then(response => {
        setNotificationOpen(true);
        setOpen(false);
        console.log('Data added successfully:', response.data);
        forceUpdate(prevCount => prevCount + 1); // Trigger a re-render
        // Optionally, fetch updated data from the API and update the state
      })
      .catch(error => {
        console.error('Error adding data:', error.message);
      });
  };

  


  const handleRemove =()=>{
    axios.delete(`https://localhost:7205/api/patient/`+`${pData.id}`)
    .then(res=>{
      console.log("success")
      forceUpdate(prevCount => prevCount + 1); // Trigger a re-render
    });
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
  }

  // If any errors are found, set form errors and return
  if (!isValid) {
    setFormErrors(errors);
    return;
  }
try {
  
  console.log(pData)
          // Assuming you have an API endpoint for updating a patient
          axios.put('https://localhost:7205/api/patient/'+ `${pData.id}` , pData)
          .then(response => {
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
  const handleEditClose = () => {
    // setSelectedPaper(null);
    setIsDisabled(true);
    setEditOpen(false);
  };
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
    if (field === 'email') {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (!emailRegex.test(value)) {
        setFormErrors(errors => ({ ...errors, email: 'Invalid email format' }));
      } else {
        setFormErrors(errors => ({ ...errors, email: null }));
      }
    } else if (field === 'dob') {
      if (!dayjs(value).isValid()) {
        setFormErrors(errors => ({ ...errors, dob: 'Invalid date format' }));
      } else {
        setFormErrors(errors => ({ ...errors, dob: null }));
      }
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
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
<Dialog open={open} onClose={handleAddClose}>
        <DialogTitle
          sx={{
            backgroundColor: "rgb(222, 244, 242)",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Add Patient
          <CloseIcon onClick={handleAddClose} sx={{cursor:'pointer'}}/>
        </DialogTitle>
        <DialogContent>
          {/* Add form fields or other content here */}
          <TextField required label="Full Name" fullWidth sx={{ mb: 1, mt: 3 }} onChange={(e) => handleInputChange("fullName", e.target.value)} error={!!formErrors.fullName}helperText={formErrors.fullName}/>          
          <TextField required label="Name" sx={{ mb: 1 }}  onChange={(e) => handleInputChange("name", e.target.value)} error={!!formErrors.name}helperText={formErrors.name}/>
          <TextField required label="Address" fullWidth sx={{ mb: 1 }}  onChange={(e) => handleInputChange("address", e.target.value)} error={!!formErrors.address}helperText={formErrors.address}/>
          <TextField required label="NIC" sx={{  mb: 1 }}  onChange={(e) => handleInputChange("nic", e.target.value)} error={!!formErrors.nic}helperText={formErrors.nic}/>
          <TextField required label="Contact Number" sx={{ mb: 1 ,ml:2}}  onChange={(e) => handleInputChange("contactNumber", e.target.value)} error={!!formErrors.contactNumber}helperText={formErrors.contactNumber}/>
          <TextField required label="E-mail" fullWidth sx={{ mb: 1 }} onChange={(e) => handleInputChange("email", e.target.value)} error={!!formErrors.email} helperText={formErrors.email}/>
<div style={{display:'flex'}}>
<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DemoContainer components={['DateField']}>
    <DateField
      label="Date Of Birth"
      value={formData.dob ? dayjs(formData.dob) : null}
      onChange={(newValue) => handleInputChange('dob', newValue)}
      renderInput={(props) => <TextField {...props} />}
      style={{ width: '225px' }}
      required
      error={!!formErrors.dob}
      helperText={formErrors.dob}
    />
  </DemoContainer>
</LocalizationProvider>
          <FormControl style={{marginLeft:'15px',marginTop:'8px'}}>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
        required
        style={{width:'200px'}}
        labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Gender"
          onChange={(e) => handleInputChange("gender", e.target.value)}
          error={!!formErrors.gender} helperText={formErrors.gender}
        >
          <MenuItem value={'Female'}>Female</MenuItem>
          <MenuItem value={'Male'}>Male</MenuItem>

        </Select>
      </FormControl>
          </div>
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
      <Typography sx={{ flex: 1 }}>Name</Typography>
      <Typography sx={{ flex: 1 }}>NIC</Typography>
      <Typography sx={{ flex: 1 }}>Gender</Typography>
      <Typography sx={{ flex: 1 }}>Address</Typography>
      </Paper>
        {records.map((row) => (
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
            <Typography sx={{ flex: 1 }}>{row.name}</Typography>
            <Typography sx={{ flex: 1 }}>{row.nic}</Typography>
            <Typography sx={{ flex: 1 }}>{row.gender}</Typography>
            <Typography sx={{ flex: 1 }}>{row.email}</Typography>
          </Paper>
        ))}
      </Grid>

      {/* pop up data editing */}
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
          value={formData[field.key] || ''} // Ensure value is not null
          onChange={(e) =>
            setFormData({ ...formData, [field.key]: e.target.value })
          }
          sx={field.sx}
          required={field.required} // Add required prop based on form field requirements
        />
      ))}
      <div style={{ display: 'flex' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateField']}>
            <DateField
              label="Date Of Birth"
              value={formData.dob ? dayjs(formData.dob) : null}
              onChange={(newValue) => handleInputChange('dob', newValue)}
              renderInput={(props) => <TextField {...props} />}
              style={{ width: '225px' }}
              disabled={isDisabled}
              required // Ensure date of birth is required
            />
          </DemoContainer>
        </LocalizationProvider>
        <Select
          labelId="gender-label"
          id="gender"
          value={formData.gender || ''} // Ensure value is not null
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          label="Gender"
          disabled={isDisabled}
          sx={{ m: 1, ml: 1 }}
          required // Ensure gender is required
        >
          <MenuItem >Select Gender</MenuItem> {/* Add a default value */}
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
      </div>
    </DialogContent>
    <DialogActions>
      {!isDisabled && (
        <Button
          onClick={handleRemove}
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
<SuccessNotification setNotificationOpen={setNotificationOpen} notiMessage={notiMessage} notificationOpen={notificationOpen}></SuccessNotification>
</Grid>
    </div>
  );
}

export default Patient;