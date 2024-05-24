import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, Card, Typography } from '@mui/material';
import axios from 'axios';
import TimelineIcon from '@mui/icons-material/Timeline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Box } from '@mui/system';

export default function PatientsRecords(props) {
    const { openPopup, setOpenPopup, selectedPatientId } = props;
    const [patientRecords, setPatientRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState(props.rec);
    const [mode,setMode] =useState(true);//records-true , analytics-false

    useEffect(() => {
        if (selectedPatientId) {
            fetchPatientRecords(selectedPatientId);
        }
    }, [selectedPatientId]);

    const fetchPatientRecords = async (PatientId) => {
        try {
            const response = await axios.get(`https://localhost:7205/api/Doctor/prescription/${PatientId}`);
            console.log("patient History records:", PatientId, JSON.stringify(response.data));
            setPatientRecords(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching patient records:', error);
        }
    };

    const handleClose = () => {
        setOpenPopup(false);
    };

    // Function to calculate the difference in days between two dates
    const calculateDaysDifference = (date) => {
        const currentDate = new Date();
        const prescriptionDate = new Date(date);
        const differenceInTime = currentDate.getTime() - prescriptionDate.getTime();
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
        if (differenceInDays === 0) {
            return "Today";
        } else {
            return `${differenceInDays} days ago`;
        }
    };

    // Function to calculate the height of the description card
    const calculateDescriptionCardHeight = (description) => {
        // Approximate line height in pixels
        const lineHeight = 40;
        // Split the description into lines based on newline character
        const lines = description.split('\n');
        // Calculate the height based on the number of lines
        const height = lineHeight * lines.length;
        return height;
    };

    return (
        <div>
            <Dialog open={openPopup} onClose={handleClose} maxWidth="md"  fullWidth={true}>
                <DialogContent dividers sx={{ maxHeight: '500px', overflowY: 'scroll',p:'0'}}>
    {/* --------------------- Switch between analytics and records ------------------------------------ */}
                    <Box sx={{height:'30px',width:'100%',display:'flex',justifyContent:'space-between',borderBottom:'1px solid lightgrey',position:'absolute',backgroundColor:'white',pt:'10px'}}>
                        <Typography sx={{pl:'10px'}}>{mode?'Patient History Records':'History Analytics'}</Typography>
                        <div>
                            <FormatListBulletedIcon sx={{cursor:'pointer',mr:'30px'}} onClick={()=>setMode(true)} color={mode?'inherit':'disabled'}></FormatListBulletedIcon>
                            <TimelineIcon sx={{cursor:'pointer',mr:'20px'}} onClick={()=>setMode(false)} color={mode?'disabled':'inherit'}></TimelineIcon>
                        </div>
                    </Box>
                    <div style={{width:'100%',height:'30px'}}></div>

    {/* --------------------- patient records list----------------------------------------------------- */}
                    {loading ? (
                        <Typography>Loading...</Typography>
                    ) : patientRecords.length === 0 ? (
                        <Typography sx={{ color: '#717D7E', wordSpacing: '5px', fontSize: '20px',textAlign: 'center'  }}>No history records available.</Typography>
                    ) : (
                        <Grid container spacing={1} sx={{ marginTop: "5px" }}>
                            {patientRecords.map((item, index) => (
                                <Grid item xs={12} key={index}>
                                    <DialogTitle sx={{ m: 0, p: 2 }}>{calculateDaysDifference(item.prescription.dateTime)}</DialogTitle>
                                    {item.drugs.map((drug, i) => (
                                        <div key={i}>
                                            <Card sx={{ m: 1,display:'flex', backgroundColor: '#0099cc', color: 'white', fontSize: '19px', height: '30px' }}>
                                                <Typography gutterBottom variant="p" sx={{ marginLeft: '10px',flex: '4' }}>{drug.genericN}</Typography>
                                                <Typography gutterBottom variant="p" sx={{ marginLeft: '10px',flex: '4' }}> {drug.weight} mg</Typography>
                                                <Typography gutterBottom variant="p" sx={{ marginLeft: '10px' ,flex: '4'}}> {drug.period}</Typography>
                                            </Card>
                                        </div>
                                    ))}
                                    {item.prescription.description && (
                                        <Card sx={{ m: 2, backgroundColor: 'rgb(209, 224, 250)', color: 'blue', fontSize: '20px', width: '600px', height: calculateDescriptionCardHeight(item.prescription.description) }}>
                                            <Typography variant="p" sx={{ padding: '10px' }}>{item.prescription.description}</Typography>
                                        </Card>
                                    )}
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
