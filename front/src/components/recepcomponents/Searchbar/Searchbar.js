import React from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = (props) => {
  console.log(props)

    const handleSearch=(e)=>
    {
      props.setSearch(e.target.value);
      
        
    }
    
  return (
    <TextField  sx={{marginLeft:props.mgl, backgroundColor:'#ffff'}}
      value={props.search}
      variant="outlined"
      size="small"
      placeholder={props.placename}
      InputProps={{
        startAdornment: (
          <SearchIcon onClick={handleSearch}
            sx={{
              color: 'action.active',
              marginLeft: 1,
              marginRight:1
            }}
          />
        ),
        sx: {
          borderRadius: '25px', // Adjust the value to change the roundness of the corners
        },
      }}
      disabled={props.isDisabled}
      onChange={handleSearch}
      
      
    />
  );
};

export default SearchBar;
