import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import { Button, Divider, Typography } from '@mui/material';
import axios from 'axios';
import Fieldcom from './Fieldcom';
import { baseURL,endPoints } from '../../../../Services/Lab';
import { Load } from '../../../Other';

export default function Testcom({handleClose,handleClick1,test}) {


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
  const submitData=()=>{

      let tmp=[...Fload]
      let ob=[]
      tmp.forEach((el,ind)=>{
        let tmp2={
          "fieldid":el.fieldId,
          "result":el.value,
          "status":el.status
        }
        ob.push(tmp2)
      })

    let obj={
      "reportId":test[0].id,
      "dateTime":getUTCDateTimeString(),
      "results":ob
    }

    console.log(JSON.stringify(obj))
    axios.post(baseURL+endPoints.RESULT,obj)
    .then((res)=>{
      console.log(res.data)
      handleClick1()
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
       el.value=parseInt(x)
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
    <Box sx={{p:'10px',width:'450px'}}>
      <Typography>{test[0].testName} Test</Typography>
      <Divider sx={{mb:'15px'}}></Divider>
      
      <Box sx={{height:'300px',overflowY:'scroll'}}>
        {
          !loading ? Fload.map((el,indx)=>{
            return <Fieldcom field={el.fieldname} unit={el.unit} value={el.value} status={el.status} indx={indx} enterData={enterData}> </Fieldcom>
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
        <Button variant='contained'onClick={submitData} size='small' sx={{ml:'10px'}}>Submit</Button>
        <Button variant='outlined'onClick={clearData} size='small' >Clear</Button>
    </Box>

    </Box>
  )
}
