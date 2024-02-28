import React, { useState,useEffect } from 'react';
import { Grid, Paper,MenuItem,InputLabel,Select,FormControl, Typography, Box } from '@mui/material';
import { AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Label, Area } from "recharts";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';



// const axios = require('axios');

// // Define the URL of your .NET backend endpoint
// const url = 'http://your-backend-url/api/endpoint';

// // Send a GET request to the .NET backend
// axios.get(url)
//   .then(response => {
//     // The data is available in the response.data property
//     const pdata = response.data;

//     // You can now use pdata in your code
//     console.log(pdata);
//   })
//   .catch(error => {
//     // Handle any errors
//     console.error('Error fetching data', error);
//   });

const pdata = [
  { 
    datefor: "2021.02.21", 
    drugType: [
      {name: "amoxilin", quantity: 2},
      {name: "dopamine", quantity: 23},
      {name: "dopaminec", quantity: 23},
    ] 
  },  { 
    datefor: "2022.02.22", 
    drugType: [
      {name: "amoxilin", quantity: 2},
      {name: "dopamine", quantity: 23},
      {name: "dopaminec", quantity: 23},
    ] 
  },  { 
    datefor: "2023.03.23", 
    drugType: [
      {name: "amoxilin", quantity: 2},
      {name: "dopamine", quantity: 23},
      {name: "dopaminec", quantity: 23},
    ] 
  },  { 
    datefor: "2024.02.24", 
    drugType: [
      {name: "amoxilin", quantity: 2},
      {name: "dopamine", quantity: 23},
      {name: "dopaminec", quantity: 23},
    ] 
  },
  { 
    datefor: "2024.02.25", 
    drugType: [
      {name: "amoxilin", quantity: 2000},
      {name: "dopamine", quantity: 23},
      {name: "dopaminec", quantity: 23},
    ] 
  },
  { 
    datefor: "2024.02.26", 
    drugType: [
      {name: "amoxilin", quantity: 12},
      {name: "dopamine", quantity: 23},
    ] 
  },
  { 
    datefor: "2024.02.27", 
    drugType: [
      {name: "amoxilin", quantity: 12},
      {name: "dopamine", quantity: 23},
    ] 
  },
  { 
    datefor: "2024.02.28", 
    drugType: [
      {name: "amoxilin", quantity: 33},
      {name: "dopamine", quantity: 4},
      {name: "lodrine", quantity: 4},
      {name: "panadol", quantity: 4},
    ] 
  },
  
];


const drugTypes = pdata.flatMap(data => data.drugType);

const uniqueDrugTypes = drugTypes.reduce((unique, item) => 
  unique.some(drug => drug.name === item.name) ? unique : [...unique, item], []);

const ADrugs = () => {
  const currentDate = new Date(); // Initialize currentDate
  // const [TimeGap, setTimeGap] = React.useState(new Date(currentDate)); // Initialize TimeGap with current date

  const [selectedDrug, setSelectedDrug] = useState(null);
  const [Value, setValue] = React.useState('month'); // Initialize Value state with 'day'
  const selectDrugType = (value) => {
    setSelectedDrug(value);
  };
  // const currentDate = new Date();
  const initialTimeGap = new Date();
  initialTimeGap.setDate(currentDate.getDate() - 30);
  const [TimeGap, setTimeGap] = React.useState(initialTimeGap);

  const handleChange = (event) => {
    setValue(event.target.value);
    const newDate = new Date(currentDate);
    if (event.target.value === 'month') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else if (event.target.value === 'year') {
      newDate.setFullYear(currentDate.getFullYear() - 1);
    } else if (event.target.value === '5') {
      newDate.setFullYear(currentDate.getFullYear() - 5);
    }
    setTimeGap(newDate);
  };
  const filteredData = pdata.filter(entry => {
    const entryDate = new Date(entry.datefor);
    return entryDate >= TimeGap && entryDate <= currentDate;
  });
    // Add a new state variable for the most used drug
    const [mostUsedDrug, setMostUsedDrug] = useState(null);

const DrugData = selectedDrug ? 
  filteredData.flatMap(data => 
    data.drugType
      .filter(drug => drug.name === selectedDrug.name)
      .map(drug => ({ 
        ...drug,
        datefor: data.datefor 
      }))
  ) : [];
  const drugconter = filteredData.flatMap(data => data.drugType);  
  useEffect(() => {
    // Create a frequency map
    const frequencyMap = drugconter.reduce((map, drug) => {
      map[drug.name] = (map[drug.name] || 0) + drug.quantity;
      return map;
    }, {});

    // Find the drug with the highest frequency
    let maxDrug = null;
    let maxFrequency = 0;
    for (const [drug, frequency] of Object.entries(frequencyMap)) {
      if (frequency > maxFrequency) {
        maxDrug = drug;
        maxFrequency = frequency;
      }
    }

    // Update the state variable
    setMostUsedDrug(maxDrug);
  }, [drugconter]);  // Recalculate when drugconter changes
// Add a new state variable for loading
const [loading, setLoading] = useState(true);

useEffect(() => {
  // Create a frequency map
  const frequencyMap = drugconter.reduce((map, drug) => {
    map[drug.name] = (map[drug.name] || 0) + drug.quantity;
    return map;
  }, {});

  // Find the drug with the highest frequency
  let maxDrug = null;
  let maxFrequency = 0;
  for (const [drug, frequency] of Object.entries(frequencyMap)) {
    if (frequency > maxFrequency) {
      maxDrug = drug;
      maxFrequency = frequency;
    }
  }

  // Update the state variable
  setMostUsedDrug(maxDrug);

  // Set loading to false
  setLoading(false);
}, [drugconter]);  // Recalculate when drugconter changes

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper style={{ textAlign: 'center', height: '35vh', paddingTop: "6%" }} >
            <Typography fontSize={25}>Most Used Drug(last 30 days)</Typography>
            <Typography fontSize={40}>{loading ? 'Loading...' : mostUsedDrug}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={8} style={{textAlign:'right'}}>
          <Paper sx={{ padding: '10px' }}>
           <Box sx={{display:"flex",justifyContent:'flex-end',alignItems:'center'}}>
           <Autocomplete
              id="highlights-demo"
              sx={{ width: 200, height: 100 ,marginRight:'3vw'}}
              options={uniqueDrugTypes}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => selectDrugType(value)}
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
                  <FormControl sx={{ width: '20%',position:'relative',top:'-1vh' }}>
        <InputLabel>Gap</InputLabel>
        <Select
          style={{ textAlign: 'left' }}
          id="demo-simple-select"
          value={Value} // Change value prop to Value
          label="Gap"
          onChange={handleChange}
        >
          <MenuItem value={'month'}>Last Month</MenuItem>
          <MenuItem value={'year'}>Last Year</MenuItem>
          <MenuItem value={'5'}>Last 5 Year</MenuItem>
        </Select>
      </FormControl>
           </Box>
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
      <Grid>
        table
      </Grid>
    </div>
  );
}

export default ADrugs;
