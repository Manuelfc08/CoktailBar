import '../css/menuHeader.css';
export default function MenuHeader() {
    return (
        <div>
            <div>
                <a href="/">Cocktail Foodie Bar</a>
            </div>

            <div className="menu-header">
                <button onClick={() => { window.location.assign("/cocteles") }}>Mix cocteles</button>
                <button onClick={() => { window.location.assign("/categorias") }}>Categorías</button>
                <button onClick={() => { window.location.assign("/ingredientes") }}>Cócteles por Ingrediente</button>
                <button onClick={() => { window.location.assign("/platos") }}>Platos Típicos</button>
            </div>
        </div>
    );
}