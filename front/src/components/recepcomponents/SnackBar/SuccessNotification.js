import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SuccessNotification({setNotificationOpen,notiMessage,notificationOpen,type}) {
 // const [open, setOpen] = React.useState(notificationOpen);
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotificationOpen(false);
  };

  return (
    <div>
     
      <Snackbar open={notificationOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notiMessage} 
        </Alert>
      </Snackbar>
    </div>
  );
}
