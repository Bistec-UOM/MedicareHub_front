import React from 'react';
import { Grid, Paper, Table, TableRow, Typography } from '@mui/material';
import { LineChart, ResponsiveContainer, Tooltip, Line, XAxis, YAxis, Label } from "recharts";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const Stest = () => {
  const pdata = [
    { 
      datefor: "1999.10.20", 
      drugType: [
        {name: "amoxilin", quantity: 12},
        {name: "dopamine", quantity: 23},
      ] 
    },
    { 
      datefor: "1999.10.20", 
      drugType: [
        {name: "amoxilin", quantity: 12},
        {name: "dopamine", quantity: 23},
      ] 
    },
    { 
      datefor: "1999.10.20", 
      drugType: [
        {name: "amoxilin", quantity: 12},
        {name: "dopamine", quantity: 23},
      ] 
    },
  ];
  const drugTypes = pdata.flatMap(data => data.drugType);

  // Create a new array that only includes unique drug names
  const uniqueDrugTypes = drugTypes.reduce((unique, item) => 
    unique.some(drug => drug.name === item.name) ? unique : [...unique, item], []);
  
  return (
    <div>
      <Autocomplete
        id="highlights-demo"
        sx={{ width: 200 }}
        options={uniqueDrugTypes}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Highlights" margin="normal" />
        )}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option.name, inputValue, { insideWords: true });
          const parts = parse(option.name, matches);
  
          return (
            <li {...props}>
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          );
        }}
      />
    </div>
  );
      }  
export default Stest;
