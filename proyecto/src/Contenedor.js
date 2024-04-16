import {Outlet} from 'react-router-dom';
const Contenedor = (props) => {

    return <>
        <h1>Aquí va la barra</h1>
        <Outlet />
    </>
}
export default Contenedor;