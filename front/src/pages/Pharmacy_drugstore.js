import React, { useEffect, useState } from 'react'
import { Grid,Card,Button,Typography,TextField,Toolbar } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import '../components/CustomScroll.css'
import { Snackbar } from '@mui/material'; 
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { baseURL,endPoints } from '../Services/Pharmacy';
import { ConfirmPropmt, SearchBarSM } from '../components/Common';
import LoadingButton from '@mui/lab/LoadingButton';
import DoneIcon from '@mui/icons-material/Done'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit'

export default function Pharmacy_drugstore() {

  useEffect(()=>{
    document.body.style.margin = '0'
    getData();
   },[]) 

  const [brand, setBrand] = useState('');
  const [drug, setDrug] = useState('');
  const [quantity, setQuantity] = useState('');
  const [dosage, setDosage] = useState('');
  const [price, setPrice] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // State for Snackbar message

  const [rows, setRows] = useState([]) // fetched drug list is stored

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
//New drug adding ==========================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 const handleConfirm=()=>{
    setLoadingBAdd(true)
    const data={
      "genericN": drug,
      "brandN": brand,
      "weight": dosage,
      "avaliable": quantity,
      "price": price    
      
    }
    axios.post(baseURL+endPoints.DRUGPOST,data)
    .then((result)=>{
      setLoadingBAdd(false)
      handleClose();
      getData() 
      setSnackbarMessage('Drug added successfully')
      setSnackbarOpen(true)
    })
    .catch((error)=>{
      handleClose();
      setLoadingBAdd(false)
      console.log(error)
    })
    setDrug('')
    setBrand('')
    setDosage('')
    setQuantity('')
    setDosage('')
    setPrice('')
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
      autoHideDuration={2000} // Snackbar duration in milliseconds
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

  //Drug deletion =====================================>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [deleteId,setdeleteId] = useState('')
  const handleDelete = () => {  
    setLoadingBConfirm(true)           
    axios.delete(baseURL+endPoints.DRUGDELETE+`/${deleteId}`)
      .then(() => {
        setLoadingBConfirm(false)
        handleCloseConfirm()
        handleEditClose(); // Close the dialog
        getData(); // Refresh data after delete
        setSnackbarMessage('Drug deleted successfully'); // Set success message
        setSnackbarOpen(true); // Show Snackbar
      })
      .catch((error) => {
        setLoadingBConfirm(false)
        handleCloseConfirm()
        handleEditClose(); // Close the dialog
        console.log(error);
      });
      setdeleteId('')
  };

//Drug eiditing ========================================>>>>>>>>>>>>>>>>>>>>>>
  const handleEdit = () => {
    if(editEnable){//only proceed when editing enable state
      setLoadingBEdit(true)       
      let updatedData = {
        genericN: selectedCard.drug,
        brandN: selectedCard.brand,
        weight: selectedCard.dosage,
        avaliable: selectedCard.quantity,
        price: selectedCard.price
      };
      //console.log('check this')
      //console.log('check',updatedData)
      axios.put(baseURL+endPoints.DRUGUPDATE+`/${selectedCard.ID}`, updatedData)
        .then((response) => {
          setLoadingBEdit(false)       
          getData(); // Refresh data after edit
          setSnackbarMessage('Drug edited successfully'); // Set success message
          setSnackbarOpen(true); // Show Snackbar
          console.log("sent ",updatedData)
          handleEditClose();
          setEditEnable(false)
        })
        .catch((error) => {
          setLoadingBEdit(false)       
          console.log(error);
          handleEditClose();
          setEditEnable(false)
        });
    }else{
      setEditEnable(true)
    }
  };

  const [editEnable,setEditEnable] = useState(false)
 
 //filtered Rload data by the search===========================================
  const [filter, setFilter] = useState('');
  const filteredRows = rows.filter(item => item.drug.toLowerCase().includes(filter)||item.brand.toLowerCase().includes(filter))

  
  const [open, setOpen] =useState(false);
  const [selectedCard, setSelectedCard] =useState(null);
  const [editOpen, setEditOpen] =useState(false);

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

   const handleFieldChange = (fieldName, value) => {
    console.log(`Updating ${fieldName} to ${value}`);
    setSelectedCard(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

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
  
  //Loading button states---------------------------------------------------------------
  const [loadingBAdd, setLoadingBAdd] = useState(false)
  const [loadingBEdit, setLoadingBEdit] = useState(false)

  //confirmation popup for drug deletion------------------------------------------------
  const [loadingBConfirm, setLoadingBConfirm] = useState(false)//Loading button
  const [openConfirm, setOpenConfirm] = useState(false)
  const handleClickOpenConfirm = (x) => {
      setdeleteId(x)
      setOpenConfirm(true)
  }
  const handleCloseConfirm = () => {setOpenConfirm(false)}  

  return (
    <div style={{paddingTop:'100px'}}>
    <div>
      {renderSnackbar()}
    </div>

      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>

      <Toolbar sx={{justifyContent:'space-between',width:'70%',backgroundColor:'white',position:'absolute',top:'64px'}}>
        <SearchBarSM height='1px' placeholder="Search Drugs" value={filter} onChange={(e)=>setFilter(e.target.value)}></SearchBarSM>
          <Button
            variant="contained"
            size="small"
            sx={{
              marginRight:"20px",
              marginTop:"10px",
            }}
            endIcon={<AddIcon/>}
            onClick={handleClickOpen}
          >
            Add
          </Button>
      </Toolbar>

        </Grid>

{/* --------------- New drug adding popup ---------------------------------------------------- */}

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
          <LoadingButton 
            variant='contained' 
            size='small' 
            endIcon={<DoneIcon></DoneIcon>}           
            loading={loadingBAdd}
            loadingPosition="end"
            onClick={handleConfirm}
          >Save</LoadingButton>
        </DialogActions>
      </Dialog>

{/*-------------------------- Drug list-------------------------------------------------------- */}     
{filteredRows.map((row) => (
  <Card 
    sx={{width:'90%',marginTop:"5px",marginLeft:"20px",marginRight:"20px",height:'40px',display:'flex',alignItems:'center',cursor:'pointer'}}
    onClick={() =>handleEditOpen(row)}
    key={row.ID}
    >
    <Typography sx={{flex:3,ml:'20px'}}>{row.drug}</Typography>
    <Typography sx={{flex:3}}>{row.brand}</Typography>
    <Typography sx={{flex:1}}>{row.dosage}</Typography>
    <Typography sx={{flex:1}}>{row.quantity}</Typography>
    <Typography sx={{flex:1}}>{row.price}</Typography>
</Card>
  ))
}

{/*--------------- confirmation popup box for delete------------------------------------------*/}
      <ConfirmPropmt action={handleDelete} message="Are you sure this must be deleted?"
       handleClose={handleCloseConfirm} loadingB={loadingBConfirm} open={openConfirm}></ConfirmPropmt>

{/* --------------- Drug editing popup ---------------------------------------------------- */}
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
          {editEnable? <Button
            color='error'
            size='small'
            onClick={() => handleClickOpenConfirm(selectedCard.ID)}
            variant="contained"
            sx={{ mr: 2 }}
            endIcon={<DeleteIcon></DeleteIcon>}
          >
            Delete
          </Button>:''}        
          <LoadingButton 
            variant='contained' 
            size='small' 
            endIcon={editEnable?<DoneIcon></DoneIcon>:<EditIcon></EditIcon>}           
            loading={loadingBEdit}
            loadingPosition="end"
            onClick={handleEdit}
          >{editEnable?'Save':'Edit'}</LoadingButton>
        </DialogActions>
      </Dialog>
  </div>
  )
}
