import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import { Button, Divider, Typography } from '@mui/material';
import axios from 'axios';
import Fieldcom from './Fieldcom';
import { baseURL,endPoints } from '../../../../Services/Lab';
import { Load } from '../../../Other';
import { ConfirmPropmt } from '../../../Common';
export default function Testcom({handleClick1,handleClose,test}) {

  const [Fload,setFload]=useState([])//field set according to the needed test
  const [loading,setloading]=useState(true)

  const clearData=()=>{
    let tmp=[...Fload]
    tmp.forEach((el)=>{
       el.value=''
       el.status=null
    })
    setFload(tmp)
  }

  function getUTCDateTimeString() {
    const date = new Date();
    const dateString = date.toISOString().slice(0, -5); // Remove milliseconds and 'Z'
    return `${dateString}.000Z`; // Add '000' as milliseconds
}

  //confirm prompt=========================================================================
  const [loadingBConfirm, setLoadingBConfirm] = useState(false)//Loading button
  const [openConfirm, setOpenConfirm] = useState(false)
  const handleClickOpenConfirm = (x) => {
    //validation for empty fields
    let bol=true
    Fload.forEach((el)=>{
      if(el.value==''){
        bol=false
        console.log(el)
      }
    })
    if(!bol){
      console.log('error')
      handleClick1(null,'Fill all fields','warning')
      return
    }
    setOpenConfirm(true)
  }
  const handleCloseConfirm = () => {setOpenConfirm(false)}  

  //data submition function==================================
  const submitData=()=>{
      setLoadingBConfirm(true)
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
      setLoadingBConfirm(false)
      setOpenConfirm(false)
      handleClick1(test[0].id,'Results uploaded successfully','success')
      handleClose()
    })
    .catch((er)=>{
      setLoadingBConfirm(false)
      setOpenConfirm(false)
      handleClick1(null,'Error occured! try again','error')
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
        <Button           
          size="small"
          variant="contained" onClick={handleClickOpenConfirm} 
          sx={{ml:'10px'}}
        >Submit</Button>
        <Button variant='outlined'onClick={clearData} size='small' >Clear</Button>
    </Box>

    <ConfirmPropmt action={submitData} message="Are you sure that results are correct?"
       handleClose={handleCloseConfirm} loadingB={loadingBConfirm} open={openConfirm}></ConfirmPropmt>
    </Box>
  )
}
