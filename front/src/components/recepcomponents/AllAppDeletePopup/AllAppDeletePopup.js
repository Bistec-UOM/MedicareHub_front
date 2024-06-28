import * as React from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import {  Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { baseURL, endPoints } from "../../../Services/Appointment";
import { setHeaders } from "../../../Services/Auth";
import DoneIcon from "@mui/icons-material/Done";
import WarningIcon from "@mui/icons-material/Warning";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

export default function AllAppDeletePopup({
  selectedDay,
  delcount,
  setDelcount,
  docid,
  handleNotification,
  dopen,
  setDopen,
  filteredAppointments,
  setFilteredAppointments,
  isDisabled,
  setIsDisabled,
}) {
  const [allDelLoading, setAllDelLoading] = useState(false);
  const handleRealAllDelete = () => {
    //real deleting of all appointments of the day
    setAllDelLoading(true);
    axios
      .delete(
        baseURL + endPoints.AppDay + `${docid}` + "/day/" + `${selectedDay}`,
        setHeaders()
      )
      .then((response) => {
        setAllDelLoading(false);
        setDelcount(delcount + 1);
        setDopen(false);
        handleNotification("All appointments deleted succesfully!", "success");
      })
      .catch((error) => {
        setAllDelLoading(false);
        handleNotification("Network Error Occured!", "error");
      });
  };
  const handleClose = () => {
    setDopen(false);
  };
  return (
    <Dialog open={dopen} onClose={handleClose}>
      <div
        style={{
          display: "flex",
          alignItems: "start",
          margin: "8px",
          paddingBottom: "5px",
          borderBottom: "1px solid lightgrey",
        }}
      >
        <WarningIcon color="warning" sx={{ mr: "10px" }}></WarningIcon>
        <Typography>
          {" "}
          Are you sure the entire list for this to be deleted?
        </Typography>
      </div>
      <div
        style={{
          width: "100%",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          sx={{ mr: "40px" }}
          size="small"
          endIcon={<CloseIcon></CloseIcon>}
          onClick={handleClose}
        >
          No
        </Button>
        <LoadingButton
          variant="contained"
          size="small"
          endIcon={<DoneIcon></DoneIcon>}
          loading={allDelLoading}
          loadingPosition="end"
          onClick={handleRealAllDelete}
        >
          Yes
        </LoadingButton>
      </div>
    </Dialog>
  );
}
