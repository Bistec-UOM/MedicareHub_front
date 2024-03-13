import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box,FormGroup,FormControlLabel,Checkbox, Typography, Paper} from '@mui/material'


const Doctor_analytics = () => {

  const [medList,setMedList]=useState(['Levothyroxine', 'Iodine','Thyroxin']);
  const [selectedMed, setSelectedMed] = useState(['Levothyroxine', 'Iodine','Thyroxin']);
  const [col,setCol]=useState({})

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
    { month: 'Jan', Levothyroxine: 50, Iodine: 10 , Thyroxin:5},
    { month: 'Feb', Levothyroxine: 50, Iodine: 10 , Thyroxin:5},
    { month: 'Mar', Levothyroxine: 50, Iodine: 10 , Thyroxin:5},
    { month: 'Apr', Levothyroxine: 50, Iodine: 10 , Thyroxin:5},
    { month: 'May', Levothyroxine: 50, Iodine: 10 , Thyroxin:6},
    { month: 'Jun', Levothyroxine: 50, Iodine: 20, Thyroxin:8},
    { month: 'Jul', Levothyroxine: 25, Iodine: 20 , Thyroxin:8},
    { month: 'Aug', Levothyroxine: 25, Iodine: 20 , Thyroxin:10},
    { month: 'Sep', Levothyroxine: 20, Iodine: 20 , Thyroxin:12},
    { month: 'Oct', Levothyroxine: 20, Iodine: 30 , Thyroxin:16},
    { month: 'Nov', Levothyroxine: 20, Iodine: 30 , Thyroxin:22},
    { month: 'Dec', Levothyroxine: 20, Iodine: 30 , Thyroxin:22},
  ]);

  const getRandomColor=()=>{
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(()=>{
    let obj={}
    medList.map((el)=>{
      obj[el]=getRandomColor()
    })
    setCol(obj)
  },[])

return(
<Box>
    <Box sx={{display:'flex',justifyContent:'space-between'}}>
      <Paper >
        <Typography sx={{fontSize:'16px'}}>Medications</Typography>
        <FormGroup >
        {medList.map((el,ind) => (
             ind<=1? <FormControlLabel
                key={el}
                control={<Checkbox size='small' sx={{height:'22px'}} style={{ color: col[el] }} checked={selectedMed.includes(el)} onChange={() => handleMedToggle(el)} />}
                label={<Typography sx={{fontSize:'15px'}}>{el}</Typography>}
              />:''
            ))}
        </FormGroup>
      </Paper>

      <Paper>
        <Typography sx={{fontSize:'16px'}}>Lab tests</Typography>
        <FormGroup >
        {medList.map((el,ind) => (
              ind==2?<FormControlLabel
                key={el}
                control={<Checkbox size='small' sx={{height:'22px'}} style={{ color: col[el] }} checked={selectedMed.includes(el)} onChange={() => handleMedToggle(el)} />}
                label={<Typography sx={{fontSize:'15px'}}>{el}</Typography>}
              />:''
            ))}
        </FormGroup>
      </Paper>
    </Box>


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
        {selectedMed.map((el) => (
          <Line key={el} type="stepAfter" dataKey={el} stroke={col[el]} activeDot={{ r: 8 }} />
        ))}      
        </LineChart>
    </ResponsiveContainer>
</Box>
)
}

export default Doctor_analytics;
