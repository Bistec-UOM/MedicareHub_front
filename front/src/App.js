import Admin from "./pages/Admin";
import Doctor from "./pages/Doctor";
import Pharmacy from "./pages/Pharmacy";
import Receptionist from "./pages/Receptionist";
import Lab from "./pages/Lab";
import Log from "./pages/Log";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lab_template from "./pages/Lab_template";
import Pharmacy_drugstore from "./pages/Pharmacy_drugstore";
import ResponseAppCalender from "./components/recepcomponents/ResponseAppointmentCalender/ResponseAppCalender";
import ResDay from "./components/recepcomponents/ResDay/ResDay";
import DoctorPage from "./components/recepcomponents/DoctorAppointmentHandle/DoctorPage/DoctorPage";
import DoctorList from "./components/recepcomponents/DoctorAppointmentHandle/DoctorList/DoctorList";
import Doctor_analytics from "./components/Doctor_analytics";
import ViewResult from "./components/Lab/ViewResult";
import NotificationComponentlk from "./components/Admin/PageComponents/notify";
import Login from "./components/Admin/PageComponents/login";
import { ThemeProvider } from "@mui/material";
import theme from "./components/Style";
import Test from "./pages/Test";

function App() {
  return (
    
<ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
        <Routes>
        <Route path='/' element={<Log></Log>}></Route>
        <Route path='admin' element={<Admin></Admin>}></Route>
        <Route path='doct' element={<Doctor></Doctor>}></Route>
        <Route path='pharm' element={<Pharmacy></Pharmacy>}></Route>
        <Route path='lab' element={<Lab></Lab>}></Route>
        <Route path='lab/temp' element={<Lab_template></Lab_template>}></Route>
        <Route path='pharm/drug' element={<Pharmacy_drugstore></Pharmacy_drugstore>}></Route>
        <Route path="res" element={<ResponseAppCalender></ResponseAppCalender>}></Route>
        <Route path='/resday' element={<ResDay/>}></Route>
        <Route path='/dpage' element={<DoctorPage/>}></Route>
        <Route path="/dappList" element={<DoctorList/>}></Route>
        <Route path="doct/analytics" element={<Doctor_analytics pId={17}/>}></Route>
        <Route path="lab/view" element={<ViewResult id={4}></ViewResult>}></Route>
        <Route path="admin/final" element={<NotificationComponentlk/>}></Route>
        <Route path="admin/test" element={<Login/>}></Route>
        <Route path="/test" element={<Test></Test>}></Route>
        
        </Routes>
        </BrowserRouter>
      </div>
</ThemeProvider>
  );
}

export default App;
