import {Paper,Typography,Button,Dialog,DialogTitle,DialogContent,DialogActions,TextField,FormControl,InputLabel,Select,MenuItem, Box} from "@mui/material";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState,useEffect } from "react";
import axios from "axios";



function createData(id,fullName,name,nic,address,contactNumber,qualifications,role,email,age,gender) {
    return {id,fullName,name,nic,address,contactNumber,qualifications,role,email,age,gender};
  }


// const row2 = [
//   createData(1, "wimal kostha", "wimal", '200666503237', '134/h hansamaligama,premadasadeniya', '0756321737','mlt','lab', 'easter@gmail.com', '30', "female"),
//   createData(2, "kumara sangakkara", "kumara", '200154996552', '109/o malwatte handiya,migamuwa', '0741572003','mlt','lab', 'asanka@gmail.com', '30', "male"),
//   createData(3,"pathirana saman","pathirana",'201052946305','234/v nonagumgama,raddoluwa','0791031573','mlt','lab','tharaka@gmail.com','30',"female"),
//   createData(4, "lavu kanush", "kanush",'200933401635', '546/g sandangana gama,sandalankaawa', '0783985174','mlt','lab','sonic@gmail.com', '30', "male"),
//   createData(1, "wimal kostha", "wimal", '200666503237', '134/h hansamaligama,premadasadeniya', '0756321737','mbbs','doctor', 'easter@gmail.com', '30', "female"),
//   createData(2, "kumara sangakkara", "kumara", '200154996552', '109/o malwatte handiya,migamuwa', '0741572003','mbbs','doctor', 'asanka@gmail.com', '30', "male"),
//   createData(3,"pathirana saman","pathirana",'201052946305','234/v nonagumgama,raddoluwa','0791031573','mbbs','doctor','tharaka@gmail.com','30',"female"),
//   createData(4, "lavu kanush", "kanush",'200933401635', '546/g sandangana gama,sandalankaawa', '0783985174','mbbs','doctor','sonic@gmail.com', '30', "male"),
//   createData(1, "wimal kostha", "wimal", '200666503237', '134/h hansamaligama,premadasadeniya', '0756321737','hr','recep', 'easter@gmail.com', '30', "female"),
//   createData(2, "kumara sangakkara", "kumara", '200154996552', '109/o malwatte handiya,migamuwa', '0741572003','hr','recep', 'asanka@gmail.com', '30', "male"),
//   createData(3,"pathirana saman","pathirana",'201052946305','234/v nonagumgama,raddoluwa','0791031573','hr','recep','tharaka@gmail.com','30',"female"),
//   createData(4, "lavu kanush", "kanush",'200933401635', '546/g sandangana gama,sandalankaawa', '0783985174','hr','recep','sonic@gmail.com', '30', "male")
// ];




export default function Staff() {


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
    age: "",
    gender: "",
    role:"",
    qualifications:""
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
        data.age,
        data.gender,
        data.role,
        
        // data.age
      ));
      setStaffData(apiData);
    })
    .catch(err=>{
      console.log(err);
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
    age: formData.age,
    gender: formData.gender,
    qualifications:formData.qualifications,
    role:formData.role
  };
  // const p2Data = {
  //   // id:formData.id,
  //   name: formData.name,
  //   fullName: formData.fullName,
  //   nic: formData.nic,
  //   address: formData.address,
  //   contactNumber: formData.contactNumber,
  //   email: formData.email,
  //   age: formData.age,
  //   gender: formData.gender,
  //   qualifications:formData.qualifications,
  //   role:formData.role
  // };

  const handleAddSaveClose = () =>{
    let temp = pData
    temp.id = 0;
    
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
    setOpen(true);
  };


  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [Type, setType] = useState('');

  const handleClose = () => {
    setOpen(false);
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
  // Handle error, show an error message or dispatch an error action
  console.error('Error updating patient:', error.response.data);
  
}
    setEditOpen(false);
  };

  const handleEditClickOpen = (row) => {
    // setType(`Edit ${buttonNumber}`);
    setFormData({...formData,id: row.id, name: row.name,role:row.role, fullName: row.fullName, nic: row.nic,address: row.address,contactNumber:row.contactNumber,email:row.email,age:row.age,gender:row.gender,qualifications:row.qualifications});
console.log(pData.id)
    // setSelectedPaper(row);
    setEditOpen(true);
    setIsDisabled(true);
  };

  const handleEditClose = () => {
    setSelectedPaper(null);
    setEditOpen(false);
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
  };
  
  const [Gender, setGender] = React.useState('');




  return (
    <div>
      <Paper
        sx={{
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
          Doctor
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
          onClick={() =>handleAddClickOpen('Doctor')}
        >
          Add
        </Button>
      </Paper>

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
          <TextField label="Name" fullWidth sx={{ mb: 1, mt: 3 }} onChange={(e) => handleInputChange("name", e.target.value)}/>
          <TextField label="Full Name" sx={{ mb: 1 }} onChange={(e) => handleInputChange("fullName", e.target.value)}/>
          <TextField label="NIC" sx={{ ml: 4, mb: 1 }} onChange={(e) => handleInputChange("NIC", e.target.value)}/>
          <TextField label="Address" fullWidth sx={{ mb: 1 }} onChange={(e) => handleInputChange("address", e.target.value)}/>
          <TextField label="Contact Number" sx={{ mb: 1 }} onChange={(e) => handleInputChange("contactNumber", e.target.value)}/>
          <TextField label="qualifications" sx={{ ml: 4, mb: 1 }} onChange={(e) => handleInputChange("qualifications", e.target.value)}/>
          <TextField label="Role" fullWidth sx={{ mb: 1 }} onChange={(e) => handleInputChange("role", e.target.value)}/>
          <TextField label="E-mail" fullWidth sx={{ mb: 1 }} onChange={(e) => handleInputChange("email", e.target.value)}/>
          <TextField label="Date of Birth" sx={{ mb: 1 }} onChange={(e) => handleInputChange("age", e.target.value)}/>
          {/* <TextField label="Gender" sx={{ ml: 4, mb: 1 }} onChange={(e) => handleInputChange("gender", e.target.value)}/> */}
          <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Gender}
          label="Gender"
          onChange={(e) => handleInputChange("gender", e.target.value)}
        >
          <MenuItem value={'Female'}>Female</MenuItem>
          <MenuItem value={'Male'}>Male</MenuItem>

        </Select>
      </FormControl>
    </Box>
    
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
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            value={formData.fullName}
            disabled={isDisabled}
            onChange={(e) =>setFormData({...formData,fullName:e.target.value})}
            />
          <TextField
            label="Usual Name"
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({...formData,name:e.target.value})}
            disabled={isDisabled}
          />
          <TextField
            label="NIC"
            margin="normal"
            sx={{ ml: 4 }}
            value={formData.nic}
            disabled={isDisabled}
            onChange={(e) => setFormData({...formData,nic:e.target.value})}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={formData.address}
            onChange={(e) => setFormData({...formData,address:e.target.value})}
            disabled={isDisabled}
          />
          <TextField
            label="Contact Number"
            margin="normal"
            value={formData.contactNumber}
            onChange={(e) => setFormData({...formData,contactNumber:e.target.value})}
            disabled={isDisabled}
          />
          <TextField
            label="qualifications"
            margin="normal"
            sx={{ ml: 4 }}
            value={formData.qualifications}
            onChange={(e) => setFormData({...formData,qualifications:e.target.value})}
            disabled={isDisabled}
          />
          <TextField
            label="Role"
            margin="normal"
            value={formData.role}
            onChange={(e) => setFormData({...formData,role:e.target.value})}
            disabled={isDisabled}
          />
                    <FormControl sx={{m:2,ml:4}}>
           <InputLabel id="demo-simple-select-label">Gender</InputLabel>
  <Select
    labelId="gender-label"
    id="gender"
    value={formData.gender}
    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
    label="Gender"
    disabled={isDisabled}
    // sx={{m:1,ml:1}}
  >
    <MenuItem value="Male">Male</MenuItem>
    <MenuItem value="Female">Female</MenuItem>
    {/* <MenuItem value="other">Other</MenuItem> */}
  </Select>
           </FormControl>
          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={(e) => setFormData({...formData,email:e.target.value})}
            disabled={isDisabled}
          />




         
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
            onClick={isDisabled? handleEditClick : handleEditSave}
            variant="contained"
            sx={{ backgroundColor: "rgb(121, 204, 190)", m: 2 }}
          >
            {isDisabled ? 'Edit' : 'Save'}
          </Button>

        </DialogActions>
      </Dialog>

      {/* Dr Data Paper */}
      {row2.filter(row=>row.role === 'doctor').map((row)=>
      <Paper
      key={row.Id}
      
        sx={{
          cursor:'Pointer',
          mt: 3,
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
          Receptionist
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
          onClick={() =>handleAddClickOpen('Receptionist')}
        >
          Add
        </Button>
      </Paper>
      {/* recep Paper */}
      {row2.filter(row=>row.role === 'recep').map((row)=>
      <Paper
      key={row.Id}
      
        sx={{
          cursor:'Pointer',
          mt: 3,
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
    Lab Asistant
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
    onClick={() =>handleAddClickOpen("Lab Asistant")}
  >
    Add
  </Button>
</Paper>
{/* recep Paper */}
{row2.filter(row=>row.role === 'lab').map((row)=>
<Paper
key={row.Id}

  sx={{
    cursor:'Pointer',
    mt: 3,
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
    </div>
  );
}
