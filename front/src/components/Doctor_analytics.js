import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box,FormGroup,FormControlLabel,Checkbox, Typography, Paper, Divider} from '@mui/material'


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
    { month: 'Jan 2', Levothyroxine: 50, Iodine: 10 , Thyroxin:5},
    { month: 'Feb 18', Levothyroxine: 50, Iodine: 10 , Thyroxin:5},
    { month: 'Jan 30 ', Levothyroxine: 50, Iodine: 10 , Thyroxin:5},
    { month: 'Feb 4', Levothyroxine: 50, Iodine: 10 , Thyroxin:5},
    { month: 'Feb 10', Levothyroxine: 50, Iodine: 10 , Thyroxin:6},
    { month: 'Feb 20', Levothyroxine: 50, Iodine: 20, Thyroxin:8},
    { month: 'Feb 28', Levothyroxine: 25, Iodine: 20 , Thyroxin:8},
    { month: 'Mar 1', Levothyroxine: 25, Iodine: 20 , Thyroxin:10},
    { month: 'Mar 6', Levothyroxine: 20, Iodine: 20 , Thyroxin:12},
    { month: 'Mar 12', Levothyroxine: 20, Iodine: 30 , Thyroxin:16},
    { month: 'Mar 20', Levothyroxine: 20, Iodine: 30 , Thyroxin:22},
    { month: 'Mar 30', Levothyroxine: 20, Iodine: 30 , Thyroxin:22},
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
    <Box sx={{display:'flex',justifyContent:'space-around'}}>
      <Paper sx={{p:'5px'}}>
        <Typography sx={{fontSize:'16px',color:'grey'}}>Medications</Typography>
        <Divider></Divider>
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

      <Paper sx={{p:'5px'}}>
        <Typography sx={{fontSize:'16px',color:'grey'}}>Lab tests</Typography>
        <Divider></Divider>
        <FormGroup >
        {medList.map((el,ind) => (
              ind==2?<FormControlLabel
                key={el}
                control={<Checkbox size='small' sx={{height:'20px'}} style={{ color: col[el] }} checked={selectedMed.includes(el)} onChange={() => handleMedToggle(el)} />}
                label={<Typography sx={{fontSize:'14px'}}>{el}</Typography>}
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
