import { Paper, Toolbar, Typography,InputBase,Divider,IconButton, Button } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from "@mui/icons-material/Search";

export default function LabTestList({setPage}) {

    const [test,setTest]=useState([
        {name:'Full blood test',provider:'Hemas',price:500.00},
        {name:'Half blood test',provider:'Hemas',price:500.00},
        {name:'Thyroxin test',provider:'Durdance',price:2400.00},
        {name:'Glucose test',provider:'Hemas',price:750.00},
        {name:'Urine test',provider:'Hemas',price:1200.00},
        {name:'Lipid profile',provider:'Asiri',price:1500.00},
        {name:'hCG test',provider:'Durdance',price:500.00},
        {name:'Basic metabolic test',provider:'Asiri',price:1700.00},
        {name:'Full blood test',provider:'Hemas',price:500.00},
        {name:'Half blood test',provider:'Hemas',price:500.00},
        {name:'Thyroxin test',provider:'Durdance',price:2400.00},
        {name:'Glucose test',provider:'Hemas',price:750.00},
        {name:'Urine test',provider:'Hemas',price:1200.00},
        {name:'Lipid profile',provider:'Asiri',price:1500.00},
        {name:'hCG test',provider:'Durdance',price:500.00},
        {name:'Basic metabolic test',provider:'Asiri',price:1700.00}
    ])
  return (
    <div>
        <Toolbar sx={{width:{xs:'100%',sm:'70%'},justifyContent:'space-between',position:'fixed',backgroundColor:'yellow',pt:{xs:'10px'}}}>
            <ArrowBackIcon sx={{cursor:'pointer'}} onClick={()=>setPage(1)}></ArrowBackIcon>

            {/*-------Search bar--------------- */}
            <Paper component="form" sx={{p: "2px 4px",display: "flex",alignItems: "center",height:'30px',width:{xs:'40%',sm:'40%'},borderRadius: "20px",boxShadow: 1}}>
            <InputBase type="text" className="form-control" sx={{ flex: 1 }} placeholder="Search"/>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            </Paper>  

            {/*-------Add new button--------------- */}
            <Button size='small' variant='contained' onClick={()=>setPage(3)} sx={{mr:{xs:'5px',sm:'10%'}}} >Add new</Button>
            
        </Toolbar>

        <Stack sx={{paddingTop:{xs:'60px',sm:'80px'},paddingLeft:{xs:'5%',sm:'8%'}}}>
            {
                test.map((el)=>{
                    return(
                    <Paper sx={{display:'flex',width:{xs:'95%',sm:'80%'},justifyContent:'space-between',cursor:'pointer',padding:{xs:1,sm:2},borderRadius:'12px',mb:'10px'}}>
                        <Typography sx={{fontSize:'16px',flex:{xs:3,sm:1}}}>{el.name}</Typography>
                        <Typography sx={{fontSize:'16px',flex:{xs:2,sm:1}}}>{el.provider}</Typography>
                        <Typography sx={{fontSize:'16px',flex:{xs:1,sm:1}, textAlign:'right'}}>{el.price}</Typography>
                    </Paper>
                    )
                })
            }
        </Stack>
    </div>
  )
}
