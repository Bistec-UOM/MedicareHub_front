import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";

const PatientDetailCard = ({
  appAddPopupCount,
  setAppAddPopupCount,
  setActiveId,
  item,
  apopen,
  setApopen,
  filteredAppointments,
  docid,
  handleNotification,
  showAnalysis,
  setShowAnalysis,
  setAnalysisPatient,
}) => {
  const handleAnalysisPage = () => {
    setAnalysisPatient(item);
    setShowAnalysis(true);
  };

  const handleAppAddPopup = () => {
    //check already have appointments
    var patEligibility = filteredAppointments.find(
      (obj) => obj.patient.id === item.id
    );
    if (patEligibility) {
      handleNotification("You Already have an appointment", "error");
    } else {
      setAppAddPopupCount(appAddPopupCount + 1);
      setApopen(true);
      setActiveId(item.id);
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
          marginTop: { md: "0", xs: "20%" },
        }}
      >
        <Card
          sx={{
            backgroundColor: "#FFFF",
            textAlign: "left",
            marginBottom: 2,
            // border: "1px solid #3B877A",
            borderRadius: "5px",
          }}
        >
          <Stack direction={"column"}>
            <CardContent>
              <Stack
                direction={"row"}
                sx={{ justifyContent: "space-between", alignItem: "center" }}
              >
                <Typography data-testid="patientname" variant="h5">
                  {item.fullName}
                </Typography>
                <Box>
                  <IconButton
                    data-testid="analysis-icon"
                    onClick={handleAnalysisPage}
                  >
                    <AnalyticsOutlinedIcon sx={{ color: "#3B877A" }} />
                  </IconButton>
                  <IconButton id="add-appointment" onClick={handleAppAddPopup}>
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
                <Typography
                  data-testid="patientaddress"
                  variant="body2"
                  color="text.secondary"
                >
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
