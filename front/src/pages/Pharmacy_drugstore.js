import React, { useEffect, useState } from 'react'
import {SidebarContainer,SidebarTop,SidebarList} from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'
import { Grid,Card,Paper,Button,InputBase, Typography,TextField, List } from '@mui/material'
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Filter from "@mui/icons-material/Filter";
import TuneIcon from '@mui/icons-material/Tune';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import '../components/CustomScroll.css'
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Sideunit_Bill } from '../components/sidebar/Sideunits';

function createData(
  ID,
  drug,
  brand,
  dosage,
  quantity,
  price,
) {
  return { ID, drug, brand, dosage, quantity, price };
}

const rows = [
  createData(1,'Paracetamole',"Panadol",["10 mg"],[120],[20.00]),
  createData(2,'Veniloflaxin',"Veniz",["37.5 mg","75 mg","150 mg"],[34,12,90],[35.00,45.00,60.00]),
  createData(3,'Flucanzole',"Diflucan",["10 mg"],[15],[12.00]),
  createData(4,'Paracetamole',"Panadol",["10 mg"],[120],[20.00]),

  
];


export default function Pharmacy_drugstore() {

  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    // You can perform additional filtering logic here if needed
  };
  

  

  const [open, setOpen] =useState(false);
  const [selectedCard, setSelectedCard] =useState(null);
  const [editOpen, setEditOpen] =useState(false);

  const [confirm, setConfirm] =useState(false);
  const handleClickOpen =() => {
    setOpen(true)
  };
  const handleClose =() => {
    setOpen(false)
  }; 
  const handleConfirm =() => {
    handleClose();
    setConfirm(false)
  };
  const handleEditClose = () => {
    setSelectedCard(null);
    setEditOpen(false);
  };
  const handleEdit =() => {
    handleEditClose();
    setConfirm(false)
  };
  const handleEditOpen =(row) => {
    setSelectedCard(row);
    setEditOpen(true);
  };


  useEffect(()=>{
    document.body.style.margin = '0';

   },[]) 
   const handleFieldChange = (fieldName, value) => {
    setSelectedCard(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };
  const [select,setSelect]=useState(null)
  let x=[
    {
      "id": 1,
      "name": "Dhammika Mahendra Wijesingha",
      "time": "09:00"
      
    },
    {
      "id": 2,
      "name": "Bob",
      "time": "10:30"
      
    },
    {
      "id": 3,
      "name": "Charlie",
      "time": "11:45"
      
    },
    {
      "id": 4,
      "name": "David",
      "time": "13:15"
    
    },
    {
      "id": 5,
      "name": "Eve",
      "time": "14:30"
      
    },
    {
      "id": 6,
      "name": "Frank",
      "time": "15:45"
      
    },
    {
      "id": 7,
      "name": "Grace",
      "time": "16:30"
      
    },
    {
      "id": 8,
      "name": "Henry",
      "time": "17:15"
      
    },
    {
      "id": 9,
      "name": "Isabel",
      "time": "18:00"
      
    },
    {
      "id": 10,
      "name": "Jack",
      "time": "19:00"
    
    },
    {
      "id": 11,
      "name": "Kelly",
      "time": "20:00"
      
    },
    {
      "id": 12,
      "name": "Liam",
      "time": "21:00"
      
    }
  ]
  
  return (
    
    
    <div>
      
    <Navbar></Navbar>

    <Grid container spacing={0} sx={{paddingTop:'64px',height:'100vh'}}>
      <Grid item xs={3} style={{height:'100%',backgroundColor:'#DEF4F2'}}>
        <SidebarContainer>
          <SidebarTop>

          </SidebarTop>
          <SidebarList>
          {
         x.map((elm,ind)=>{
            return(
             <>
              <Sideunit_Bill key={ind} id={elm.id} name={elm["name"]} time={elm["time"]}  setSelect={setSelect} selected={elm.id==select?true:''}></Sideunit_Bill>
             </>
            )
         })
       }
          </SidebarList>
        </SidebarContainer>
      </Grid>

      <Grid item xs={9} style={{height:'100%',overflowY:'scroll'}}>
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
      <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "60vh",
            borderRadius: "20px",
            boxShadow: 4,
            marginLeft:"15px",
            marginTop:"10px",
          }}
        >
          <InputBase type="text" className="form-control" onChange={handleInputChange} sx={{ ml: 3, flex: 1 }} placeholder="Search " />
         
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <TuneIcon
          sx={{
            marginRight:"420px",
            marginTop:"20px",
          }}
        >
          
        </TuneIcon>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "rgb(121, 204, 190)",
            width: "10vh",
            height: "5vh",
            fontWeight: "bolder",
            alignItems:'end',
            marginRight:"20px",
            marginTop:"10px",
          }}
          onClick={handleClickOpen}
        >
          Add
        </Button>
        </Grid>
        <Grid>
<Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            backgroundColor: "rgb(222, 244, 242)",
            display: "flex",
            justifyContent: "space-between",
            paddingLeft:"200px",
          }}
        >
          Add new drug
          <CloseIcon onClick={handleClose} sx={{cursor:'pointer'}}/>
        </DialogTitle>
        <DialogContent>
          <TextField label="Genaric name" fullWidth sx={{ mb: 1, mt: 3 }} />
          <TextField label="Brand Name" sx={{ mb: 1 }} />
          <TextField label="dossage" sx={{ ml: 4, mb: 1 }} />
          <TextField label="unit price" fullWidth sx={{ mb: 1 }} />
          <TextField label="Amount" sx={{ mb: 1 }} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirm}
            variant="contained"
            sx={{ backgroundColor: "rgb(121, 204, 190)", m: 2 }}
          >
            confirm
          </Button>
        </DialogActions>
      </Dialog>
</Grid>
       
        {rows.map((row) => (
    <div><Card 
    sx={{ minWidth:"30px",marginTop:"20px",marginLeft:"20px",marginRight:"20px"}}
    onClick={() =>handleEditOpen(row)}
    key={row.ID}
    >
    <Grid container spacing={2}>
  <Grid item xs={3}>
    <Typography sx={{flex:1}}>{row.drug}</Typography>
  </Grid>
  <Grid item xs={3}>
  <Typography sx={{flex:1}}>{row.brand}</Typography>
  </Grid>
  <Grid item xs={2}>
  <Typography sx={{flex:1}}>
                  {Array.isArray(row.dosage) ? (
                    row.dosage.map((dosage, index) => (
                      <List key={index}>{dosage}</List>
                    ))
                  ) : (
                    <List>{row.dosages}</List>
                  )}
                </Typography>
  </Grid>
  <Grid item xs={2}>
  <Typography sx={{flex:1}}> {Array.isArray(row.quantity) ? (
                    row.quantity.map((quantity, index) => (
                      <List key={index}>{quantity}</List>
                    ))
                  ) : (
                    <List>{row.quantity}</List>
                  )}</Typography>
  </Grid>
  <Grid item xs={2}>
  <Typography sx={{flex:1}}>{Array.isArray(row.price) ? (
                    row.price.map((price, index) => (
                      <List key={index}>{price}</List>
                    ))
                  ) : (
                    <List>{row.price}</List>
                  )}</Typography>
  </Grid>
</Grid>
    </Card>
    </div>
        ))
}
<Grid>
<Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle
          sx={{
            backgroundColor: "rgb(222, 244, 242)",
            display: "flex",
            justifyContent: "space-between",
            paddingLeft:"200px",
          }}
        >
          Edit drug
          <CloseIcon onClick={handleEditClose} sx={{cursor:'pointer'}}/>
        </DialogTitle>
        <DialogContent>
          <TextField
          label="Genaric name"
          fullWidth
          margin='dense'
          value={selectedCard ? selectedCard.drug : ""}
          onChange={(e) => handleFieldChange('drug', e.target.value)}
          />
          <TextField
          label="brand name"
          fullWidth
          margin='dense'
          value={selectedCard ? selectedCard.brand : ""}
          onChange={(e) => handleFieldChange('brand', e.target.value)}
          />
          <TextField
          label="dossage"
          fullWidth
          margin='dense'
          value={selectedCard ? selectedCard.dosage : ""}
          onChange={(e) => handleFieldChange('dosage', e.target.value)}
          />
          <TextField
          label="quantity"
          fullWidth
          margin='dense'
          value={selectedCard ? selectedCard.quantity : ""}
          onChange={(e) => handleFieldChange('quantity', e.target.value)}
          />
          <TextField
          label="amount"
          fullWidth
          margin='dense'
          value={selectedCard ? selectedCard.price : ""}
          onChange={(e) => handleFieldChange('price', e.target.value)}
          />

          
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEdit}
            variant="contained"
            sx={{ backgroundColor: "rgb(121, 204, 190)", m: 2 }}
          >
            confirm
          </Button>
        </DialogActions>
      </Dialog>
</Grid>
      </Grid>


    </Grid>

  </div>
  )
}
