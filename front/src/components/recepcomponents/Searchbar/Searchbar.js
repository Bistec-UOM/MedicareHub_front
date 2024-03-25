import React from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import {Box} from '@mui/material';

const SearchBar = (props) => {
  console.log(props)

    const handleSearch=(e)=>
    {
      props.setSearch(e.target.value);
      
        
    }
    
  return (
    <Box sx={{borderRadius:'25px',marginLeft:{xs:'3%',sm:'0%'}}}>
       <TextField  sx={{marginLeft:{md:props.mgl},width:{xs:'80%'}, backgroundColor:'#ffff',borderRadius:'25px',boxShadow:3}}
      value={props.search}
      variant="outlined"
      size="small"
      placeholder={props.placename}
      InputProps={{
        startAdornment: (
          <IconButton > <SearchIcon 
          sx={{
            color: 'action.active',
           
          }}
        /></IconButton>
         
        ),
        sx: {
          borderRadius: '25px', // Adjust the value to change the roundness of the corners
        },
      }}
      disabled={props.isDisabled}
      onChange={handleSearch}
      
      
    />

    </Box>
   
  );
};

export default SearchBar;
