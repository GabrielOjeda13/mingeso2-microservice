import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './components/Home';
import VehiculoList from './components/VehiculosList';
import ReparacionList from './components/ReparacionList';
import ReparacionReporteR2List from './components/ReparacionReporteR2List';
import ReparacionReporteR4List from './components/ReparacionReporteR4List';
import TablaPrecioList from './components/TablaPrecioList';
import CostoList from './components/CostoList';
import AddEditVehiculo from './components/AddEditVehiculo';
import NotFound from './components/NotFound';


function App() {
  return (
      <Router>
          <div className="container">
          <Navbar></Navbar>
            <Routes>
              <Route path="/home" element={<Home/>} />
              <Route path="/vehiculo/list" element={<VehiculoList/>} />
              <Route path="/reparacion/list" element={<ReparacionList/>} />
              <Route path="/reporter2/list" element={<ReparacionReporteR2List/>} />
              <Route path="/reporter4/list" element={<ReparacionReporteR4List/>} />
              <Route path="/precio/list" element={<TablaPrecioList/>} />
              <Route path="/costo/list" element={<CostoList/>} />
              <Route path="/vehiculo/add" element={<AddEditVehiculo/>} />
              <Route path="/vehiculo/edit/:id" element={<AddEditVehiculo/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
      </Router>
  );
}

export default App
