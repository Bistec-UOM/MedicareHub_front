// const baseURL='https://mediicarehub.azurewebsites.net/api'
const baseURL='https://localhost:7205/api'

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dung7ryl3/image/upload';

const endPoints = {
    PatientList:'/Patient',
    StaffList:'/User', 
    
    A_patient_count:'/Analytic/male-female-patients-count',
    
    A_income:'/Analytic/total-Income',
    
    A_DrugUsage:'/Analytic/daily-drug-usage',
    A_DrugAvailable:'/Analytic/available-count',
    
    A_Attendance:'/Analytic/userCheck',
    A_LabReports:'/Analytic/lab-report-Count',
  };
  
export { baseURL,endPoints,CLOUDINARY_URL};