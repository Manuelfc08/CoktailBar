import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Comun from './contenedor/Comun';
import Cocteles from './pages/Cocteles';

function App() {
  
    return <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Comun />}> 
          <Route index element ={<Cocteles />}></Route>
          <Route path = "cocteles" element = {<Cocteles />}></Route>
          

        </Route>
      </Routes>
    </BrowserRouter>

}

export default App;
