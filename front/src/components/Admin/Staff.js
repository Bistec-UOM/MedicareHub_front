import { Paper, Typography, Button, Avatar, Box, Grid } from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AskDelete from "./DialogComponents/AskDelete";
import SuccessNotification from "../recepcomponents/SnackBar/SuccessNotification";
import EditUserDialog from "./DialogComponents/EditUserDialog";
import { baseURL, endPoints } from "../../Services/Admin";
import AddUserDialog from "./DialogComponents/AddUserDialog";
import Skeleton from "@mui/material/Skeleton";
import StyledBadge from "./PageComponents/Avatar";
import { HubConnectionBuilder } from '@microsoft/signalr';
import AddIcon from '@mui/icons-material/Add';
import UserAddToList from "./DialogComponents/UserAddToList";

export default function Staff() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notiMessage, setNotiMessage] = useState("");
  const [typenoti, settypenoti] = useState("success");

  // calling for edit
  const [isDisabled, setIsDisabled] = useState(true);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // const [selectedPaper, setSelectedPaper] = useState(null);
  const [Type, setType] = useState("");

  const [row2, setStaffData] = useState([]);
  // const [records, setRecords] = useState(row2);

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
        role: "",
        qualifications: "",
        password: "",
        imageUrl: "",
        isDeleted:false,
        // isActive: true,
      });
    }
  }, [open, editOpen]);
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
        role: "",
        qualifications: "",
        password: "",
        imageUrl: "",
        isDeleted:false,
        // isActive: true,
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
    role: "",
    qualifications: "",
    password: "",
    imageUrl: "",
    isDeleted:false,
    // isActive: false,
  });
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    fullName: "",
    nic: "",
    address: "",
    contactNumber: "",
    email: "",
    dob: "",
    gender: "",
    role: "",
    qualifications: "",
    password: "",
    imageUrl: "",
    isDeleted:false,
    // isActive: false,
  });

  const [update, forceUpdate] = useState(0);
  const [connection, setConnection] = useState(null);
  const [users, setUsers] = useState([]);
  const [loadingB, setLoadingB] = useState(false); //Loading button states
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get(baseURL + endPoints.StaffList)
        .then((res) => {
          console.log(res.data);
          setStaffData(res.data);
          console.log("Updated users with", res.data);
          // setRecords(res.data);
        })
        .catch((err) => {
          if (err.message === "Network Error") {
            console.error("You are not connected to internet");
            setNotiMessage("You are not connected to internet");
            settypenoti("error");
            setNotificationOpen(true);
          } else {
            console.error(err);
          }
        });
    }, 1000); // 1 second delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount or update
  }, [update]);


  //////////////////////////////////////////////////////////////////////////////////////



  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
    .withUrl('https://localhost:7205/notificationHub')
    // .withUrl('https://mediicarehub.azurewebsites.net/notificationHub')
    .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);


  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('Connected!');

          connection.invoke('UsersCalling')
            .then(() => console.log('Requested users list'))
            .catch(err => console.error(err));


          connection.on('broadcastMessage', (name, message) => {
            console.log(`${name}: ${message}`);
            forceUpdate((prevCount) => prevCount + 1); // Trigger a re-render
            setNotification(prevMessages => [...prevMessages, { name, message }]);
          });

          connection.on('BroadcastMessage', (name, message) => {
            console.log(`${name}: ${message}`);
            // Optionally, you can update the users list here if needed
            connection.invoke('UsersCalling');

          });
          connection.on('ReceiveNotification', (message) => {
            console.log(message);
            setNotification(message); // Update the notification state
            forceUpdate((prevCount) => prevCount + 1); // Trigger a re-render
          });
        })
        .catch(e => console.log('Connection failed: ', e));
    }
    console.log('users Updated');
  }, [connection]); // Add notification to the dependency array

  

  


  const pData = {
    id: formData.id,
    name: formData.name,
    fullName: formData.fullName,
    nic: formData.nic,
    address: formData.address,
    contactNumber: formData.contactNumber,
    email: formData.email,
    dob: formData.dob,
    gender: formData.gender,
    qualifications: formData.qualifications,
    password: formData.password,
    role: formData.role,
    imageUrl: formData.imageUrl,
    isDeleted:false,
    // isActive: true,
  };

  const [Role, setRole] = useState("");

  const handleAddClickOpen = (buttonNumber) => {
    setType(`Add ${buttonNumber}`);
    setRole(buttonNumber);
    console.log(Role);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
    setDeleteOpen(false);
  };

  const handleEditClick = () => {
    setIsDisabled(false);
  };

  const handleEditClickOpen = (row2) => {
    // setType(`Edit ${buttonNumber}`);
    setFormData({
      ...formData,
      id: row2.id,
      name: row2.name,
      role: row2.role,
      fullName: row2.fullName,
      nic: row2.nic,
      address: row2.address,
      contactNumber: row2.contactNumber,
      email: row2.email,
      dob: row2.dob,
      gender: row2.gender,
      qualifications: row2.qualifications,
      password: row2.password,
      imageUrl: row2.imageUrl,
      isDeleted:row2.isDeleted,
      // isActive:row2.isActive,
    });
    console.log(pData);
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
    console.log("update values");
    setFormData({
      ...formData,
      [field]: value,
    });
  };
// const [RestoreOpen, setRestoreOpen] = useState(false);
//   const handleRestore = (row2) => {
//     setRestoreOpen(true);
// }
// const handleRestoreClose = () => {
//     setRestoreOpen(false);
// }
  const handleRemove = () => {

    setLoadingB(true)
    axios
    .delete(baseURL + endPoints.StaffList + `/${formData.id}`)
    .then((res) => {
      settypenoti("success");
      setNotiMessage("Staff Member removed successfully");
      setNotificationOpen(true);
      forceUpdate((prevCount) => prevCount + 1); // Trigger a re-render
      console.log("success", formData);
      setLoadingB(false);
      setEditOpen(false);
      setDeleteOpen(false);
      // Make the post request here

    })
    .catch((error) => {    
    console.log("removed " + formData.fullName);
    formData.isDeleted = true;
    console.log(formData);
    console.log(formData.isDeleted);

    axios
    .put(baseURL + endPoints.StaffList + `/${formData.id}`, formData)
    .then((res) => {
      console.log(res.data);
      forceUpdate((prevCount) => prevCount + 1); // Trigger a re-render

      console.log("post success");
      setLoadingB(false);
      setEditOpen(false);
      setDeleteOpen(false);
    })
    .catch((error) => {
      console.error("post error", error);
    });
    });
  };


  
  
  

  // const [Gender, setGender] = React.useState('');
  const deletePopUp = () => {
    setDeleteOpen(true);
  };

  const fields = [
    { label: "Full Name", key: "fullName", fullWidth: true },
    { label: "Usual Name", key: "name", style: { width:{xs:"100%",sm:"auto"} }  },
    { label: "NIC", key: "nic", style: { ml: {md:5,xs:0},width:{xs:"100%",sm:"auto"} } },
    { label: "Address", key: "address", fullWidth: true },
    { label: "Contact Number", key: "contactNumber" , style: { width:{xs:"100%",sm:"auto"} }},
    { label: "Qualifications", key: "qualifications", style: { ml: {md:5,xs:0},width:{xs:"100%",sm:"auto"} }},
    { label: "Email Address", key: "email" , style: { width:{xs:"100%",sm:"auto"} } },
    { label: "Password", key: "password", style: { ml: {md:5,xs:0},width:{xs:"100%",sm:"auto"} } },
  ];
  const RoleFields = ["Doctor", "Receptionist", "Lab Assistant", "Cashier","Admin"];

  return (
    <div>
      {/* data adding */}

      <AddUserDialog
        open={open}
        handleClose={handleClose}
        handleInputChange={handleInputChange}
        formErrors={formErrors}
        Type={Type}
        formData={formData}
        loadingB={loadingB}
        row2={row2}
        pData={pData}
        setFormErrors={setFormErrors}
        Role={Role}
        settypenoti={settypenoti}
        setNotiMessage={setNotiMessage}
        setNotificationOpen={setNotificationOpen}
        forceUpdate={forceUpdate}
        setOpen={setOpen}
      />

      {/* data editing */}
      <EditUserDialog
        editOpen={editOpen}
        handleEditClose={handleEditClose}
        fields={fields}
        formErrors={formErrors}
        loadingB={loadingB}
        formData={formData}
        isDisabled={isDisabled}
        setFormData={setFormData}
        handleInputChange={handleInputChange}
        deletePopUp={deletePopUp}
        handleEditClick={handleEditClick}
        row2={row2}
        setFormErrors={setFormErrors}
        pData={pData}
        settypenoti={settypenoti}
        setNotiMessage={setNotiMessage}
        setNotificationOpen={setNotificationOpen}
        setIsDisabled={setIsDisabled}
        setEditOpen={setEditOpen}
        forceUpdate={forceUpdate}
      ></EditUserDialog>
      {/*mapping data*/}
      {RoleFields.map((rolefild) => (
        <div>
          <Paper
            sx={{
              mt: 2,
              m: 1,
              borderStyle: "solid",
              borderColor:"rgb(121, 204, 190)",
              borderWidth: 2,
              color: "rgb(114, 114, 114)",
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
              sx={{
                paddingTop: 0.75,
                paddingBottom: 0.75,
                fontWeight: "bolder",
              }}
            >
              {rolefild}
            </Typography>
            <Button
              variant="contained"
              size="small"
              endIcon={<AddIcon/>}
              sx={{
                fontWeight: "bolder",
              }}
              onClick={() => handleAddClickOpen(rolefild)}
            >
              Add
            </Button>
          </Paper>
          {/* recep Paper */}
          {row2.filter((row2) => row2.role === rolefild ).length > 0 ? (
            row2
              .filter((row2) => row2.role === rolefild)
              .map((row2) => (
                //role data in here
                <Paper
                  key={row2.Id}
                  sx={{
                    cursor: "Pointer",
                    mt: 1.1,
                    display: "flex",
                    flexDirection: "column", // Set to 'column' for vertical display
                    paddingLeft: 2,
                    paddingRight: 2,
                    ":hover": {
                      backgroundColor:'rgb(235, 235, 235)', // Change this to the desired hover effect
                    }
                  }}
                  onClick={() => handleEditClickOpen(row2)} // Open the edit window when clicking on the paper
                >
                  {console.log('row2.isActive:', row2.isActive)} 
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                    {row2.isActive ? (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          color="red"
        >
          <Avatar
            alt="Remy Sharp"
            src={row2.imageUrl}
            sx={{ width: 50, height: 50 }}
          />
        </StyledBadge>
      ) : (
        <Avatar
          alt="Remy Sharp"
          src={row2.imageUrl}
          sx={{ width: 50, height: 50 }}
        />
      )}
                      {/* <Box sx={{ marginLeft: 3 }}> Add some left margin to the text */}
                    </Box>
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: 3,
                      }}
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
                    </Grid>
                  </Box>
                  {/* </Box> */}
                </Paper>
              ))
          ) : (
            <>
              <Skeleton
                variant="rectangular"
                height={70}
                sx={{ margin: 1, borderRadius: 2 }}
              />
              <Skeleton
                variant="rectangular"
                height={70}
                sx={{ margin: 1, borderRadius: 2 }}
              />
            </>
          )}
        </div>
      ))}











{/* deleted section */}
<Paper
            sx={{
              mt: 2,
              m: 1,
              borderStyle: "solid",
              borderColor:"rgb(121, 204, 190)",
              borderWidth: 2,
              color: "rgb(114, 114, 114)",
              margin: "10 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >            <Typography
          variant="h5"
          sx={{
            paddingTop: 0.75,
            paddingBottom: 0.75,
            fontWeight: "bolder",
          }}
        >
          Removed Staff
        </Typography></Paper>
        {row2.filter((row2)=>row2.isDeleted === true)
            .map((row2) => (
              //role data in here
              <Paper
                key={row2.Id}
                sx={{
                  cursor: "Pointer",
                  mt: 1.1,
                  display: "flex",
                  flexDirection: "column", // Set to 'column' for vertical display
                  paddingLeft: 2,
                  paddingRight: 2,
                  ":hover": {
                    backgroundColor:'rgb(235, 235, 235)', // Change this to the desired hover effect
                  }
                }}
                onClick={() => handleEditClickOpen(row2)} // Open the edit window when clicking on the paper
              >

                  {console.log('row2.isActive:', row2.isActive)} 
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                    {row2.isActive ? (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          color="red"
        >
          <Avatar
            alt="Remy Sharp"
            src={row2.imageUrl}
            sx={{ width: 50, height: 50 }}
          />
        </StyledBadge>
      ) : (
        <Avatar
          alt="Remy Sharp"
          src={row2.imageUrl}
          sx={{ width: 50, height: 50 }}
        />
      )}
                    </Box>
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: 3,
                      }}
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
                    </Grid>
                  </Box>
                </Paper>
            ))
        }
      <AskDelete
        deleteOpen={deleteOpen}
        handleEditClose={handleClose}
        handleRemove={handleRemove}
        loadingB={loadingB}
      ></AskDelete>
      <SuccessNotification
        setNotificationOpen={setNotificationOpen}
        notiMessage={notiMessage}
        notificationOpen={notificationOpen}
        type={typenoti}
      ></SuccessNotification>
      {/* <UserAddToList RestoreOpen={RestoreOpen} ></UserAddToList> */}
    </div>
  );
}
