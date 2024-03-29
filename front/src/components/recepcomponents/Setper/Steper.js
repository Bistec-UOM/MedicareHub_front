import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "./steper.css";

export default function Steper(props) {
  function getStartTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);

    let hours = dateTime.getHours();
    hours = hours % 12 || 12; // Convert 0 to 12

    const minutes = dateTime.getMinutes();

    const amOrPm = dateTime.getHours() >= 12 ? "PM" : "AM";

    const timeString = `${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${amOrPm}`; // Format the time string

    return timeString;
  }

  function getEndingTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);

    dateTime.setMinutes(dateTime.getMinutes() + 20); // Add 20 minutes to the current time

    let hours = dateTime.getHours();

    hours = hours % 12 || 12; // Convert 0 to 12

    const minutes = dateTime.getMinutes();

    const amOrPm = dateTime.getHours() >= 12 ? "PM" : "AM";

    const timeString = `${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${amOrPm}`;

    return timeString;
  }

  const findOpacityStatus = (label) => {
    if (label == "Completed" || label == "cancelled") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Box>
      <Stepper orientation="vertical" activeStep={0}>
        {props.items &&
          props.items
            .filter((item) => {
              return props.search.toLowerCase() === ""
                ? item
                : item.patient.fullName
                    .toLowerCase()
                    .includes(props.search.toLowerCase());
            })
            .map((label) => (
              <Step key={label.appointment.id}>
                <StepLabel
                  sx={{
                    opacity: findOpacityStatus(label.appointment?.status)
                      ? 0.5
                      : 1,
                  }}
                >
                  {getStartTime(label.appointment?.dateTime)}-{" "}
                  {getEndingTime(label.appointment?.dateTime)}{" "}
                </StepLabel>
              </Step>
            ))}
      </Stepper>
    </Box>
  );
}
