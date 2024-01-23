import Admin from "./pages/Admin";
import Doctor from "./pages/Doctor";
import Pharmacy from "./pages/Pharmacy";
import Receptionist from "./pages/Receptionist";
import Lab from "./pages/Lab";
import Log from "./pages/Log";
import Day from "./components/recepcomponents/Day/Day";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lab_template from "./pages/Lab_template";

function App() {
 


  return (
    
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Log></Log>}></Route>
      <Route path='admin' element={<Admin></Admin>}></Route>
      <Route path='recep' element={<Receptionist></Receptionist>}></Route>
      <Route path='doct' element={<Doctor></Doctor>}></Route>
      <Route path='pharm' element={<Pharmacy></Pharmacy>}></Route>
      <Route path='lab' element={<Lab></Lab>}></Route>
      <Route path='/day' element={<Day/>}></Route>
      <Route path='lab/temp' element={<Lab_template></Lab_template>}></Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
