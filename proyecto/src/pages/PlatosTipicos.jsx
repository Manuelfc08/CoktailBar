import axios from "axios";
import '../css/platosTipicos.css';
import { useEffect, useState } from "react";

export default function PlatosTipicos() {
    const [paises, setPaises] = useState([]);
    const [loading, setLoading] = useState("");
    const [food, setFood] = useState([]);

    function loadFoodByCountry(country) {
        setLoading(true);
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
            .then((response) => {
                setFood(response.data.meals);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    useEffect(() => {
        setLoading(true);
        axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
            .then((response) => {
                setPaises(response.data.meals);
                axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${response.data.meals[0].strArea}`)
                    .then((response) => {
                        setFood(response.data.meals);
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
    console.log(food);
    return (
        <>
            {loading === false && paises.length > 0 ?
                <div className="tabs-country">
                    {
                        paises.slice(0, 8).map(pais => {
                            return pais.strArea !== null && pais.strArea.length > 0
                                ? <div><button onClick={() => loadFoodByCountry(pais.strArea)}>{pais.strArea}</button></div>
                                : ""
                        })}
                </div>
                : "loading..."}
            {food.length > 0 ?
                <div className="products">
                    {food.slice(0, 8).map(f => {
                        return (
                            <div className="food">
                                <img src={f.strMealThumb} alt={f.strMeal}></img>
                                <p>{f.strMeal}</p>
                            </div>
                        )
                    })}
                </div>
                : <h3>El pais seleccionado no tiene platos disponibles</h3>
            }
        </>
    )

}

