const baseURL="https://localhost:7205"

const endPoints = {
    DoctorsList:"/api/Appointment/doctors",
    BlockedDates:"/api/Appointment/BlockedDates",
    AppDayCount:"/api/Appointment/doctor/",
    REPORT:'/api/Values/ReportRequest',
    SET_ACCEPT:'/api/Values/Accept',
    GET_ACCEPT:'/api/Values/Accept',
    RESULT:'/api/Values/Result'
  };
  
export { baseURL,endPoints};

//DoctrsList-for fetching the app list