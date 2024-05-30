import React, { useState, useEffect } from "react";
import CeldaCoctel from './CeldaCoctel'
import axios from "axios";
import '../css/cocteles.css';

const Cocteles = () => {
    // Declaramos el estado 'cocteles' y su función para actualizarlo
    const [cocteles, setCocteles] = useState([]);
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
                    console.log(error);
                });
        }
    };

    // Efecto secundario con useEffect para cargar 8 cócteles al inicio
    useEffect(() => {
        obtenerCocteles();
    }, []);

    return (
        <>
            <div className="products">
                {cocteles.map((coctel) => (
                    <CeldaCoctel coctel={coctel} />
                ))}
            </div>
        </>
    );
};

export default Cocteles;

