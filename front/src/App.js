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
import TestPractise from "./components/recepcomponents/testpractice/TestPractise";
import DoctorPage from "./components/recepcomponents/DoctorAppointmentHandle/DoctorPage.js/DoctorPage";
import DoctorList from "./components/recepcomponents/DoctorAppointmentHandle/DoctorList/DoctorList";
import Doctor_analytics from "./components/Doctor_analytics";

function App() {
  return (
    
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
      <Route path="doct/analytics" element={<Doctor_analytics/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
