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
        isActive: true,
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
        isActive: true,
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
    isActive: true,
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
    isActive: true,
  });
  const [update, forceUpdate] = useState(0);


  // useEffect(() => {
  //   axios
  //     .get(baseURL + endPoints.StaffList)
  //     .then((res) => {
  //       console.log(res.data);
  //       setStaffData(res.data);
  //       // setRecords(res.data);
  //     })
  //     .catch((err) => {
  //       if (err.message === "Network Error") {
  //         console.error("You are not connected to internet");
  //         setNotiMessage("You are not connected to internet");
  //         settypenoti("error");
  //         setNotificationOpen(true);
  //       } else {
  //         console.error(err);
  //       }
  //     });
  // }, [update]);


  //////////////////////////////////////////////////////////////////////////////////////
  const [connection, setConnection] = useState(null);
  const [users, setUsers] = useState([]);



  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7205/notificationHub')
      .withAutomaticReconnect()
      .build();
  
    setConnection(newConnection);
  }, []); // Dependency array should be empty to run only on mount
  
  
  useEffect(() => {
    if (connection) {
      connection.start()
        .then(result => {
          console.log('Connected!');
          
          // Call UsersCalling to get the initial list of users
          connection.invoke('UsersCalling')
            .then(() => console.log('Requested users list'))
            .catch(err => console.error(err));
  
          // Handle receiving the list of users
          connection.on('Receiver', (usersJson) => {
            const usersList = JSON.parse(usersJson);
            setStaffData(usersList);
            console.log('Received users list:', usersList);  // Change log to usersList for clarity
          });
        })
        .catch(e => console.log('Connection failed: ', e));
    }
  }, [connection]);
  
  useEffect(() => {
    console.log('row2 state updated:', row2);
  }, [row2]);
  


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
    isActive: true,
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
      isActive:row2.isActive,
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

  const handleRemove = () => {


    axios
    .delete(baseURL + endPoints.StaffList + `/${formData.id}`)
    .then((res) => {
      settypenoti("success");
      setNotiMessage("Staff Member removed successfully");
      setNotificationOpen(true);
      forceUpdate((prevCount) => prevCount + 1); // Trigger a re-render
      console.log("success", formData);
    
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
    })
    .catch((error) => {
      console.error("post error", error);
    });
    });

    setEditOpen(false);
    setDeleteOpen(false);
  };

      // axios
      //   .then((res) => {
      //     console.log("Successfully reverted deletion");
      //     console.log(res.data);
      //     settypenoti("success");
      //     setNotiMessage("Successfully reverted deletion");
      //     setNotificationOpen(true);
      //     forceUpdate((prevCount) => prevCount + 1); // Trigger a re-render
      //     setOpen(false);
      //   })
      //   .catch((error) => {
      //     console.error("Failed to add member after deletion failed");
      //     console.error(error);
      //   });
  
  
  

  // const [Gender, setGender] = React.useState('');
  const deletePopUp = () => {
    setDeleteOpen(true);
  };

  const fields = [
    { label: "Full Name", key: "fullName", fullWidth: true },
    { label: "Usual Name", key: "name" },
    { label: "NIC", key: "nic", style: { ml: "20px" } },
    { label: "Address", key: "address", fullWidth: true },
    { label: "Contact Number", key: "contactNumber" },
    { label: "Qualifications", key: "qualifications", style: { ml: "20px" } },
    { label: "Email Address", key: "email" },
    { label: "Password", key: "password", style: { ml: "20px" } },
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
              sx={{
                backgroundColor: "rgb(121, 204, 190)",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                fontWeight: "bolder",
              }}
              onClick={() => handleAddClickOpen(rolefild)}
            >
              Add
            </Button>
          </Paper>
          {/* recep Paper */}
          {row2.filter((row2) => row2.Role === rolefild ).length > 0 ? (
            row2
              .filter((row2) => row2.Role === rolefild)
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
                  {console.log('row2.isActive:', row2.IsActive)} 
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                    {row2.IsActive ? (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          color="red"
        >
          <Avatar
            alt="Remy Sharp"
            src={row2.ImageUrl}
            sx={{ width: 50, height: 50 }}
          />
        </StyledBadge>
      ) : (
        <Avatar
          alt="Remy Sharp"
          src={row2.ImageUrl}
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
                        {row2.FullName}
                      </Typography>
                      <Typography
                        variant="h10"
                        sx={{ fontSize: 10, color: "rgb(186, 177, 177)" }}
                      >
                        {row2.Qualifications}
                      </Typography>
                      <Typography
                        variant="h10"
                        sx={{
                          fontSize: 10,
                          paddingBottom: 0.75,
                          color: "rgb(186, 177, 177)",
                        }}
                      >
                        {row2.Role}
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
      <AskDelete
        deleteOpen={deleteOpen}
        handleEditClose={handleClose}
        handleRemove={handleRemove}
      ></AskDelete>
      <SuccessNotification
        setNotificationOpen={setNotificationOpen}
        notiMessage={notiMessage}
        notificationOpen={notificationOpen}
        type={typenoti}
      ></SuccessNotification>
    </div>
  );
}
