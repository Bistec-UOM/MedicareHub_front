import React, {useState } from 'react'
import Typography from '@mui/material/Typography'
import { Chip , Box, Paper} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import theme from '../Style';

function Sideunit_doctor({ name, title ,selectedTab,index}) {

  const [isSelected,setIsselected]=useState(false)


  const handleClick = () => {
    setIsselected(true)

  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        borderRadius:'25px',
        width: "90%", 
        height: "auto",
        borderRadius: "8px", 
        display: "flex", 
        flexDirection: "column", 
        marginTop:0,
        padding: "8px", 
        justifyContent:'flex-start',
      }}
    >
      <Typography 
        sx={{ 
          color: selectedTab==index?"white":"black",
          width:"100%",display:'flex',
          justifyContent:'left',
          fontSize:{xs:15,sm:20} 
          }}  
      variant="h6">
        Dr. {name}
      </Typography>
      <Typography 
        sx={{
          color: selectedTab==index?"white":"gray",
          width:"100%",display:'flex',
          justifyContent:'left',
          fontSize:{xs:6,sm:12}}} 
      variant="body2">{title} </Typography>
    </Box>
  );
}


function Sideunit_Doctor({name, title ,selectedTab,index,onClick}) {

  const [isSelected,setIsselected]=useState(false)

  const handleClick = () => {
    setIsselected(true)
    onClick(index)
  };

  return (
  <Paper 
    onClick={handleClick}
    sx={{
      width: '90%',
      margin: '5px',
      cursor: 'pointer',
      padding:'8px',
      borderRadius: '8px',
      backgroundColor: selectedTab==index? theme.palette.custom.greenH : '#ffffff',
      boxShadow: 2,
      "&:hover": {
          backgroundColor: selectedTab==index? theme.palette.custom.greenH : theme.palette.custom.sideBarUnitHover
        }
      }}
  >
    <Typography sx={{fontSize:'17px',color:selectedTab==index?'white':'black'}}>Dr.{name}</Typography>
    <Typography 
        sx={{
          color: selectedTab==index?"white":"gray",
          width:"100%",display:'flex',
          justifyContent:'left',
          fontSize:{xs:6,sm:12}}} 
      variant="body2">{title} </Typography>
    </Paper>

  )
}

function Sideunit_Patient({id,name,status,time,selected,setSelect}) {
  return (
  <Paper 
    sx={{
      width: '90%',
      margin: '5px',
      cursor: 'pointer',
      padding:'8px',
      borderRadius: '8px',
      backgroundColor: selected? theme.palette.custom.sideBarUnitSelected : '#ffffff',
      boxShadow: 2,
      "&:hover": {
          backgroundColor: selected? theme.palette.custom.greenH : theme.palette.custom.sideBarUnitHover
        }
      }}
    onClick={() => setSelect(id)}>
    <Typography sx={{fontSize:'17px',color:selected?'white':'black'}}>{name}</Typography>

      <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
        <div 
          style={{
            display:'inline',
            backgroundColor: '#ffffff',
            color:theme.palette.custom.greenH,
            paddingRight:'4px',
            paddingLeft:'4px',
            paddingTop:'2px',
            paddingBottom:'2px',
            borderRadius:'15px',
            marginRight:'4px',
            border: `1px solid ${theme.palette.custom.greenH}`
            }}
        >{time}</div>

        {status=='done'?<CheckIcon sx={{mr:'5px'}}color={'success'}></CheckIcon>:''}
      </div>

    </Paper>

  )
}

function Sideunit_Test({id,name,load,setSelectedT,selectedT}) {
    return (
    <Paper 
      sx={{
        width: '90%',
        margin: '5px',
        cursor: 'pointer',
        padding:'8px',
        borderRadius: '8px',
        backgroundColor: selectedT === id ? theme.palette.custom.sideBarUnitSelected : '#ffffff',
        "&:hover": {
                  backgroundColor: selectedT === id ? theme.palette.custom.greenH : theme.palette.custom.sideBarUnitHover
              }
        }}
      onClick={() => setSelectedT(id)}
    >
      
      <Typography sx={{fontSize:'17px',color:selectedT === id?'white':'black'}}>{name}</Typography>
          {
            load.map((el)=>{
              return(
              <div key={el} 
                style={{
                  display:'inline',
                  backgroundColor:'#ffffff',
                  color:theme.palette.custom.greenH,
                  paddingRight:'4px',
                  paddingLeft:'4px',
                  paddingTop:'2px',
                  paddingBottom:'2px',
                  borderRadius:'15px',
                  marginRight:'4px',
                  border: `1px solid ${theme.palette.custom.greenH}`
                }}>{el.test}</div>
              )
            })
          }
  </Paper>

    )
}


function Sideunit_Bill({id,name,time,setSelect,selected}) {
  return (
  <Paper 
    sx={{
      width: '90%',
      margin: '5px',
      cursor: 'pointer',
      padding:'8px',
      borderRadius: '8px',
      backgroundColor: selected? theme.palette.custom.sideBarUnitSelected : '#ffffff',
      "&:hover": {
          backgroundColor: selected?theme.palette.custom.greenH : theme.palette.custom.sideBarUnitHover
        }
      }}
    onClick={() => setSelect(id)}
  >
    <Typography sx={{fontSize:'17px',color:selected?'white':'black'}}>{name}</Typography>
    
    <div 
      style={{
        display:'inline',
        backgroundColor: '#ffffff',
        color:theme.palette.custom.greenH,
        paddingRight:'4px',
        paddingLeft:'4px',
        paddingTop:'2px',
        paddingBottom:'2px',
        borderRadius:'15px',
        marginRight:'4px',
        border: `1px solid ${theme.palette.custom.greenH}`
        }}
    >{time}</div>
</Paper>

  )
}

export {Sideunit_Doctor,Sideunit_Patient,Sideunit_Test,Sideunit_Bill}
