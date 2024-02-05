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


function createData(Id,fullName,name,NIC,address,contactNumber,emailAddress,age,gender
) {
  return {Id,fullName,name,NIC,address,contactNumber,emailAddress,age,gender,
  };
}
const rows = [
  createData(1,"chamath palliyaguruge","chamath",'200422400159','123/t thotawatte rd,thota langa','0781754824','dhammika@gmail.com','30',"male"),
  createData(2, "Nimali kostha", "wimal", '200666503237', '134/h hansamaligama,premadasadeniya', '0756321737', 'easter@gmail.com', '30', "female"),
  createData(3, "kumara sangakkara", "kumara", '200154996552', '109/o malwatte handiya,migamuwa', '0741572003', 'asanka@gmail.com', '30', "male"),
  createData(4,"pathirana saman","pathirana",'201052946305','234/v nonagumgama,raddoluwa','0791031573','tharaka@gmail.com','30',"female"),
  createData(5, "lavu kanush", "kanush",'200933401635', '546/g sandangana gama,sandalankaawa', '0783985174', 'sonic@gmail.com', '30', "male")
];

function Stest() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);

  // calling for edit
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClick = () => {
    setIsDisabled(!isDisabled);
  };
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
    
    setIsDisabled(!isDisabled);
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
const [records,setRecords] = useState(rows)
// creating filter function
const Filter = (event) => {
  const searchTerm = event.target.value.toLowerCase();

  setRecords(
    rows.filter(
      (f) =>
        (typeof f.name === 'string' && f.name.toLowerCase().includes(searchTerm)) ||
        (typeof f.address === 'string' && f.address.toLowerCase().includes(searchTerm)) ||
        (typeof f.NIC === 'string' && f.NIC.toLowerCase().includes(searchTerm)) ||
        (typeof f.gender === 'string' && f.gender.toLowerCase().includes(searchTerm)) ||
        (typeof f.emailAddress === 'string' && f.emailAddress.toLowerCase().includes(searchTerm)) ||
        (typeof f.contactNumber === 'string' && f.contactNumber.toLowerCase().includes(searchTerm))
    )
  );
};

const handleChange = (e) => {
  console.log(e.target.value);
};


  return (
    <div>

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
          }}
          onClick={handleClickOpen}
        >
          Add
        </Button>
      </Grid>


     
<Grid>
{/* for popup when adding */}
<Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            backgroundColor: "rgb(222, 244, 242)",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Add Patient
          <CloseIcon onClick={handleClose} sx={{cursor:'pointer'}}/>
        </DialogTitle>
        <DialogContent>
          {/* Add form fields or other content here */}
          <TextField label="Name" fullWidth sx={{ mb: 1, mt: 3 }} />
          <TextField label="Usual Name" sx={{ mb: 1 }} />
          <TextField label="NIC" sx={{ ml: 4, mb: 1 }} />
          <TextField label="Address" fullWidth sx={{ mb: 1 }} />
          <TextField label="Contact Number" sx={{ mb: 1 }} />
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
</Grid>
      
      <Grid>
      <Paper
      sx={{
        display: {sm:'flex',xs:'none'},
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
        padding: 2,
        boxShadow: 5,
        borderRadius:'12px'
      }}
      >
      <Typography sx={{ flex: 1 }}>name</Typography>
      <Typography sx={{ flex: 1 }}>NIC</Typography>
      <Typography sx={{ flex: 1 }}>Gender</Typography>
      <Typography sx={{ flex: 1 }}>Email</Typography>
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
            onClick={() => handleEditClickOpen(row)} // Pass the row to handleEditClickOpen
          >
            <Typography sx={{ flex: 1 }}>{row.fullName}</Typography>
            <Typography sx={{ flex: 1 }}>{row.NIC}</Typography>
            <Typography sx={{ flex: 1 }}>{row.gender}</Typography>
            <Typography sx={{ flex: 1 }}>{row.emailAddress}</Typography>
          </Paper>
        ))}
      </Grid>

      {/* data editing */}
      <Grid>
        <Dialog open={editOpen} onClose={handleEditClose}>
            <Paper>
              <Grid sx={{display:'grid',p:'40px'}}>
                {selectedPaper &&(<>
                  <div style={{display:'flex',justifyContent:'space-between',padding:'5px'}}><Typography>Full Name</Typography> <Typography>{selectedPaper.fullName}</Typography></div>
                  <div style={{display:'flex',justifyContent:'space-between',padding:'5px'}}><Typography>Name</Typography> <Typography>{selectedPaper.name}</Typography></div>
                  <div style={{display:'flex',justifyContent:'space-between',padding:'5px'}}><Typography>NIC</Typography> <Typography>{selectedPaper.NIC}</Typography></div>
                  <div style={{display:'flex',justifyContent:'space-between',padding:'5px'}}><Typography>Address</Typography> <Typography>{selectedPaper.address}</Typography></div>
                  <div style={{display:'flex',justifyContent:'space-between',padding:'5px'}}><Typography>Contact Number</Typography> <Typography>{selectedPaper.contactNumber}</Typography></div>
                  <div style={{display:'flex',justifyContent:'space-between',padding:'5px'}}><Typography>E-mail</Typography> <Typography>{selectedPaper.emailAddress}</Typography></div>
                  <div style={{display:'flex',justifyContent:'space-between',padding:'5px'}}><Typography>Age</Typography> <Typography>{selectedPaper.age}</Typography></div>
                  <div style={{display:'flex',justifyContent:'space-between',padding:'5px'}}><Typography>Gender</Typography> <Typography>{selectedPaper.gender}</Typography></div>

                </>)}
              </Grid>
            </Paper>
        </Dialog>
      </Grid>
    </div>
  );
}

export default Stest;
