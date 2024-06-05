import axios from "axios";
import "../css/platosTipicos.css";
import { useEffect, useState } from "react";
import CeldaPlato from "./Celda";
import Error from "./Error";

export default function PlatosTipicos() {
  const [paises, setPaises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState([]);
  const [error, setError] = useState("");

  function loadFoodByCountry(country) {
    callApiFoodByCountry(country);
  }

  function callApiFoodByCountry(country) {
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
      .then((response) => {
        setFood(response.data.meals);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((response) => {
        setPaises(response.data.meals);
        callApiFoodByCountry(response.data.meals[0].strArea);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (!error) {
    return (
      <>
        {loading === false && paises.length > 0 ? (
          <div className="tabs-country">
            {/* Aquí se quitó la funcion .slice y ahora muestra todos los países*/}
            {paises.map((pais) => {
              return pais.strArea !== null && pais.strArea.length > 0 ? (
                <div>
                  <button onClick={() => loadFoodByCountry(pais.strArea)}>
                    {pais.strArea}
                  </button>
                </div>
              ) : (
                ""
              );
            })}
          </div>
        ) : (
          <span class="loader"></span>
        )}
        {food.length > 0 ? (
          <div className="products">
            {food.slice(0, 8).map((f) => {
              return <CeldaPlato imagen={f.strMealThumb} nombre={f.strMeal} />;
            })}
          </div>
        ) : (
          <h3>El pais seleccionado no tiene platos disponibles</h3>
        )}
      </>
    )
  } else {
    return <Error message={error} />
  }
}
