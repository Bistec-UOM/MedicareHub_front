import { Button, Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CLOUDINARY_URL } from "../../../Services/Admin";
import axios from "axios";

const DropBox = ({ className, handleDropBoxClose, DataUrl, setDataUrl }) => {
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
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent form submission
    if (!files.length) return; // if no files, return
    const file = files[0]; // get the first file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios
      .post(CLOUDINARY_URL, formData)
      .then((response) => {
        console.log(response.data.url);
        setDataUrl(response.data.url); // Update the data in the parent component
      })
      .catch((error) => {
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
            <li key={file.name}>
              <img
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
              />
            </li>
          ))}
        </ul>
        <Grid sx={{ float: "right" }}>
          <Button
            onClick={handleDropBoxClose}
            color="error"
            sx={{ border: "1px solid" }}
          >
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{
              backgroundColor: "rgb(121, 204, 190)",
              color: "white",
              marginLeft: 2,
              "&:hover": {
                backgroundColor: "rgb(21, 101, 192)", // darker shade for hover
              },
            }}
          >
            Submit
          </Button>{" "}
        </Grid>
      </form>
    </div>
  );
};

export default DropBox;
