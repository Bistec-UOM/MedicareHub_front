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
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Load } from '../components/Other';
import theme from '../components/Style';
import MedicationIcon from '@mui/icons-material/Medication';
import { setHeaders } from '../Services/Auth';

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
  const [col, setCol] = useState(''); //Snack bar color

  const [rows, setRows] = useState([]) // fetched drug list is stored
  const [loading,setLoading] = useState(true)
  const [additionalQuantity, setAdditionalQuantity] = useState(0); // New state for additional quantity
  const [openPopup, setOpenPopup] = useState(false);
  
  const getData = () => { // get
    axios.get(baseURL+endPoints.DRUGGET,setHeaders())
    .then((result) => {
        const drugs = result.data.map(drug => ({
            ID: drug.id,
            drug: drug.genericN,
            brand: drug.brandN,
            dosage: drug.weight,
            quantity: drug.avaliable,
            price: drug.price
        }));
        setLoading(false)
        setRows(drugs);
    })
    .catch((error) => {
        setLoading(false)
        console.log(error)
    })
}
//New drug adding ==========================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const handleConfirm = () => {
  if(drug === '' || brand === '' || dosage === '' || quantity === '' || price === '') {
    setCol('warning')
    setSnackbarMessage('Fill all the fields')
    setSnackbarOpen(true)
    return
  }
  setLoadingBAdd(true);
  const data = {
    genericN: drug,
    brandN: brand,
    weight: dosage,
    avaliable: Number(quantity) + additionalQuantity, // Add additional quantity to the entered quantity
    price: price,
  };
    axios.post(baseURL+endPoints.DRUGPOST,data,setHeaders())
    .then((result)=>{
      setLoadingBAdd(false)
      handleClose();
      getData() 
      setCol('success')
      setSnackbarMessage('Drug added successfully')
      setSnackbarOpen(true)
      setDrug('')
      setBrand('')
      setDosage('')
      setQuantity('')
      setDosage('')
      setPrice('')
    })
    .catch((error)=>{
      if(error.hasOwnProperty('response')){
        if(error.response.status===400){
          setCol('warning')
          setSnackbarMessage('Drug already exist')
        }else{
          setCol('error')
          setSnackbarMessage('Error occured! Try again');
        }
      }
      setLoadingBAdd(false)
      setSnackbarOpen(true)
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
      autoHideDuration={2000} // Snackbar duration in milliseconds
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Position Snackbar at bottom left
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleCloseSnackbar}
        severity={col} // Snackbar severity (success, error, warning, info)
      >
        {snackbarMessage}
      </MuiAlert>
    </Snackbar>
  );

  //Drug deletion =====================================>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [deleteId,setdeleteId] = useState('')
  const handleDelete = () => {  
    setLoadingBConfirm(true)           
    axios.delete(baseURL+endPoints.DRUGDELETE+`/${deleteId}`,setHeaders())
      .then(() => {
        setLoadingBConfirm(false)
        handleCloseConfirm()
        handleEditClose(); // Close the dialog
        getData(); // Refresh data after delete
        setCol('success')
        setSnackbarMessage('Drug deleted successfully'); // Set success message
        setSnackbarOpen(true); // Show Snackbar
      })
      .catch((error) => {
        setCol('error')
        setSnackbarMessage('Error occured! Try again'); // Set error message
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
      axios.put(baseURL+endPoints.DRUGUPDATE+`/${selectedCard.ID}`, updatedData,setHeaders())
        .then((response) => {
          setLoadingBEdit(false)       
          getData(); // Refresh data after edit
          setCol('success')
          setSnackbarMessage('Drug edited successfully'); // Set success message
          setSnackbarOpen(true); // Show Snackbar
          console.log("sent ",updatedData)
          handleEditClose();
          setEditEnable(false)
        })
        .catch((error) => {
          setCol('error')
          setSnackbarMessage('Error occured! Try again'); // Set error message
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
    setEditEnable(false)
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
        <DialogTitle sx={{backgroundColor:theme.palette.custom.greenH,display: "flex",justifyContent: "space-between",color:'white'}}>
        <div style={{display:'flex',justifyContent:'start'}}>
          <MedicationIcon></MedicationIcon>
          <Typography sx={{fontSize:'18px',fontWeight:'medium'}}>Add drugs</Typography>
        </div>
        <CloseIcon onClick={handleClose} sx={{cursor:'pointer'}}/>
        </DialogTitle>
        <DialogContent>
          <TextField label="Genaric name" fullWidth sx={{ mb: 2, mt: 3 }} value={drug} onChange={(e) => setDrug(e.target.value)}  size='small'/>
          <TextField label="Brand Name" sx={{ mb: 2 }} fullWidth value={brand} onChange={(e) => setBrand(e.target.value)}  size='small'/>
          <div sx={{display:'flex',justifyContent:'space-between'}}>
            <TextField label="weight (mg)" sx={{mb: 2 }} value={dosage} onChange={(e) => setDosage(e.target.value)} size='small' type='number'/>
            <TextField label="unit price" sx={{ mb: 2 ,ml:2 }}value={quantity} onChange={(e) => setQuantity(e.target.value)}  size='small' type='number' />
          </div>
          <TextField label="Amount" sx={{ mb: 2 }} value={price} onChange={(e) => setPrice(e.target.value)} size='small' type='number'/>
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
{!loading?filteredRows.map((row) => (
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
:<Load></Load>}

{/*--------------- confirmation popup box for delete------------------------------------------*/}
      <ConfirmPropmt action={handleDelete} message="Are you sure this must be deleted?"
       handleClose={handleCloseConfirm} loadingB={loadingBConfirm} open={openConfirm}></ConfirmPropmt>

{/* --------------- Drug editing popup ---------------------------------------------------- */}
<Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle sx={{backgroundColor:theme.palette.custom.greenH,display: "flex",justifyContent: "space-between",color:'white'}}>
        <div style={{display:'flex',justifyContent:'start'}}>
          <MedicationIcon></MedicationIcon>
          <Typography sx={{fontSize:'18px',fontWeight:'medium'}}>Edit drug</Typography>
        </div>
        <CloseIcon onClick={handleClose} sx={{cursor:'pointer'}}/>
        </DialogTitle>
        <DialogContent>
          <TextField
          disabled = {!editEnable}
          sx={{ mb: 2 ,mt:3}}
          size='small'
          label="Genaric name"
          fullWidth
          value={selectedCard ? selectedCard.drug : ""}
          onChange={(e) => handleFieldChange('drug', e.target.value)}
          />
          <TextField
          disabled = {!editEnable}
          sx={{ mb: 2 }}
          size='small'
          label="Brand name"
          fullWidth
          value={selectedCard ? selectedCard.brand : ""}
          onChange={(e) => handleFieldChange('brand', e.target.value)}
          />

      <div sx={{display:'flex',justifyContent:'space-between',width:'100%'}}>
          <TextField
          disabled = {!editEnable}
          sx={{ mb: 2 }}
          size='small'
          label="Weight (mg)"
          value={selectedCard ? selectedCard.dosage : ""}
          onChange={(e) => handleFieldChange('dosage', e.target.value)}
          />

          <TextField
          disabled = {!editEnable}
          sx={{ mb: 2 ,ml:2}}
          size='small'
          label="Price"
          value={selectedCard ? selectedCard.price : ""}
          onChange={(e) => handleFieldChange('price', e.target.value)}
          />

      </div>
         <TextField
         disabled = {!editEnable}
         sx={{ mb: 2 }}
         size='small'
          label="quantity"
          value={
            selectedCard
              ? selectedCard.quantity + additionalQuantity // Add additional quantity to the existing quantity
              : ''
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setOpenPopup(true)}>
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
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
    {/* ------- ADD drugs +  */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
  <DialogContent>
    <TextField
      size='small'
      label="Add"
      fullWidth
      type="number"
      value={additionalQuantity}
      onChange={(e) => setAdditionalQuantity(Number(e.target.value))}
    />
  </DialogContent>
</Dialog>
  </div>
  )
}
