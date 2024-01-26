import React from "react";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Divider from "@mui/material/Divider";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { Tab } from "react-bootstrap";
import {Box} from "@mui/material";

function Sideunit_Doctor({ name, title ,selectedTab,index}) {

  const [isSelected,setIsselected]=useState(false)


  const handleClick = () => {
    setIsselected(true)

  };

 // console.log()

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
      <Typography sx={{ color: selectedTab==index?"white":"black",width:"100%",display:'flex',justifyContent:'left' }}  variant="h6">
        Dr. {name}
      </Typography>
      <Typography style={{color: selectedTab==index?"white":"black",width:"100%",display:'flex',justifyContent:'left'}} variant="body2">{title} </Typography>
      <Divider variant="middle" sx={{ width: '100%' }} />
    </Box>
  );
}

function Sideunit_Patient({ name, status, time }) {
  return (
    <div style={{ width: "90%", backgroundColor: "beige" }}>
      <Typography variant="h6">{name}</Typography>
      <div>
        <Chip>{time}</Chip>
        {status == "done" || status == "pending" ? (
          <CheckIcon
            color={status == "done" ? "success" : "warning"}
          ></CheckIcon>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

function Sideunit_Test({ id, name, test, setSelect }) {
  return (
    <div
      style={{ width: "90%", backgroundColor: "beige", marginTop: "5px" }}
      onClick={() => setSelect(id)}
    >
      <Typography sx={{ fontSize: "16px" }}>{name}</Typography>
      {test.map((el) => {
        return (
          <div
            key={el}
            style={{
              display: "inline",
              border: "1px solid black",
              paddingLeft: "4px",
              paddingLeft: "4px",
              borderRadius: "15px",
              marginLeft: "4px",
            }}
          >
            {el}
          </div>
        );
      })}
    </div>
  );
}

export { Sideunit_Doctor, Sideunit_Patient, Sideunit_Test };
