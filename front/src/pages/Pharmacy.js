import React, { useEffect, useState } from 'react'
import {SidebarContainer,SidebarTop,SidebarList} from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'
import { Grid,Snackbar,Card, Typography,Dialog, DialogTitle, DialogContent, DialogActions,Button, CardContent } from '@mui/material'
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
import { PersonDetail } from '../components/Common';

export default function Pharmacy() {
  const [select,setSelect]=useState(null)//current selected prescription id(patient)
  const [Data,SetData]=useState([])//Store incoming prescription details
  const selectedPrescription = select ? Data.filter(data => data.id === select) : [];
  const [drugDetail,setDrugDetail]=useState(null)//final drug data to be rendered
  const [drugBill,setDrugBill]=useState([])//final drug bill details

  useEffect(()=>{
    if(select!==null){
      const genericNames = selectedPrescription[0].medicine.map(drug => drug.name);
      axios.post(baseURL+endPoints.MEDICINEDETAIL, genericNames)
      .then(response => {     
          //attach each the drug details requested from back to the corresponding drug in prescription
          let res=response.data
          let obj={...selectedPrescription}
          obj[0].medicine.forEach((elm,ind)=>{
            elm.detail=res[elm.name]
          })
          console.log(selectedPrescription[0])
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

  
  useEffect(()=>{//initial data loading------------------------------------------
    document.body.style.margin = '0';
    getData();
   },[]) 

  const getData = () => {
    axios.get(baseURL+endPoints.DRUGREQUEST)
      .then((response) => {
       SetData(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [open, setOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDialogOpen = () => {
    setConfirmDialogOpen(true);
  };
  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  const handleConfirmAction = () => { 
    setConfirmDialogOpen(false);
    setSnackbarOpen(true);
  };
  
  const dividerStyle = {
    backgroundColor: '#0099cc',
    height: '2px',
    width:'230px', // Adjust height as needed
    marginLeft: '550px', // Remove default margin
  };


const handleWeight = (index,data,priceData) => {//update the weight
  let unitPrice=0
  priceData.forEach((el)=>{
    if(el.weight===data){
      console.log(el)
      unitPrice=parseInt(el.price)
    }
  })
  setDrugBill(prev =>
    prev.map((item, i) =>
      i === index ? { ...item, weight:data ,price:unitPrice} : item
    )
  )
}
const handleAmount = (index,data)=>{//update the drug amount
  setDrugBill(prev =>
    prev.map((item, i) =>
      i === index ? { ...item, Amount:data } : item
    )
  )
}

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

   
  return (
    <div>
    <Navbar></Navbar>

    <Grid container spacing={0} sx={{paddingTop:'64px',height:'100vh'}}>
      <Grid item xs={3} style={{height:'100%',backgroundColor:'#E7FFF9'}}>
        <SidebarContainer sx={{ backgroundColor:'#E7FFF9'}}>
          <SidebarTop>

          </SidebarTop>
          <SidebarList>
          {
         Data.map((elm,ind)=>{
            return(
             <>
              <Sideunit_Bill key={ind} id={elm.id} name={elm.name} time={elm["time"]}  setSelect={setSelect} selected={elm.id==select?true:''}></Sideunit_Bill>
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
      ): 
      (
        <Typography gutterBottom variant="p"></Typography>
    ) }
      {select ? (
      <div style={{marginTop:"80px"}}>
{/* =====================      Rendering the drug list =============================================*/}

{drugDetail!=null?drugDetail.medicine.map((drug, no) => (           
  <Box key={no} sx={{mt:"10px"}}>
        {/*-----------------    Blue lable (prescript drug)  ----------------------------------------*/}
        <Card sx={{ backgroundColor: '#0099cc',display:'flex',flexDirection:'row', color: 'white', fontSize: '20px',width:"500px",marginLeft:"10px"}}>
                <Typography gutterBottom variant="p" sx={{ flex:'3',marginLeft: '10px', }}>{drug.name}</Typography>
                <Typography gutterBottom variant="p" sx={{flex:'2', marginLeft: '110px ',  }}>{drug.quantity} mg</Typography>
                <Typography gutterBottom variant="p" sx={{ flex:'1',marginLeft: '150px', }}>{drug.hour}</Typography>
        </Card>   
        
    {/*Drop down list for drug weights ---------------------------------------------------------------*/}
    <Box key={no} sx={{marginTop:"10px"}}>
    <FormControl sx={{ m: 0, minWidth: 120 ,marginLeft: '200px',}} size="large" marginTop="20px">
      <InputLabel id="demo-select-small-label">weight</InputLabel>
      <Select
        sx={{ borderColor:"0099cc", }}
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
        sx={{'& > :not(style)': { m: 0, width: '10ch' ,marginLeft: '100px '},}} 
        label="Amount" 
        value={drugBill[no].Amount}
        variant="outlined"   
        onChange={(e)=>handleAmount(no,e.target.value)}
      />
      
      <Typography gutterBottom  sx={{ marginLeft: '45px ',display:'inline',color:'grey',textAlign:'right'}}>{drugBill[no].price}</Typography>
      <Typography gutterBottom  sx={{ marginLeft: '90px ', display:'inline',fontWeight:'bold',verticalAlign:'right'}}>{parseInt(drugBill[no].price)*parseInt(drugBill[no].Amount)}</Typography>
      
    </Box> 
  </Box>)):''}
</div>
       ) : (
        <Typography gutterBottom variant="p"></Typography>
      )}
      {select && (         // used for not visible this in page untill click
          <div>
            <div style={{ textAlign: 'right' }}>
            <Divider style={dividerStyle} />
            <Typography sx={{marginRight:'237px',}}><b>195.00</b></Typography>
          </div>
      
      
       <Card sx={{marginTop:'2px',marginLeft:'6px',}}>
       <Grid container spacing={2}>
       <Grid item xs={8}>
        <Typography>Service charge
        <IconButton aria-label="edit" color='secondary'
        sx={{color:'#CFDB1A'}}onClick={handleOpen}>
      <EditIcon />
    </IconButton >
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography sx={{ marginLeft: '23px ', }}><b>300.00</b></Typography>
      </Grid>
       
    </Grid>
       </Card>
       <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Service Charge</DialogTitle>
        <DialogContent>
          
          <TextField label="Service Charge" variant="outlined" />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
       <div style={{ textAlign: 'right' }}>
      <Typography sx={{marginRight:'237px',}}><b>495.00</b></Typography>
    </div>
    
    <div style={{ textAlign: 'right', marginTop: '20px', marginBottom: '20px' }}>
    <PrintIcon sx={{ width: '60px', height: '50px', marginRight: '30px' }} />
    <Button variant="contained" sx={{ backgroundColor: '#00cca3',marginRight: '220px' }}onClick={handleConfirmDialogOpen}>
      Confirm
    </Button>
  </div>
  <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to confirm?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmAction} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar */}
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


