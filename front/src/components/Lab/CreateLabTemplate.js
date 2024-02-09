import React, { useEffect, useState } from 'react'
import {Button, Paper, TextField, Toolbar, Typography,Box} from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function CreateLabTemplate({setPage}) {

    useEffect(()=>{
        document.body.style.margin = '0';
       },[])
      
      const [testField,setTestField]=useState([])
    
      const [testName,setTestName]=useState()
      const [fieldName,setFieldName]=useState()
      const [refMin,setRefMin]=useState()
      const [refMax,setRefMax]=useState()
      const [unit,setUnit]=useState()

      const[editMode,setEditMode]=useState(false)
      const[editData,setEditData]=useState({ind:'',field:'',min:'',max:'',unit:''})
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
    
      const setEditModeData=(indx)=>{
        setEditMode(true)
        setEditData({...editData,ind:indx,field:testField[indx].field,min:testField[indx].min,max:testField[indx].max,unit:testField[indx].unit})
        console.log(editData);
      }

      const addEditData=()=>{
        let arr=[...testField]
        let e_data={
          field:editData.field,
          min:editData.min,
          max:editData.max,
          unit:editData.unit
        }
        testField[editData.ind]=e_data;
        setEditMode(false)
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
        <Toolbar sx={{position:'fixed',width:{xs:'100%',sm:'70%'},justifyContent:'space-between',backgroundColor:'yellow'}}>
            <ArrowBackIcon sx={{cursor:'pointer'}} onClick={()=>setPage(2)}></ArrowBackIcon>

            <div style={{width:'100%',padding:'5px',display:'flex',alignItems:'center',marginLeft:{xs:'2px',sm:'30px'}}} square>
              <Typography variant='h6' sx={{fontSize:{xs:'17px'}}}>Lab test name</Typography>
              <TextField size='small' onChange={(e)=>setTestName(e.target.value)}></TextField>
            </div>
        
            <Button variant='contained' size='small' onClick={()=>createTemplate()}>Create</Button>
        </Toolbar>

        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center', paddingTop:{xs:'80px',sm:'80px'}}}>
           {/*---------- Printed lab sheet-----------------*/}
         
               {
                   testField.map((elm,indx)=>{
                       return(
                       <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:{xs:'90%',sm:'80%'},height:'30px',borderBottom:'1px solid #0488b0',mt:'5px'}}>
                           <Box sx={{width:{xs:'40%',sm:'45%'},height:'100%'}}>
                             <Typography sx={{fontSize:'16px',cursor:'pointer'}} onClick={()=>setEditModeData(indx)}>{elm.field}</Typography>
                           </Box>
                           <Box sx={{width:{xs:'10%',sm:'15%'},height:'100%'}}>
                             <Typography sx={{fontSize:'16px',textAlign:'right'}}>{elm.min}{' -'}</Typography>
                           </Box>
                           <Box sx={{width:{xs:'10%',sm:'15%'},height:'100%'}}>
                             <Typography sx={{fontSize:'16px',pl:'4px'}}>{elm.max}</Typography>
                           </Box>
                           <Box sx={{width:'10%',height:'100%'}}>
                             <Typography sx={{fontSize:'16px'}}>{elm.unit}</Typography>
                           </Box>
                           {/* nav icons & close icon*/}
                           <Box sx={{width:{xs:'10%',sm:'5%'},height:'100%',display:'flex',justifyContent:'flex-end',ml:'5px'}}>
                             {indx!=0 ? <KeyboardDoubleArrowUpIcon fontSize='small' style={{cursor:'pointer'}} onClick={()=>{swapElement(indx,indx-1)}}></KeyboardDoubleArrowUpIcon>: ''}
     
                             {indx==(testField.length-1) ? '' : <KeyboardDoubleArrowDownIcon fontSize='small' style={{cursor:'pointer'}} onClick={()=>{swapElement(indx,indx+1)}}></KeyboardDoubleArrowDownIcon>}
                           </Box>
     
                           <Box style={{width:'5%',height:'100%'}}>
                              <HighlightOffIcon color='error'fontSize='small' sx={{cursor:'pointer'}} onClick={()=>deleteTestField(elm.field)} ></HighlightOffIcon>
                           </Box>
                           
                       </Box>
                       )
               })
           }
    
           {/* ------------------------ Form-------------------------------------------------- */}
           <Paper sx={{display:'flex',alignItems:'center',width:{xs:'90%',sm:'80%'},marginTop:'40px',pb:'5px'}}>
             
             <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'45%',height:'100%',ml:'10px'}}>
               <Typography sx={{fontSize:'16px',mr:'5px'}}>Field name</Typography>
               <input style={{height:'25px',borderRadius: '4px',border:'1px solid blue',width:'100%'}} onChange={(e)=>setFieldName(e.target.value)} value={fieldName}></input>
             </Box>
             
             <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'30%',height:'100%',ml:'10px'}}>
               <Typography sx={{fontSize:'16px',mr:'5px'}}>Ref</Typography>
               <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <input style={{height:'25px',borderRadius: '4px',border:'1px solid blue',width:'90%'}} type='number' onChange={(e)=>setRefMin(e.target.value)} value={refMin}></input>
                <input style={{height:'25px',borderRadius: '4px',border:'1px solid blue',width:'90%',marginLeft:'5px'}} type='number' onChange={(e)=>setRefMax(e.target.value)} value={refMax}></input>
               </div>
             </Box>
    
             <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'20%',height:'100%',ml:'10px'}}>
               <Typography sx={{fontSize:'16px',mr:'5px'}}>Unit</Typography>
               <input style={{height:'25px',borderRadius: '4px',border:'1px solid blue',width:'90%'}} onChange={(e)=>setUnit(e.target.value)} value={unit}></input>
             </Box>
    
             <div style={{height:'100%'}}>
               <AddCircleIcon color='success' sx={{cursor:'pointer',mt:'75%',mr:'5px'}} onClick={addTestField}></AddCircleIcon>
             </div>
    
           </Paper>
        </Box>
        {
          /* Form appearing to edit existing fileds------------------------------------------- */
          editMode ? <Box sx={{backgroundColor:'rgba(12,12,12,0.8)',position:'fixed',top:{xs:'48px',sm:'64px'},height:'100vh',width:'100vw',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}} onClick={()=>setEditMode(false)}>
          </Box>:''
        }
        {
          editMode?
          <Paper sx={{display:'flex',alignItems:'center',width:{xs:'90%',sm:'60%'},position:'fixed',Top:'40px',pb:'10px'}}>
             
          <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'45%',height:'100%',ml:'10px'}}>
            <Typography sx={{fontSize:'16px',mr:'5px'}}>Field name</Typography>
            <input style={{height:'20px',borderRadius: '4px',border:'1px solid blue',width:'100%'}} value={editData.field} onChange={(e)=>setEditData({...editData,field:e.target.value})}></input>
          </Box>
          
          <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'30%',height:'100%',ml:'10px'}}>
            <Typography sx={{fontSize:'16px',mr:'5px'}}>Ref</Typography>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
             <input style={{height:'20px',borderRadius: '4px',border:'1px solid blue',width:'90%'}} type='number'  value={editData.min} onChange={(e)=>setEditData({...editData,min:e.target.value})}></input>
             <input style={{height:'20px',borderRadius: '4px',border:'1px solid blue',width:'90%',marginLeft:'5px'}} type='number' value={editData.max} onChange={(e)=>setEditData({...editData,max:e.target.value})}></input>
            </div>
          </Box>
 
          <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'20%',height:'100%',ml:'10px'}}>
            <Typography sx={{fontSize:'16px',mr:'5px'}}>Unit</Typography>
            <input style={{height:'20px',borderRadius: '4px',border:'1px solid blue',width:'90%'}} value={editData.unit} onChange={(e)=>setEditData({...editData,unit:e.target.value})}></input>
          </Box>
 
          <div style={{height:'100%'}}>
            <CheckCircleIcon color='primary' sx={{cursor:'pointer',mt:'75%',mr:'5px'}} onClick={()=>addEditData()}></CheckCircleIcon>
          </div>
 
        </Paper>:''
        }
    </div>
  )
}
