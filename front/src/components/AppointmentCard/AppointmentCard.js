import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Stack } from "@mui/material";
import {IconButton} from "@mui/material";
import Steper from "../Setper/Steper";

const AppointmentCard = ({ item }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    //  setAList(alist.filter((itemf) => itemf.nic !== item.nic));
    console.log("hello");
  };

  const handleEdit = () => {
    setOpen(true);
  };

  return (
    
    <div>
        
        <div classname="test" style={{ width: "80%", marginLeft: "auto", marginRight: "auto"}}>
          <Card
            sx={{
              backgroundColor: "#FFFF",
              textAlign: "left",
              marginBottom: 2,
              border: "1px solid #3B877A",
              borderRadius: 5,
        
            }}
          >
            <Stack direction={'column'}>
            <CardContent>
              <Stack direction={'row'} sx={{justifyContent:'space-between',alignItem:'center'}}>
        
                  <Typography variant="h5" >
                    {item.name}
                  </Typography>
        
                <Box>
        
                 <IconButton onClick={handleDelete}><DeleteIcon  sx={{ marginLeft: "auto", color: "#E60000" }} /></IconButton>
                  <IconButton onClick={handleEdit}><EditIcon  sx={{ color: "#F66444", }} /></IconButton>
        
        
                </Box>
              </Stack>
              <Stack sx={{ml:'3%'}}>
        
              </Stack >
              <Stack sx={{justifyContent:'space-between',alignItem:'center'}} direction={'row'}>
                <Typography variant="body2" color="text.secondary">
                  {item.city}
                </Typography>
                <Typography  color="text.secondary">
                  {item.nic}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.phone}
                </Typography>
        
              </Stack>
              </CardContent>
            </Stack>
        
          </Card>
          {/* <Popup
            item={item}
            name={name}
            setName={setName}
            address={address}
            setAddress={setAddress}
            nic={nic}
            setNic={setNic}
            timevalue={timevalue}
            setTimeValue={setTimeValue}
            alist={alist}
            setAList={setAList}
            count={count}
            setCount={setCount}
            open={open}
            setOpen={setOpen}
          ></Popup> */}
        </div>
    </div>
  );
};

export default AppointmentCard;
