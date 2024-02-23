import React, { useEffect, useState } from 'react'
import {Button, Paper,Toolbar, Typography,Box} from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios'

export default function Edittemplate({setPage,tId,Tdata,FloadEdit}) {
      
      //Field values--------------------------------------------------------------
      const [testField,setTestField]=useState([])
      const [Fieldname,setFieldName]=useState()
      const [MinRef,setMinRef]=useState()
      const [MaxRef,setMaxRef]=useState()
      const [Unit,setUnit]=useState()

      const addTestField=()=>{
        let data_set={
          FieldName:Fieldname,MinRef:MinRef,MaxRef:MaxRef,Unit:Unit
        }
        setTestField([...testField,data_set])
        setFieldName('')
        setMinRef('')
        setMaxRef('')
        setUnit('')
      }
    
      const deleteTestField=(f)=>{
        setTestField(testField.filter((x)=>{return x.field!=f}))
      }

      //Edit fields---------------------------------------------------------------
      const[editMode,setEditMode]=useState(false)
      const[editData,setEditData]=useState({Fieldname:'',Index:'',MinRef:'',MaxRef:'',Unit:''})

      const setEditModeData=(indx)=>{
        setEditMode(true)
        setEditData({...editData,
          Fieldname:testField[indx].Fieldname,
          Index:indx,
          MinRef:testField[indx].MinRef,
          MaxRef:testField[indx].MaxRef,
          Unit:testField[indx].Unit
        })
      }

      const addEditData=()=>{
        let arr=[...testField]
        let e_data={
          Fieldname:editData.Fieldname,
          MinRef:editData.MinRef,
          MaxRef:editData.MaxRef,
          Unit:editData.Unit
        }
        arr[editData.ind]=e_data;
        setTestField(arr)
        setEditMode(false)
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

      //Finalizing--------------------------------------------------
      const saveTemplate=()=>{
        FloadEdit(tId,testField)//send to Lab.js
        setPage(2)
      }
    

      useEffect(()=>{
        document.body.style.margin = '0';
          axios.get('https://localhost:44346/api/Template/'+`${tId}`)
          .then(res=>{setTestField(res.data)})
          .catch(er=>{})
       },[testField])

  return (
    <div>
        <Toolbar sx={{position:'fixed',width:{xs:'100%',sm:'70%'},justifyContent:'space-between',alignItems:'center',p:'0',pt:{xs:'10px'},backgroundColor:'white'}}>
            <ArrowBackIcon sx={{cursor:'pointer'}} onClick={()=>setPage(2)}></ArrowBackIcon>

            <Typography sx={{fontSize:{xs:'17px'}}}>{Tdata.name}</Typography>
        
            <Button variant='contained' size='small' onClick={()=>saveTemplate()} sx={{mr:{xs:'5px',sm:'15px'}}}>Save</Button>
        </Toolbar>

        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',paddingTop:{xs:'80px',sm:'80px'}}}>

           {/*--------------------------------------------------------------------------------------*/}
           {/*---------- Printed lab sheet----------------------------------------------------------*/}
           {/*--------------------------------------------------------------------------------------*/}
         
               {
                   testField.map((elm,indx)=>{
                       return(
                       <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:{xs:'90%',sm:'80%'},height:'30px',borderBottom:'1px solid #0488b0',mt:'5px'}}>
                           <Box sx={{width:{xs:'40%',sm:'45%'},height:'100%'}}>
                             <Typography sx={{fontSize:'16px',cursor:'pointer'}} onDoubleClick={()=>setEditModeData(indx)}>{elm.fieldname}</Typography>
                           </Box>
                           <Box sx={{width:{xs:'10%',sm:'15%'},height:'100%'}}>
                             <Typography sx={{fontSize:'16px',textAlign:'right'}}>{elm.minRef}</Typography>
                           </Box>
                           <Box sx={{width:{xs:'10%',sm:'15%'},height:'100%'}}>
                             <Typography sx={{fontSize:'16px',pl:'4px'}}>{elm.maxRef}</Typography>
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
    
           {/* ----------------------------------------------------------------------------------- */}
           {/* ------------------------Add Field-------------------------------------------------- */}
           {/* ----------------------------------------------------------------------------------- */}
           
           <Paper sx={{display:'flex',alignItems:'center',width:{xs:'90%',sm:'80%'},marginTop:'40px',pb:'5px'}}>
             
             <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'45%',height:'100%',ml:'10px'}}>
               <Typography sx={{fontSize:'16px',mr:'5px'}}>Field name</Typography>
               <input style={{height:'25px',borderRadius: '4px',border:'1px solid blue',width:'100%'}} onChange={(e)=>setFieldName(e.target.value)} value={Fieldname}></input>
             </Box>
             
             <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'30%',height:'100%',ml:'10px'}}>
               <Typography sx={{fontSize:'16px',mr:'5px'}}>Ref</Typography>
               <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <input style={{height:'25px',borderRadius: '4px',border:'1px solid blue',width:'90%'}} type='number' onChange={(e)=>setMinRef(e.target.value)} value={MinRef}></input>
                <input style={{height:'25px',borderRadius: '4px',border:'1px solid blue',width:'90%',marginLeft:'5px'}} type='number' onChange={(e)=>setMaxRef(e.target.value)} value={MaxRef}></input>
               </div>
             </Box>
    
             <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'20%',height:'100%',ml:'10px'}}>
               <Typography sx={{fontSize:'16px',mr:'5px'}}>Unit</Typography>
               <input style={{height:'25px',borderRadius: '4px',border:'1px solid blue',width:'90%'}} onChange={(e)=>setUnit(e.target.value)} value={Unit}></input>
             </Box>
    
             <div style={{height:'100%'}}>
               <AddCircleIcon color='success' sx={{cursor:'pointer',mt:'75%',mr:'5px'}} onClick={addTestField}></AddCircleIcon>
             </div>
    
           </Paper>
        </Box>
        {
          /*-------------------------------------------------------------------------------------*/
          /* -------------------------------Popup Form to Edit fields--------------------------- */
          /*-------------------------------------------------------------------------------------*/
          editMode ? <Box sx={{backgroundColor:'rgba(12,12,12,0.8)',position:'fixed',top:{xs:'48px',sm:'64px'},height:'100vh',width:'100vw',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}} onClick={()=>setEditMode(false)}>
          </Box>:''
        }
        {
          editMode?
          <Paper sx={{display:'flex',alignItems:'center',width:{xs:'90%',sm:'60%'},position:'fixed',top:'40%',right:{xs:'5%',sm:'10%'},pb:'10px'}}>
             
          <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'45%',height:'100%',ml:'10px'}}>
            <Typography sx={{fontSize:'16px',mr:'5px'}}>Field name</Typography>
            <input style={{height:'20px',borderRadius: '4px',border:'1px solid blue',width:'100%'}} value={editData.field} onChange={(e)=>setEditData({...editData,field:e.target.value})}></input>
          </Box>
          
          <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'30%',height:'100%',ml:'10px'}}>
            <Typography sx={{fontSize:'16px',mr:'5px'}}>Ref</Typography>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
             <input style={{height:'20px',borderRadius: '4px',border:'1px solid blue',width:'90%'}} type='number'  value={editData.MinRef} onChange={(e)=>setEditData({...editData,MinRef:e.target.value})}></input>
             <input style={{height:'20px',borderRadius: '4px',border:'1px solid blue',width:'90%',marginLeft:'5px'}} type='number' value={editData.max} onChange={(e)=>setEditData({...editData,max:e.target.value})}></input>
            </div>
          </Box>
 
          <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'20%',height:'100%',ml:'10px'}}>
            <Typography sx={{fontSize:'16px',mr:'5px'}}>Unit</Typography>
            <input style={{height:'20px',borderRadius: '4px',border:'1px solid blue',width:'90%'}} value={editData.Unit} onChange={(e)=>setEditData({...editData,Unit:e.target.value})}></input>
          </Box>
 
          <div style={{height:'100%'}}>
            <CheckCircleIcon color='primary' sx={{cursor:'pointer',mt:'75%',mr:'5px'}} onClick={()=>addEditData()}></CheckCircleIcon>
          </div>
 
        </Paper>:''
        }
    </div>
  )
}
