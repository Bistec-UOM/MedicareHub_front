import { Divider, IconButton, InputBase, Paper,Box,Typography, Button, Dialog } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from '@mui/material/CircularProgress';
import PersonIcon from '@mui/icons-material/Person';
import DoneIcon from '@mui/icons-material/Done'
import WarningIcon from '@mui/icons-material/Warning';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close'

{/*================Search bar components ================================================= */}

const SearchBarSM=({onChange,value,placeholder})=> {

    return (
        <Paper component="form"
            sx={{
                p:2.3,display: "flex",
                alignItems: "center",
                height:'20px',
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
            borderBottom:'1px solid grey',
            backgroundColor:'white'
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
    

    const ConfirmPropmt=({action,message,handleClose,loadingB,open})=>{
      return(
        <Dialog open={open} onClose={handleClose}>
        <div style={{display:'flex',alignItems:'start',margin:'8px',paddingBottom:'5px',borderBottom:'1px solid lightgrey'}}>
          <WarningIcon color='warning' sx={{mr:'10px'}}></WarningIcon>
          <Typography>{message}</Typography>
        </div>
        <div style={{width:'100%',height:'60px',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Button variant='outlined' sx={{mr:'40px'}} size='small' endIcon={<CloseIcon></CloseIcon>} onClick={handleClose} >No</Button>
          <LoadingButton 
            variant='contained' 
            size='small' 
            endIcon={<DoneIcon></DoneIcon>}           
            loading={loadingB}
            loadingPosition="end"
            onClick={action}
          >Yes</LoadingButton>
        </div>
      </Dialog>
      )
    }

//extra functions and states
/* const [loadingBConfirm, setLoadingBConfirm] = useState(false)//Loading button
   const [openConfirm, setOpenConfirm] = useState(false)
   const handleClickOpenConfirm = (x) => {
        setOpenConfirm(true)
  }
  const handleCloseConfirm = () => {setOpenConfirm(false)}  
 */
export {SearchBarSM,SearchBarLR,Load,PersonDetail,ConfirmPropmt} 