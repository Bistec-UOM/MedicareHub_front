import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,ResponsiveContainer } from 'recharts';
import { Box,FormGroup,FormControlLabel,Checkbox, Typography, Paper, Divider} from '@mui/material'


const Doctor_analytics = () => {

  const [medList,setMedList]=useState([]);
  const [selectedMed, setSelectedMed] = useState([]);
  const [col,setCol]=useState({})
  const [done,setDone]=useState(false)

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
          "weight": 20,
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
          "weight": 25,
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
          "weight": 20,
          "unit": "mg",
          "period": "BID"
        }
      ]
    },
    {
      "dateTime": "2024-03-29T08:30:00",
      "drugs": [
        {
          "id": 76,
          "prescriptionId": 35,
          "genericN": "Aspirin",
          "weight": 20,
          "unit": "mg",
          "period": "BID"
        },
        {
          "id": 77,
          "prescriptionId": 35,
          "genericN": "Atorvastatin",
          "weight": 30,
          "unit": "mg",
          "period": "BID"
        }
      ]
    },
    {
      "dateTime": "2024-04-05T19:49:46.7035163",
      "drugs": [
        {
          "id": 95,
          "prescriptionId": 60,
          "genericN": "Paracetamol",
          "weight": 50,
          "unit": "mg",
          "period": "BD"
        }
      ]
    },
    {
      "dateTime": "2024-04-12T15:14:27.544342",
      "drugs": [
        {
          "id": 1097,
          "prescriptionId": 1085,
          "genericN": "Paracetamol",
          "weight": 50,
          "unit": "mg",
          "period": "BD"
        }
      ]
    },
    {
      "dateTime": "2024-04-15T15:23:15.3037991",
      "drugs": [
        {
          "id": 1098,
          "prescriptionId": 1086,
          "genericN": "Paracetamol",
          "weight": 40,
          "unit": "mg",
          "period": "BD"
        }
      ]
    },
    {
      "dateTime": "2024-04-31T17:39:30.0141272",
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
          "weight":40,
          "unit": "mg",
          "period": "OD"
        }
      ]
    }
  ])

  const [data,setData] = useState([]);

  const getRandomColor=()=>{
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(()=>{
    listDrugs(sample)
    console.log(data)
  },[])

  //scaling the date
  const formatDateValue=(dateString)=>{
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); 
    const startOfYear = new Date(year, 0, 0);
    const diff = date - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const yearPart = year.toString().slice(-2);
    const paddedDayOfYear = dayOfYear.toString().padStart(3, '0');
    return parseInt(`${yearPart}${paddedDayOfYear}`);
}

  const listDrugs=(dt)=>{
    let drugArr=[]
    let obj=[]
    let objUnit={}
    //extracting drugs list
    dt.forEach((el,ind)=>{
      el.drugs.forEach((elm)=>{
        drugArr.push(elm.genericN)
      })
    })
    drugArr=drugArr.filter((value, index, self) => self.indexOf(value) === index);
    //extracting dates
    dt.forEach(el => {
      objUnit.month=el.dateTime.substring(0, 10)
      objUnit.rank=formatDateValue(el.dateTime.substring(0, 10))
      obj.push(objUnit)
      objUnit={}
    });
    //creating the formated data object adding drug data
    dt.forEach((el,ind)=>{
      el.drugs.forEach((elm,indx)=>{
        obj[ind][elm.genericN]=elm.weight
      })
    })
    //offset the date
    let min=obj[0].rank
    obj.forEach((elm)=>{
      elm.rank-=min
    })
    setMedList(drugArr)
    setSelectedMed(drugArr)
    setData(obj)
    //setcolors array
    let colobj={}
    drugArr.map((el)=>{
      colobj[el]=getRandomColor()
    })
    setCol(colobj)
    setDone(true)
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
            <Typography sx={{fontSize:'12px'}} key={index} >{`${entry.dataKey}: ${entry.value}`}</Typography>
          ))}
        </Paper>
      )}
    return null;
  };  

return(
done?<Box>
    <Box sx={{display:'flex',justifyContent:'space-around'}}>
      <Paper sx={{p:'5px',borderRadius:'0'}}>
        <Typography sx={{fontSize:'16px',color:'grey',fontWeight:'bold'}}>Drugs</Typography>
        <Divider></Divider>
        <FormGroup >
        {medList.map((el,ind) => (
            <FormControlLabel
                key={el}
                control={<Checkbox size='small' sx={{height:'22px'}} style={{ color: col[el] }} checked={selectedMed.includes(el)} onChange={() => handleMedToggle(el)} />}
                label={<Typography sx={{fontSize:'15px'}}>{el}</Typography>}
              />
            ))}
        </FormGroup>
      </Paper>

      <Paper sx={{p:'5px',borderRadius:'0'}}>
        <Typography sx={{fontSize:'16px',color:'grey',fontWeight:'bold'}}>Lab tests</Typography>
        <Divider></Divider>
        <FormGroup >
        {medList.map((el,ind) => (
              ind===2?<FormControlLabel
                key={el}
                control={<Checkbox size='small' sx={{height:'20px'}} style={{ color: col[el] }} checked={selectedMed.includes(el)} onChange={() => handleMedToggle(el)} />}
                label={<Typography sx={{fontSize:'14px'}}>{el}</Typography>}
              />:''
            ))}
        </FormGroup>
      </Paper>
    </Box>


    <ResponsiveContainer width={750} height={350}>
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
          dataKey="month"
        />
        <YAxis />
        <Tooltip content={toolTipFormatter}/>
        {selectedMed.map((el) => (
          <Line key={el} type="stepAfter" dataKey={el} stroke={col[el]} activeDot={{ r: 8 }} />
        ))}      
        </LineChart>
    </ResponsiveContainer>
</Box>:''
)
}

export default Doctor_analytics;
