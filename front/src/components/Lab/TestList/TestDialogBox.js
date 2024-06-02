import React, {useState } from 'react'
import { Button, TextField } from '@mui/material'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import axios from 'axios'
import { baseURL,endPoints } from '../../../Services/Lab';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import LoadingButton from '@mui/lab/LoadingButton';

export default function TestDialogBox({test,setPage,setTload,handleClose,handleClick1}) {

  const [testName,settestName]=useState(test.testName)
  const [provider,setProvider]=useState(test.provider)
  const [price,setPrice]=useState(test.price)

  const [loadingB, setLoadingB] = useState(false)//Loading button

  const saveButtonAction=()=>{
    if(testName==''){
      handleClick1('Test name can\'t be empty','warning')
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

    if(isDisabled){
      setIsDisabled(false)
    }else{
      let obj={
        id:test.id,
        testName:testName,
        abb:test.abb,
        price:price,
        provider:provider
      }
      setLoadingB(true)
      axios.put(baseURL+endPoints.TEST,obj)
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
        <TextField disabled={isDisabled} label="Name" margin="dense" value={testName} onChange={(e)=>settestName(e.target.value)}/>
        <TextField disabled={isDisabled} label="Provider" margin="dense" value={provider} onChange={(e)=>setProvider(e.target.value)}/>
        <TextField disabled={isDisabled} label="Price" margin="dense" value={price} onChange={(e)=>setPrice(e.target.value)}/>
        <div style={{paddingTop:'10px',display:'flex',flexDirection:'row-reverse',alignItems:'center'}} >
          
          
          <LoadingButton           
            size="small"
            loading={loadingB}
            loadingPosition="end"
            variant="contained" 
            onClick={saveButtonAction}
            sx={{ml:'10%'}}
            endIcon={isDisabled?<EditIcon></EditIcon>:<DoneIcon></DoneIcon>}
          >{isDisabled?'Edit':'OK'}</LoadingButton>
          {
            isDisabled===false?<Button sx={{ml:'20px'}} variant='outlined' endIcon={<DashboardCustomizeIcon></DashboardCustomizeIcon>}  onClick={()=>setPage(4)}></Button>:''
          }
        </div>
    </div>
  )
}
