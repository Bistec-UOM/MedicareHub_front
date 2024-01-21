import React from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({isDisabled}) => {

    const handleSearch=()=>
    {
        
    }
    
  return (
    <TextField  sx={{marginLeft:'10%'}}
      variant="outlined"
      size="small"
      placeholder="Patient Name or Id..."
      InputProps={{
        startAdornment: (
          <SearchIcon onClick={handleSearch}
            sx={{
              color: 'action.active',
              marginLeft: 1,
            }}
          />
        ),
        sx: {
          borderRadius: '25px', // Adjust the value to change the roundness of the corners
        },
      }}
      disabled={isDisabled}
      
    />
  );
};

export default SearchBar;
