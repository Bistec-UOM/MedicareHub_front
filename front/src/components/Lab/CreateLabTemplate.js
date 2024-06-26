import React, { useEffect, useState } from 'react'
import {Button ,Paper, TextField, Toolbar, Typography,Box, Dialog, Snackbar, Alert} from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios'
import { baseURL,endPoints } from '../../Services/Lab';
import { ConfirmPropmt } from '../Common';
import theme from '../Style';
import { setHeaders } from '../../Services/Auth';

export default function CreateLabTemplate({setPage,setTload}) {

    useEffect(()=>{
        document.body.style.margin = '0';
        
       },[])
      
      //Field values--------------------------------------------------------------
      const [testData,setTestData]=useState({name:'',provider:'',price:0})
      const [testField,setTestField]=useState([])
      const [fieldName,setFieldName]=useState('')
      const [refMin,setRefMin]=useState()
      const [refMax,setRefMax]=useState()
      const [unit,setUnit]=useState()

      const validate=()=>{
        if(fieldName==''){
          seterMsg("Field name can't be empty")
          return false
        }
        if(refMin==''||refMax==''){
          seterMsg("Ref values can't be empty")
          return false
        }
        if(parseFloat(refMin)>=parseFloat(refMax)){
          seterMsg("Min ref must be lower than Max Ref ")
          return false
        }
        let x=true
        testField.forEach((el)=>{
          if(fieldName==el.fieldname){
            seterMsg("Use a different Field name")
            x=false
          }
        })
        if(!x){return false}
        seterMsg('')
        return true
      }

      const addTestField=()=>{
        if(!validate()){
          handleClick2()
          return
        }
        let data_set={
         fieldname:fieldName,index:'',minRef:refMin,maxRef:refMax,unit:unit
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

      //Edit fields---------------------------------------------------------------
      const[editMode,setEditMode]=useState(false)
      const[editData,setEditData]=useState({fieldname:'',index:'',minRef:'',maxRef:'',unit:''})
      const[currentInd,setcurentInd]=useState(null)

      const setEditModeData=(indx)=>{
        setcurentInd(indx)
        setEditMode(true)
        setEditData({...editData,fieldname:testField[indx].fieldname,index:indx,minRef:testField[indx].minRef,maxRef:testField[indx].maxRef,unit:testField[indx].unit})
      }

      const validateEdit=()=>{
        if(editData.fieldname==''){
          seterMsg("Field name can't be empty")
          return false
        }
        if(editData.minRef==''||editData.maxRef==''){
          seterMsg("Ref values can't be empty")
          return false
        }
        if(parseFloat(editData.minRef)>=parseFloat(editData.maxRef)){
          seterMsg("Min ref must be lower than Max Ref ")
          return false
        }
        let x=true
        testField.forEach((el,ind)=>{
          if(editData.fieldname==el.fieldname && ind!=currentInd){
            seterMsg("Use a different Field name")
            x=false
          }
        })
        if(!x){return false}
        seterMsg('')
        return true
      }

      const addEditData=()=>{
        if(!validateEdit()){
          handleClick2()
          setcurentInd(null)
          return
        }
        let arr=[...testField]
        let e_data={
          fieldname:editData.fieldname,
          index:editData.index,
          minRef:editData.minRef,
          maxRef:editData.maxRef,
          unit:editData.unit
        }
        arr[editData.index]=e_data;
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

      //Finalizing---------------------------------------------------------------

      function extractLastParenthesisContent(str) {
        const regex = /\(([^)]+)\)(?!.*\([^)]*\))/;
        const match = str.match(regex);
        return match ? match[1] : null;
      }

      function extractUntilFirstParenthesis(str) {
        const index = str.indexOf('(');
        if (index !== -1) {
            return str.slice(0, index);
        }
        return str;
      }
    
const createTemplate=()=>{
        setLoadingBConfirm(true)
        let ar=testField
        ar.map((el,ind)=>{
          el.index=ind
        })

        let abbr=extractLastParenthesisContent(testData.name).trimStart()
        abbr=abbr.trimEnd()
        let nm = extractUntilFirstParenthesis(testData.name).trimEnd()

        let T={
          testName:nm,
          abb:abbr,
          price:testData.price,
          provider:testData.provider,
          reportFields:ar
        }
        console.log(T)
        axios.post(baseURL+endPoints.TEMPLATE,T,setHeaders())
        .then(res=>{
          seterMsg('Template added successfuly')
          handleClick1 ('success')
          setTload([])//make test list empty to reload again
          setSent(true)
        })
        .catch(er=>{
          if(er.response && er.response.status==404){
            seterMsg('This test name already exist')
            handleClick1 ('error')
            return
          }
          seterMsg('Error occured! Try again')
          handleClick1 ('error')
          console.log(er)
        })
}
    
      // SnackBar template===========================================================================
        const [open2, setOpen2] = React.useState(false);
        const [erMsg,seterMsg] = useState('');

        const handleClick2 = () => {
          setOpen2(true);
        };
      
        const handleClose2 = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen2(false);
        }

      // SnackBar finalize===========================================================================
        const [open1, setOpen1] = React.useState(false);
        const [sent,setSent]=useState(false)//to integrate setTimeout with a useEffect
        const [serverity,setServerity] = useState('Primary')

        const handleClick1 = (x) => {
          setServerity(x)
          setLoadingBConfirm(false)
          setOpenConfirm(false)
          setOpen1(true);
        };
      
        const handleClose1 = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen1(false);
        }

        useEffect(()=>{//navigate to page 2 after snackbar is displayed
          if(sent){
            const tmr= setTimeout(() => {
              handleClose1()
              setPage(2)
            }, 2000)
            return () => clearTimeout(tmr);
          }
        },[sent])
      
    //Pop up dialog box===========================================================================
    const [loadingBConfirm, setLoadingBConfirm] = useState(false)//Loading button
    const [openConfirm, setOpenConfirm] = useState(false)

    function hasParenthesisAtEnd(str) {
      const regex = /\([^)]*\)$/;
      return regex.test(str);
    }

    const handleClickOpenConfirm = (x) => {
      if(testField.length==0){
        seterMsg("Template can't be empty")
        handleClick2()
        return
      }
      if(testData.name==''){
        seterMsg("Test can't be empty")
        handleClick2()
        return
      }
      if(!hasParenthesisAtEnd(testData.name)){
        seterMsg("Invalid test name format")
        handleClick2()
        return
      }
      if(testData.price==''){
        seterMsg("Price can't be empty")
        handleClick2()
        return
      }
      const integerRegex = /^-?\d+$/;
      if(!integerRegex.test(testData.price)){
        seterMsg("Price must be an integer")
        handleClick2()
        return
      }
      setOpenConfirm(true)
    }
    const handleCloseConfirm = () => {setOpenConfirm(false)}  

  return (
    <div>
        <Toolbar sx={{position:'fixed',width:{xs:'100%',sm:'70%'},justifyContent:'space-between',alignItems:'center',p:'0',pt:{xs:'10px'},backgroundColor:'white'}}>
            <ArrowBackIcon sx={{cursor:'pointer'}} onClick={()=>setPage(2)}></ArrowBackIcon>

            <Box sx={{width:'100%',display:'flex',flexDirection:{xs:'column',sm:'row'},alignItems:'center',ml:{xs:'2px',sm:'8%'}}} square>
              <Typography sx={{fontSize:{xs:'17px'}}}>Test</Typography>
              <TextField size='small' sx={{m:'0px',ml:{xs:'0',sm:'10px'},padding:'2px',width:{xs:'80px',sm:'200px'}}} onChange={(e)=>setTestData({...testData,'name':e.target.value})}></TextField>
            </Box>
            <Box sx={{width:'100%',display:'flex',flexDirection:{xs:'column',sm:'row'},alignItems:'center',ml:{xs:'2px',sm:'20px'}}} square>
              <Typography sx={{fontSize:{xs:'17px'}}}>Provider</Typography>
              <TextField size='small' sx={{m:'0px',ml:{xs:'0',sm:'5px'},padding:'2px',width:{xs:'80px',sm:'120px'}}} onChange={(e)=>setTestData({...testData,'provider':e.target.value})}></TextField>
            </Box>
            <Box sx={{width:'100%',display:'flex',flexDirection:{xs:'column',sm:'row'},alignItems:'center',ml:{xs:'2px',sm:'20px'}}} square>
              <Typography sx={{fontSize:{xs:'17px'}}}>Price</Typography>
              <TextField size='small' sx={{m:'0px',ml:{xs:'0',sm:'5px'},padding:'2px',width:{xs:'80px',sm:'120px'}}} onChange={(e)=>setTestData({...testData,'price':e.target.value})}></TextField>
            </Box>
        
            <Button 
              variant='contained'
              size='small' 
              onClick={handleClickOpenConfirm} 
              sx={{mr:{xs:'5px',sm:'15px'}}}
            >Submit
            </Button>
        </Toolbar>

        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center', paddingTop:{xs:'80px',sm:'80px'}}}>

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
                              <HighlightOffIcon color='error'fontSize='small' sx={{cursor:'pointer'}} onDoubleClick={()=>deleteTestField(elm.field)} ></HighlightOffIcon>
                           </Box>
                           
                       </Box>
                       )
               })
           }
    
           {/* ----------------------------------------------------------------------------------- */}
           {/* ------------------------Add Field-------------------------------------------------- */}
           {/* ----------------------------------------------------------------------------------- */}
           
           <Paper sx={{display:'flex',alignItems:'center',width:{xs:'90%',sm:'80%'},marginTop:'40px',pb:'5px',borderRadius:0}}>
             
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
            <input style={{height:'20px',borderRadius: '4px',border:'1px solid blue',width:'100%'}} value={editData.fieldname} onChange={(e)=>setEditData({...editData,fieldname:e.target.value})}></input>
          </Box>
          
          <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'30%',height:'100%',ml:'10px'}}>
            <Typography sx={{fontSize:'16px',mr:'5px'}}>Ref</Typography>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
             <input style={{height:'20px',borderRadius: '4px',border:'1px solid blue',width:'90%'}} type='number'  value={editData.minRef} onChange={(e)=>setEditData({...editData,minRef:e.target.value})}></input>
             <input style={{height:'20px',borderRadius: '4px',border:'1px solid blue',width:'90%',marginLeft:'5px'}} type='number' value={editData.maxRef} onChange={(e)=>setEditData({...editData,maxRef:e.target.value})}></input>
            </div>
          </Box>
 
          <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'20%',height:'100%',ml:'10px'}}>
            <Typography sx={{fontSize:'16px',mr:'5px'}}>Unit</Typography>
            <input style={{height:'20px',borderRadius: '4px',border:'1px solid blue',width:'90%'}} value={editData.unit} onChange={(e)=>setEditData({...editData,unit:e.target.value})}></input>
          </Box>
 
          <div style={{height:'100%'}}>
            <CheckCircleIcon color='success' sx={{cursor:'pointer',mt:'75%',mr:'5px'}} onClick={()=>addEditData()}></CheckCircleIcon>
          </div>
 
        </Paper>:''
        }
  {/*------------------ Confirm pop up box ---------------------------------------------- */}

       <ConfirmPropmt action={createTemplate} message="Are you sure that your template is ready?"
       handleClose={handleCloseConfirm} loadingB={loadingBConfirm} open={openConfirm}></ConfirmPropmt>

  {/*------------------ Snackbar alert for template-------------------------------------- */}

    <Snackbar open={open2} autoHideDuration={2000} onClose={handleClose2}>
        <Alert
          onClose={handleClose2}
          severity='warning'
          variant="filled"
          sx={{ width: '100%' }}
        >
          {erMsg}
        </Alert>
    </Snackbar>
  {/*------------------ Snackbar alert for finalizing-------------------------------------- */}

    <Snackbar open={open1} autoHideDuration={2000} onClose={handleClose1}>
        <Alert
          onClose={handleClose1}
          severity={serverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {erMsg}
        </Alert>
    </Snackbar>
    </div>
  )
}
