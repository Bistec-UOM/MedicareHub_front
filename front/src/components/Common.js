import { Divider, IconButton, InputBase, Paper } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";

const SearchBarSM=({onChange,value,placeholder})=> {

    return (
        <Paper component="form"
        sx={{p:2.3,display: "flex",alignItems: "center",height:'40px',width: "210px",borderRadius: "8px",
          boxShadow: 1}}>
       
        <InputBase type="text" className="form-control" sx={{ flex: 1 }} placeholder={placeholder} value={value}  onChange={onChange}/>
        <Divider sx={{ height: 20,position:'relative',left:'10px'}} orientation="vertical" />
        <IconButton type="button"  aria-label="search">
          <SearchIcon sx={{position:'relative',left:'10px'}}/>
        </IconButton>
        </Paper>  
    )
  }

  const SearchBarLR=({onChange,value,placeholder})=> {
    return (
        <Paper component="form"
        sx={{p:2.3,display: "flex",alignItems: "center",height:'40px',width: "450px",borderRadius: "8px",
          boxShadow: 1}}>
       
        <InputBase type="text" className="form-control" sx={{ flex: 1 }} value={value}  onChange={onChange} placeholder={placeholder}/>
        <Divider sx={{ height: 20,position:'relative',left:'10px'}} orientation="vertical" />
        <IconButton type="button"  aria-label="search">
          <SearchIcon sx={{position:'relative',left:'10px'}}/>
        </IconButton>
        </Paper>  
    )
  }


export {SearchBarSM,SearchBarLR} 