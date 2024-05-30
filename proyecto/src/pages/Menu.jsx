import '../css/cocteles.css';

export default function Menu() {
    return (
        <div className='menu'>
            {/*La función obtenerCocteles al pulsar el botón genera 8 nuevos cócteles aleatorios */}
            <button onClick={()=>{window.location.assign("/cocteles")}}>Mix cocteles</button>
            <button onClick={()=>{window.location.assign("/categorias")}}>Categorías</button>
            <button onClick={()=>{window.location.assign("/ingredientes")}}>Cócteles por Ingrediente</button>
            <button onClick={()=>{window.location.assign("/platos")}}>Platos Típicos</button>
        </div>
    );
}