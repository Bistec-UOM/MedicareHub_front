let baseURL
if (window.location.hostname === 'localhost') {
  baseURL = 'https://localhost:7205';
} else {
  baseURL = 'https://mediicarehub.azurewebsites.net';
}

const endPoints = {
    LOG: '/api/Auth/log',
    SENDOTP: '/api/Auth/reset/sendOTP',
    CHECKOTP: '/api/Auth/reset/checkOTP',
    NEW: '/api/Auth/reset/new'
};

const setHeaders = () => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${localStorage.getItem('medicareHubToken')}`,
      'Content-Type': 'application/json'
    }
  };
};

const deleteLog = () => { // delete existing token
  if (localStorage.getItem('medicareHubToken')) {
    localStorage.removeItem('medicareHubToken');
  }
};

export { baseURL, endPoints, setHeaders, deleteLog };
