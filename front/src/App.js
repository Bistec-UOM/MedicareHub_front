
import Doctor from "./pages/Doctor";
import Pharmacy from "./pages/Pharmacy";
import Receptionist from "./pages/Receptionist";
import Lab from "./pages/Lab";
import Log from "./pages/Log";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Log></Log>}></Route>
      <Route path='admin' element={<Dashboard/>}></Route>
      <Route path='recep' element={<Receptionist></Receptionist>}></Route>
      <Route path='doct' element={<Doctor></Doctor>}></Route>
      <Route path='pharm' element={<Pharmacy></Pharmacy>}></Route>
      <Route path='lab' element={<Lab></Lab>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
