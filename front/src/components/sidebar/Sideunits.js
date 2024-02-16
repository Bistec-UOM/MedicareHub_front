import React, {useState } from 'react'
import Typography from '@mui/material/Typography'
import { Chip , Box} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Divider from '@mui/material/Divider';

function Sideunit_Doctor({ name, title ,selectedTab,index}) {

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
       // disabled:true,
        //alignItems: "center", 
        padding: "8px", 
        justifyContent:'flex-start',
        //backgroundColor: isSelected ? "green" : "transparent",
      }}
    >
      <Typography sx={{ color: selectedTab==index?"white":"black",width:"100%",display:'flex',justifyContent:'left',fontSize:{xs:15,sm:20} }}  variant="h6">
        Dr. {name}
      </Typography>
      <Typography style={{color: selectedTab==index?"white":"gray",width:"100%",display:'flex',justifyContent:'left',fontSize:{xs:6,sm:12}}} variant="body2">{title} </Typography>
      <Divider variant="middle" sx={{ width: '100%' }} />
    </Box>
  );
}


function Sideunit_Patient({id,name,status,time,selected,setSelect}) {
    return (
      <div style={{width:'90%',margin:'3px',cursor:'pointer',backgroundColor: selected==true?'#79CCBE':'#ffffff',padding:'5px',paddingTop:'0',color: selected==true?'#FFFFFF':'',borderRadius:'8px',boxShadow:'0 0 4px rgba(0, 0, 0, .2)'}} onClick={()=>setSelect(id)}>
          <Typography sx={{fontSize:'17px'}}>{name}</Typography>
          <div style={{display:'flex',alignContent:'space-between'}}>
                  <div style={{display:'inline',border:selected==true?'1px solid white':'1px solid grey',paddingLeft:'4px',paddingRight:'4px',borderRadius:'5px',marginLeft:'4px',color: selected==true?'white':'grey'}}>{time}</div>
                  {status=='done'?<CheckIcon color={'success'}></CheckIcon>:status=='pending'?<MoreHorizIcon color={'warning'}></MoreHorizIcon>:''}
          </div>
      </div>
    )
}

function Sideunit_Test({id,name,test,setSelectedT,selectedT}) {
    return (
      <div style={{width:'90%',margin:'3px',cursor:'pointer',backgroundColor: selectedT==id?'#79CCBE':'#ffffff',padding:'5px',paddingTop:'0',color: selectedT==id?'#FFFFFF':'',borderRadius:'8px',boxShadow:'0 0 4px rgba(0, 0, 0, .2)'}} onClick={()=>setSelectedT(id)}>
          <Typography sx={{fontSize:'17px'}}>{name}</Typography>
          {
            test.map((el)=>{
              return(
              <div key={el} style={{display:'inline',backgroundColor: selectedT==id?'#60a398':'#adaaaa',color:'white',paddingRight:'4px',paddingLeft:'4px',paddingTop:'2px',paddingBottom:'2px',borderRadius:'15px',marginRight:'4px'}}>{el}</div>
              )
            })
          }
      </div>
    )
}

function Sideunit_Bill({id,name,time,setSelect,selected}) {
  return (
    <div style={{width:'90%',margin:'3px',padding:'5px',paddingTop:'0',cursor:'pointer',backgroundColor: selected==true?'#79CCBE':'#ffffff',borderRadius:'8px',color: selected==true?'#FFFFFF':'',boxShadow:'0 0 4px rgba(0, 0, 0, .2)'}} onClick={()=>setSelect(id)}>
        <Typography sx={{fontSize:'17px'}}>{name}</Typography>
        <div>
                <div style={{display:'inline',border:selected==true?'1px solid white':'1px solid grey',color:selected==true?'white':'grey',paddingLeft:'4px',paddingRight:'4px',borderRadius:'5px'}}>{time}</div>
        </div>
    </div>
  )
}
export {Sideunit_Doctor,Sideunit_Patient,Sideunit_Test,Sideunit_Bill}
