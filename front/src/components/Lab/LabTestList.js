import { Paper, Toolbar, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'

export default function LabTestList() {

    const [test,setTest]=useState([
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
        <Toolbar ></Toolbar>
        <Stack>
            {
                test.map((el)=>{
                    return(
                    <Paper sx={{display:'flex',width:'80%',justifyContent:'space-between',cursor:'pointer',padding:2}}>
                        <Typography sx={{fontSize:'16px',flex:1}}>{el.name}</Typography>
                        <Typography sx={{fontSize:'16px',flex:1}}>{el.provider}</Typography>
                        <Typography sx={{fontSize:'16px',flex:1}}>{el.price}</Typography>
                    </Paper>
                    )
                })
            }
        </Stack>
    </div>
  )
}
