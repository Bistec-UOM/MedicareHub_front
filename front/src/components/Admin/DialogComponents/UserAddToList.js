import { Button, Dialog, Grid } from '@mui/material';
import React from 'react';
import axios from 'axios';
import { baseURL, endPoints } from '../../../Services/Admin';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';

const UserAddToList = ({ RestoreOpen,forceUpdate, selectedUser, handleRestoreOpen, handleRestoreClose, RestoreClose }) => {
    const [loadingB, setloadingB] = useState(false);

    const RestoreUser = () => {
        setloadingB(true);
        selectedUser.isDeleted = false;
    
        axios.put(baseURL + endPoints.StaffList + `/${selectedUser.id}`, selectedUser)
            .then((res) => {
                handleRestoreClose();
                forceUpdate((prevCount) => prevCount + 1); // Trigger a re-render
                setloadingB(false);
            })
            .catch((error) => {
                console.error("Error restoring user:", error);
            });
    };
    
    
    return (
        <div>
            <Dialog open={RestoreOpen} onClose={handleRestoreClose}>
        <div style={{display:'flex',alignItems:'start',margin:'8px',paddingBottom:'5px',borderBottom:'1px solid lightgrey'}}>
          {selectedUser ? (
                        <>do you want to restore {selectedUser.fullName} user?</>
                        
                    ) : (
                        <></>
                    )}
        </div>
        <div style={{width:'100%',height:'60px',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Button variant='outlined' sx={{mr:'40px'}} size='small' endIcon={<CloseIcon></CloseIcon>} onClick={handleRestoreClose} >No</Button>
          <LoadingButton 
            variant='contained' 
            size='small' 
            endIcon={<DoneIcon></DoneIcon>}           
            loading={loadingB}
            loadingPosition="end"
            onClick={()=>RestoreUser()}
          >Yes</LoadingButton>
        </div>
      </Dialog>
        </div>
    );
}


export default UserAddToList;
