import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import { Button, Divider, Typography } from '@mui/material';
import axios from 'axios';
import Fieldcom from './Fieldcom';
import { baseURL,endPoints } from '../../../../Services/Lab';
import { Load } from '../../../Other';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

export default function Testcom({handleClick1,handleClose,test}) {

  const [Fload,setFload]=useState([])//field set according to the needed test
  const [loading,setloading]=useState(true)

  const clearData=()=>{
    let tmp=[...Fload]
    tmp.forEach((el)=>{
       el.value=''
    })
    setFload(tmp)
  }

  function getUTCDateTimeString() {
    const date = new Date();
    const dateString = date.toISOString().slice(0, -5); // Remove milliseconds and 'Z'
    return `${dateString}.000Z`; // Add '000' as milliseconds
}

  const [loadingB, setLoadingB] = useState(false)//Loading button

  const submitData=()=>{
      setLoadingB(true)//loading button

      let tmp=[...Fload]
      let ob=[]
      tmp.forEach((el,ind)=>{
        let tmp2={
          "fieldid":el.fieldId,
          "result":parseFloat(el.value),
          "status":el.status
        }
        ob.push(tmp2)
      })

    let obj={
      "reportId":test[0].id,
      "dateTime":getUTCDateTimeString(),
      "results":ob
    }
    
    axios.post(baseURL+endPoints.RESULT,obj)
    .then((res)=>{
      console.log(res.data)
      handleClick1(test[0].id)
      handleClose()
    })
    .catch((er)=>{
      console.log(er.message)
    }) 
 
  }

  const enterData=(indx,x)=>{

    let stat=(min,max,val)=>{
      if(val<min){
        return 'low'
      }else if(val>max){
        return 'high'
      }else{
        return 'normal'
      }
    }

    let tmp=[...Fload]
    tmp.forEach((el,ind)=>{
      if(ind===indx){
       el.value=x
       el.status=stat(el.minRef,el.maxRef,x)
      }
    })
    setFload(tmp)
  }

  useEffect(()=>{
    axios.get(baseURL+endPoints.TEMPLATE+`${test[0].testId}`)
    .then(res=>{
      setFload(res.data)

      //Adding value property to every object in Fload
      let tmp=[...res.data]
      let ob=[]
      tmp.forEach((el,ind)=>{
        let tmp2={
          fieldname:el.fieldname,
          fieldId:'',
          minRef:'',
          maxRef:'',
          unit:'',
          value:'',
          status:null
        }
        tmp2.fieldId=el.id
        tmp2.minRef=el.minRef
        tmp2.maxRef=el.maxRef
        tmp2.unit=el.unit
        ob.push(tmp2)
      })

      setFload(ob)
      setloading(false)
    })
    .catch(er=>{
      console.log(er.message)
    })
  },[test])


  return (
    <Box sx={{p:'10px',width:'550px'}}>
      <Typography sx={{color:'grey',fontWeight:'bold',fontSize:'14px'}}>{test[0].testName} Test</Typography>
      <Divider sx={{mb:'15px'}}></Divider>
      
      <Box sx={{height:'300px',overflowY:'scroll'}}>
        {
          !loading ? Fload.map((el,indx)=>{
            return <Fieldcom field={el.fieldname} unit={el.unit} value={el.value} status={el.status} indx={indx} min={el.minRef}  max={el.maxRef} enterData={enterData}></Fieldcom>
          }) :<Load></Load>
        }
      </Box>
    <Box 
      sx={{
        display:'flex',
        flexDirection:'row-reverse',
        alignItems:'center',
        pt:'20px'
        }}
    >
        <LoadingButton           
          size="small"
          endIcon={<SendIcon />}
          loading={loadingB}
          loadingPosition="end"
          variant="contained" onClick={submitData} 
          sx={{ml:'10px'}}
        >Submit</LoadingButton>
        <Button variant='outlined'onClick={clearData} size='small' >Clear</Button>
    </Box>

    </Box>
  )
}
