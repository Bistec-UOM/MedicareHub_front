const baseURL='https://localhost:7205'

const endPoints = {
    LOG:'/api/Auth/log'
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
