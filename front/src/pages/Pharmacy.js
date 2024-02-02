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




export default function Pharmacy() {
  
  const data =[{name:"Dhammika Mahendra Wijesingha",age:"36",gender:"male"},
];
const [quantity, setQuantity] = React.useState('');

const handleChange = (event) => {
  setQuantity(event.target.value);
};
const medicine =[{name:"Acetaminophe",quantity:"10",hour:"BID"},
             {name:"Sumatripan",quantity:"20",hour:"BID"},
             {name:"Rizatripan",quantity:"0.5",hour:"4H"},
];

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
        <Grid key={no} container spacing={1} sx={{marginTop:"10px"}}>
        <Grid item xs={8}>
        <Card sx={{ backgroundColor: '#0099cc', color: 'white', fontSize: '18px',width:"500px"}}>
                <Typography gutterBottom variant="p" sx={{ marginLeft: '10px', }}>{drug.name}</Typography>
                <Typography gutterBottom variant="p" sx={{ marginLeft: '110px ',  }}>{drug.quantity} mg</Typography>
                <Typography gutterBottom variant="p" sx={{ marginLeft: '150px', }}>{drug.hour}</Typography>
                </Card>       
        </Grid>
        </Grid> 
      ))}
      <Card sx={{ minWidth: 275 }}>
        
      <Grid container spacing={1} sx={{marginTop:"10px"}}>
      <Grid item xs={12}>
        
          <FormControl sx={{ m: 1, minWidth: 120 ,marginLeft: '190px',}} size="large" marginTop="20px">
      <InputLabel id="demo-select-small-label">Quantity</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={quantity}
        label="Quantity"
        onChange={handleChange}
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
        '& > :not(style)': { m: 1, width: '20ch' },
      }} id="outlined-basic" label="Enter" variant="outlined" defaultValue={10}  />
      
      <Typography gutterBottom variant="p" sx={{ marginLeft: '11px ', }}>15.00</Typography>
      <Typography gutterBottom variant="p" sx={{ marginLeft: '30px ', }}><b>15.00*10</b></Typography>
      
    </Grid>
    </Grid>
    </Card>
      </div>


      </Grid>


    </Grid>

  </div>
  )
}


