import Admin from "./pages/Admin";
import Doctor from "./pages/Doctor";
import Pharmacy from "./pages/Pharmacy";
import Receptionist from "./pages/Receptionist";
import Lab from "./pages/Lab";
import Log from "./pages/Log";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lab_template from "./pages/Lab_template";

function App() {
  const [appointlist,setAppointList]=useState([
    {
      name:'kamal',
      city:'Colombo',
      today:'January 4, 2024',
      nic:'21433454325',
      phone:'0774733245',
      time:'8.30 AM'
      

    },
    {
      name:'akila',
      city:'Colombo',
      today:'January 4, 2024',
      nic:'4524523',
      phone:'0774733245',
      time:'9.00 AM'
      

    },
    {
      name:'namal',
      city:'Colombo',
      today:'January 4, 2024',
      nic:'452452343',
      phone:'0774733245',
      time:'9.30 AM'
      

    },
    {
      name:'sachith',
      city:'Colombo',
      today:'January 4, 2024',
      nic:'4524543223',
      phone:'0774733245',
      time:'10.00 AM'
      

    },
    {
      name:'vihanga',
      city:'Colombo',
      today:'January 4, 2024',
      nic:'45244332523',
      phone:'0774733245',
      time:'10.30 AM'
      

    },
    {
      name:'ranil',
      city:'Moratuwa',
      today:'January 4, 2024',
      nic:'54325324',
      phone:'0742314567',
      time:'11.00 AM'
      

    },
    {
      name:'saman',
      city:'kandy',
      today:'January 5, 2024',
      nic:'54243252',
      phone:'0774733245',
      time:'9.30 AM'

    },

    {
      name:'nipun',
      city:'galle',
      today:'January 6, 2024',
      nic:'5243525',
      phone:'0774733245',
      time:'9.30 AM'
    }
  ]);


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
      <Route path='lab/temp' element={<Lab_template></Lab_template>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
