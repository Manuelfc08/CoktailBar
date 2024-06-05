import { useEffect, useState } from "react";
import axios from "axios";
import CeldaCoctel from "./Celda";
import "../css/categorias.css";

export default function Categorias() {
    const [categories, setCategories] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [loading, setLoading] = useState(false);

    function findDrinksByCategory(categorySelected) {

    // .replace reemplaza dónde exista espacio en blanco, por un guión bajo. 
        let category = categorySelected.replace(" ", "_");
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
            .then((response) => {
                setDrinks(response.data.drinks);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        setLoading(true);
        // Llamada al combo de categorías
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
            .then((response) => {
                setCategories(response.data.drinks);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            {loading === false && categories !== undefined && categories.length > 0
             ?<select className="selectCategory" onChange={(event) => findDrinksByCategory(event.target.value)} >
              <option value="A"></option>
                    {categories.map((category) => {
                        //opciones del select
                        return <option value={category.strCategory}>{category.strCategory}</option>
                    })}
                </select>
             : <h1>No hay categorias por el momento</h1>}

            <div className="products">
                {drinks !== undefined && drinks.length > 0 
                ? drinks.slice(0,8).map(drink => {
                        return <CeldaCoctel imagen={drink.strDrinkThumb} nombre={drink.strDrink}/>
                    })
                : <h1>No hay bebidas por el momento</h1>}
            </div>
        </>
    );
}