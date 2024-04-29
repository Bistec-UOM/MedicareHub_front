import * as React from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { IconButton, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import BlockTimeSelectionPopup from "../BlockTimeSelectionPopup/BlockTImeSelectionPopup";
import { baseURL, endPoints } from "../../../../Services/Appointment";

//day block popup

export default function BlockSelectionPopup({
  selectedDay,
  doctorId,
  handleNotification,
  item,
  delcount,
  setDelcount,
  blockSelectionPopup,
  setBlockSelectionPopup,
  docDayBlockPopup,
  setDocDayBlockPopup,
  setTimeSelection,
  timeSelection,
  filteredAppointments,
  setFilteredAppointments,
  isDisabled,
  setIsDisabled,
}) {
  const handleClose = () => {
    setBlockSelectionPopup(false);
  };

 



  //addig blocked date and doctor id to the table
 const  handleWholeDayBlock=()=>
 {
  setDocDayBlockPopup(true);
 }

  const handleSelectTime = () => {
    setBlockSelectionPopup(false);
    setTimeSelection(true);
    
  };

  

  return (
    <React.Fragment>
      <Dialog open={blockSelectionPopup} onClose={handleClose}>
        <Box sx={{ width: { xs: "100%", sm: "500px" }, height: "150px" }}>
          <Box>
            <Box
              sx={{
                backgroundColor: "#DEF4F2",
                height: "40px",
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItem: "center",
              margin: "3%",
            }}
          >
            <ErrorIcon
              sx={{ color: "red", marginRight: "2%", fontSize: "2rem" }}
            />
            <Typography sx={{ marginTop: "1%", color: "#000000" }}> 
              You want Block the whole Day or Specific Time?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "5%",
            }}
          >
            <Button
              onClick={handleWholeDayBlock}
              sx={{
                backgroundColor: "#F44336",
                "&:hover": {
                  backgroundColor: "#F44336",
                },
                marginLeft: "20px",
              }}
              variant="contained"
              type="submit"
            >
              Day
            </Button>
            <Button
              onClick={handleSelectTime}
              sx={{
                backgroundColor: "#F44336",
                "&:hover": {
                  backgroundColor: "#F44336",
                },
                marginLeft: "20px",
              }}
              variant="contained"
              type="submit"
            >
              Select-Time
            </Button>
          </Box>
        </Box>
      </Dialog>
      <BlockTimeSelectionPopup/>
    </React.Fragment>
  );
}
