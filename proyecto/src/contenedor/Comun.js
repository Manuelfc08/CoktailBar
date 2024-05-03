import { Outlet } from 'react-router-dom';
import Footer from '../pages/Footer';
import Header from '../pages/Header';
const Comun = () => {

  return <>
    <Header />
    <Outlet />
    <Footer />
  </>
}
export default Comun;