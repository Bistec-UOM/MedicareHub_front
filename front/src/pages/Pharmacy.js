import React, { useEffect, useState } from 'react'
import {SidebarContainer,SidebarTop,SidebarList} from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'
import { Grid,Card, Typography,Dialog, DialogTitle, DialogContent, DialogActions,Button, CardContent } from '@mui/material'
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


export default function Pharmacy() {
 
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dividerStyle = {
    backgroundColor: '#0099cc',
    height: '2px',
    width:'230px', // Adjust height as needed
    marginLeft: '550px', // Remove default margin
  };

  
//   const data =[{name:"Dhammika Mahendra Wijesingha",age:"36",gender:"male"},
// ];
const [selectedQuantities, setSelectedQuantities] = React.useState('');
const [quantity, setQuantity] = React.useState('');


const handleChange = (event,no) => {
  const newQuantities = [...selectedQuantities];
    newQuantities[no] = event.target.value;
    setSelectedQuantities(newQuantities);
};

// const medicine =[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
//              {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
//              {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
// ];

const result = 10 * 15
  useEffect(()=>{
    document.body.style.margin = '0';
   },[]) 

   const [select,setSelect]=useState(null)

   //   data for when click storing
   const data=[
    {
       id:51,  // -----------------------------------> prescription Id-------  
       patientdata:{
           name:"Dhammika Mahendra",
           age:30,
           gender:"male"
         },
         name:"Dhammika Mahendra",
         time: "08:10",
         medicine :[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
             {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
             {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
]

         
     },
     {
       id:52,    
       patientdata:{
           name:"Nethmi Eranga",
           age:18,
           gender:"female"
         },
         name:"Nethmi Eranga",
         time: "09:15",
         medicine :[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
         
]    
     },
     {
       id:53,    
       patientdata:{
           name:"Chathumini Pamodya",
           age:8,
           gender:"female",
         },
         name:"Chathumini Pamodya",
         time: "10:10",
         medicine :[{name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
         {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
]       
     },
     {
       id:54,    
       patientdata:{
           name:"Yasiru Ramosh",
           age:22,
           gender:"male"
         },
         name:"Yasiru Ramosh",
         time: "10:25",
         medicine :[{name:"Sumatripan",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
         {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
]        
     },
     {
       id:55,    
       patientdata:{
           name:"Chathura Ishara",
           age:38,
           gender:"male"
         },
         name:"Chathura Ishara",
         time: "11:15",
         medicine :[{name:"Paracitamol",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
         {name:"Zithraceene",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
         {name:"Zithraceene",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
         {name:"Zithraceene",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
         
]
     },
     {
      id:75,    
      patientdata:{
          name:"Hasini Chamodi",
          age:48,
          gender:"female"
        },
        name:"Hasini Chamodi",
        time: "13:15",
        medicine :[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
        {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
        
]
    },
    {
      id:76,    
      patientdata:{
          name:"Nelunika Nuwanthi",
          age:18,
          gender:"female"
        },
        name:"Nelunika Nuwanthi",
        time: "13:35",
        medicine :[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
        {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
        {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
]
    },
    {
      id:79,    
      patientdata:{
          name:"Methnula Thisum",
          age:18,
          gender:"male"
        },
        name:"Methnula Thisum",
        time: "14:15",
        medicine :[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
        {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
        {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
]
    },
    {
      id:81,    
      patientdata:{
          name:"Eranga Kumari",
          age:48,
          gender:"female"
        },
        name:"Eranga Kumari",
        time: "14:45", 
        medicine :[ {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
        {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
] 
    },
    {
      id:88,    
      patientdata:{
          name:"Kasun Kasun",
          age:48,
          gender:"male"
        },
        name:"Kasun Kasun",
        time: "15:15",
        medicine :[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
        {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
        {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
]
        
    },
    {
      id:90,    
      patientdata:{
          name:"Saman Perera",
          age:48,
          gender:"male"
        },
        name:"Saman Perera",
        time: "15:19",
        medicine :[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
        {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
        
]
        
    },
   
    {
      id:99,    
      patientdata:{
          name:"Pabodya Baumika",
          age:48,
          gender:"female"
        },
        name:"Pabodya Baumika",
        time: "13:15",
        medicine :[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
        {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
        {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
]

        
    },
    {
      id:101,    
      patientdata:{
          name:"Akasha",
          age:48,
          gender:"female"
        },
        name:"Akasha",
        time: "13:15",
        medicine :[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
        {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
        {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
]

    },
     
   ] 
   
   const [x,setX]=useState(data)
   const selectedPrescription = select ? x.filter(prescription => prescription.id === select) : [];//------------filter  the selected patient----------
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
      {select ? (
      <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
          {selectedPrescription.map((patientdata, id) => (       // name card dispaly in patient detail
      <Card  key={id} sx={{ minWidth: 275 }}>
        <CardContent>
         <div> <Typography gutterBottom variant='h6'>{selectedPrescription[0].patientdata.name}</Typography></div>
          <div><Typography gutterBottom variant='20px' sx={{color:"#8E8B8B"}}>{selectedPrescription[0].patientdata.age} years</Typography></div>
          <div><Typography gutterBottom variant='20px'sx={{color:"#8E8B8B"}}>{selectedPrescription[0].patientdata.gender}</Typography></div>
        </CardContent>
      </Card>
          ))}
      </div>
      ): 
      (
        <Typography gutterBottom variant="p"></Typography>
    ) }
      {select ? (
      <div>
        {selectedPrescription.map((prescription, index) => ( //   drug detail rendering
          <div key={index}>
      {prescription.medicine.map((drug, no) => (           
        <Grid key={no} container spacing={1} sx={{marginTop:"10px",}}>
        <Grid item xs={12}>
        <Card sx={{ backgroundColor: '#0099cc',display:'flex',flexDirection:'row', color: 'white', fontSize: '20px',width:"500px",marginLeft:"10px"}}>
                <Typography gutterBottom variant="p" sx={{ flex:'3',marginLeft: '10px', }}>{drug.name}</Typography>
                <Typography gutterBottom variant="p" sx={{flex:'2', marginLeft: '110px ',  }}>{drug.quantity} mg</Typography>
                <Typography gutterBottom variant="p" sx={{ flex:'1',marginLeft: '150px', }}>{drug.hour}</Typography>
                </Card>   
                <Grid key={no} container spacing={1} sx={{marginTop:"10px"}}>
      <Grid item xs={12}>
        
          <FormControl sx={{ m: 0, minWidth: 120 ,marginLeft: '200px',}} size="large" marginTop="20px">
      <InputLabel id="demo-select-small-label">Quantity</InputLabel>
      <Select
       sx={{ borderColor:"0099cc", }}
        labelId="`quantity-label-${no}`"
        id="demo-select-small"
        value={selectedQuantities[no]}
        label="Quantity"
        onChange={(event) => handleChange(event, no)}
       
      >      
        <MenuItem value="">       
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>10 mg</MenuItem>
        <MenuItem value={20}>20 mg</MenuItem>      
        <MenuItem value={30}>30 mg</MenuItem>
      </Select>
    </FormControl>
    
      <TextField  sx={{
        '& > :not(style)': { m: 0, width: '10ch' ,marginLeft: '100px '},
      }} id="outlined-basic" label="Enter" variant="outlined" defaultValue={drug.value}  />
      
      <Typography gutterBottom variant="p" sx={{ marginLeft: '45px '}}>{drug.unit_price}</Typography>
      <Typography gutterBottom variant="p" sx={{ marginLeft: '90px ', }}><b>{drug.fullprice}</b></Typography>
      
    </Grid>
    </Grid> 
        
        </Grid>
        </Grid> 
      ))}
      </div>
      ))}
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
    <Button variant="contained" sx={{ backgroundColor: '#00cca3',marginRight: '220px' }}>
      Confirm
    </Button>
  </div>
</div>
)}
      </Grid>
    </Grid>

  </div>
  )
}


