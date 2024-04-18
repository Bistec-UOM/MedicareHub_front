import React, { useState,useEffect } from 'react';
import { Grid, Paper, Typography,TableCell,TableRow,TableHead,TableBody,Table} from '@mui/material';
import axios from 'axios';
import SuccessNotification from '../recepcomponents/SnackBar/SuccessNotification';
import { baseURL, endPoints } from '../../Services/Admin';
import SearchGraph from './AnalyticsComponents.js/SearchGraph';
import ExportDefaultToolbar from './AnalyticsComponents.js/DrugTable';
import ToolbarGrid from './AnalyticsComponents.js/DrugTable';


const ADrugs = () => {
  //notifications
  const [notificationOpen,setNotificationOpen]=useState(false);
  const [notiMessage,setNotiMessage]=useState("");
  const [typenoti, settypenoti] = useState('success');



  const [pdata, setPdata] = useState([]);
  const [rows, setrows] = useState([]);
  useEffect(() => {
    axios.get(baseURL+endPoints.A_DrugUsage)
      .then(response => {
        console.log(response.data);
        setPdata(response.data);
      })
      .catch(err => {
        if (err.message === 'Network Error') { 
          console.error('You are not connected');
          setNotiMessage("You are not connected");
          settypenoti('error')
          setNotificationOpen(true);
      } else {
        console.error(err);
      }
      });

      axios.get(baseURL+endPoints.A_DrugAvailable)
      .then(res => {
        console.log(res.data);
        setrows(res.data);
      })
      .catch(error => {
        console.log("error in available count axios method");
      });
  }, []); // Empty dependency array means this effect runs once on mount
  
  // Rest of your component
  const drugTypes = pdata.flatMap(data => data.drugType);

const uniqueDrugTypes = drugTypes.reduce((unique, item) => 
  unique.some(drug => drug.name === item.name) ? unique : [...unique, item], []);


//date today
  const currentDate = new Date(); 

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
  //data filter within time gap
  const filteredData = pdata.filter(entry => {
    const entryDate = new Date(entry.datefor);
    return entryDate >= TimeGap && entryDate <= currentDate;
  });
    // Add a new state variable for the most used drug
    const [mostUsedDrug, setMostUsedDrug] = useState(null);

    const TimeGap30 = new Date();
    TimeGap30.setDate(currentDate.getDate() - 30); // Set TimeGap to 30 days ago
    
    const filter30Data = pdata.filter(entry => {
      const entryDate = new Date(entry.datefor);
      return entryDate >= TimeGap30 && entryDate <= currentDate;
    });



const DrugData = selectedDrug ? 
  filteredData.flatMap(data => 
    data.drugType
      .filter(drug => drug.name === selectedDrug.name)
      .map(drug => ({ 
        ...drug,
        datefor: data.datefor 
      }))
  ) : [];
  const drugconter = filter30Data.flatMap(data => data.drugType);  
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
let graph = {
  x: 'datefor',
  y: 'quantity',
  var:'select a drug'
};
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper style={{ textAlign: 'center', height: '35vh', paddingTop: "6%" }} >
            <Typography fontSize={25}>Most Used Drug(last 30 days)</Typography>
            <Typography fontSize={30}sx={{marginTop:4}}>{loading ? 'Loading...' : mostUsedDrug}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={8} style={{textAlign:'right'}}>
        
<SearchGraph uniqueModelTypes={uniqueDrugTypes} selectModelType={selectDrugType} Value={Value} graph={graph} handleChange={handleChange} ModelData={DrugData}></SearchGraph>


        </Grid>
      </Grid>
      <Grid>
      <Paper sx={{margin:'20px'}}>
      <ToolbarGrid data={rows}/>
      </Paper>
      </Grid>

      <SuccessNotification setNotificationOpen={setNotificationOpen} notiMessage={notiMessage} notificationOpen={notificationOpen} type={typenoti}></SuccessNotification>
    </div>
  );
}

export default ADrugs;
