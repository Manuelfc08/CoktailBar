import './App.css';
import Rutas from './pages/Rutas';
import Footer from './pages/Footer';
import Header from './pages/Header';
import Menu from './pages/Menu';

function App() {
  return (
    <div className='principal-p'>
      <Header />
      <Menu />
      <div className='container'>
        <Rutas />
      </div>
      <Footer />
    </div>
  )
}

export default App;
