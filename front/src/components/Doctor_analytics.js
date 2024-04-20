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
  

  const [sample,setSample]=useState([
    {
      "dateTime": "2024-03-10T08:30:00",
      "drugs": [
        {
          "id": 54,
          "prescriptionId": 23,
          "genericN": "Aspirin",
          "weight": 10,
          "unit": "mg",
          "period": "BID"
        },
        {
          "id": 55,
          "prescriptionId": 23,
          "genericN": "Atorvastatin",
          "weight": 10,
          "unit": "mg",
          "period": "BID"
        }
      ]
    },
    {
      "dateTime": "2024-03-14T09:30:00",
      "drugs": [
        {
          "id": 45,
          "prescriptionId": 18,
          "genericN": "Metoprolol",
          "weight": 10,
          "unit": "mg",
          "period": "BID"
        },
        {
          "id": 46,
          "prescriptionId": 18,
          "genericN": "Aspirin",
          "weight": 10,
          "unit": "mg",
          "period": "BID"
        },
        {
          "id": 47,
          "prescriptionId": 18,
          "genericN": "Atorvastatin",
          "weight": 10,
          "unit": "mg",
          "period": "BID"
        }
      ]
    },
    {
      "dateTime": "2024-03-17T08:30:00",
      "drugs": []
    },
    {
      "dateTime": "2024-03-29T08:30:00",
      "drugs": [
        {
          "id": 76,
          "prescriptionId": 35,
          "genericN": "Aspirin",
          "weight": 10,
          "unit": "mg",
          "period": "BID"
        },
        {
          "id": 77,
          "prescriptionId": 35,
          "genericN": "Atorvastatin",
          "weight": 10,
          "unit": "mg",
          "period": "BID"
        }
      ]
    },
    {
      "dateTime": "2024-03-30T09:25:49.0281477",
      "drugs": []
    },
    {
      "dateTime": "2024-04-12T19:49:46.7035163",
      "drugs": [
        {
          "id": 95,
          "prescriptionId": 60,
          "genericN": "Paracetamol",
          "weight": 88,
          "unit": "mg",
          "period": "BD"
        }
      ]
    },
    {
      "dateTime": "2024-04-13T15:14:27.544342",
      "drugs": [
        {
          "id": 1097,
          "prescriptionId": 1085,
          "genericN": "Atorvastatin",
          "weight": 88,
          "unit": "mg",
          "period": "BD"
        }
      ]
    },
    {
      "dateTime": "2024-04-13T15:23:15.3037991",
      "drugs": [
        {
          "id": 1098,
          "prescriptionId": 1086,
          "genericN": "Paracetamol",
          "weight": 89,
          "unit": "mg",
          "period": "BD"
        }
      ]
    },
    {
      "dateTime": "2024-04-16T17:39:30.0141272",
      "drugs": [
        {
          "id": 1109,
          "prescriptionId": 1102,
          "genericN": "Aspirin",
          "weight": 20,
          "unit": "mg",
          "period": "BD"
        },
        {
          "id": 1110,
          "prescriptionId": 1102,
          "genericN": "Atorvastatin",
          "weight": 25,
          "unit": "mg",
          "period": "OD"
        }
      ]
    }
  ])

  const [data,setData] = useState([
    { rank:1,month: 'Jan 2', Levothyroxine: 50, Iodine: 10 , Thyroxin:5},
    { rank:2,month: 'Jan 18', Levothyroxine: 50, Iodine: 10 , Thyroxin:5},
    { rank:3,month: 'Jan 30', Levothyroxine: 50, Iodine: 10 , Thyroxin:5},
    { rank:4,month: 'Feb 4', Levothyroxine: 50, Iodine: 10 , Thyroxin:5},
    { rank:5,month: 'Feb 10', Levothyroxine: 50, Iodine: 10 , Thyroxin:6},
    { rank:10,month: 'Feb 20', Levothyroxine: 50, Iodine: 20, Thyroxin:8},
    { rank:11,month: 'Feb 28', Levothyroxine: 25, Iodine: 20 , Thyroxin:8},
    { rank:12,month: 'Mar 1', Levothyroxine: 25, Iodine: 20 , Thyroxin:10},
    { rank:13,month: 'Mar 6', Levothyroxine: 20, Iodine: 20 , Thyroxin:12},
    { rank:14,month: 'Mar 12', Levothyroxine: 20, Iodine: 30 , Thyroxin:16},
    { rank:15,month: 'Mar 20', Levothyroxine: 20, Iodine: 30 , Thyroxin:22},
    { rank:16,month: 'Mar 30', Levothyroxine: 20, Iodine: 30 , Thyroxin:22},
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
    listDrugs(sample)
  },[])


  const listDrugs=(dt)=>{
    let drugArr=[]
    let dateArr=[]
    dt.forEach(el => {
      el.dateTime=el.dateTime.substring(0, 10)
      el.drugs.forEach((elm)=>{
        drugArr.push(elm.genericN)
      })
      dateArr.push(el.dateTime)
    });
    drugArr=drugArr.filter((value, index, self) => self.indexOf(value) === index);
    console.log(JSON.stringify(drugArr))
    console.log(JSON.stringify(dateArr))
  }

  //convert rank values into nominal values in legend
  const toolTipFormatter = (props) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const dataItem = data.find(item => item.rank === payload[0].payload.rank);
      return (
        <Paper className="custom-tooltip" sx={{borderRadius:'0',pl:'4px',pr:'4px'}}>
          <Typography sx={{fontSize:'14px',fontWeight:'bold',color:'grey'}}>{`${dataItem.month}`}</Typography>
          {payload.map((entry, index) => (
            <Typography sx={{fontSize:'12px'}} key={index}>{`${entry.dataKey}: ${entry.value}`}</Typography>
          ))}
        </Paper>
      )}
    return null;
  };  
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
        <XAxis 
          dataKey="rank" 
          type='number'
          tick={{ fontFamily: 'Arial', fontSize: 12 }}
          tickFormatter={(value) => data.find(item => item.rank === value)?.month || ''}
        />
        <YAxis />
        <Tooltip content={toolTipFormatter}/>
        {selectedMed.map((el) => (
          <Line key={el} type="stepAfter" dataKey={el} stroke={col[el]} activeDot={{ r: 8 }} />
        ))}      
        </LineChart>
    </ResponsiveContainer>
</Box>
)
}

export default Doctor_analytics;
