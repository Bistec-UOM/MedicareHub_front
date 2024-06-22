import * as React from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { IconButton,Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import { baseURL,endPoints } from "../../../Services/Appointment";
import { setHeaders } from "../../../Services/Auth";
import DoneIcon from '@mui/icons-material/Done'
import WarningIcon from '@mui/icons-material/Warning';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from "react";


export default function AppDeletePopup({appointlist,setAppointList,handleNotification,item,delcount,setDelcount, daopen, setDaopen,filteredAppointments,setFilteredAppointments,isDisabled,setIsDisabled }) {
  


  const [delConLoading,setDelConLoading]=useState(false);  //var for loading prop of delete confirm button
  const handleRealDelete=(item)=>
  {
    setDelConLoading(true);
    axios.delete(baseURL+endPoints.Appoinment+`${item.appointment.id}`,setHeaders())
  .then(response => {
    setDelConLoading(false);
    setDelcount(delcount+1);  //for fetching the newly updated app list
    setDaopen(false);
    handleNotification("Appointment deleted succesfully!","success");
  })
  .catch(error => {
    setDelConLoading(false);
    if (!error.response) {// Network error
    handleNotification("Network error! Please check your internet connection.", "error");
  }
  else 
  {
    handleNotification("Appointment is still progressing!","error");
  }
  }
)
  }
  const handleClose = () => {
    setDaopen(false);
  };

  return(
    <Dialog open={daopen} onClose={handleClose}>
    <div style={{display:'flex',alignItems:'start',margin:'8px',paddingBottom:'5px',borderBottom:'1px solid lightgrey'}}>
      <WarningIcon color='warning' sx={{mr:'10px'}}></WarningIcon>
      <Typography> Are you sure you want to delete the appointment?</Typography>
    </div>
    <div style={{width:'100%',height:'60px',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Button variant='outlined' sx={{mr:'40px'}} size='small' endIcon={<CloseIcon></CloseIcon>} onClick={handleClose} >No</Button>
      <LoadingButton 
        data-testid="confirmdelete"
        variant='contained' 
        size='small' 
        endIcon={<DoneIcon></DoneIcon>}           
        loading={delConLoading}
        loadingPosition="end"
        onClick={()=>handleRealDelete(item)}
      >Yes</LoadingButton>
    </div>
  </Dialog>
  )
//   return (
//     <React.Fragment>
//       <Dialog open={daopen} onClose={handleClose}>
//         <Box sx={{ width: {xs:"100%",sm:"500px"}, height: "150px" }}>
//           <Box>
//             <Box
//               sx={{
//                 backgroundColor: "#DEF4F2",
//                 height: "40px",
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 width: "100%",
//               }}
//             >
//               <IconButton onClick={handleClose}>
//                 <CloseIcon />
//               </IconButton>
//             </Box>
//           </Box>
//           <Box  sx={{display:'flex',flexDirection:'row' ,alignItem: "center", margin: "3%" }}>
//             <ErrorIcon
//               sx={{ color: "red", marginRight: "2%",fontSize:'2rem' }}
//             />
//             <Typography  sx={{ marginTop:'1%',color:'#000000' }}>
//               Are you sure you want to delete the appointment?
//             </Typography>
//           </Box>
//           <Box sx={{display:'flex',justifyContent:'flex-end',paddingRight:'5%'}}>
//             <Button onClick={()=>handleRealDelete(item)}
//               sx={{
//                 backgroundColor: "#F44336", 
//                 "&:hover": {
//                   backgroundColor: "#F44336", 
//                 },
//                 marginLeft: "20px",
//               }}
//               variant="contained"
//               type="submit"
//             >
//               Confirm
//             </Button>
//           </Box>
//         </Box>
//       </Dialog>
//     </React.Fragment>
//   );
  }
