import {Paper,Typography,Button,Dialog,DialogTitle,DialogContent,DialogActions,TextField,FormControl,InputLabel,Select,MenuItem} from "@mui/material";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";



function createData(Id,fullName,name,NIC,address,contactNumber,degree,role,emailAddress,age,gender
  ) {
    return {Id,fullName,name,NIC,address,contactNumber,degree,role,emailAddress,age,gender
    };
  }

const row0 = [
  createData(1, "wimal kostha", "wimal", '200666503237', '134/h hansamaligama,premadasadeniya', '0756321737','mbbs','Family physician', 'easter@gmail.com', '30', "female"),
  createData(2, "kumara sangakkara", "kumara", '200154996552', '109/o malwatte handiya,migamuwa', '0741572003','mbbs','Endocrinologist', 'asanka@gmail.com', '30', "male"),
  createData(3,"pathirana saman","pathirana",'201052946305','234/v nonagumgama,raddoluwa','0791031573','mbbs','Neurologist','tharaka@gmail.com','30',"female"),
  createData(4, "lavu kanush", "kanush",'200933401635', '546/g sandangana gama,sandalankaawa', '0783985174','mbbs','Hospitalist','sonic@gmail.com', '30', "male")
];

const row1 = [
  createData(2, "wimal kostha", "wimal", '200666503237', '134/h hansamaligama,premadasadeniya', '0756321737','hr','........', 'easter@gmail.com', '30', "female"),
  createData(3, "kumara sangakkara", "kumara", '200154996552', '109/o malwatte handiya,migamuwa', '0741572003','hr','....', 'asanka@gmail.com', '30', "male"),
  createData(4,"pathirana saman","pathirana",'201052946305','234/v nonagumgama,raddoluwa','0791031573','hr','....','tharaka@gmail.com','30',"female"),
  createData(5, "lavu kanush", "kanush",'200933401635', '546/g sandangana gama,sandalankaawa', '0783985174','hr','....','sonic@gmail.com', '30', "male")
];
const row2 = [
  createData(2, "wimal kostha", "wimal", '200666503237', '134/h hansamaligama,premadasadeniya', '0756321737','mlt','........', 'easter@gmail.com', '30', "female"),
  createData(3, "kumara sangakkara", "kumara", '200154996552', '109/o malwatte handiya,migamuwa', '0741572003','mlt','....', 'asanka@gmail.com', '30', "male"),
  createData(4,"pathirana saman","pathirana",'201052946305','234/v nonagumgama,raddoluwa','0791031573','mlt','....','tharaka@gmail.com','30',"female"),
  createData(5, "lavu kanush", "kanush",'200933401635', '546/g sandangana gama,sandalankaawa', '0783985174','mlt','....','sonic@gmail.com', '30', "male")
];




export default function Staff() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditSave = () => {
    // Handle saving edited data here
    console.log("Edited data:", selectedPaper);
    setEditOpen(false);
  };

  const handleEditClickOpen = (row) => {
    setSelectedPaper(row);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setSelectedPaper(null);
    setEditOpen(false);
  };

  const handleInputChange = (field, value) => {
    setSelectedPaper({
      ...selectedPaper,
      [field]: value,
    });
  };
const handleChange = (e) => {
  console.log(e.target.value);
};






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
          Doctors
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
          onClick={handleClickOpen}
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
          Add Doctor
          <CloseIcon onClick={handleClose} sx={{cursor:'pointer'}}/>
        </DialogTitle>
        <DialogContent>
          {/* Add form fields or other content here */}
          <TextField label="Name" fullWidth sx={{ mb: 1, mt: 3 }} />
          <TextField label="Usual Name" sx={{ mb: 1 }} />
          <TextField label="NIC" sx={{ ml: 4, mb: 1 }} />
          <TextField label="Address" fullWidth sx={{ mb: 1 }} />
          <TextField label="Contact Number" sx={{ mb: 1 }} />
          <TextField label="Degree" sx={{ ml: 4, mb: 1 }} />
          <TextField label="Specialty" fullWidth sx={{ mb: 1 }} />
          <TextField label="E-mail" fullWidth sx={{ mb: 1 }} />
          <TextField label="Age" sx={{ mb: 1 }} />
          <TextField label="Gender" sx={{ ml: 4, mb: 1 }} />
          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEditSave}
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
          Edit Doctor
          <CloseIcon onClick={handleEditClose} sx={{cursor:'pointer'}} />
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            fullWidth
            margin="dense"
            value={selectedPaper ? selectedPaper.fullName : ""}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
          />
          <TextField
            label="Usual Name"
            margin="normal"
            value={selectedPaper ? selectedPaper.name : ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <TextField
            label="NIC"
            margin="normal"
            sx={{ ml: 4 }}
            value={selectedPaper ? selectedPaper.NIC : ""}
            onChange={(e) => handleInputChange("NIC", e.target.value)}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={selectedPaper ? selectedPaper.address : ""}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
          <TextField
            label="Contact Number"
            margin="normal"
            value={selectedPaper ? selectedPaper.contactNumber : ""}
            onChange={(e) => handleInputChange("contactNumber", e.target.value)}
          />
          <TextField
            label="Degree"
            margin="normal"
            sx={{ ml: 4 }}
            value={selectedPaper ? selectedPaper.degree : ""}
            onChange={(e) => handleInputChange("degree", e.target.value)}
          />
          <TextField
            label="Speciality"
            margin="normal"
            value={selectedPaper ? selectedPaper.role : ""}
            onChange={(e) => handleInputChange("role", e.target.value)}
          />
          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            value={selectedPaper ? selectedPaper.emailAddress : ""}
            onChange={(e) => handleInputChange("emailAddress", e.target.value)}
          />
          <TextField
            label="Age"
            margin="normal"
            value={selectedPaper ? selectedPaper.age : ""}
            onChange={(e) => handleInputChange("age", e.target.value)}
          />
          <FormControl margin="normal" sx={{ width: "15vh",ml:4 }}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              value={selectedPaper ? selectedPaper.gender : ""}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              label="Gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEditSave}
            variant="contained"
            sx={{ backgroundColor: "rgb(121, 204, 190)", m: 2 }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dr Data Paper */}
      {row0.map((row)=>
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
          {row.degree}
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
          onClick={handleClickOpen}
        >
          Add
        </Button>
      </Paper>
      {/* recep Paper */}
      {row1.map((row)=>
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
          {row.degree}
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
    onClick={handleClickOpen}
  >
    Add
  </Button>
</Paper>
{/* recep Paper */}
{row2.map((row)=>
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
    {row.degree}
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
