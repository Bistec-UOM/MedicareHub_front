import React from "react";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import SuccessNotification from "../recepcomponents/SnackBar/SuccessNotification";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState, useEffect } from "react";
import {Grid,Paper,MenuItem,InputLabel,Select,FormControl,Typography,TableCell,TableRow,TableHead,TableBody,Table,Box,} from "@mui/material";
import {AreaChart,ResponsiveContainer,Tooltip,XAxis,YAxis,Label,Area,} from "recharts";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { Button } from "@mui/material";
import { baseURL, endPoints } from "../../Services/Admin";
import SearchGraph from "./AnalyticsComponents.js/SearchGraph";
import LoadingButton from "@mui/lab/LoadingButton";
import { setHeaders } from "../../Services/Auth";

const AOther = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notiMessage, setNotiMessage] = useState("");
  const [typenoti, settypenoti] = useState("success");

  const [loadingB, setLoadingB] = useState(false); //Loading button states

  const [rows, setRows] = useState([]);
  const [date, setDate] = useState(null);

  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);

  //for lab reports
  const [labReports, setLabReports] = useState([]);

  const HandleSearch = (date) => {
    if (date) {
      const dateObject = new Date(date);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1; // Months are zero-based
      setYear(year);
      setMonth(month);
      setLoadingB(true);
    }
  };
  //for attendance
  useEffect(() => {
    if (year != "" && month != "") {
      console.log(year, month);
      axios
        .get(baseURL + endPoints.A_Attendance + `${year}-${month}`,setHeaders())
        .then((response) => {
          console.log(response.data);
          setRows(response.data);
          setLoadingB(false);
          // Add a date field to each item
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            console.error("You are not connected to internet");
            setNotiMessage("You are not connected to internet");
            settypenoti("error");
            setNotificationOpen(true);
            setLoadingB(false);

          } else {
            console.error(error);
            setLoadingB(false);
          }
        });
    }
  }, [year, month]);

  const rolekey = ["Doctor", "Receptionist", "Lab Assistant", "Cashier"];

  useEffect(() => {
    axios
      .get(baseURL + endPoints.A_LabReports,setHeaders())
      .then((response) => {
        console.log(response.data);
        setLabReports(response.data);
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          console.error("You are not connected to the internet");
          // Handle error notification or logging
        } else {
          console.error(error);
          // Handle other errors
        }
      });
  }, []);

  const labReportTypes = labReports.flatMap((data) => data.reports);
  const uniqueLabReportTypes = labReportTypes.reduce(
    (unique, item) =>
      unique.some((report) => report.name === item.name)
        ? unique
        : [...unique, item],
    []
  );

  //const date
  const currentDate = new Date();
  const [selectedLabReport, setSelectedLabReport] = useState(null);
  const [Value, setValue] = React.useState("month"); // Initialize Value state with 'day'
  const selectLabReportType = (value) => {
    setSelectedLabReport(value);
  };

  const initialTimeGap = new Date();
  initialTimeGap.setDate(currentDate.getDate() - 30);
  const [TimeGap, setTimeGap] = React.useState(initialTimeGap);

  const handleChange = (event) => {
    setValue(event.target.value);
    const newDate = new Date(currentDate);
    if (event.target.value === "month") {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else if (event.target.value === "year") {
      newDate.setFullYear(currentDate.getFullYear() - 1);
    } else if (event.target.value === "5") {
      newDate.setFullYear(currentDate.getFullYear() - 5);
    }
    setTimeGap(newDate);
  };

  const filteredData = labReports.filter((entry) => {
    const entryDate = new Date(entry.date);
    return entryDate >= TimeGap && entryDate <= currentDate;
  });

  const TestData = selectedLabReport
    ? filteredData.flatMap((data) =>
        data.reports
          .filter((type) => type.name === selectedLabReport.name)
          .map((type) => ({
            ...type,
            date: data.date,
          }))
      )
    : [];

    useEffect(() => {

  });
  let graph = {
    x: "date",
    y: "count",
    var: "select a type",
  };

  const workingDayCountObj = rows.find(
    (item) => item.workingDayCount !== undefined
  );
  const workingDayCount = workingDayCountObj
    ? workingDayCountObj.workingDayCount
    : 1; // Default to 1 to avoid division by zero

  return (
    <div>
      <Typography
        data-testid="A_Other"
        sx={{ textAlign: "center", fontWeight: "bolder", fontSize: "20px" }}
      >
        Attendance of Staff
      </Typography>
      <Paper sx={{ margin: "20px" }}>
        <Grid>
          <Box display="flex" justifyContent="center" alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                label="Select Month"
                format="YYYY-MM"
                size="small"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue); 
                }}
              />
            </LocalizationProvider>
            {/* <Button variant="contained" onClick={() => HandleSearch(date)} sx={{marginLeft:5,paddingLeft:5,paddingRight:5,padding:1}}>Find <PlayArrowIcon sx={{marginLeft:1}}></PlayArrowIcon></Button> */}
            <LoadingButton
              size="small"
              endIcon={<PlayArrowIcon />}
              loading={loadingB}
              loadingPosition="end"
              variant="contained"
              onClick={() => HandleSearch(date)}
              sx={{ ml: "10px",p:'6px' }}
            >
              Find
            </LoadingButton>
          </Box>
        </Grid>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Attendance
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Attendance %
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rolekey.map((role) => (
              <>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={3}
                    sx={{ backgroundColor: "rgb(244, 244, 244)" }}
                  >
                    {role}
                  </TableCell>
                </TableRow>
                {rows
                  .filter(
                    (item) => item.role === role && item.count !== undefined
                  )
                  .map((item) => {
                    const attendancePercentage =
                      (item.count / workingDayCount) * 100;
                    return (
                      <TableRow key={item.name}>
                        <TableCell align="center">{item.name}</TableCell>
                        <TableCell align="center">{item.count}</TableCell>
                        <TableCell align="center">
                          {attendancePercentage.toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Typography
        sx={{ textAlign: "center", fontWeight: "bolder", fontSize: "20px" }}
      >
        Lab Report Data
      </Typography>

      <Paper sx={{textAlign:'center'}}>
        <SearchGraph
          uniqueModelTypes={uniqueLabReportTypes}
          selectModelType={selectLabReportType}
          Value={Value}
          handleChange={handleChange}
          ModelData={TestData}
          graph={graph}
        ></SearchGraph>
      </Paper>
      <SuccessNotification
        setNotificationOpen={setNotificationOpen}
        notiMessage={notiMessage}
        notificationOpen={notificationOpen}
        type={typenoti}
      ></SuccessNotification>
    </div>
  );
};

export default AOther;
