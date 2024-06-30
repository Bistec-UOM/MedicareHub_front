import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,ResponsiveContainer } from 'recharts';
import { Box,FormGroup,FormControlLabel,Checkbox, Typography, Paper, Divider} from '@mui/material'
import axios from 'axios';
import { baseURL ,endPoints} from '../Services/Lab';
import {Load} from '../components/Common'

const Doctor_analytics = ({lbAnalytics,drgAnalytics}) => {
  //console.log(lbAnalytics)
  console.log(drgAnalytics)
  // lbAnalytics , drgAnalytics ===> fetched analytics raw data from parent component
  const [medList,setMedList]=useState([]);//all unique drugs (list) extracted from records
  const [labList,setlabList]=useState([]);//all unique lab parameters (list) extracted from records
  const [fieldNames,setFieldNames]=useState([]);//test names with their paraemters
  const [selectedMed, setSelectedMed] = useState([]);//active drugs
  const [selectedLab, setSelectedLab] = useState([]);//active test parameters
  const [col,setCol]=useState({})//color aray for drugs
  const [col2,setCol2]=useState({})//color array for lab parameters
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
  
  const handleLabToggle = (x) => {
    setSelectedLab(prev => {
      if (prev.includes(x)) {
        return prev.filter(el => el !== x);
      } else {
        return [...prev, x];
      }
    });
  };

  const temp=[
    {
      "reportId": 42,
      "testName": "Thyroid Function Test",
      "dateTime": "2024-04-08T13:47:11.3306861",
      "results": [
        {
          "fieldname": "Thyroid-Stimulating Hormone (TSH)",
          "value": 0.2,
          "minRef": 0.4,
          "maxRef": 4,
          "unit": "mU/L",
          "status": "low"
        },
        {
          "fieldname": "Thyroxine (T4)",
          "value": 12,
          "minRef": 9,
          "maxRef": 24,
          "unit": "pMol/L",
          "status": "normal"
        }
      ]
    },
    {
      "reportId": 43,
      "testName": "Thyroid Function Test",
      "dateTime": "2024-04-16T13:47:45.5301758",
      "results": [
        {
          "fieldname": "Thyroid-Stimulating Hormone (TSH)",
          "value": 0.5,
          "minRef": 0.4,
          "maxRef": 4,
          "unit": "mU/L",
          "status": "normal"
        },
        {
          "fieldname": "Thyroxine (T4)",
          "value": 16,
          "minRef": 9,
          "maxRef": 24,
          "unit": "pMol/L",
          "status": "normal"
        }
      ]
    },
    {
      "reportId": 44,
      "testName": "Thyroid Function Test",
      "dateTime": "2024-04-24T13:47:29.8703541",
      "results": [
        {
          "fieldname": "Thyroid-Stimulating Hormone (TSH)",
          "value": 0.3,
          "minRef": 0.4,
          "maxRef": 4,
          "unit": "mU/L",
          "status": "low"
        },
        {
          "fieldname": "Thyroxine (T4)",
          "value": 14,
          "minRef": 9,
          "maxRef": 24,
          "unit": "pMol/L",
          "status": "normal"
        }
      ]
    },
    {
      "reportId": 45,
      "testName": "Full Blood Count",
      "dateTime": "2024-04-16T14:22:34.2687332",
      "results": [
        {
          "fieldname": "Hemoglobin",
          "value": 12,
          "minRef": 11.5,
          "maxRef": 13.5,
          "unit": "g/DL",
          "status": "normal"
        },
        {
          "fieldname": "Mean Corpuscular Volume",
          "value": 85,
          "minRef": 80,
          "maxRef": 100,
          "unit": "fL",
          "status": "normal"
        },
        {
          "fieldname": "Platelet Count",
          "value": 155,
          "minRef": 150,
          "maxRef": 450,
          "unit": "K/uL",
          "status": "normal"
        },
        {
          "fieldname": "Mean Corpuscular Hemoglobin",
          "value": 30,
          "minRef": 27,
          "maxRef": 33,
          "unit": "pg",
          "status": "normal"
        },
        {
          "fieldname": "Mean Corpuscular Hemoglobin Concentration",
          "value": 32,
          "minRef": 32,
          "maxRef": 36,
          "unit": "g/dL",
          "status": "normal"
        },
        {
          "fieldname": "Red Cell Distribution",
          "value": 12,
          "minRef": 11.5,
          "maxRef": 14.5,
          "unit": "%",
          "status": "normal"
        },
        {
          "fieldname": "Platelet Distribution width",
          "value": 9.5,
          "minRef": 9.2,
          "maxRef": 14.8,
          "unit": "fL",
          "status": "normal"
        }
      ]
    },
    {
      "reportId": 46,
      "testName": "Full Blood Count",
      "dateTime": "2024-04-24T14:23:09.4178641",
      "results": [
        {
          "fieldname": "Hemoglobin",
          "value": 12,
          "minRef": 11.5,
          "maxRef": 13.5,
          "unit": "g/DL",
          "status": "normal"
        },
        {
          "fieldname": "Mean Corpuscular Volume",
          "value": 86,
          "minRef": 80,
          "maxRef": 100,
          "unit": "fL",
          "status": "normal"
        },
        {
          "fieldname": "Platelet Count",
          "value": 155,
          "minRef": 150,
          "maxRef": 450,
          "unit": "K/uL",
          "status": "normal"
        },
        {
          "fieldname": "Mean Corpuscular Hemoglobin",
          "value": 31,
          "minRef": 27,
          "maxRef": 33,
          "unit": "pg",
          "status": "normal"
        },
        {
          "fieldname": "Mean Corpuscular Hemoglobin Concentration",
          "value": 32,
          "minRef": 32,
          "maxRef": 36,
          "unit": "g/dL",
          "status": "normal"
        },
        {
          "fieldname": "Red Cell Distribution",
          "value": 11.8,
          "minRef": 11.5,
          "maxRef": 14.5,
          "unit": "%",
          "status": "normal"
        },
        {
          "fieldname": "Platelet Distribution width",
          "value": 9.5,
          "minRef": 9.2,
          "maxRef": 14.8,
          "unit": "fL",
          "status": "normal"
        }
      ]
    }
  ]

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

  const [data,setData] = useState([]);//Data to be plotted on drug graph
  const [data2,setData2] = useState([]);//Data to be plotted on lab report graph

  const getRandomColor=()=>{
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(()=>{
    //axios.get(`${baseURL+endPoints.ANALYTIC}?Id=${pId}`)
    listDrugs(drgAnalytics)
    listLabs(lbAnalytics)
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
    
    //extracting drugs list (unique drug names)
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
    setMedList(drugArr)//
    setSelectedMed(drugArr)
    setData(obj)
    console.log(obj);
    //setcolors array
    let colobj={}
    drugArr.map((el)=>{
      colobj[el]=getRandomColor()
    })
    setCol(colobj)
    setDone(true)
  }

  const listLabs=(dt)=>{
    //extracting the dates list
    let dateList = dt.map(item => item.dateTime.substring(0, 10));
    dateList = [... new Set(dateList)];
    dateList.sort();

    //test names with their paraemters
    let fieldNamesByTestName = dt.reduce((acc, item) => {
      if (!acc[item.testName]) {
        acc[item.testName] = [...new Set(item.results.map(result => result.fieldname))];
      }
      return acc;
    }, {});

    fieldNamesByTestName = Object.entries(fieldNamesByTestName).map(([testName, fieldNames]) => ({ [testName]: fieldNames }));
    setFieldNames(fieldNamesByTestName)

    //extract all props(test parameters) list
    let props=[]
    fieldNamesByTestName.forEach((el)=>{
      Object.values(el)[0].forEach((elm)=>{
        props.push(elm)
      })
    })
    setlabList(props)
    setSelectedLab(props)
    
    // Navigate through every date and gather every possible test parameter
    let finalArray = [];

    dateList.forEach(date => {
      let sameDateObjects = dt.filter(item => item.dateTime.substring(0,10) === date);
      let fieldnameValuePairs = {};
      sameDateObjects.forEach(obj => {
        obj.results.forEach(result => {
          fieldnameValuePairs[result.fieldname] = result.value;
        });
      });
    
      fieldnameValuePairs.date=date
      fieldnameValuePairs.rank=formatDateValue(date)
      finalArray.push(fieldnameValuePairs);
    });

    setData2(finalArray);
    //set the color array
    let colobj={}
    props.map((el)=>{
      colobj[el]=getRandomColor()
    })
    setCol2(colobj)

  }

  //drug tooltip
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
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper className="custom-tooltip" sx={{borderRadius:'0',pl:'4px',pr:'4px'}}>
          <Typography sx={{fontSize:'14px',fontWeight:'bold',color:'grey'}}>{`${label}`}</Typography>
          {payload.map((entry, index) => (
            <Typography key={`item-${index}`} sx={{fontSize:'12px'}}>
              {`${entry.name}: ${entry.value}`}
            </Typography>
          ))}
        </Paper>
      );
    }}
 

return(
done?<Box sx={{width:'100%'}}>
  {drugs.length>0?
      <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',pl:'10px',pr:'10px'}}>
      <Paper sx={{p:'5px',borderRadius:'0',maxWidth:'150px',maxHeight:'280px',overflowY:'scroll'}}>
        <Typography sx={{fontSize:'14px',color:'grey',fontWeight:'bold'}}>Drugs</Typography>
        <Divider></Divider>
        <FormGroup >
        {medList.map((el,ind) => (
            <FormControlLabel
                key={el}
                control={<Checkbox size='small' sx={{height:'22px'}} style={{ color: col[el] }} checked={selectedMed.includes(el)} onChange={() => handleMedToggle(el)} />}
                label={<Typography sx={{fontSize:'12px'}}>{el}</Typography>}
              />
            ))}
        </FormGroup>
      </Paper>
      
    <ResponsiveContainer width={700} height={260}>
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
    </Box>
  :<Typography sx={{color:'grey',p:'10px',fontSize}}>No drug history</Typography>}
    {/*------------ drugs graph -------------------------------------------------------*/}


    {/*------------ Lab reports graph -------------------------------------------------------*/}
    {data2.length>0?
        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',pl:'10px',pr:'10px'}}>
        <Paper sx={{p:'5px',borderRadius:'0',maxWidth:'150px',maxHeight:'280px',overflowY:'scroll'}}>
            <Typography sx={{fontSize:'14px',color:'grey',fontWeight:'bold'}}>Lab Reports</Typography>
            <Divider></Divider>
            <FormGroup >
            {fieldNames.map((el)=>{
            return(
            Object.values(el)[0].map((elm,inx)=>{
            return(
              <div>
              {inx==0?<Typography sx={{fontSize:'15px',mt:'8px'}}>{Object.keys(el)[0]}</Typography>:''}
              <FormControlLabel
              key={elm}
              control={<Checkbox size='small' sx={{ml:'10px',height:'22px'}} style={{ color: col2[elm]}} checked={selectedLab.includes(elm)} onChange={() => handleLabToggle(elm)}/>}
              label={<Typography sx={{fontSize:'12px'}}>{elm}</Typography>}
            />
            </div>
            )
          }))
        })}
            </FormGroup>
          </Paper>
          
        <ResponsiveContainer width={700} height={260}>
          <LineChart
            data={data2}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date"
            />
            <Tooltip content={<CustomTooltip />} />
            <YAxis />
            {selectedLab.map((el) => (
              <Line key={el} type="stepAfter" dataKey={el} stroke={col2[el]} activeDot={{ r: 8 }} />
            ))}      
            </LineChart>
        </ResponsiveContainer>
        </Box>:<Typography sx={{color:'grey',p:'10px',fontSize}}>No lab history</Typography>}



</Box>:<Load></Load>
)
}

export default Doctor_analytics;
