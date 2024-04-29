import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

export default function BasicTimePicker({ selectedTime, setSelectedTime, label }) {
  const saveTime = (time) => {
    setSelectedTime(time);
  };

  // Function to check if a specific time should be disabled
  const shouldDisableTime = (timeValue) => {
    // Define the start and end times of the time period to disable
    const startTimeToDisable = dayjs('09:00', 'HH:mm');
    const endTimeToDisable = dayjs('17:00', 'HH:mm');

    // Convert the timeValue to dayjs for comparison
    const time = dayjs(timeValue);

    // Check if the time falls within the disabled time period
    return time.isBetween(startTimeToDisable, endTimeToDisable);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <TimePicker
          views={["hours", "minutes"]}
          format="hh:mm"
          value={selectedTime}
          onChange={(newValue) => {
            saveTime(newValue);
          }}
          label={label}
          shouldDisableTime={shouldDisableTime} // Pass the function to disable specific time period
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
