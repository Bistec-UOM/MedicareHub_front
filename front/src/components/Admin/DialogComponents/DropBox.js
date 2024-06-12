import { Button, Grid, Paper } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CLOUDINARY_URL } from "../../../Services/Admin";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SuccessNotification from "../../recepcomponents/SnackBar/SuccessNotification";

const DropBox = ({ className, handleDropBoxClose, DataUrl, setDataUrl }) => {
    //for loading
  const [loadingB, setLoadingB] = useState(false)
  
  const [files, setFiles] = useState([]);
  const preset_key = "q3oby5yd";
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    if (acceptedFiles?.length) {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

const [type, settype] = useState('');
const [notiMessage, setNotiMessage] = useState('');
const [notificationOpen, setNotificationOpen] = useState(false);

  const handleSubmit = async (e) => {
    setLoadingB(true)
    e.preventDefault(); // prevent form submission
    if (!files.length) {
      settype('error')
      setNotiMessage("No files selected!");
      setNotificationOpen(true);
      setLoadingB(false)
      return;} // if no files, return
    const file = files[0]; // get the first file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios
    .post(CLOUDINARY_URL, formData)
    .then((response) => {
        setLoadingB(false)
        console.log(response.data.url);
        setDataUrl(response.data.url); // Update the data in the parent component
        handleDropBoxClose(); // Close the dropbox
      })
      .catch((error) => {
        setLoadingB(false)
        console.log(error);
      });
  };



  return (
    <div>
      <form>
        <div {...getRootProps()} className="dropbox">
          <input
            {...getInputProps({
              className: className,
            })}
          />
          {isDragActive ? (
            <div
              style={{
                border: "3px dashed rgb(59, 135, 122)",
                color: "rgb(59, 135, 122)",
                backgroundColor: "white",
                padding: "1vh",
              }}
            >
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          ) : (
            <div
              style={{
                border: "3px dashed rgb(222, 244, 242)",
                backgroundColor: "white",
                padding: "1vh",
                cursor: "pointer",
              }}
            >
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          )}
        </div>
        <ul>
          {files.map((file) => (
            <div key={file.name}>
              <img
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
              />
            </div>
          ))}
        </ul>
        <Grid sx={{ float: "right" }}>
        <LoadingButton           
          size="small"
          endIcon={<CloseIcon />}
          loading={loadingB}
          loadingPosition="end"
          variant="outlined" 
          onClick={handleDropBoxClose}
          sx={{ml:'10px'}}
          color="error"
        >Close</LoadingButton>
          <LoadingButton           
          size="small"
          endIcon={<AddIcon />}
          loading={loadingB}
          loadingPosition="end"
          variant="contained" 
          onClick={handleSubmit}
          sx={{ml:'10px'}}
        >Add</LoadingButton>
        
        </Grid>
      </form>
      <SuccessNotification setNotificationOpen={setNotificationOpen} notiMessage={notiMessage} notificationOpen={notificationOpen} type={type} ></SuccessNotification>
    </div>
  );
};

export default DropBox;
