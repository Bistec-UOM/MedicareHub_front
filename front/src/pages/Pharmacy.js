import React, { useEffect } from 'react'
import {SidebarContainer,SidebarTop,SidebarList} from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'
import { Grid,Card, Typography, CardContent } from '@mui/material'
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


export default function Pharmacy() {
  
  const data =[{name:"Dhammika Mahendra Wijesingha",age:"36",gender:"male"},
];
const [selectedQuantities, setSelectedQuantities] = React.useState('');
const [quantity, setQuantity] = React.useState('');


const handleChange = (event,no) => {
  const newQuantities = [...selectedQuantities];
    newQuantities[no] = event.target.value;
    setSelectedQuantities(newQuantities);
};

const medicine =[{name:"Acetaminophe",quantity:"10",hour:"BID",value:"10",unit_price:"15.00",fullprice:"150.00"},
             {name:"Sumatripan",quantity:"20",hour:"BID",value:"10",unit_price:"04.50",fullprice:"45.00"},
             {name:"Rizatripan",quantity:"0.5",hour:"4H",value:"",unit_price:"",fullprice:""},
];

const result = 10 * 15
  useEffect(()=>{
    document.body.style.margin = '0';

   },[]) 
  
  return (
    <div>
    <Navbar></Navbar>

    <Grid container spacing={0} sx={{paddingTop:'64px',height:'100vh'}}>
      <Grid item xs={3} style={{height:'100%'}}>
        <SidebarContainer>
          <SidebarTop>

          </SidebarTop>
          <SidebarList>
            
          </SidebarList>
        </SidebarContainer>
      </Grid>

      <Grid item xs={9} style={{height:'100%',overflowY:'scroll'}}>
        <div>
          {data.map((patientdata, id) => (
      <Card  key={id} sx={{ minWidth: 275 }}>
        <CardContent>
         <div> <Typography gutterBottom variant='h6'>{patientdata.name}</Typography></div>
          <div><Typography gutterBottom variant='20px' sx={{color:"#8E8B8B"}}>{patientdata.age} years</Typography></div>
          <div><Typography gutterBottom variant='20px'sx={{color:"#8E8B8B"}}>{patientdata.gender}</Typography></div>
        </CardContent>
      </Card>
          ))}
      </div>
      
      <div>
      {medicine.map((drug, no) => (
        <Grid key={no} container spacing={1} sx={{marginTop:"10px",}}>
        <Grid item xs={12}>
        <Card sx={{ backgroundColor: '#0099cc', color: 'white', fontSize: '20px',width:"500px",marginLeft:"10px"}}>
                <Typography gutterBottom variant="p" sx={{ marginLeft: '10px', }}>{drug.name}</Typography>
                <Typography gutterBottom variant="p" sx={{ marginLeft: '110px ',  }}>{drug.quantity} mg</Typography>
                <Typography gutterBottom variant="p" sx={{ marginLeft: '150px', }}>{drug.hour}</Typography>
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
      <Divider />
      <Card></Card>
       <Card>
       <Grid container spacing={2}>
       <Grid item xs={8}>
        <Typography>Service charge
        <IconButton aria-label="edit" color='secondary'
        sx={{color:'#CFDB1A'}}>
      <EditIcon />
    </IconButton>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography sx={{ marginLeft: '23px ', }}><b>300.00</b></Typography>
      </Grid>
       
    </Grid>
       </Card>

      </Grid>


    </Grid>

  </div>
  )
}


