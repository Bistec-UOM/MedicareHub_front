import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";

const PatientDetailCard = ({
  appAddPopupCount,
  setAppAddPopupCount,
  setActiveId,
  item,
  apopen,
  setApopen,
  filteredAppointments,
  docid,
  handleNotification
}) => {
  const handleAppAddPopup = () => {
    var patEligibility =filteredAppointments.find(obj=>obj.patient.id===item.id);
    if (patEligibility) {
      handleNotification("You Already have an appointment","error");
      
    } else {
      setAppAddPopupCount(appAddPopupCount + 1);
      setApopen(true);
      setActiveId(item.nic);
    }
  };
  useEffect(() => {
    setActiveId(item.nic);
  }, []);

  return (
    <div>
      <Box
        sx={{
          width: { md: "80%", xs: "100%" },
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Card
          sx={{
            backgroundColor: "#FFFF",
            textAlign: "left",
            marginBottom: 2,
            border: "1px solid #3B877A",
            borderRadius: 5,
          }}
        >
          <Stack direction={"column"}>
            <CardContent>
              
              <Stack
                direction={"row"}
                sx={{ justifyContent: "space-between", alignItem: "center" }}
              >
                <Typography variant="h5">{item.fullName}</Typography>
                <Box>
                  <IconButton onClick={handleAppAddPopup}>
                    <AddIcon sx={{ color: "#F66444" }} />
                  </IconButton>
                </Box>
              </Stack>
              <Stack
                sx={{
                  justifyContent: "space-between",
                  alignItem: "center",
                  flexDirection: { xs: "column", sm: "column", md: "row" },
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {item.address}
                </Typography>
                <Typography color="text.secondary">{item.nic}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.contactNumber}
                </Typography>
              </Stack>
            </CardContent>
          </Stack>
        </Card>
      </Box>
    </div>
  );
};

export default PatientDetailCard;
