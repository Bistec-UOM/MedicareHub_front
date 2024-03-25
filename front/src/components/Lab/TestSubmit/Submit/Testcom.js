import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import { Button, Divider, Typography } from '@mui/material';
import axios from 'axios';
import Fieldcom from './Fieldcom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { baseURL,endPoints } from '../../../../Services/Lab';

export default function Testcom({handleClose,test,settest}) {

    // SnackBar component====================================================================================
    const [open, setOpen] = React.useState(false);

    const handleClick1 = () => {
      setOpen(true);
    };
  
    const handleClose1 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    }
    //======================================================================================================

  const [Fload,setFload]=useState([])//field set according to the needed test
  const [loading,setloading]=useState(true)

  const clearData=()=>{
    let tmp=[...Fload]
    tmp.map((el)=>{
       el.value=''
    })
    setFload(tmp)
  }

  function getUTCDateTimeString() {
    const date = new Date();
    const dateString = date.toISOString().slice(0, -5); // Remove milliseconds and 'Z'
    return `${dateString}.0000000Z`; // Add '000' as milliseconds
}
  const submitData=()=>{

      let tmp=[...Fload]
      let ob=[]
      console.log(tmp)
      tmp.map((el,ind)=>{
        let tmp2={
          fieldid:el.fieldId,
          result:el.value,
          status:el.status
        }
        ob.push(tmp2)
      })

    let obj={
      ReportId:test[0].id,
      DateTime:getUTCDateTimeString(),
      Results:ob
    }
    console.log(obj);

    axios.post(baseURL+endPoints.RESULT.obj)
    .then((res)=>{
      console.log(res.data)
    })
    .catch((er)=>{
      console.log(er.message)
    })
/*     setTimeout(() => {
      handleClose()
      let tmp=[...load]
      tmp.pop()
      setLoad(tmp)
    }, 3000)
    setTimeout(() => {
      handleClick1()
    }, 2500) */
  }

  const enterData=(indx,x)=>{
    let tmp=[...Fload]
    tmp.map((el,ind)=>{
      if(ind==indx){
       el.value=parseInt(x)
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
      tmp.map((el,ind)=>{
        let tmp2={
          fieldname:el.fieldname,
          fieldId:'',
          minRef:'',
          maxRef:'',
          unit:'',
          value:'',
          status:''
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
    .catch(er=>{})
  },[])


  return (
    <Box sx={{p:'10px',width:'450px'}}>
      <Typography>{test.testName} Test</Typography>
      <Divider sx={{mb:'15px'}}></Divider>
      {
        !loading ? Fload.map((el,indx)=>{
          return <Fieldcom field={el.fieldname} unit={el.unit} value={el.value} indx={indx} enterData={enterData}> </Fieldcom>
        }) : ''
      }
    <Box sx={{display:'flex',flexDirection:'row-reverse',alignItems:'center'}}>
        <Button variant='contained'onClick={submitData} size='small' sx={{ml:'10px'}}>Submit</Button>
        <Button variant='outlined'onClick={clearData} size='small' >Clear</Button>
    </Box>


    {/* ----------------- snack bar ----------------------------------------------------------------*/}
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose1}>
        <Alert
          onClose={handleClose1}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Results added successfuly
        </Alert>
      </Snackbar>
    </Box>
  )
}
