import {Grid,Paper,MenuItem,FormControl,InputLabel,Select,Typography,} from "@mui/material";
import React, { useEffect } from "react";
import {LineChart,BarChart,Bar,ResponsiveContainer,Legend,Tooltip,Line,XAxis,YAxis,Label} from "recharts";
import axios from "axios";
import { useState } from "react";
import TotalPatientCount from "./AnalyticsComponents.js/TotalPatientCount";
import SuccessNotification from "../recepcomponents/SnackBar/SuccessNotification";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import { baseURL, endPoints } from "../../Services/Admin";
import { setHeaders } from "../../Services/Auth";

const APatient = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notiMessage, setNotiMessage] = useState("");
  const [typenoti, settypenoti] = useState("success");

  const [pdata, setPdata] = useState([]);

  useEffect(() => {
    axios
      .get(baseURL + endPoints.A_patient_count,setHeaders())
      .then((response) => {
        // console.log("data is ");
        // console.log(response.data);
        setPdata(response.data);
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          // console.error("You are not connected to internet");
          setNotiMessage("You are not connected to internet");
          settypenoti("error");
          setNotificationOpen(true);
        } else {
          console.error(error);
        }
      });
  }, []); // Empty dependency array means this effect runs once on mount

  //date filter
  const currentDate = new Date(); // Initialize currentDate
  const [TimeGap, setTimeGap] = React.useState(new Date(currentDate)); // Initialize TimeGap with current date
  const [Value, setValue] = React.useState("week"); // Initialize Value state with 'week'
  const [Value1, setValue1] = React.useState("week"); // Initialize Value state with 'week'

  const handleChange = (event) => {
    setValue(event.target.value);
    // change(event.target.value); // Call change function with selected value
  };

  useEffect(() => {
    const change = (Gap) => {
      const newTimeGap = new Date(currentDate);
      if (Gap === "week") {
        newTimeGap.setDate(currentDate.getDate() - 7);
      } else if (Gap === "month") {
        newTimeGap.setMonth(currentDate.getMonth() - 1);
      } else if (Gap === "year") {
        newTimeGap.setFullYear(currentDate.getFullYear() - 1);
      } else if (Gap === "5") {
        newTimeGap.setFullYear(currentDate.getFullYear() - 5);
      }
      setTimeGap(newTimeGap);
    };
    change(Value);
  }, [Value]); // Run the effect whenever Value changes

  const filteredData = pdata.filter((entry) => {
    const entryDate = new Date(entry.datefor);
    return entryDate >= TimeGap && entryDate <= currentDate;
  });

  const tickFormatter = (value) => {
    const date = new Date(value);
      return date.toLocaleDateString(); // Show date for other options
  };
  //end of date filter

  //type filter
  const [Type, setType] = React.useState("child");
  const [Agemale, setAgemale] = React.useState("");
  const [Agefemale, setAgefemale] = React.useState("");

  useEffect(() => {
    const changed = (gap) => {
      let Agemale = "";
      let Agefemale = "";
      if (gap === "child") {
        Agemale = "child_male";
        Agefemale = "child_female";
      } else if (gap === "young") {
        Agemale = "adult_male";
        Agefemale = "adult_female";
      } else if (gap === "old") {
        Agemale = "old_male";
        Agefemale = "old_female";
      }
      setAgemale(Agemale);
      setAgefemale(Agefemale);
    };
    changed(Type);
  }, [Type]);

  const [TimeGap1, setTimeGap1] = React.useState(new Date(currentDate)); // Initialize TimeGap1 with current date

  const handleChange1 = (event) => {
    setValue1(event.target.value);
    change1(event.target.value); // Call change1 function with selected value
  };

  const change1 = (Gap) => {
    const newTimeGap = new Date(currentDate);
    if (Gap === "week") {
      newTimeGap.setDate(currentDate.getDate() - 7);
    } else if (Gap === "month") {
      newTimeGap.setMonth(currentDate.getMonth() - 1);
    } else if (Gap === "year") {
      newTimeGap.setFullYear(currentDate.getFullYear() - 1);
    } else if (Gap === "5") {
      newTimeGap.setFullYear(currentDate.getFullYear() - 5);
    }
    setTimeGap1(newTimeGap);
  };

  useEffect(() => {
    change1(Value1);
  }, [Value1]); // Run the effect whenever Value1 changes

  const filteredData1 = pdata.filter((entry) => {
    const entryDate = new Date(entry.datefor);
    return entryDate >= TimeGap1 && entryDate <= currentDate;
  });

  const handletypeChange = (event) => {
    setType(event.target.value);
  };

  //end of type filter

  const totalperday = [];
  pdata.forEach((data) => {
    const date = data.datefor;
    const total =
      data.child_male +
      data.child_female +
      data.adult_female +
      data.adult_male +
      data.old_male +
      data.old_female;
    // Check if the date already exists in totalperday, if not, initialize it to 0
    if (!totalperday[date]) {
      totalperday[date] = 0;
    }
    totalperday[date] = total;
  });
  // Assuming you have a state variable for totalPatientsForCurrentDay
  let todaysData;
  const today = new Date();
  //pad used for enter another data to the array
  const todaydate = today.getFullYear() +"-" +(today.getMonth() + 1).toString().padStart(2, "0") +"-" +today.getDate().toString().padStart(2, "0") +"T00:00:00";
  todaysData = totalperday[todaydate];
  // console.log(todaydate, "today date", todaysData);
  if (!todaysData) {
    todaysData = 0;
  }
  // console.log("all data for today", todaysData);

  // console.log(totalperday,'current date',currentDate1,'data','total')

  const dataForChart = filteredData1.map((data) => ({
    totalPatients: totalperday[data.datefor], // Add total patients for the corresponding day
    datefor: new Date(data.datefor).toLocaleDateString(),
  }));
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
          <p className="intro" style={{color:'rgb(9, 214, 54)'}}>{`Patients: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  const CustomTooltipGrouped = ({ active, payload, label }) => {
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
          <p className="intro" style={{color:'blue'}}>{`Male: ${payload[0].value}`}</p>
          <p className="intro" style={{color:'rgb(9, 214, 54)'}}>{`Female: ${payload[1].value}`}</p>
        </div>
      );
    }
    return null;
  };
  

  return (
    <div>
      <Grid data-testid="A_Patient" container spacing={3}>
        <Grid item sm={4} xs={12}>
          <TotalPatientCount count={todaysData}></TotalPatientCount>
        </Grid>
        <Grid item sm={8} xs={12}>
          <Paper sx={{ padding: "10px",height:{xs:'40vh',sm:'70vh'} }}>
            <Typography fontSize={20} sx={{ textAlign: "center", fontWeight: "bolder", fontSize: "20px" }}>
              Patient count within a time period
            </Typography>
            <ResponsiveContainer aspect={2} style={{ textAlign: "right" }}>
              <FormControl sx={{ width:{xs:'40%',sm:'20%'}, marginRight: "2vw" }}>
                <InputLabel>Gap</InputLabel>
                <Select
                size="small"
                  style={{ textAlign: "left" }}
                  id="demo-simple-select"
                  value={Value1} // Change value prop to Value
                  label="Gap"
                  onChange={handleChange1}
                >
                  <MenuItem value={"week"}>Last Week</MenuItem>
                  <MenuItem value={"month"}>Last Month</MenuItem>
                  <MenuItem value={"year"}>Last Year</MenuItem>
                  <MenuItem value={"5"}>Last 5 Year</MenuItem>
                </Select>
              </FormControl>
              <LineChart data={dataForChart} style={{ padding: "0px" }}>
                <XAxis
                  dataKey="datefor"
                  fontSize={10}
                  interval={"preserveStartEnd"}
                >
                  <Label value="Date" position="insideBottom" offset={-5} />
                </XAxis>
                <YAxis>
                  <Label
                    value="Patients"
                    angle={-90}
                    position="insideLeft"
                    offset={4}
                  />
                </YAxis>
                <Tooltip content={<CustomTooltip/>}/>
                <Line
                  dataKey="totalPatients"
                  fill="rgb(9, 214, 54)"
                  name="Total Patients"
                  stroke="rgb(9, 214, 54)"
                  activeDot={{ r: 6 }}
                  type="monotone"
                  isAnimationActive={true} // Enable animation
                />
              </LineChart >
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
      <Grid>
        <Paper
          style={{
            padding: "15px 5px 60px 5px",
            textAlign: "right",
            marginTop: "20px",
          }}
        >
          <Typography
            fontSize={20}
            sx={{ textAlign: "center", fontWeight: "bolder", fontSize: "20px" ,marginBottom:'20px'}}
          >
            Patient count by age group
          </Typography>
          <ResponsiveContainer width="90%" height={400}>
            <FormControl sx={{ width:{xs:'40%',sm:'20%'}, marginRight: "2vw" }}>
              <InputLabel>Gap</InputLabel>
              <Select
                style={{ textAlign: "left" }}
                id="demo-simple-select"
                value={Value} // Change value prop to Value
                label="Gap"
                onChange={handleChange}
              >
                <MenuItem value={"week"}>Last week</MenuItem>
                <MenuItem value={"month"}>Last Month</MenuItem>
                <MenuItem value={"year"}>Last Year</MenuItem>
                <MenuItem value={"5"}>Last 5 Year</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width:{xs:'45%',sm:'20%'} }}>
              <InputLabel>Age</InputLabel>
              <Select
                style={{ textAlign: "left" }}
                id="demo-simple-select"
                value={Type}
                label="Gap"
                onChange={handletypeChange}
              >
                <MenuItem value={"child"}>Child(-18)</MenuItem>
                <MenuItem value={"young"}>Adult(18-45)</MenuItem>
                <MenuItem value={"old"}>Old(45+)</MenuItem>
              </Select>
            </FormControl>
            <BarChart
              data={filteredData}
              margin={{ top: 5, right: 30, left: 20, bottom: 1 }}
            >
              <XAxis dataKey="datefor" tickFormatter={tickFormatter} />
              <YAxis />
              <Tooltip content={<CustomTooltipGrouped/>}/>
              <Legend />
              <Bar
                dataKey={Agemale}
                name={Agemale}
                fill="blue"
                background={{ fill: "#eee" }}
              />
              <Bar dataKey={Agefemale} fill="rgb(9, 214, 54)" name={Agefemale} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <SuccessNotification
        setNotificationOpen={setNotificationOpen}
        notiMessage={notiMessage}
        notificationOpen={notificationOpen}
        type={typenoti}
      ></SuccessNotification>
    </div>
  );
};

export default APatient;
