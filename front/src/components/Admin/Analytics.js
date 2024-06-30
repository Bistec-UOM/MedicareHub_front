import {List,ListItemButton,ListItem,Paper,ListItemIcon,Box,Typography} from "@mui/material";
import { useState } from "react";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AOther from "./A_Other";
import ADrugs from "./A_Drugs";
import APatient from "./A_Patient";
import AIncome from "./A_Income";

export default function Analysis() {
  const [selectedNavItem, setSelectedNavItem] = useState("income");

  const handleNavigationItemClick = (text) => {
    setSelectedNavItem(text);
  };

  const renderContent = () => {
    switch (selectedNavItem) {
      case "income":
        return <AIncome />;
      case "patient":
        return <APatient />;
      case "drug":
        return <ADrugs />;
      case "other":
        return <AOther />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          data-testId = "staff-section"
          sx={{
            color: "rgb(105, 116, 115)",
            textAlign: "center",
            fontSize: 25,
            fontWeight: "bold",
            flex: 1,
          }}
        >
          {selectedNavItem.toUpperCase()}
        </Typography>

        <List
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "flex-end",
            position: { xs: "fixed", sm: "relative" },
            right: { xs: "-16vw", sm: "auto" },
            top: { xs: "100px", sm: "-9px" },
          }}
        >
          <Paper
  sx={{
    width: { xs: "35vw" },
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    position: "relative",
    boxShadow: "none",
    backgroundColor:'white',
  }}
          >
            {["income", "patient", "drug", "other"].map((text, index) => (
              <ListItem
                key={text}
                sx={{ width: { sm: "10vw", xs: "20vw" }, zIndex: 1 }}
              >
<ListItemButton
 data-testid={`nav-item-${text}`}
  sx={{
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      selectedNavItem === text ? "rgb(9, 214, 54)" : "white",
    boxShadow: 3,
    borderRadius: "10px",
    ":hover": {
      backgroundColor:
        selectedNavItem === text? "rgb(9, 214, 54)": "rgb(235, 235, 235)",
    },
    transform: "scale(0.9)", // Add this line to reduce the size to 90%
  }}
  onClick={() => handleNavigationItemClick(text)}
>
  <ListItemIcon
    sx={{ display: "flex", justifyContent: "center" }}
  >
    {index === 0 ? <LocalAtmIcon /> : null}
    {index === 1 ? <PersonIcon /> : null}
    {index === 2 ? <VaccinesIcon /> : null}
    {index === 3 ? <CalendarMonthIcon /> : null}
  </ListItemIcon>
</ListItemButton>
              </ListItem>
            ))}
          </Paper>
        </List>
        {/* </List> */}
      </Box>
      <Box mt={1}>{renderContent()}</Box>
    </div>
  );
}
