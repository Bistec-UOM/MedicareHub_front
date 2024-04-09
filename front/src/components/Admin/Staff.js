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
import EditUserDialog from "./DialogComponents/EditUserDialog";
import { baseURL, endPoints } from "../../Services/Admin";
import AddUserDialog from "./DialogComponents/AddUserDialog";



function createData(id,fullName,name,nic,address,contactNumber,qualifications,role,email,dob,gender,password) {
    return {id,fullName,name,nic,address,contactNumber,qualifications,role,email,dob,gender,password};
  }
export default function Staff() {
  const [notificationOpen,setNotificationOpen]=useState(false);
  const [notiMessage,setNotiMessage]=useState("");
  const [typenoti, settypenoti] = useState('success');

// calling for edit
const [isDisabled, setIsDisabled] = useState(true);



const [open, setOpen] = useState(false);
const [editOpen, setEditOpen] = useState(false);
const [deleteOpen, setDeleteOpen] = useState(false);

// const [selectedPaper, setSelectedPaper] = useState(null);
const [Type, setType] = useState('');


const [row2, setStaffData] = useState([]);
const [records, setRecords] = useState(row2);


useEffect(() => {
  if (!open || !editOpen) {
    setFormErrors({
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
  }
}, [open,editOpen]);
useEffect(() => {
  if (open) {
    setFormData({
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
  }
}, [open]);


const [formErrors, setFormErrors] = useState({
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
    axios.get(baseURL+endPoints.StaffList)
    .then(res => {
      const apiData = res.data.map((data,index) => createData(
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
      ));
      setStaffData(apiData);
      setRecords(apiData);
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
    let errors = {};
    let isValid = true;

    const fields = ['fullName', 'name', 'address', 'contactNumber', 'gender', 'nic','dob','email','qualifications','password'];
   // Check if any of the required fields are empty
  
   fields.forEach(field => {
     if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
       errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
       isValid = false;
     }
   });
 



     // Check for duplicates only if row2 is not null
//  if (isValid) {
  const isDuplicateName = row2.some((row) => row.name.toLowerCase() === formData.name.toLowerCase());
  const isDuplicateFullName = row2.some((row) => row.fullName.toLowerCase() === formData.fullName.toLowerCase());
  const isDuplicateContactNumber = row2.some((row) => row.contactNumber === formData.contactNumber);
  const isDuplicateNIC = row2.some((row) => row.nic.toLowerCase() === formData.nic.toLowerCase());

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
// }
    // If any duplicates are found, set form errors and return
    if (!isValid) {
      setFormErrors(errors);
      return;
    }


    let temp = pData
    temp.id = 0;
    temp.role = Role;
    console.log(temp.role)
    axios.post(baseURL+endPoints.StaffList,temp)
    .then(res => {
      console.log('success')
      settypenoti('success')
      setNotiMessage("Member Added successfully");
      setNotificationOpen(true);
     
          forceUpdate(prevCount => prevCount + 1); // Trigger a re-render
          setOpen(false);

    }).catch(error => {
      if (error.message === 'Network Error') {
        setNotiMessage("You are not connected to internet");
        settypenoti('error')
        setNotificationOpen(true);
      } else {
        console.error(error);
      }
    });
  };




  const handleAddClickOpen = (buttonNumber) => {
    setType(`Add ${buttonNumber}`);
    setRole(buttonNumber);
    console.log(Role)
    setOpen(true);
  };



  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
    setDeleteOpen(false);
  };


  const handleEditClick = () =>{
    setIsDisabled(false)
  }
  const handleEditSave = () => {

    let errors = {};
    let isValid = true;
    // Handle saving edited data here
    console.log("Edited data:", row2);



     // Check if any of the required fields are empty
     const fieldsName = ['fullName', 'name', 'address', 'contactNumber', 'gender', 'nic','dob','email'];
  
     fieldsName.forEach(field => {
       if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
         errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
         isValid = false;
       }
     });
   
 
   
  // Check for duplicates only if the required fields are not empty
  if (isValid) {
    const isDuplicateName = row2.some((row) => row.id !== formData.id && row.name.toLowerCase() === formData.name.toLowerCase());
    const isDuplicateFullName = row2.some((row) => row.id !== formData.id && row.fullName.toLowerCase() === formData.fullName.toLowerCase());
    const isDuplicateContactNumber = row2.some((row) => row.id !== formData.id && row.contactNumber === formData.contactNumber);
    const isDuplicateNIC = row2.some((row) => row.id !== formData.id && row.nic.toLowerCase() === formData.nic.toLowerCase());
  
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
    }}
      // If any errors are found, set form errors and return
  if (!isValid) {
    setFormErrors(errors);
    return;
  }
try {
  console.log(pData,"fid",pData.id);

          // Assuming you have an API endpoint for updating a patient
          axios.put(baseURL+endPoints.StaffList+`/${pData.id}` , pData)
          .then(response => {
            settypenoti('success')
            setNotiMessage("Member Edited successfully");
            setNotificationOpen(true);
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

  const handleEditClickOpen = (row2) => {
    // setType(`Edit ${buttonNumber}`);
    setFormData({...formData,id: row2.id, name: row2.name,role:row2.role, fullName: row2.fullName, nic: row2.nic,address: row2.address,contactNumber:row2.contactNumber,email:row2.email,dob:row2.dob,gender:row2.gender,qualifications:row2.qualifications,password:row2.password});
console.log(pData.id)
    // setSelectedPaper(row2);
    setEditOpen(true);
    setIsDisabled(true);
  };

  const handleEditClose = () => {
    // setSelectedPaper(null);
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
    axios.delete(baseURL+endPoints.StaffList+`/${pData.id}`)
      .then(res => {
        settypenoti('success')
        setNotiMessage("Staff Member removed successfully");
        setNotificationOpen(true);
        forceUpdate(prevCount => prevCount + 1); // Trigger a re-render
        console.log("success", formData);
      })
      .catch(error => {
        setNotiMessage("Staff Member has Assigned for Appointment So we cant remove this member");
        settypenoti('error')
        setNotificationOpen(true);
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
  { label: "Password", key: "password" ,style:{ml:'20px'}},
];
const RoleFields = ["Doctor", "Receptionist", "Lab Assistant", "Cashier"];

  return (
    <div>
      

      {/* data adding */}

      <AddUserDialog
  open={open}
  handleClose={handleClose}
  handleInputChange={handleInputChange}
  formErrors={formErrors}
  handleAddSaveClose={handleAddSaveClose}
  Type={Type}
/>

      {/* data editing */}
<EditUserDialog  editOpen={editOpen} handleEditClose={handleEditClose} fields={fields} formErrors={formErrors} formData={formData} isDisabled={isDisabled} setFormData={setFormData} handleInputChange={handleInputChange} deletePopUp={deletePopUp} handleEditClick={handleEditClick} handleEditSave={handleEditSave}></EditUserDialog>
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
{row2.filter(row2=>row2.role === rolefild).map((row2)=>

//role data in here
<Paper
key={row2.Id}

  sx={{
    cursor:'Pointer',
    mt: 1.1,
    display: "flex",
    flexDirection: "column", // Set to 'column' for vertical display
    paddingLeft: 2,
    paddingRight: 2,
  }}
  onClick={() => handleEditClickOpen(row2)} // Open the edit window when clicking on the paper
>
  <Typography variant="h6" sx={{ paddingTop: 0.75 }}>
    {row2.fullName}
  </Typography>
  <Typography
    variant="h10"
    sx={{ fontSize: 10, color: "rgb(186, 177, 177)" }}
  >
    {row2.qualifications}
  </Typography>
  <Typography
    variant="h10"
    sx={{
      fontSize: 10,
      paddingBottom: 0.75,
      color: "rgb(186, 177, 177)",
    }}
  >
    {row2.role}
  </Typography>
</Paper>)}
</div>

 ))}  
<AskDelete deleteOpen={deleteOpen} handleEditClose={handleClose} handleRemove={handleRemove}></AskDelete>
<SuccessNotification setNotificationOpen={setNotificationOpen} notiMessage={notiMessage} notificationOpen={notificationOpen} type={typenoti}></SuccessNotification>

    </div>
  );
}
