import { Outlet } from 'react-router-dom';
import Footer from '../pages/Footer';
import Header from '../pages/Header';
import Menu from '../pages/Menu';

const Comun = () => {
  return <>
    <Header />
    <Menu/>
    <Outlet />
    <Footer />
  </>
}
export default Comun;