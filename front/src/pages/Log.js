import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Link,
  CircularProgress,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL, deleteLog, endPoints } from "../Services/Auth";
import { jwtDecode } from "jwt-decode";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import DoneIcon from "@mui/icons-material/Done";
import SendIcon from "@mui/icons-material/Send";

export default function Log() {
  const navigate = useNavigate();
  const [Log, SetLog] = useState(false);

  const [phase, setPhase] = useState(0); //0-> log     1-> enter Otp     2-> new pwd

  // SnackBar component properties------------------
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("Init");
  const [col, setCol] = useState("Primary");

  const handleClick = (x, c) => {
    setOpen(true);
    setMsg(x);
    setCol(c);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //Basic loging =====================================================>>>>>>>>>>>>>>>>>>>
  const [count, setCount] = useState(0);
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const setData = () => {
    if (password === "" || user === "") {
      handleClick("Fill the empty fields", "warning");
      return;
    }
    let obj = {
      UserId: user,
      Password: password,
    };
    deleteLog();
    setLoadingB(true);
    axios
      .post(baseURL + endPoints.LOG, obj)
      .then((res) => {
        localStorage.setItem("medicareHubToken", res.data);
        //Navigate User
        SetLog(true);
        let tmp = jwtDecode(localStorage.getItem("medicareHubToken")).Role;
        switch (tmp) {
          case "Admin":
            navigate("admin");
            break;
          case "Doctor":
            navigate("doct");
            break;
          case "Receptionist":
            navigate("res");
            break;
          case "Cashier":
            navigate("pharm");
            break;
          case "Lab Assistant":
            navigate("lab");
            break;
        }
        setLoadingB(false);
      })
      .catch((er) => {
        if (er.hasOwnProperty("response")) {
          if (count <= 2) {
            //allow only three errors
            setCount((prev) => prev + 1);
            if(er.response.status==401){
              handleClick(er.response.data, "error");
            }else{
              handleClick("Error occured! Try again", "error");
            }
          } else {
            handleClick("Forgot Password? Try Reset", "warning");
            setCount(0);
          }
          setLoadingB(false);
        } else {
          console.log(er);
          setLoadingB(false);
        }
      });
  };



  const clearData = () => {
    setUser("");
    setPassword("");
  };

  useEffect(() => {
    setCount(0);
  }, [user]);

  useEffect(() => {
    document.body.style.margin = "0";
    deleteLog();
  }, []);

  const [loadingB, setLoadingB] = useState(false); //Loading button states
  const [prog, setProg] = useState(false); // for progress when resetting

  //stage 0
  //Password reset ===============================================>>>>>>>>>>>

  const [otpmsg, setOtpmsg] = useState("check your email");
  const [otp, setOtp] = useState("");

  const resetInit = () => {
    if (!user) {
      handleClick("No user", "warning");
      return;
    }
    setProg(true);
    axios
      .post(baseURL + endPoints.SENDOTP + `?id=${user}`)
      .then((res) => {
        setProg(false);
        setLoadingB(false);
        setOtpmsg(res.data);
        setPhase(1);
      })
      .catch((er) => {
        setProg(false);
        setLoadingB(false);
        if (er.hasOwnProperty("response")) {
          handleClick(`${er.response.data}`, "error");
        }
        console.log(er);
      });
  };

  //stage 1
  //Check OTP ==================================================>>>>>>>>>>>>>>>>

  const checkOTP = () => {
    setLoadingB(true);
    let obj = {
      UserId: user,
      OTP: otp,
    };
    console.log(obj);
    axios
      .post(baseURL + endPoints.CHECKOPT, obj)
      .then((res) => {
        setPassword("");
        setLoadingB(false);
        setPhase(2);
      })
      .catch((er) => {
        setLoadingB(false);
        if (er.hasOwnProperty("response")) {
          handleClick(`${er.response.data}`, "error");
        }
        console.log(er);
      });
  };

  //stage 2
  //New password ====================================================>>>>>>>>>>>>>
  const [confpassword, setconfPassword] = useState("");

  const sendNewPwd = () => {
    if (confpassword == password) {
      let obj = {
        UserId: user,
        Password: password,
      };
      setLoadingB(true);
      axios
        .post(baseURL + endPoints.NEW, obj)
        .then((res) => {
          setLoadingB(false);
          setPassword("");
          setconfPassword("");
          setOtp("");
          setOtpmsg("");
          setUser("");
          setPhase(0);
        })
        .catch((er) => {
          setLoadingB(false);
          setOtp("");
          setOtpmsg("");
          console.log(er);
        });
      setCount(0);
    } else {
      handleClick("Confirm password doesn't match", "warning");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundImage:
          "linear-gradient(to bottom,#DEF4F2, #DEF4F2 30%, white 30%, white)",
      }}
    >
      <Box sx={{ position: "fixed", mt: "5vh" }}>
        <LocalHospitalIcon
          sx={{ color: "red", mt: "10px" }}
          fontSize="large"
        ></LocalHospitalIcon>
        <Typography
          sx={{ fontSize: "40px", display: "inline", color: "#09D636" }}
        >
          Medicare
        </Typography>
        <Typography
          sx={{ fontSize: "40px", display: "inline", color: "#AFDCB9" }}
        >
          Hub
        </Typography>
      </Box>

      {phase == 0 ? (
        <Box
          sx={{
            width: "260px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            padding: "10px",
            pr: "30px",
            pl: "30px",
            backgroundColor: "white",
            height: "200px",
            alignSelf: "center",
            border: "1px solid lightgrey",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              alignSelf: "center",
              backgroundColor: "white",
            }}
          >
            User login
          </Typography>

          <TextField
            size="small"
            sx={{ mt: "5px", mb: "10px" }}
            id="1"
            label="User Id"
            type="number"
            autoComplete="current-password"
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
          <TextField
            size="small"
            sx={{ mt: "5px", mb: "10px" }}
            id="2"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <LoadingButton
              size="small"
              endIcon={<LoginIcon />}
              loading={loadingB}
              loadingPosition="end"
              variant="contained"
              onClick={setData}
              sx={{ ml: "5px"}}
            >
              Log
            </LoadingButton>
            <Button
              variant="outlined"
              sx={{ ml: "5px"}}
              onClick={clearData}
              color="warning"
              size="small"
            >
              Clear
            </Button>
            {!prog ? (
              <Typography
                sx={{
                  mr: "20%",
                  color: "grey",
                  textDecorationColor: "grey",
                  fontSize: "16px",
                  textDecorationLine: "underline",
                  cursor: "pointer",
                }}
                onClick={resetInit}
              >
                Reset
              </Typography>
            ) : (
              <CircularProgress
                size={20}
                sx={{ mr: "50px" }}
              ></CircularProgress>
            )}
          </div>
        </Box>
      ) : phase == 1 ? (
        <Box
          sx={{
            width: "260px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            padding: "10px",
            pr: "30px",
            pl: "30px",
            backgroundColor: "white",
            height: "200px",
            alignSelf: "center",
            border: "1px solid lightgrey",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              alignSelf: "center",
              backgroundColor: "white",
            }}
          >
            Verify OTP
          </Typography>

          <Typography sx={{ fontSize: "14px" }}>{otpmsg}</Typography>
          <TextField
            size="small"
            sx={{ mt: "5px", mb: "10px" }}
            id="2"
            label="Your OTP"
            type="number"
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <LoadingButton
              size="small"
              endIcon={<DoneIcon></DoneIcon>}
              loading={loadingB}
              loadingPosition="end"
              variant="contained"
              onClick={checkOTP}
              sx={{ ml: "5px" }}
            >
              OK
            </LoadingButton>
            <Button
              variant="outlined"
              sx={{ ml: "5px" }}
              onClick={clearData}
              color="warning"
              size="small"
            >
              Clear
            </Button>
          </div>
        </Box>
      ) : phase == 2 ? (
        <Box
          sx={{
            width: "260px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            padding: "10px",
            pr: "30px",
            pl: "30px",
            backgroundColor: "white",
            height: "200px",
            alignSelf: "center",
            border: "1px solid lightgrey",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              alignSelf: "center",
              backgroundColor: "white",
            }}
          >
            Enter New Password
          </Typography>

          <TextField
            size="small"
            sx={{ mt: "5px", mb: "10px" }}
            id="1"
            label="New Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <TextField
            size="small"
            sx={{ mt: "5px", mb: "10px" }}
            id="2"
            label="Confirm Password"
            type="password"
            onChange={(e) => setconfPassword(e.target.value)}
            value={confpassword}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <LoadingButton
              size="small"
              endIcon={<SendIcon />}
              loading={loadingB}
              loadingPosition="end"
              variant="contained"
              onClick={sendNewPwd}
              sx={{ ml: "5px" }}
            >
              Submit
            </LoadingButton>
            <Button
              variant="outlined"
              sx={{ ml: "5px" }}
              onClick={clearData}
              color="warning"
              size="small"
            >
              Clear
            </Button>
          </div>
        </Box>
      ) : (
        ""
      )}

      {/* ----------------- snack bar ----------------------------------------------------------------*/}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ mt: "100px" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={col}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
