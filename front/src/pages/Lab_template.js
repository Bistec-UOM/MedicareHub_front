import React, { useEffect, useState } from 'react'
import {Button, Card, Grid, Paper, TextField, Typography} from "@mui/material"
import Navbar from '../components/navbar/Navbar'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

export default function Lab_template() {
    useEffect(()=>{
        document.body.style.margin = '0';
       },[])
      
      const [testField,setTestField]=useState([])
    
      const [testName,setTestName]=useState()
      const [fieldName,setFieldName]=useState()
      const [refMin,setRefMin]=useState()
      const [refMax,setRefMax]=useState()
      const [unit,setUnit]=useState()
    
      const addTestField=()=>{
        let data_set={
          'field':fieldName,'min':refMin,'max':refMax,'unit':unit
        }
        setTestField([...testField,data_set])
        setFieldName('')
        setRefMin('')
        setRefMax('')
        setUnit('')
      }
    
      const deleteTestField=(f)=>{
        setTestField(testField.filter((x)=>{return x.field!=f}))
      }
    
      const createTemplate=()=>{
        let load={
          'name':testName,
          'template':testField
        }
        load=JSON.stringify(load)
        load=JSON.parse(load)
        
      }
    
      const swapElement = (indexToSwap, newIndex) => {
    
        const updatedList = [...testField];
        if (
          indexToSwap >= 0 &&
          indexToSwap < updatedList.length &&
          newIndex >= 0 &&
          newIndex < updatedList.length
        ) {
          const temp = updatedList[indexToSwap];
          updatedList[indexToSwap] = updatedList[newIndex];
          updatedList[newIndex] = temp;
    
          setTestField(updatedList);
        }
      }
    
    
      return (    
        <div>
          <Navbar></Navbar>
           <Grid container spacing={0} sx={{paddingTop:'64px',height:'100vh'}}>
             <Grid item xs={3} style={{height:'100%'}}>
               
             </Grid>
             <Grid item xs={9} style={{height:'100%',overflowY:'scroll'}}>
    
    
              <div style={{width:'100%',padding:'5px',display:'flex',alignItems:'center'}} square>
                <Typography variant='h6'>Lab test name</Typography>
                <TextField size='small' onChange={(e)=>setTestName(e.target.value)}></TextField>
              </div>
    
    
              <Paper sx={{display:'flex',alignItems:'center',width:'70%'}}>
                <div style={{display:'flex',alignItems:'center'}}>
                  <Typography sx={{fontSize:'16px'}}>Field name</Typography>
                  <input style={{height:'20px',borderRadius: '4px',border:'1px solid blue'}} onChange={(e)=>setFieldName(e.target.value)} value={fieldName}></input>
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                  <Typography sx={{fontSize:'16px'}}>Ref</Typography>
                  <input style={{height:'20px',borderRadius: '4px',border:'1px solid blue',width:'60px'}} type='number' onChange={(e)=>setRefMin(e.target.value)} value={refMin}></input>
                <h3>:</h3>
                  <input style={{height:'20px',borderRadius: '4px',border:'1px solid blue',width:'60px'}} type='number' onChange={(e)=>setRefMax(e.target.value)} value={refMax}></input>
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                  <Typography sx={{fontSize:'16px'}}>Unit</Typography>
                  <input style={{height:'20px',borderRadius: '4px',border:'1px solid blue',width:'60px'}} onChange={(e)=>setUnit(e.target.value)} value={unit}></input>
                </div>
                <AddCircleIcon color='success' sx={{cursor:'pointer'}} onClick={addTestField}></AddCircleIcon>
              </Paper>
    
              {
                testField.map((elm,indx)=>{
                  return(
                  <div style={{display:'flex',width:'60%'}}>
                      <Typography sx={{fontSize:'16px'}}>{elm.field}</Typography>
                      <Typography sx={{fontSize:'16px'}}>{elm.min}</Typography>
                      <Typography sx={{fontSize:'16px'}}>{elm.max}</Typography>
                      <Typography sx={{fontSize:'16px'}}>{elm.unit}</Typography>
                      <HighlightOffIcon color='error' sx={{cursor:'pointer'}} onClick={()=>deleteTestField(elm.field)} ></HighlightOffIcon>
                      {indx!=0 ? <KeyboardDoubleArrowUpIcon style={{cursor:'pointer'}} onClick={()=>{swapElement(indx,indx-1)}}></KeyboardDoubleArrowUpIcon>: ''}
                      {indx==(testField.length-1) ? '' : <KeyboardDoubleArrowDownIcon style={{cursor:'pointer'}} onClick={()=>{swapElement(indx,indx+1)}}></KeyboardDoubleArrowDownIcon>}
                  </div>
                  )
                })
              }
              <Button variant='contained' size='small' onClick={()=>createTemplate()}>Create</Button>
             </Grid>
           </Grid>
        </div>
      )
}
