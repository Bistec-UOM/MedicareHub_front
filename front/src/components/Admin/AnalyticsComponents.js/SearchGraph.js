import React from 'react';
import { Paper,MenuItem,InputLabel,Select,FormControl,Box } from '@mui/material';
import { AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Label, Area } from "recharts";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const SearchGraph = ({ uniqueModelTypes, selectModelType, Value, handleChange, ModelData,graph }) => {

   
    return (
        <div>
            <Paper sx={{ padding: '0vh' }}>
      <Box sx={{display:"flex",justifyContent:'flex-end',alignItems:'center'}}>
        <Autocomplete
          id="highlights-demo"
          sx={{ width: 200, height: 100 ,marginRight:'3vw'}}
          options={uniqueModelTypes}
          getOptionLabel={(option) => option.name}
          onChange={(_, value) => selectModelType(value)}
          renderInput={(params) => (
            <TextField {...params} label={graph.var} margin="normal" />
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
            value={Value}
            label="Gap"
            onChange={handleChange}
          >
            <MenuItem value={'month'}>Last Month</MenuItem>
            <MenuItem value={'year'}>Last Year</MenuItem>
            <MenuItem value={'5'}>Last 5 Year</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <ResponsiveContainer aspect={2}>
        <AreaChart data={ModelData} style={{ paddingBottom: '5dvh',height:'70dvh' }}>
        {/* <XAxis  fontSize={10} dataKey="datefor" interval={"preserveStartEnd"}> */}
        <XAxis  fontSize={20} dataKey={graph.x} interval={"preserveStartEnd"}>
            <Label  value="Date" position="insideBottom" offset={-5} />
          </XAxis>
          <YAxis >
            <Label value="Amount" angle={-90} position="insideLeft" offset={2} />
          </YAxis>
          <Tooltip />
          {/* <Area dataKey="quantity" name="Used Amount" stroke="rgb(121, 204, 190)" fill="rgb(121, 204, 190)" activeDot={{ r: 6 }} type="monotone" /> */}
          <Area dataKey={graph.y} name="Used Amount" stroke="rgb(121, 204, 190)" fill="rgb(121, 204, 190)" activeDot={{ r: 6 }} type="monotone" />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
        </div>
    );
}

export default SearchGraph;
