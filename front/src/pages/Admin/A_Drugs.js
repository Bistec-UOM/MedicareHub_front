import React, { useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Label, Area } from "recharts";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const pdata = [
  { 
    datefor: "1999.10.18", 
    drugType: [
      {name: "amoxilin", quantity: 2},
      {name: "dopamine", quantity: 23},
      {name: "dopaminec", quantity: 23},
    ] 
  },
  { 
    datefor: "1999.10.19", 
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

const uniqueDrugTypes = drugTypes.reduce((unique, item) => 
  unique.some(drug => drug.name === item.name) ? unique : [...unique, item], []);

const ADrugs = () => {
  const [selectedDrug, setSelectedDrug] = useState(null);

  const selectDrugType = (value) => {
    setSelectedDrug(value);
  };

  const DrugData = selectedDrug ? 
    pdata.flatMap(data => 
      data.drugType
        .filter(drug => drug.name === selectedDrug.name)
        .map(drug => ({ 
          ...drug,
          datefor: data.datefor 
        }))
    ) : [];

  return (
    <div>
      <Typography fontSize={25} fontWeight={10} sx={{ textAlign: 'center' }}>Drugs</Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper style={{ textAlign: 'center', height: '35vh', paddingTop: "6%" }} >
            <Typography fontSize={30}>Most Used Drug</Typography>
            <Typography fontSize={40}>{selectedDrug ? selectedDrug.name : ''}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={8} style={{textAlign:'right'}}>
          <Paper sx={{ padding: '10px' }}>
            <Autocomplete
              id="highlights-demo"
              sx={{ width: 150, height: 100 }}
              options={uniqueDrugTypes}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => selectDrugType(value)}
              renderInput={(params) => (
                <TextField {...params} label="Select a Drug" margin="normal" />
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
            <ResponsiveContainer aspect={3}>
              <AreaChart data={DrugData} style={{ padding: '0px' }}>
                <XAxis dataKey="datefor" interval={"preserveStartEnd"}>
                  <Label value="Date" position="insideBottom" offset={-5} />
                </XAxis>
                <YAxis>
                  <Label value="Amount" angle={-90} position="insideLeft" offset={2} />
                </YAxis>
                <Tooltip />
                <Area dataKey="quantity" name="Used Amount" stroke="rgb(121, 204, 190)" fill="rgb(121, 204, 190)" activeDot={{ r: 6 }} type="monotone" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ADrugs;
