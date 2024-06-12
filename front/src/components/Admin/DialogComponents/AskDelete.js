import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react';
import theme from '../../Style';
import DoneIcon from '@mui/icons-material/Done'
import WarningIcon from '@mui/icons-material/Warning';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close'
import { Divider, IconButton, InputBase, Paper,Box,Typography} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from '@mui/material/CircularProgress';
import PersonIcon from '@mui/icons-material/Person';



const AskDelete = ({ deleteOpen,loadingB, handleEditClose, handleRemove }) => {
    return (
        <React.Fragment>
        <Dialog open={deleteOpen} onClose={handleEditClose}>
        <div style={{display:'flex',alignItems:'start',margin:'8px',paddingBottom:'5px',borderBottom:'1px solid lightgrey'}}>
          <WarningIcon color='warning' sx={{mr:'10px'}}></WarningIcon>
          <Typography> Are you sure you want to delete this?</Typography>
        </div>
        <div style={{width:'100%',height:'60px',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Button variant='outlined' sx={{mr:'40px'}} size='small' endIcon={<CloseIcon></CloseIcon>} onClick={handleEditClose} >No</Button>
          <LoadingButton 
            variant='contained' 
            size='small' 
            endIcon={<DoneIcon></DoneIcon>}           
            loading={loadingB}
            loadingPosition="end"
            onClick={handleRemove}
          >Yes</LoadingButton>
        </div>
      </Dialog>
      </React.Fragment>
    );
}

export default AskDelete;
