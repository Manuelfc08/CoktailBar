import React from 'react';
import {
    Routes,
    Route,
    BrowserRouter as Router,
} from "react-router-dom";

import Cocteles from './Cocteles';
import PlatosTipicos from './PlatosTipicos';
import Prueba from './Prueba';

const Rutas = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Cocteles />} />
                <Route exact path="/cocteles" element={<Cocteles />}></Route>
                <Route exact path="/platos" element={<PlatosTipicos />}></Route>
                <Route exact path="/prueba" element={<Prueba />}></Route>
                <Route exact path="*" element={<h1>Error</h1>} />
            </Routes>
        </Router>
    );
}
export default Rutas