import React, { useState } from 'react';
import { Paper, Typography } from '@mui/material';

const Stest = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('yasiru');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // You can add logic to save the edited name, if needed.
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <Paper>
        <div style={{ display: 'flex' }}>
          <Typography>name :</Typography>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={handleInputChange}
            />
          ) : (
            <Typography>{name}</Typography>
          )}
        </div>
        {isEditing ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </Paper>
    </div>
  );
};

export default Stest;

