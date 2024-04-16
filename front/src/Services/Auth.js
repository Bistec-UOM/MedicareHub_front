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

export { baseURL,endPoints,setHeaders};
