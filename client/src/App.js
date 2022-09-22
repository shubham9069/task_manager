import react from 'react';
import {Routes,Route,BrowserRouter} from "react-router-dom"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar"
import Definetask from "./Definetask";




function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      
      <Routes>
      <Route path="/" element={<Definetask/>}/>
      </Routes>
      <div className="container"> <h6 >if a button is already fire and showing timer so the other button will not work until you can stop this btn timer by clicking it .further i will explain to you by face so you understand better<br/> i can also show youstart time of timer stop time of timer  </h6></div>
      </BrowserRouter>
     
    </>
  );
}

export default App;
