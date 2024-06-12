let baseURL;

if (window.location.hostname === 'localhost') {
  baseURL = 'https://localhost:7205';
} else {
  baseURL = 'https://mediicarehub.azurewebsites.net';
}


const endPoints = { 
    APPOINTMENTLIST:'/api/Doctor/AppointList2',
    PRESCRIPTION:'/api/Doctor/Prescription',  
    HISTORYRECORDS:'/api/Doctor/Prescription',
    REC:'/api/History/history',
    MARK:'/api/Values/Mark',
    PROFILE:'/api/Patient'
  };
  
export { baseURL,endPoints};
