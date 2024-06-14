import { Divider, IconButton, InputBase, Paper,Box,Typography, Button, Dialog, DialogTitle } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from '@mui/material/CircularProgress';
import PersonIcon from '@mui/icons-material/Person';
import DoneIcon from '@mui/icons-material/Done'
import WarningIcon from '@mui/icons-material/Warning';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close'
import theme from "./Style";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NotificationsIcon from "@mui/icons-material/Notifications";


{/*================Search bar components ================================================= */}

const SearchBarSM=({onChange,value,placeholder,height})=> {

    return (
        <Paper component="form"
            sx={{
                p:2.3,display: "flex",
                alignItems: "center",
                height:height?height:'20px',
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

  const NotificationPrompt=({messageList,handleClose,open})=>{
    return(
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{backgroundColor:theme.palette.custom.greenH,display: "flex",justifyContent: "space-between",color:'white'}}>
      <div style={{display:'flex',justifyContent:'start'}}>
        <NotificationsIcon></NotificationsIcon>
        <Typography sx={{fontSize:'18px',fontWeight:'medium'}}>Notifications</Typography>
      </div>
      <CloseIcon sx={{cursor:'pointer'}} onClick={handleClose}/>
      </DialogTitle>
      {messageList.length===0?<Box sx={{height:'300px',width:'500px',pt:'10px',pb:'5px',display:'flex',flexDirection:'column',alignItems:'center',overflowY:'scroll'}}>
        <Typography sx={{fontSize:'16px',color:'grey',pl:'10px',pt:'10px'}}>No new notifications</Typography>
      </Box>: <Box sx={{height:'300px',width:'500px',pt:'10px',pb:'5px',display:'flex',flexDirection:'column',alignItems:'center',overflowY:'scroll'}}>
        {messageList.map((i)=>(
          <ListItem time={i.sendAt.slice(11,16)} date={i.sendAt.slice(0,10)} message={i.message}></ListItem>
        ))}
      </Box>}
      <Box sx={{backgroundColor:'white',height:'10px',width:'100%'}}></Box>
      </Dialog>
    )
  }

  //extra functions and states
/* const [openNotify, setOpenNotify] = useState(false)
   const handleClickOpenNotify = (x) => {
        setOpenNotify(true)
  }
  const handleCloseNotify = () => {setOpenNotify(false)}  
 */

  const ListItem=({date,time,message})=>{
    const [full,setFull]=useState(false)
   
    return(
      <Paper 
      sx={{
        width:'90%',
        display:'flex',
        flexDirection:'column',
        alignItems:'start',
        mt:'10px',
        pt:'5px',
        pl:'5px',
        pr:'5px',
        cursor:'pointer',
        borderRadius:'0px',
        overflow:full?'vivible':'hidden',
        height:full?'auto':'50px',
        position:'relative',
        minHeight:full?'auto':'50px',
        }} 
      >
        <div>
        {full?<KeyboardArrowUpIcon sx={{position:'absolute',top:'0',right:'5px'}} onClick={()=>setFull(false)}></KeyboardArrowUpIcon>:<KeyboardArrowDownIcon sx={{position:'absolute',top:'0',right:'5px'}} onClick={()=>setFull(true)} ></KeyboardArrowDownIcon>}        
      <div style={{display:'flex',justifyContent:'start',alignItems:'center',marginBottom:'4px'}}>
        <div style={{
              backgroundColor: '#adaaaa',
              color:'white',
              paddingRight:'4px',
              paddingLeft:'4px',
              paddingTop:'2px',
              paddingBottom:'2px',
              borderRadius:'15px',
              marginRight:'4px'
              }}>
          <Typography sx={{fontSize:'12px'}}>{date}</Typography>
        </div>
          <div 
            style={{
              backgroundColor: '#adaaaa',
              color:'white',
              paddingRight:'4px',
              paddingLeft:'4px',
              paddingTop:'2px',
              paddingBottom:'2px',
              borderRadius:'15px',
              marginRight:'4px'
              }}
          ><Typography sx={{fontSize:'12px'}}>{time}</Typography></div>
      </div>
      </div>
        <Typography sx={{fontSize:'14px',flex:'3',borderTop:'1px solid lightGrey',p:'3px'}}>{message}</Typography>
      </Paper>
      )
  }

  {/* ------------------- Profile display ------------------------------- */}

  const Profile=({open,handleClose})=>{

    const data={
      name:'David brown',
      nic:'23029-29909329099',
      gender:'male',
      email:'huehfhfe@gmail.com',
      contact:'0345-2342342',
      qualification:'MBBS, FCPS'
    }
    return(
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{backgroundColor:theme.palette.custom.greenH,display: "flex",justifyContent: "space-between",color:'white'}}>
      <div style={{display:'flex',justifyContent:'start'}}>
        <PersonIcon></PersonIcon>
        <Typography sx={{fontSize:'18px',fontWeight:'medium'}}>My profile</Typography>
      </div>
      <CloseIcon sx={{cursor:'pointer'}} onClick={handleClose}/>
      </DialogTitle>
      </Dialog>
    )
  }

/*   const [openProf, setOpenProf] = useState(false)
  const handleClickOpenProf = (x) => {
       setOpenProf(true)
 }
 const handleCloseProf = () => {setOpenProf(false)}   */

export {SearchBarSM,SearchBarLR,Load,PersonDetail,ConfirmPropmt,NotificationPrompt,Profile} 