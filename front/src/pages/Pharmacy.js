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
import AddCardIcon from '@mui/icons-material/AddCard';

export default function Pharmacy() {
  const [select,setSelect]=useState(null)//current selected prescription id(patient)
  const [Data,SetData]=useState([])//Store incoming prescription details
  const selectedPrescription = select ? Data.filter(data => data.id === select) : [];
  const [drugDetail,setDrugDetail]=useState(null)//final drug data to be rendered
  const [drugBill,setDrugBill]=useState([])//final drug bill details
  const [serviceCharge,setServiceCharge]=useState(300)
  const [total,setTotal]=useState(0)//store the calculated total

  useEffect(()=>{//initial data loading------------------------------------------------------
    document.body.style.margin = '0';
    getData();
   },[]) 

  //data loading as the prescription is selected--------------------------------
  useEffect(()=>{
    if(select!==null){
      const genericNames = selectedPrescription[0].medicine.map(drug => drug.name);
      console.log(genericNames)
      axios.post(baseURL+endPoints.MEDICINEDETAIL, genericNames)
      .then(response => {     
          //attach each the drug details requested from back to the corresponding drug in prescription
          let res=response.data
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
            arr.push(unit)
            unit={}
          })
          setDrugBill(arr)
          setDrugDetail(obj[0])
          arr=[]
      })
      .catch(error => {
        setDrugDetail(null)//stop rendering in case of loading failure
        console.error('Error sending generic names:', error);
      });
    }
  },[select])


  const getData = () => {//get the prescriptions list to the side bar--------------------------
    axios.get(baseURL+endPoints.DRUGREQUEST)
      .then((response) => {
       SetData(response.data)
      })
      .catch((error) => {
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

  //snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  //Bill generation when confirm is allowed----------------------------------------
  const handleConfirmAction = () => {
    let objunit={}
    let obj=[]
    drugBill.forEach((el)=>{
      objunit.DrugID=el.DrugId
      objunit.PrescriptionID=el.PrescriptionId
      objunit.Amount=el.Amount
      obj.push(objunit)
      objunit={}
    })

    setLoadingBConfirm(true);
    axios.post(baseURL+endPoints.ADDBILLDRUG,obj)
    .then(()=>{
      setLoadingBConfirm(false)
      handleCloseConfirm()
      setSnackbarOpen(true)
    })
    .catch((er)=>{
      setLoadingBConfirm(false)
      handleCloseConfirm()
      console.log(er)
    })

  };
  
  //update the weight-----------------------------------------------------
const handleWeight = (index,data,priceData) => {
  let unitPrice=0
  let drugId=''
  priceData.forEach((el)=>{
    if(el.weight===data){
      unitPrice=parseInt(el.price)
      drugId=el.id
    }
  })
  setDrugBill(prev =>
    prev.map((item, i) =>
      i === index ? { ...item, weight:data ,price:unitPrice,DrugId:drugId} : item
    )
  )
}

//update the drug amount---------------------------------------------
const handleAmount = (index,data)=>{
  let tmp=parseInt(data)
  tmp=isNaN(tmp)||tmp<0?0:tmp
  setDrugBill(prev =>
    prev.map((item, i) =>
      i === index ? { ...item, Amount:tmp } : item
    )
  )
}

//Keep the total in track ----------------------------
useEffect(()=>{
  let t=0
  drugBill.forEach((el,ind)=>{
    t=t+parseInt(el.Amount)*parseInt(el.price)
  })
  setTotal(t)
},[drugBill])


   const data=[
    {
       id:51,  // -----------------------------------> prescription Id-------  
      name:"Dhammika Mahendra",
      age:30,
      gender:"male",
      time: "08:10",
      medicine :[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
             {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
             {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
]

         
     },
     {
       id:52,    
       name:"Nethmi Eranga",
      age:18,
      gender:"female",
         time: "09:15",
         medicine :[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
         
]    
     },
     {
       id:53,    
       name:"Chathumini Pamodya",
       age:8,
       gender:"female",
         time: "10:10",
         medicine :[{name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
         {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
]       
     },
     {
       id:54,    
       name:"Yasiru Ramosh",
       age:22,
       gender:"male",
         time: "10:25",
         medicine :[{name:"Sumatripan",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
         {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
]        
     },
     {
       id:55,    
       name:"Chathura Ishara",
       age:38,
       gender:"male",
         time: "11:15",
         medicine :[{name:"Paracitamol",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
         {name:"Zithraceene",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
         {name:"Zithraceene",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
         {name:"Zithraceene",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
         
]
     },
     {
      id:75,    
        name:"Hasini Chamodi",
        age:48,
        gender:"female",
        time: "13:15",
        medicine :[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
        {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
        
]
    },
    {
      id:76,    
        name:"Nelunika Nuwanthi",
        age:18,
        gender:"female",
        time: "13:35",
        medicine :[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
        {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
        {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
]
    },
    {
      id:79,    
        name:"Methnula Thisum",
        age:18,
        gender:"male",
        time: "14:15",
        medicine :[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
        {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
        {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
]
    },
    {
      id:81,    
        name:"Eranga Kumari",
        age:48,
        gender:"female",
        time: "14:45", 
        medicine :[ {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
        {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
] 
    },
    {
      id:88,    
      name:"Kasun Kasun",
      age:48,
      gender:"male",
      time: "15:15",
      medicine :[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
        {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
        {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
]
        
    },
    {
      id:90,    
        name:"Saman Perera",
        age:48,
        gender:"male",
        time: "15:19",
        medicine :[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
        {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
        
]
        
    },
   
    {
      id:99,    
        name:"Pabodya Baumika",
        age:48,
        gender:"female",
        time: "15:25",
        medicine :[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
        {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
        {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
]

        
    },
    {
      id:101,    
        name:"Akasha",
        age:48,
        gender:"female",
        time: "16:15",
        medicine :[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
        {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
        {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
]

    },
     
   ] 

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
          <AddCardIcon sx={{cursor:'pointer'}}></AddCardIcon>
          <Typography sx={{ fontSize:'14px'}}>{formattedDate}</Typography>
          <StoreIcon sx={{cursor:'pointer'}}></StoreIcon>
          </Box>
          </SidebarTop>
          <SidebarList>
          {
         Data.map((elm,ind)=>{
            return(
             <>
              <Sideunit_Bill key={ind} id={elm.id} name={elm.name} time={elm["time"]}  setSelect={setSelect} selected={elm.id===select?true:''}></Sideunit_Bill>
             </>
            )
         })
       }
          </SidebarList>
        </SidebarContainer>
      </Grid>

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

{drugDetail!=null?drugDetail.medicine.map((drug, no) => (           
  <Box key={no} sx={{mt:"10px"}}>
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
  </Box>)):''}
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
        <Typography sx={{textAlign:'right',fontWeight:'bold',flex:2}}>{total+serviceCharge}</Typography>
       </Box>

      {/* ------------------- Confirmation         ------------------------------------*/}  
      <Box style={{ textAlign: 'right', marginTop: '20px', marginBottom: '20px' }}>
          <PrintIcon sx={{mr:'30px'}} size="small" />
          <Button variant="contained" sx={{marginRight: '220px'}} onClick={handleClickOpenConfirm}>Confirm
          </Button>
      </Box>

       <Dialog open={open} onClose={handleClose}>
        <DialogContent>
        <TextField label="Service Charge" size='small' variant="outlined" />
          <div style={{display:'flex',justifyContent:'center',paddingTop:'10px'}}>
          <Button onClick={handleClose} size='small' sx={{mr:'20px'}}>Cancel</Button>
          <Button onClick={handleClose} size='small' variant="contained">Save</Button>
        </div>
        </DialogContent>
      </Dialog>
    
    {/* --------------------------- Confirmation Dialog ------------------------------------- */}
      <ConfirmPropmt action={handleConfirmAction} message="Are you sure bill is ready?"
       handleClose={handleCloseConfirm} loadingB={loadingBConfirm} open={openConfirm}></ConfirmPropmt>

     
    {/* --------------------------- Snackbar ------------------------------------------------- */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="success" elevation={6} variant="filled">
          Bill generated suceessfully!
        </MuiAlert>
      </Snackbar>
      </div>
)}
      </Grid>
    </Grid>

  </div>
  )
}


