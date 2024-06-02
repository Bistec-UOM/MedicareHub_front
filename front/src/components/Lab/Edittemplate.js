import React, { useEffect, useState } from 'react'
import {Paper,Toolbar, Typography,Box, Button, Alert, Snackbar} from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios'
import { baseURL,endPoints } from '../../Services/Lab';
import LoadingButton from '@mui/lab/LoadingButton';
import DoneIcon from '@mui/icons-material/Done'
import { ConfirmPropmt } from '../Common';

export default function Edittemplate({setPage,tId,Tdata,setTload}) {
      
      //Field values--------------------------------------------------------------
      const [testField,setTestField]=useState([])
      const [Fieldname,setFieldName]=useState('')
      const [MinRef,setMinRef]=useState('')
      const [MaxRef,setMaxRef]=useState('')
      const [Unit,setUnit]=useState('')

      const validate=()=>{
        if(Fieldname==''){
          console.log(Fieldname)
          seterMsg("Field name can't be empty")
          return false
        }
        if(MinRef==''||MaxRef==''){
          seterMsg("Ref values can't be empty")
          return false
        }
        if(parseFloat(MinRef)>=parseFloat(MaxRef)){
          seterMsg("Min ref must be lower than Max Ref ")
          return false
        }
        let x=true
        testField.forEach((el)=>{
          if(Fieldname==el.fieldname){
            console.log(el)
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
          id:0,fieldname:Fieldname,index:testField.length,minRef:MinRef,maxRef:MaxRef,unit:Unit,stat:'new'
        }
        setTestField([...testField,data_set])
        setFieldName('')
        setMinRef('')
        setMaxRef('')
        setUnit('')
      }

      const [dlt,setDlt]=useState([])//keep the deleted fields tracked
    
      const deleteTestField=(ind)=>{
        let tmp=[...testField]
        if(tmp[ind].id!=0){
          tmp[ind].stat='deleted'
          setDlt([...dlt,tmp[ind]])
          tmp.splice(ind,1);
        }else{
          tmp.splice(ind,1);
        }
        setTestField(tmp)
      }

      //Edit fields---------------------------------------------------------------
      const[editMode,setEditMode]=useState(false)
      const[editData,setEditData]=useState({id:'',fieldname:'',index:'',minRef:'',maxRef:'',unit:'',stat:''})
      const[currentInd,setcurentInd]=useState(null)

      const setEditModeData=(indx,id)=>{
        setcurentInd(indx)
        setEditMode(true)
        setEditData({...editData,
          id:id,
          fieldname:testField[indx].fieldname,
          index:indx,
          minRef:testField[indx].minRef,
          maxRef:testField[indx].maxRef,
          unit:testField[indx].unit,
          stat:testField[indx].stat
        })
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
          id:editData.id,
          fieldname:editData.fieldname,
          index:editData.index,
          minRef:editData.minRef,
          maxRef:editData.maxRef,
          unit:editData.unit,
          stat:editData.stat
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

      //Finalizing--------------------------------------------------
      const saveTemplate=()=>{
        setLoadingBConfirm(true)
        let ld=testField
        ld.map((el,ind)=>{
          el.index=ind
        })
        ld=[...ld,...dlt]//combine existing and deleted fields
        let obj={
          TestId:tId,
          Fields:ld
        }
        console.log(JSON.stringify(obj))
        axios.put(baseURL+endPoints.TEMPLATE,obj)
        .then(res=>{
          seterMsg('Template edited successfuly')
          handleClick1 ('success')
          setSent(true)
        })
        .catch(er=>{
          seterMsg('Error occured! Try again')
          handleClick1 ('error')
          console.log(er)
        })
      }
    

      const [loading,setLoading]=useState(true)
      useEffect(()=>{
        document.body.style.margin = '0';
          axios.get(baseURL+endPoints.TEMPLATE+`${tId}`)
          .then(res=>{
            let obj=res.data
            obj.map((el,ind)=>{el.stat="exist"})
            obj.sort((a, b) => a.index - b.index)//sort the fields according to index
            setTestField(obj); 
            setLoading(false)
          })
          .catch(er=>{})
       },[])


  //Confirmation popup box-----------------------------------------------------------
  const [loadingBConfirm, setLoadingBConfirm] = useState(false)//Loading button
  const [openConfirm, setOpenConfirm] = useState(false)
  const handleClickOpenConfirm = (x) => {
    if(testField.length==0){
      seterMsg("Template can't be empty")
      handleClick2()
      return
    }
    setOpenConfirm(true)
  }
  const handleCloseConfirm = () => {setOpenConfirm(false)}  

      // SnackBar template ===============================================================
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

      // SnackBar finalize =============================================================
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

  return (
    <div>
        <Toolbar sx={{position:'fixed',width:{xs:'100%',sm:'70%'},justifyContent:'space-between',alignItems:'center',p:'0',pt:{xs:'10px'},backgroundColor:'white'}}>
            <ArrowBackIcon sx={{cursor:'pointer'}} onClick={()=>setPage(2)}></ArrowBackIcon>

            <Typography sx={{fontSize:{xs:'17px'}}}>{Tdata.testName}</Typography>
            <Button 
              variant='contained' 
              size='small' 
              endIcon={<DoneIcon />}          
              onClick={handleClickOpenConfirm} 
              sx={{mr:{xs:'5px',sm:'15px'}}}
            >Save</Button>
        </Toolbar>

        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',paddingTop:{xs:'80px',sm:'80px'}}}>

           {/*--------------------------------------------------------------------------------------*/}
           {/*---------- Printed lab sheet----------------------------------------------------------*/}
           {/*--------------------------------------------------------------------------------------*/}
               {!loading ?
                   testField.map((elm,indx)=>{
                        elm.index=indx
                        return(elm.stat!='deleted'?
                       <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:{xs:'90%',sm:'80%'},height:'30px',borderBottom:'1px solid #0488b0',mt:'5px'}}>
                           <Box sx={{width:{xs:'40%',sm:'45%'},height:'100%'}}>
                             <Typography sx={{fontSize:'16px',cursor:'pointer'}} onDoubleClick={()=>setEditModeData(elm.index,elm.id)}>{elm.fieldname}</Typography>
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
                              <HighlightOffIcon color='error'fontSize='small' sx={{cursor:'pointer'}} onDoubleClick={()=>deleteTestField(indx)} ></HighlightOffIcon>
                           </Box>
                       </Box>:''
                       )
               }) : ''
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
            <CheckCircleIcon color='primary' sx={{cursor:'pointer',mt:'75%',mr:'5px'}} onClick={()=>addEditData()}></CheckCircleIcon>
          </div>
 
        </Paper>:''
        }

      {/*--------------- confirmation popup box------------------------------------------*/}
        <ConfirmPropmt action={saveTemplate} message="Are you sure that template is ready?"
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

      {/*------------------ Snackbar alert finalizing ------------------------------------- */}

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
