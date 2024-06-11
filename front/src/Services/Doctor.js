let baseURL;

if (window.location.hostname === 'localhost') {
  baseURL = 'https://localhost:7205';
} else {
  baseURL = 'https://mediicarehub.azurewebsites.net';
}


const endPoints = { 
    APPOINTMENTLIST:'/api/Doctor/AppointList',
    PRESCRIPTION:'/api/Doctor/Prescription',  
    HISTORYRECORDS:'/api/Doctor/Prescription'
  };
  
export { baseURL,endPoints};
