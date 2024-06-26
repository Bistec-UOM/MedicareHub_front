import React, {useState } from 'react'
import { Button, TextField } from '@mui/material'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import axios from 'axios'
import { baseURL,endPoints } from '../../../Services/Lab';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import LoadingButton from '@mui/lab/LoadingButton';
import { setHeaders } from '../../../Services/Auth';

export default function TestDialogBox({test,setPage,setTload,handleClose,handleClick1}) {

  const [testName,settestName]=useState(test.testName+' ('+test.abb+')')
  const [provider,setProvider]=useState(test.provider)
  const [price,setPrice]=useState(test.price)

  const [loadingB, setLoadingB] = useState(false)//Loading button

  //test name string validation ------------------------------------->>>>>>>>>>>>>>>
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

  function hasParenthesisAtEnd(str) {
    const regex = /\([^)]*\)$/;
    return regex.test(str);
  }


  const saveButtonAction=()=>{
    if(testName==''){
      handleClick1('Test name can\'t be empty','warning')
      return
    }
    if(!hasParenthesisAtEnd(testName)){
      handleClick1('Invalid Test name format','warning')
      return
    }
    if(price==''){
      handleClick1('Price can\'t be empty','warning')
      return
    }
    const integerRegex = /^-?\d+$/;
    if(!integerRegex.test(price)){
      handleClick1('Price must be integer','warning')
      return
    }

    let tstnm=extractUntilFirstParenthesis(testName).trimEnd()
    let abb=extractLastParenthesisContent(testName).trimStart()
    abb=abb.trimEnd()
    if(isDisabled){
      setIsDisabled(false)
    }else{
      let obj={
        id:test.id,
        testName:tstnm,
        abb:abb,
        price:price,
        provider:provider
      }
      console.log(obj)
      setLoadingB(true)
      axios.put(baseURL+endPoints.TEST,obj,setHeaders())
      .then(res=>{
        setLoadingB(false)
        setTload([])//make test list empty to reload again
        handleClick1('Test details updated','success')
        handleClose()
      })
      .catch((er)=>{
        setLoadingB(false)
        handleClick1('Error occured! Try again','error')
      })
    }
  }

  const [isDisabled,setIsDisabled]=useState(true)

  return (
    <div style={{padding:'20px',display:'flex',flexDirection:'column'}}>
        <TextField disabled={isDisabled} label="Name" margin="dense" value={testName} onChange={(e)=>settestName(e.target.value)} size='small'/>
        <TextField disabled={isDisabled} label="Provider" margin="dense" value={provider} onChange={(e)=>setProvider(e.target.value)} size='small'/>
        <TextField disabled={isDisabled} label="Price" margin="dense" value={price} onChange={(e)=>setPrice(e.target.value)} size='small'/>
        <div style={{paddingTop:'10px',display:'flex',flexDirection:'row-reverse',alignItems:'center'}} >
          
          
          <LoadingButton   
            id="labTestEdit"        
            size="small"
            loading={loadingB}
            loadingPosition="end"
            variant="contained" 
            onClick={saveButtonAction}
            sx={{ml:'10%'}}
            endIcon={isDisabled?<EditIcon></EditIcon>:<DoneIcon></DoneIcon>}
          >{isDisabled?'Edit':'OK'}</LoadingButton>
          {
            isDisabled===false?<Button id="templEdit" variant='outlined' sx={{ml:'20px'}} endIcon={<DashboardCustomizeIcon></DashboardCustomizeIcon>}  onClick={()=>setPage(4)}></Button>:''
          }
        </div>
    </div>
  )
}
