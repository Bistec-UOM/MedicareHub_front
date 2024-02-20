import { List, ListItemButton, ListItem, Paper, ListItemIcon, Box } from "@mui/material";
import { useState } from "react";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
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
    }

    return (
        <div>
            {/* <Paper sx={{ textAlign: 'right' }}> */}
                <List sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    {['other',  "drug","patient","income"].map((text, index) => (
                        <ListItem key={text} sx={{ width: '10vw' }}>
                            <ListItemButton
                                sx={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: selectedNavItem === text ? "rgb(121, 204, 190)" : "white",
                                    boxShadow:3,
                                    borderRadius:'10px'
                                }}
                                onClick={() => handleNavigationItemClick(text)}
                            >
                                <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                                    {index === 0 ? <CalendarMonthIcon /> : null}
                                    {index === 1 ? <VaccinesIcon /> : null}
                                    {index === 2 ? <PersonIcon /> : null}
                                    {index === 3 ? <LocalAtmIcon /> : null}
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            {/* </Paper> */}

            <Box mt={1}>
                {renderContent()}
            </Box>
        </div>
    );
}
