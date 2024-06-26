let baseURL;

if (window.location.hostname === 'localhost') {
  baseURL = 'https://localhost:7205';
  } else {
    baseURL = 'https://mediicarehub.azurewebsites.net';
  }
    
let baseURLA=baseURL;
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dung7ryl3/image/upload';

const endPoints = {
    PatientList:'/api/Patient',
    StaffList:'/api/User', 
    // getStaffById:`/api/User/`,
    
    A_patient_count:'/api/Analytic/male-female-patients-count',
    
    A_income:'/api/Analytic/total-Income',
    
    A_DrugUsage:'/api/Analytic/daily-drug-usage',
    A_DrugAvailable:'/api/Analytic/available-count',
    
    A_Attendance:'/api/Analytic/userCheck',
    A_LabReports:'/api/Analytic/lab-report-Count',

    C_Notification:'/notificationHub',
  };

  const endPointsA = endPoints;

export { baseURL,baseURLA,endPoints,CLOUDINARY_URL,endPointsA};