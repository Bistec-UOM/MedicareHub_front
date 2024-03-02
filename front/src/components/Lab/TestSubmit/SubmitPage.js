import { Button, Paper, Typography,Box, InputBase, IconButton, Divider, Toolbar,Stack} from '@mui/material'
import React, { useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from "@mui/icons-material/Search";

export default function SubmitPage({load,setpage}) {
/* 
  const [ld,setLd]=useEffect([])
  useEffect(()=>{
    if(loadIn){
      setLd(loadIn)
    }
  },loadIn) */

  return (
    <div>

          <Toolbar sx={{width:{xs:'100%',sm:'70%'},justifyContent:'space-between',position:'fixed',backgroundColor:'white',pt:{xs:'10px'}}}>
            <ArrowBackIcon sx={{cursor:'pointer'}} onClick={()=>setpage(1)}></ArrowBackIcon>

            {/*-------Search bar------------------------------------ */}
            <Paper component="form" sx={{p: "2px 4px",display: "flex",alignItems: "center",height:'30px',width:{xs:'40%',sm:'40%'},borderRadius: "20px",boxShadow: 1}}>
            <InputBase type="text" className="form-control" sx={{ flex: 1 }} placeholder="Search"/>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            </Paper>  

        </Toolbar>

        <Stack sx={{paddingTop:{xs:'60px',sm:'80px'},paddingLeft:{xs:'5%',sm:'8%'}}}>
        {
            load.map((i,ind)=>{
                return <Paper sx={{width:'70%',display:'flex',justifyContent:'space-between',alignItems:'center',mt:'10px',p:'10px',cursor:'pointer'}}>
                    <Typography sx={{fontSize:'18px',flex:'1'}}>{i.id}</Typography>
                    <Typography sx={{fontSize:'18px',flex:'1'}}>{i.date}</Typography>
                    <Typography sx={{fontSize:'15px',flex:'2'}}>{i.name}</Typography>
                    <Typography sx={{fontSize:'15px',flex:'2'}}>{i.test}</Typography>
            </Paper>
            })
        }
        </Stack>

    </div>
  )
}
