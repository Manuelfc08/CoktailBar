import axios from "axios";
import '../css/platosTipicos.css';
import { useEffect, useState } from "react";


//Podría ser en una sola línea el export asi: export default function PlatosTipicos(){}
 function PlatosTipicos() {
    const [countries, setCountries] = useState([]);
    // Si tardase mucho la info de la consulta a la api, saldría cargando...
    const [loading, setLoading] = useState(false);
    const [foods, setFoods] = useState([]);

    function loadFoodByCountry(country) {
        //Acento invertido permite concatenar un string con una variable
        //Equivale 'https://www.themealdb.com/api/json/v1/1/filter.php?a=' + country
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
            .then((response) => {
                {/*Traigo el país, y cambio la comida en base al país que recibo */}
                setFoods(response.data.meals.slice(0,8));
                {/*Por si en algún momento quedo en true, nos aseguramos de que esté en false sino muestra loading siempre */}
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    // Antes de cargar la pag qué tengo que hacer
    useEffect(() => {
        setLoading(true);
        // Lista de países
        axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
            .then((response) => {
                //meals no son comidas, es el nombre del JSON de países en la API
                setCountries(response.data.meals.slice(0,8));
                axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${response.data.meals[0].strArea}`)
                    .then((response) => {
                        setFoods(response.data.meals.slice(0,8));
                        {/*He terminado de cargar todo lo necesario y loading pasa a false */}
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log(foods); //Sólo para comprobar en cónsola los platos (debug)
    return (
        <div className="container">
            {/*Lógica sobre pestañas */}
            {/*si loading es false y el país tiene algún dato, pinto las pestañas con los países */}
            {loading === false && countries.length > 0 ?
                <div className="tabs-country">
                    {
                        countries.map(country => {
                            //API devuelve valores países sin valor, y un país con valor "Unknown", por eso esta condición !==null etc.
                            return (
                                country.strArea !== null && country.strArea.length > 0
                                ? <div><button onClick={() => loadFoodByCountry(country.strArea)}>{country.strArea}</button></div>
                                : "")
                        })}
                </div>
                : "loading..."
            }

            {/*Lógica sobre los platos */}
            {foods.length > 0 ?
                <div className="foods">
                    {/*Aquí recorro el array de comidas, para tomar una comida y pintar el plato y su nombre */}
                    {foods.map(food => {
                        return (
                            <div className="food">
                                <img src={food.strMealThumb} alt={food.strMeal}></img>
                                <p className="name-food">{food.strMeal}</p>
                            </div>
                        )
                    })}
                </div>
                : <h3>El pais seleccionado no tiene platos disponibles</h3>
            }
        </div>
    )

}

export default PlatosTipicos;