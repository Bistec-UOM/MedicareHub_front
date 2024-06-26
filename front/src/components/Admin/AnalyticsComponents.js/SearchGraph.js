import React from "react";
import {
  Paper,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import {
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Label,
  Area,
} from "recharts";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

const SearchGraph = ({
  uniqueModelTypes,
  selectModelType,
  Value,
  handleChange,
  ModelData,
  graph,
  topic
}) => {

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{
          width: "150px",
          textAlign:"left",
          paddingLeft: "20px",
          backgroundColor: "white",
          borderRadius: "5px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "rgb(174, 192, 190)" // You can change the color as needed
        }}>
          <p className="label">{`${new Date(label).toLocaleDateString()}`}</p>
          <p className="intro" style={{color:'rgb(9, 214, 54)'}}>{`Count : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <div>
      <Paper sx={{ width: { xs: "90vw", sm: "100%" } }}>
        <Typography fontSize={25} sx={{ textAlign: "center", fontWeight: "bolder", fontSize: "20px" }}>{topic}</Typography>          
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          

          <Autocomplete
            id="highlights-demo"
            sx={{ width: '30%', height: 100, marginRight: "3vw" }}
            size="small"
            options={uniqueModelTypes}
            getOptionLabel={(option) => option.name}
            onChange={(_, value) => selectModelType(value)}
            renderInput={(params) => (
              <TextField {...params} label={graph.var} margin="normal" />
            )}
            renderOption={(props, option, { inputValue }) => {
              const matches = match(option.name, inputValue, {
                insideWords: true,
              });
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
          <FormControl sx={{ width: "20%", position: "relative", top: "-2vh",mr:'3vw' }}>
            <InputLabel>Gap</InputLabel>
            <Select
              style={{ textAlign: "left" }}
              id="demo-simple-select"
              value={Value}
              label="Gap"
              size="small"
              onChange={handleChange}
            >
              <MenuItem value={"week"}>Last week</MenuItem>
              <MenuItem value={"month"}>Last Month</MenuItem>
              <MenuItem value={"year"}>Last Year</MenuItem>
              <MenuItem value={"5"}>Last 5 Year</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <ResponsiveContainer aspect={2}>
          <AreaChart
            data={ModelData}
            style={{ paddingBottom: "5vh", height: "70vh" }}
          >
            <XAxis
              fontSize={10}
              dataKey={graph.x}
              interval={"preserveStartEnd"}
            >
              <Label value="Date" position="insideBottom" offset={-5} />
            </XAxis>
            <YAxis>
              <Label
                value="Amount"
                angle={-90}
                position="insideLeft"
                offset={2}
              />
            </YAxis>
            <Tooltip content={CustomTooltip}/>
            <Area
              dataKey={graph.y}
              name="Used Amount"
              stroke="rgb(9, 214, 54)"
              fill="rgb(9, 214, 54)"
              activeDot={{ r: 6 }}
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Paper>
    </div>
  );
};

export default SearchGraph;
