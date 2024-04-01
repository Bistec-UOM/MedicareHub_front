import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react';



const AskDelete = ({ deleteOpen, handleEditClose, handleRemove }) => {
    return (
        <React.Fragment>
            
        <Dialog
          open={deleteOpen}
          onClose={handleEditClose}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Are you sure you want to delete this?
          </DialogTitle>
          <DialogActions>
            <Button autoFocus onClick={handleEditClose}>
              Cancel
            </Button>
            <Button onClick={handleRemove} style={{color:"red"}}>Remove</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
}

export default AskDelete;
