import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import {Paper,InputBase,Divider} from "@mui/material";

const SearchBar = (props) => {
  console.log(props);

  const handleSearch = (e) => {
    props.setSearch(e.target.value);
  };


return (
  <Paper component="form"
      sx={{
          p:2.3,display: "flex",
          alignItems: "center",
          height:props.height?props.height:'20px',
          width: "210px",
          borderRadius: "8px",
          boxShadow: 1
          }}
  >
  <InputBase id={props.id} disabled={props.isDisabled} type="text" className="form-control" sx={{ flex: 1 }} placeholder={props.placename} value={props.search}  onChange={handleSearch}/>
  <Divider sx={{ height: 20,position:'relative',left:'10px'}} orientation="vertical" />
  <IconButton type="button"  aria-label="search">
    <SearchIcon sx={{position:'relative',left:'10px'}}/>
  </IconButton>
  </Paper>
)
}

export default SearchBar;
