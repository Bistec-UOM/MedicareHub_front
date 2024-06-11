//const baseURL='https://localhost:7205'
const baseURL='https://mediicarehub.azurewebsites.net'

const endPoints = {
    LOG:'/api/Auth/log',
    SENDOTP:'/api/Auth/reset/sendOTP',
    CHECKOPT:'/api/Auth/reset/checkOTP',
    NEW:'/api/Auth/reset/new'
  };
  
const setHeaders=()=>{
  let tmp={headers:
    {
    'Access-Control-Allow-Origin':'*',
    'Authorization': `Bearer ${localStorage.getItem('medicareHubToken')}`,
    'Content-Type': 'application/json'
    }
  }
  return tmp
}

const deleteLog=()=>{ //delete existing token
  if(localStorage.getItem('medicareHubToken'))
  {
    localStorage.removeItem('medicareHubToken')
  }
}


export { baseURL,endPoints,setHeaders,deleteLog};
