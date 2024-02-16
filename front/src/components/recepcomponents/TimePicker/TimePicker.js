import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
export default function BasicTimePicker({
  selectedTime,
  setSelectedTime,
 
}) {

  const saveTime = (time) =>{
    setSelectedTime(time);

    
  
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <TimePicker
          views={["hours", "minutes"]}
          format="hh:mm"
          value={selectedTime}
          onChange={(newValue) => {
            saveTime(newValue)
          }}
          label="Select your time"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
