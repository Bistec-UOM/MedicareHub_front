import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        custom: {
          greenH: '#04c946',
          Token : '#03ad3c',
          greenIcon : '#04c946',
          sideBar : '#f0fff2',
          sideBarUnitHover:'#edfcf0',
          sideBarUnitSelected:'#04c946',
        },
      },
    components: {
        MuiButton: {
          styleOverrides: {
            containedPrimary: {
              backgroundColor: '#04c946',
              color: 'white',
              '&:hover': {
                backgroundColor: '#03ad3c',
              },
            },
            outlinedPrimary: {
                backgroundColor: '#ffffff',
                borderColor :'#04c946',
                color: '#04c946',
                '&:hover': {
                  backgroundColor: '#04c946',
                  color:'#ffffff',
                  borderColor :'#04c946',
                },
              },
          },
          
        },
      },
});

export default theme;
