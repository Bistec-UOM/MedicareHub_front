import { Divider, IconButton, InputBase, Paper,Box,Typography } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from '@mui/material/CircularProgress';
import PersonIcon from '@mui/icons-material/Person';


{/*================Search bar components ================================================= */}

const SearchBarSM=({onChange,value,placeholder})=> {

    return (
        <Paper component="form"
            sx={{
                p:2.3,display: "flex",
                alignItems: "center",
                height:'40px',
                width: "210px",
                borderRadius: "8px",
                boxShadow: 1
                }}
        >
       
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
        <Paper 
            component="form"
            sx={{
                p:2.3,
                display: "flex",
                alignItems: "center",
                height:'40px',
                width: "450px",
                borderRadius: "8px",
                boxShadow: 1
                }}
        >
       
        <InputBase type="text" className="form-control" sx={{ flex: 1 }} value={value}  onChange={onChange} placeholder={placeholder}/>
        <Divider sx={{ height: 20,position:'relative',left:'10px'}} orientation="vertical" />
        <IconButton type="button"  aria-label="search">
          <SearchIcon sx={{position:'relative',left:'10px'}}/>
        </IconButton>
        </Paper>  
    )
  }

  {/* =============================== Extra Components ======================================== */}

  const Load=()=> {
    return (
      <div style={{display:'flex',justifyContent:'center',width:'100%'}}>
      <CircularProgress></CircularProgress>
      </div>
    )
  }

  const PersonDetail=({name,gender,age})=>{
    return(
          <Box 
          sx={{
            width:'100%',
            pl:'40px',
            pt:'10px',
            pb:'5px',
            position:'fixed',
            zIndex:'10',
            display:'flex',
            alignItems:'baseline',
            borderBottom:'1px solid grey'
          }} square
        >
            <PersonIcon sx={{alignSelf:'end',pb:'2px'}}></PersonIcon>
            <Typography sx={{fontSize:'18px',ml:'5px'}}>{name}</Typography>
            <Typography sx={{fontSize:'20px',mr:'5px',ml:'5px'}}>|</Typography>
            <Typography sx={{fontSize:'15px',mr:'8px',color:'grey'}}>{gender}</Typography>
            <Typography sx={{color:'grey'}}>{age}</Typography>
        </Box>
    )
    }
    
export {SearchBarSM,SearchBarLR,Load,PersonDetail} 