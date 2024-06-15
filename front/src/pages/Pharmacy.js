import React, { useEffect, useState } from 'react'
import {SidebarContainer,SidebarTop,SidebarList} from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'
import { Grid,Snackbar,Card, Typography,Dialog,DialogContent,Button } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import '../components/CustomScroll.css'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import PrintIcon from '@mui/icons-material/Print';
import { Sideunit_Bill } from '../components/sidebar/Sideunits';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { baseURL,endPoints } from '../Services/Pharmacy';
import { ConfirmPropmt, PersonDetail } from '../components/Common';
import StoreIcon from '@mui/icons-material/Store';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCardIcon from '@mui/icons-material/AddCard';
import Pharmacy_drugstore from './Pharmacy_drugstore';
import { Load } from '../components/Other';
import DoneIcon from '@mui/icons-material/Done'

export default function Pharmacy() {

  const [loadingDone,setLoadingDone]=useState(false)
  const [store,setStore] = useState(false) //true -> in drug store

  const [select,setSelect]=useState(null)//current selected prescription id(patient)
  const [Data,SetData]=useState([])//Store incoming prescription details
  const [loading,setLoading]=useState(false)//loading circlular progress bar
  const selectedPrescription = select ? Data.filter(el => el.id === select) : [];
  const [drugDetail,setDrugDetail]=useState(null)//final drug data to be rendered
  const [drugBill,setDrugBill]=useState([])//final drug bill details
  const [serviceCharge,setServiceCharge]=useState('')
  const [total,setTotal]=useState(0)//store the calculated total

  useEffect(()=>{//initial data loading------------------------------------------------------
    document.body.style.margin = '0';
    getData();
    axios.get(baseURL+endPoints.SERVICE)
    .then((res)=>{
      //console.log(res.data)
      setServiceCharge(res.data.price)
    })
    .catch((er)=>{console.log(er)})
   },[]) 

  //data loading as the prescription is selected--------------------------------
  useEffect(()=>{
    if(select!==null){
      setDrugDetail(null)
      const genericNames = selectedPrescription[0].medicine.map(drug => drug.name);
      if(genericNames.length===0) return
      console.log(genericNames)
      setLoading(true)
      axios.post(baseURL+endPoints.MEDICINEDETAIL, genericNames)
      .then(response => { 
        setLoading(false) 
          //attach each the drug details requested from back to the corresponding drug in prescription
          let res=response.data
          console.log(response.data)
          let obj={...selectedPrescription}
          obj[0].medicine.forEach((elm,ind)=>{
            elm.detail=res[elm.name]
          })
          //getting ready the drugBill array, format to be sent to backend
          let arr=[]
          let unit={}
          obj[0].medicine.forEach(()=>{
            unit.PrescriptionId=obj[0].id
            unit.DrugId=''
            unit.Amount=0
            unit.weight=''
            unit.price=0
            unit.available=''
            arr.push(unit)
            unit={}
          })
          setDrugBill(arr)
          setDrugDetail(obj[0])
          arr=[]
      })
      .catch(error => {
        setLoading(false)
        console.error('Error sending generic names:', error);
      });
    }
  },[select])


  const getData = () => {//get the prescriptions list to the side bar--------------------------
    axios.get(baseURL+endPoints.DRUGREQUEST)
      .then((response) => {
        setLoadingDone(true)
       SetData(response.data)
      })
      .catch((error) => {
        setLoadingDone(true)
        console.log(error);
      });
  }

  //for the service charge edit dialog box-------------------
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const serviceChargeHandle = () => {
    axios.put(baseURL+endPoints.SERVICE,{id:0,price:serviceCharge})
    .then((res)=>{
      setMsg('Service charge updated successfully')
      setCol('success')
      setOpen(false)
      console.log(res)
    })
    .catch((er)=>{
      setMsg('Error occured! Try again')
      setCol('error')
      setOpen(false)
      console.log(er)
    })
  }

  //snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  //Bill generation when confirm is allowed ======================= >>>>>>>>>>>>>>>>>>>>>>>>>

  const [msg,setMsg] = useState('')
  const [col,setCol] = useState('')

  const handleConfirmAction = () => {
    let objunit={}
    let obj=[]
    drugBill.forEach((el)=>{
      objunit.drugID=el.DrugId
      objunit.prescriptionID=el.PrescriptionId
      objunit.amount=el.Amount
      obj.push(objunit)
      objunit={}
    })

    setLoadingBConfirm(true);
    let load={prescriptId:select,data:obj,total:Number(total+serviceCharge)}
    setLoadingBConfirm(true);
    console.log(JSON.stringify(load))
    axios.post(baseURL+endPoints.ADDBILLDRUG,load)
    .then(()=>{
      setLoadingBConfirm(false)
      handleCloseConfirm()
      setMsg('Bill is uploaded successfully')
      setCol('success')
      setSnackbarOpen(true)
      SetData(Data.filter((el)=>el.id!==select))
      setDrugDetail(null)
      setSelect(null)
      setTotal(0)
    })
    .catch((er)=>{
      setLoadingBConfirm(false)
      handleCloseConfirm()
      setMsg('Error occured! Try again')
      setCol('error')
      setSnackbarOpen(true)
      console.log(er)
    })

  };
  
  //update the weight-----------------------------------------------------
const handleWeight = (index,data,priceData) => {
  let unitPrice=0
  let drugId=''
  let available=''
  priceData.forEach((el)=>{
    if(el.weight===data){
      unitPrice=parseInt(el.price)
      drugId=el.id
      available=el.avaliable
    }
  })
  setDrugBill(prev =>
    prev.map((item, i) =>
      i === index ? { ...item, weight:data ,price:unitPrice,DrugId:drugId,available:available} : item
    )
  )
}

//update the drug amount---------------------------------------------
const handleAmount = (index,data)=>{
  let pass=true
  let tmp=parseInt(data)
  tmp=isNaN(tmp)||tmp<0?0:tmp
  setDrugBill(prev =>
    prev.map((item, i) =>{
      if(i===index){
        if(item.available<tmp){
          pass=false
          return { ...item, Amount:item.available } 
        }else{
          return { ...item, Amount:tmp } 
        }
      }else{
        return item
      }
    })
  )
  if(!pass){
    setMsg('Not enough drugs')
    setCol('warning')
    setSnackbarOpen(true)
  }
}

//Keep the total in track ----------------------------
useEffect(()=>{
  let t=0
  drugBill.forEach((el,ind)=>{
    t=t+parseInt(el.Amount)*parseInt(el.price)
  })
  setTotal(Number(t))
},[drugBill])


   //Date------------------------------------------------------------------------------
   const generatedate=()=>{
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const dayOfWeek = daysOfWeek[date.getDay()];

    return `${year}-${month}-${day} ${dayOfWeek}`;
  }
  const formattedDate = generatedate();

   //Confirmation popup box-----------------------------------------------
   const [loadingBConfirm, setLoadingBConfirm] = useState(false)
   const [openConfirm, setOpenConfirm] = useState(false)
   const handleClickOpenConfirm = (x) => {
        setOpenConfirm(true)
  }
  const handleCloseConfirm = () => {setOpenConfirm(false)} 
   
  return (
    <div>
    <Navbar></Navbar>

    <Grid container spacing={0} sx={{paddingTop:'64px',height:'100vh'}}>
      <Grid item xs={3} style={{height:'100%',backgroundColor:'#E7FFF9'}}>
        <SidebarContainer sx={{ backgroundColor:'#E7FFF9'}}>
          <SidebarTop>
          <Box sx={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',pr:'14px',pl:'14px'}}>
          <NotificationsIcon></NotificationsIcon>
          <Typography sx={{ fontSize:'14px'}}>{formattedDate}</Typography>
          {store? <AddCardIcon sx={{cursor:'pointer'}} onClick={()=>setStore(false)}></AddCardIcon>:
          <StoreIcon sx={{cursor:'pointer'}} onClick={()=>setStore(true)}></StoreIcon>}
          </Box>
          </SidebarTop>
          {loadingDone?<SidebarList>
          {
         Data.map((elm,ind)=>{
            return(
             <>
              <Sideunit_Bill key={ind} id={elm.id} name={elm.name} time={elm["time"]}  setSelect={setSelect} selected={elm.id===select?true:''}></Sideunit_Bill>
             </>
            )
         })
       }
          </SidebarList>:<SidebarList><Load></Load></SidebarList>}
        </SidebarContainer>
      </Grid>
{!store?
      <Grid item xs={9} style={{height:'100%',overflowY:'scroll'}}>
{/* =====================      Person details          ===========================================*/}        
      {select ? (
      <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
          {selectedPrescription.map((patientdata, id) => (       
            <PersonDetail name={patientdata.name} age={patientdata.age} gender={patientdata.gender}></PersonDetail>
          ))}
      </div>
      ): <Typography gutterBottom variant="p"></Typography>
      }
      {select ? (
      <div style={{marginTop:"80px"}}>
{/* =====================      Rendering the drug list =============================================*/}

{drugDetail!=null?drugDetail.medicine.map((drug, no) => {if(drug.detail.length>0){           
  return(<Box key={no} sx={{mt:"10px"}}>
    {/*-----------------    Blue lable (prescript drug)  ----------------------------------------*/}
    <Card sx={{ backgroundColor: '#0099cc',display:'flex',flexDirection:'row', color: 'white', fontSize: '20px',width:"500px",marginLeft:"10px"}}>
                <Typography gutterBottom variant="p" sx={{ flex:'3',marginLeft: '10px', }}>{drug.name}</Typography>
                <Typography gutterBottom variant="p" sx={{flex:'2', marginLeft: '100px ',  }}>{drug.quantity} mg</Typography>
                <Typography gutterBottom variant="p" sx={{ flex:'1',marginLeft: '150px', }}>{drug.hour}</Typography>
    </Card>   
        
    {/*-----------------    Drop down list for drug weights    ------------------------------------*/}
    <Box key={no} sx={{marginTop:"10px",width:'800px',display:'flex',alignItems:'center'}}>
    <FormControl sx={{ m: 0, minWidth: 120 ,ml: '200px'}} size="small" marginTop="20px">
      <InputLabel id="demo-select-small-label">weight</InputLabel>
      <Select
        sx={{ borderColor:"0099cc"}}
        value={drugBill[no].weight}
        label="weight"
        onChange={(e)=>handleWeight(no,e.target.value,drug.detail)}
      >           
       {
        drug.detail.map((elm,ind)=>{
          return <MenuItem value={elm.weight}>{elm.weight} mg</MenuItem>
        })
      }
      </Select>
    </FormControl>
    
  {/* Input field for entering the amount of phills---------------------------------------------*/}
      <TextField  
        size='small'
        sx={{'& > :not(style)': { m: 0, width: '10ch',ml:'120px'}}} 
        label="Amount" 
        type='number'
        value={drugBill[no].Amount}
        variant="outlined"   
        onChange={(e)=>handleAmount(no,e.target.value)}
      />
      
      <Typography gutterBottom  sx={{ marginLeft: '45px ',display:'inline',color:'grey',textAlign:'right',flex:2}}>{drugBill[no].price}</Typography>
      <Typography gutterBottom  sx={{ marginLeft: '90px ', display:'inline',fontWeight:'bold',textAlign:'right',flex:2}}>{parseInt(drugBill[no].price)*parseInt(drugBill[no].Amount)}</Typography>
      
    </Box> 
  </Box>)}else{return<Typography sx={{fontSize:'15px',pl:'20px',color:'gray'}}>Not found in store</Typography>}}):loading?<Load></Load>:select?<Typography sx={{fontSize:'15px',pl:'20px',color:'gray'}}>No issued drugs</Typography>:''}
</div>
       ) : ''}
      {select && (    
        <div >
      {/* ---- Total value without service charge  ------------------------------------*/}
        <Box style={{ textAlign: 'right',width:'800px'}}>
          <Divider sx={{mt:'10px',width:'100%',ml:'20px',mb:'10px'}} />
          <Typography sx={{fontWeight:'bold'}}>{total}</Typography>
        </Box>
      
      
      {/* ---- Service charge and Total          ------------------------------------*/}
       <Box sx={{marginTop:'2px',display:'flex',width:'800px',alignItems:'center'}}>
        <Typography sx={{pl:'15px'}}>Service charge
              <IconButton sx={{cursor:'pointer'}} onClick={handleOpen}>
              <EditIcon size='small'/>
              </IconButton >
        </Typography>
        <Typography sx={{ marginLeft: '23px ',flex:2,textAlign:'right',color:'grey'}}>+{serviceCharge}</Typography>
       </Box>
       <Box sx={{width:'800px',display:'flex',alignItems:'center'}}>
        <Typography sx={{fontSize:'20px',pl:'15px'}}>Total</Typography>
        <Typography sx={{textAlign:'right',fontWeight:'bold',flex:2}}>{`${Number(total+serviceCharge)}`}</Typography>
       </Box>

      {/* ------------------- Confirmation         ------------------------------------*/}  
      <Box style={{ textAlign: 'right', marginTop: '20px', marginBottom: '20px' }}>
          <PrintIcon sx={{mr:'30px'}} size="small" />
          <Button variant="contained" sx={{marginRight: '220px'}} endIcon={<DoneIcon></DoneIcon>}       onClick={handleClickOpenConfirm}>Confirm
          </Button>
      </Box>

       <Dialog open={open} onClose={handleClose}>
        <DialogContent>
        <TextField type='number' label="Service Charge" size='small' variant="outlined" value={serviceCharge} onChange={(e)=>setServiceCharge(e.target.value)}/>
          <div style={{display:'flex',justifyContent:'center',paddingTop:'10px'}}>
          <Button onClick={handleClose} size='small' color='warning' variant='outlined' sx={{mr:'20px'}}>Cancel</Button>
          <Button onClick={serviceChargeHandle} size='small' variant="contained" endIcon={<DoneIcon></DoneIcon>}>Save</Button>
        </div>
        </DialogContent>
      </Dialog>
    
    {/* --------------------------- Confirmation Dialog ------------------------------------- */}
      <ConfirmPropmt action={handleConfirmAction} message="Are you sure bill is ready?"
       handleClose={handleCloseConfirm} loadingB={loadingBConfirm} open={openConfirm}></ConfirmPropmt>

      </div>
)}
      </Grid>:<Grid item xs={9} style={{height:'100%',overflowY:'scroll'}}><Pharmacy_drugstore></Pharmacy_drugstore></Grid>}

          {/* --------------------------- Snackbar ------------------------------------------------- */}
          <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={col} elevation={6} variant="filled">
          {msg}
        </MuiAlert>
      </Snackbar>
    </Grid>

  </div>
  )
}


