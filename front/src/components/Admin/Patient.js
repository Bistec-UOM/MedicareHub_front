import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import {Grid,Typography,} from "@mui/material";
import { Button } from "@mui/material";
import axios from 'axios';
import { useEffect } from "react";
import SuccessNotification from "../recepcomponents/SnackBar/SuccessNotification";
import EditPatientDialog from "./DialogComponents/EditPatientDialog";
import AskDelete from "./DialogComponents/AskDelete";
import { baseURL,endPoints } from "../../Services/Admin";
import AddPatientDialog from "./DialogComponents/AddPatientDialog";
import * as signalR from '@microsoft/signalr';


function createData(id, name, nic, address,dob, email,gender,fullName,contactNumber) {
  return { id, name, nic, address,dob, email,gender,fullName,contactNumber };
}


function Patient() {
  const [notificationOpen,setNotificationOpen]=useState(false);
  const [notiMessage,setNotiMessage]=useState("");
  const [type, settype] = useState('success');



const [update,forceUpdate]=useState(0);


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

 
  const [deleteOpen, setDeleteOpen] = useState(false);


  useEffect(() => {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7205/admin") // replace 'yourHub' with the path to your hub
      .build();
  
    connection.start()
      .then(() => {
        connection.on("admin1", (data) => {
          console.log('DATA: ', data);
          createData(
            data.id,
            data.name,
            data.nic,
            data.address,
            data.dob,
            data.email,
            data.gender,
            data.fullName,
            data.contactNumber
          );
          setData(data);
            setRecords(data);
        });
      })
      .catch(err => console.error('SignalR connection error: ', err));
  
    // Cleanup function to stop the connection when the component unmounts
    return () => {
      connection.stop();
    };
  }, []);
  
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




  const handleEditOpen = (row) => {
    setFormData({...formData,id: row.id, name: row.name, fullName: row.fullName, nic: row.nic,address: row.address,contactNumber:row.contactNumber,email:row.email,dob:row.dob,gender:row.gender});
    // setSelectedPaper(row);
    setEditOpen(true);
    setIsDisabled(true);
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
<AddPatientDialog open={open} handleAddClose={handleAddClose} handleInputChange={handleInputChange} formErrors={formErrors} rows={rows} formData={formData} setFormErrors={setFormErrors} settype={settype}setNotiMessage={setNotiMessage}setNotificationOpen={setNotificationOpen}setOpen={setOpen} forceUpdate={forceUpdate}></AddPatientDialog>
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
    <Typography sx={{ flex: 1 }}>{row.fullName}</Typography>
    <Typography sx={{ flex: 1 }}>{row.nic}</Typography>
    <Typography sx={{ flex: 1 }}>{row.email}</Typography>
    <Typography sx={{ flex: 1 }}>{row.address}</Typography>
  </Paper>
))}
      </Grid>

      {/* pop up data editing */}
  <EditPatientDialog editOpen={editOpen} handleEditClose={handleEditClose} formFields={formFields} formErrors={formErrors} isDisabled={isDisabled} formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} deletePopUp={deletePopUp} handleEditClick={handleEditClick} setFormErrors={setFormErrors} rows={rows} pData={pData} settype={settype} setNotiMessage={setNotiMessage} setNotificationOpen={setNotificationOpen} setShowPatient={setShowPatient} forceUpdate={forceUpdate} setEditOpen={setEditOpen} setIsDisabled={setIsDisabled}></EditPatientDialog>
  <SuccessNotification setNotificationOpen={setNotificationOpen} notiMessage={notiMessage} notificationOpen={notificationOpen} type={type}></SuccessNotification>
</Grid>
<AskDelete deleteOpen={deleteOpen} handleEditClose={handleEditClose} handleRemove={handleRemove}></AskDelete>
    </div>
  );
}

export default Patient;