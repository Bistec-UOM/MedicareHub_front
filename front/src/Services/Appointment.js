const baseURL="https://localhost:7205"
//const baseURL="https://https://medicarehub.azurewebsites.net/:7205"

const endPoints = {
    DoctorsList:"/api/Appointment/doctors",
    BlockedDates:"/api/Appointment/BlockedDates/",
    AppDay:"/api/Appointment/doctor/",
    PatientList:"/api/Appointment/patients",
    Appoinment:"/api/Appointment/",
    AppCancel:"/updateStatus/",
    REPORT:'/api/Values/ReportRequest',
    SET_ACCEPT:'/api/Values/Accept',
    GET_ACCEPT:'/api/Values/Accept',
    RESULT:'/api/Values/Result',
    UpdateStatusCompleted:'/updateStatus/',
    UnableDates:'/api/Appointment/unableDates'
  };
  
export { baseURL,endPoints};

//DoctrsList-for fetching the app list
//BlockedDates- for fetching blocked dates of a doctor
//AppDay - for fetching doctor day app
//Appoinment- for represenring an appointment
//AppCancel-for cancelling one appointment by a doctor