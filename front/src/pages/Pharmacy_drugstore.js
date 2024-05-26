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
import { Snackbar } from '@mui/material'; 
import MuiAlert from '@mui/material/Alert';
import { Sideunit_Bill } from '../components/sidebar/Sideunits';
import axios from 'axios';
import { baseURL,endPoints } from '../Services/Pharmacy';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import { SearchBarSM } from '../components/Common';

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




export default function Pharmacy_drugstore() {

  const [data, setData] =useState([]);
  const [brand, setBrand] = useState('');
  const [drug, setDrug] = useState('');
  const [quantity, setQuantity] = useState('');
  const [dosage, setDosage] = useState('');
  const [price, setPrice] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // State for Snackbar message

  const [rows, setRows] = useState(data) // fetched drug list is stored

  useEffect(()=>{
    getData();
  },[])

  const getData = () => { // get
    axios.get(baseURL+endPoints.DRUGGET)
    .then((result) => {
        const drugs = result.data.map(drug => ({
            ID: drug.id,
            drug: drug.genericN,
            brand: drug.brandN,
            dosage: drug.weight,
            quantity: drug.avaliable,
            price: drug.price
        }));
        setRows(drugs);
    })
    .catch((error) => {
        console.log(error)
    })
}
//////////////////////////////////////////////////////////////////
 const handleConfirm=()=>{    // set and post
    handleClose();
      setConfirm(false)
    const data={
      "genericN": drug,
      "brandN": brand,
      "weight": dosage,
      "avaliable": quantity,
      "price": price,
      
      
    }
    axios.post(baseURL+endPoints.DRUGPOST,data)
    .then((result)=>{
      getData() 
      setSnackbarMessage('Drug added successfully'); // Set success message
        setSnackbarOpen(true); // Show Snackbar
    })
    .catch((error)=>{
      console.log(error)
    })
  }
//////////////////////////////////////////////////////////////////////////////////

  const handleCloseSnackbar = (event, reason) => {   /// snackbar for add 
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  const renderSnackbar = () => (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000} // Snackbar duration in milliseconds
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Position Snackbar at bottom left
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleCloseSnackbar}
        severity="success" // Snackbar severity (success, error, warning, info)
      >
        {snackbarMessage}
      </MuiAlert>
    </Snackbar>
  );
/////////////////////////////////////////////////////////////////////////////////

  const handleDelete = (id) => {              ////// delete
    axios.delete(baseURL+endPoints.DRUGDELETE+`/${id}`)
      .then(() => {
        getData(); // Refresh data after delete
        setSnackbarMessage('Drug deleted successfully'); // Set success message
        setSnackbarOpen(true); // Show Snackbar
        handleEditClose(); // Close the dialog
      })
      .catch((error) => {
        console.log(error);
      });
  };
//////////////////////////////////////////////////////////////////////
  const handleEdit = () => {          // edit
    handleEditClose();
    let updatedData = {
      genericN: selectedCard.drug,
      brandN: selectedCard.brand,
      weight: selectedCard.dosage,
      avaliable: selectedCard.quantity,
      price: selectedCard.price
    };
    console.log('check this')
    console.log('check',updatedData)
    axios.put(baseURL+endPoints.DRUGUPDATE+`/${selectedCard.ID}`, updatedData)
      .then((response) => {
        getData(); // Refresh data after edit
        setSnackbarMessage('Drug edited successfully'); // Set success message
        setSnackbarOpen(true); // Show Snackbar
        console.log("sent ",updatedData)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ///////////////////////////////////////////////////////////////////////////
 
 
  const [filter, setFilter] = useState('');
  const filteredRows = rows.filter(item => item.drug.toLowerCase().includes(filter)||item.brand.toLowerCase().includes(filter))//filtered Rload data by the search

/*   const Filter = (event) => {
    const searchValue = event.target.value.toLowerCase();
  
  setRows(
    rows.filter(
      (f) =>
        (typeof f.drug === 'string' && f.drug.toLowerCase().includes(searchValue)) ||
        (typeof f.brand === 'string' && f.brand.toLowerCase().includes(searchValue)) 
        
    )
  );
    
  }; */
  
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

  

  const handleEditClose = () => {
    setSelectedCard(null);
    setEditOpen(false);
  };
  
  const handleEditOpen =(row) => {
    setSelectedCard(row);
    setEditOpen(true);
  };

  useEffect(()=>{
    document.body.style.margin = '0';

   },[]) 
   const handleFieldChange = (fieldName, value) => {
    console.log(`Updating ${fieldName} to ${value}`);
    setSelectedCard(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };
  const [select,setSelect]=useState(null)
  let x=[
    {
      "id": 1,
      "name": "Dhammika Mahendra ",
      "time": "08:10"
      
    },
    {
      "id": 2,
      "name": "Nethmi Eranga",
      "time": "09:15"
      
    },
    {
      "id": 3,
      "name": "Chathumini Pamodya",
      "time": "10:10"
      
    },
    {
      "id": 4,
      "name": "Yasiru Ramosh",
      "time": "10:25"
    
    },
    {
      "id": 5,
      "name": "Chathura Ishara",
      "time": "11:15"
      
    },
    {
      "id": 6,
      "name": "Hasini Chamodi",
      "time": "13:15"
      
    },
    {
      "id": 7,
      "name": "Nelunika Nuwanthi",
      "time": "13:35"
      
    },
    {
      "id": 8,
      "name": "Methnula Thisum",
      "time": "14:15"
      
    },
    {
      "id": 9,
      "name": "Eranga Kumari",
      "time": "14:45"
      
    },
    {
      "id": 10,
      "name": "Kasun Kasun",
      "time": "15:15"
    
    },
    {
      "id": 11,
      "name": "Saman Perera",
      "time": "15:19"
      
    },
    {
      "id": 12,
      "name": "Pabodya Baumika",
      "time": "15:25"
      
    },
    {
      "id": 13,
      "name": "Akasha",
      "time": "16:15"
      
    }
  ]
  
  return (
    
    
    <div>
    <div>
      {renderSnackbar()}
    </div>

      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>

      <SearchBarSM placeholder="Search Drugs" value={filter} onChange={(e)=>setFilter(e.target.value)}></SearchBarSM>
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
          <TextField label="Genaric name" fullWidth sx={{ mb: 1, mt: 3 }} value={drug} onChange={(e) => setDrug(e.target.value)} />
          <TextField label="Brand Name" sx={{ mb: 1 }}value={brand} onChange={(e) => setBrand(e.target.value)} />
          <TextField label="dossage" sx={{ ml: 4, mb: 1 }} value={dosage} onChange={(e) => setDosage(e.target.value)}/>
          <TextField label="unit price" fullWidth sx={{ mb: 1 }}value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <TextField label="Amount" sx={{ mb: 1 }} value={price} onChange={(e) => setPrice(e.target.value)}/>
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
       
        {filteredRows.map((row) => (
    <div><Card 
    sx={{ minWidth:"30px",marginTop:"20px",marginLeft:"20px",marginRight:"20px"}}
    onClick={() =>handleEditOpen(row)}
    key={row.ID}
    >
    <Grid container spacing={2}>
  <Grid item xs={3}>
    <Typography sx={{flex:1, paddingLeft: '10px'}}>{row.drug}</Typography>
  </Grid>
  <Grid item xs={3}>
  <Typography sx={{flex:1}}>{row.brand}</Typography>
  </Grid>
  <Grid item xs={2}>
  <Typography sx={{flex:1}}>
                  {row.dosage}
                 
                </Typography>
  </Grid>
  <Grid item xs={2}>
  <Typography sx={{flex:1}}> {row.quantity}</Typography>
  </Grid>
  <Grid item xs={2}>
  <Typography sx={{flex:1}}>{row.price}</Typography>
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
            onClick={() => handleDelete(selectedCard.ID)}
            variant="contained"
            sx={{ backgroundColor: "rgb(121, 204, 190)", m: 2 }}
          >
            Delete
          </Button>
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
  </div>
  )
}
