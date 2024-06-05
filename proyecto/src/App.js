import './App.css';
import Rutas from './pages/Rutas';
import Footer from './pages/Footer';
import Header from './pages/Header';

function App() {
  return (
    <div className='principal-p'>
      <Header />
      <div className='container'>
        <Rutas />
      </div>
      <Footer />
    </div>
  )
}

export default App;
