let baseURL;

if (window.location.hostname === 'localhost') {
  baseURL = 'https://localhost:7205';
} else {
  baseURL = 'https://mediicarehub.azurewebsites.net';
}


const endPoints = {
    TEST:'/api/Test',
    TEMPLATE:'/api/Test/Template',
    REPORT:'/api/Values/ReportRequest',
    SET_ACCEPT:'/api/Values/Accept',
    GET_ACCEPT:'/api/Values/Accept',
    RESULT:'/api/Values/Result',
    ANALYTIC:'/api/DoctorAnalytic',
    HISTORY:'/api/History'
};
  
export { baseURL,endPoints};

//https://medicarehub.azurewebsites.net