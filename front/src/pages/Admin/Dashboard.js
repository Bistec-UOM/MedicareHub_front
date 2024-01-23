import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Navbar from '../../components/navbar/Navbar';
import { useState } from 'react';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccessibleIcon from '@mui/icons-material/Accessible';
import PersonIcon from '@mui/icons-material/Person';
import Analysis from './Analytics';
import Patient from './Patient';
import Staff from './Staff';


const drawerWidth = 210;

export default function Dashboard() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedNavItem, setSelectedNavItem] = React.useState('Staff');

  const handleNavigationItemClick = (text) => {
    setSelectedItem(text);
    setSelectedNavItem(text);
  };

  const renderContent = () => {
    switch (selectedNavItem) {
      case 'Staff':
        return( 
          <Staff/>
        );
      case 'Patient':
        return (
          <Patient/>
        );
      case 'Analysis':
        return (
          <Analysis/>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor:'rgb(222, 244, 242)'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Navbar />
        <Toolbar />
        <Divider />
        <List>
          {['Staff', 'Patient', 'Analysis'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor: selectedNavItem === text ? 'rgb(121, 204, 190)' : 'white',                  
                  m: 0.8,
                  borderRadius: 2,
                  boxShadow:2,
                  '&:hover': {
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'                  },
                }}
                onClick={() => handleNavigationItemClick(text)}
              >
                <ListItemIcon>
                  
                {index  === 0 ? <PersonIcon/> :null}
                {index  === 1 ? <AccessibleIcon/> : null}
                {index  === 2 ? <ShowChartIcon/> : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
}
