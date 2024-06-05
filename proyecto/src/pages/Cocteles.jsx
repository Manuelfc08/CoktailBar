import React, { useState, useEffect } from "react";
import CeldaCoctel from './Celda';
import Error from "./Error";
import axios from "axios";


const Cocteles = () => {
    // Declaramos el estado 'cocteles' y su función para actualizarlo
    const [cocteles, setCocteles] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    // Función para obtener 8 cócteles de la API
    const obtenerCocteles = () => {
        let nuevosCocteles = [];
        for (let i = 0; i < 8; i++) {
            axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
                .then((response) => {
                    console.log(response.data);
                    //Concatenamos el objeto obtenido de la respuesta de la API al array nuevosCocteles
                    nuevosCocteles = nuevosCocteles.concat(response.data.drinks[0]);
                    //Con el if comprobamos si tamaño de nuevosCocteles es 8 y actualizamos su valor con SetCocteles
                    //para que se pinten otros 8 cocteles
                    if (nuevosCocteles.length === 8) {
                        setCocteles(nuevosCocteles);
                    }
                })
                .catch((error) => {
                    setError(error);
                });
        }

    };

    // Efecto secundario con useEffect para cargar 8 cócteles al inicio
    useEffect(() => {
        setLoading(true);
        obtenerCocteles();
        setLoading(false);
    }, []);

    if (!error) {
        return (
            <>  {!loading ?
                <div className="products">
                    {cocteles.map((coctel) => (
                        <CeldaCoctel imagen={coctel.strDrinkThumb} nombre={coctel.strDrink} />
                    ))}
                </div> : <div><span class="loader"></span></div>}
            </>
        )
    } else {
        return <Error message={error} />
    }
};

export default Cocteles;

