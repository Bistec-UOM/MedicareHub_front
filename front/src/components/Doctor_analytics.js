import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box,FormGroup,FormControlLabel,Checkbox, Typography} from '@mui/material'


const Doctor_analytics = () => {

  const [medList,setMedList]=useState(['Levothyroxine', 'Rezatripan']);
  const [selectedMed, setSelectedMed] = useState(['Levothyroxine', 'Rezatripan']);

  const handleMedToggle = (x) => {
    setSelectedMed(prev => {
      if (prev.includes(x)) {
        return prev.filter(el => el !== x);
      } else {
        return [...prev, x];
      }
    });
  };
  
  const [data,setData] = useState([
    { month: 'Jan', Levothyroxine: 10, Rezatripan: 15 },
    { month: 'Feb', Levothyroxine: 15, Rezatripan: 20 },
    { month: 'Mar', Levothyroxine: 20, Rezatripan: 25 },
    { month: 'Apr', Levothyroxine: 25, Rezatripan: 30 },
    { month: 'May', Levothyroxine: 30, Rezatripan: 35 },
    { month: 'Jun', Levothyroxine: 35, Rezatripan: 30 },
    { month: 'Jul', Levothyroxine: 30, Rezatripan: 25 },
    { month: 'Aug', Levothyroxine: 25, Rezatripan: 20 },
    { month: 'Sep', Levothyroxine: 20, Rezatripan: 15 },
    { month: 'Oct', Levothyroxine: 15, Rezatripan: 10 },
    { month: 'Nov', Levothyroxine: 10, Rezatripan: 5 },
    { month: 'Dec', Levothyroxine: 5, Rezatripan: 0 },
  ]);


return(
<Box>
    <FormGroup>
    {medList.map(el => (
          <FormControlLabel
            key={el}
            control={<Checkbox size='small' sx={{height:'18px'}} checked={selectedMed.includes(el)} onChange={() => handleMedToggle(el)} />}
            label={<Typography sx={{fontSize:'14px'}}>{el}</Typography>}
          />
        ))}
    </FormGroup>


    <ResponsiveContainer width={500} height={300}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tick={{ fontFamily: 'Arial', fontSize: 12 }}/>
        <YAxis />
        <Tooltip/>
        {selectedMed.map(city => (
          <Line key={city} type="stepAfter" dataKey={city} stroke="#8884d8" activeDot={{ r: 8 }} />
        ))}      
        </LineChart>
    </ResponsiveContainer>
</Box>
)
}

export default Doctor_analytics;
