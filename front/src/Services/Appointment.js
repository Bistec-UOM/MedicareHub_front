let baseURL;

if (window.location.hostname === 'localhost') {
  baseURL = 'https://localhost:7205';
} else {
  baseURL = 'https://mediicarehub.azurewebsites.net';
}

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
    UnableDates:'/api/Appointment/unableDates',
    notifications:'/api/Appointment/Notifications/',
    MarkAsSennNotification:'/api/Appointment/notifications/',
    UnableTimeSlots:'/api/Appointment/BlockDates/'
  };
  
export { baseURL,endPoints};

//DoctrsList-for fetching the app list
//BlockedDates- for fetching blocked dates of a doctor
//AppDay - for fetching doctor day app
//Appoinment- for represenring an appointment
//AppCancel-for cancelling one appointment by a doctor