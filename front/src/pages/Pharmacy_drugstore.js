import React, { useEffect } from 'react'
import {SidebarContainer,SidebarTop,SidebarList} from '../components/sidebar/Sidebar'
import { CustomScroll } from '../components/CustomScroll';
import Navbar from '../components/navbar/Navbar'
import { Grid,Card,Paper,Button,InputBase, Typography, List } from '@mui/material'
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Filter from "@mui/icons-material/Filter";
import TuneIcon from '@mui/icons-material/Tune';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import { Sideunit_Patient } from '../components/sidebar/Sideunits';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


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
  createData(1,'Paracetamole',"Panadol",["10 mg"],120,20.00),
  createData(2,'Veniloflaxin',"Veniz",["37.5 mg","75 mg","150 mg"],[34,12,90],[35.00,45.00,60.00]),
  createData(3,'Flucanzole',"Diflucan",["10 mg"],15,12.00),
  createData(4,'Paracetamole',"Panadol",["10 mg"],120,20.00),

  
];
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Pharmacy_drugstore() {
  useEffect(()=>{
    document.body.style.margin = '0';

   },[]) 
  return (
    <CustomScroll>
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
          <InputBase type="text" className="form-control" onChange={Filter} sx={{ ml: 3, flex: 1 }} placeholder="Search " />
         
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
        >
          Add
        </Button>
        </Grid>
       
        {rows.map((row) => (
    <div><Card 
    sx={{ minWidth:"30px",marginTop:"20px",marginLeft:"20px",marginRight:"20px"}}
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
      </Grid>


    </Grid>

  </CustomScroll>
  )
}
