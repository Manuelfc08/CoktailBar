import { useState } from "react";
import axios from "axios";
import Error from "./Error";
import "../css/ingredientes.css";

export default function Ingredientes() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(false);
  {/*El modal es el cuadro de diálogo al pulsar sobre un cóctel */ }
  const [openModal, setOpenModal] = useState(false);
  const [ingredientsSelected, setIngredientsSelected] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [drinkSelected, setDrinkSelected] = useState("");
  const [error, setError] = useState("");

  /*Se realiza una petición a la API para obtener bebidas que 
  contienen el ingrediente especificado. Si encuentra bebidas, 
  devuelve las primeras 14; si no, devuelve un array vacío. */
  function getDrinks(ingredient) {

    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then((response) => {
        if (
          response.data.drinks !== undefined &&
          response.data.drinks.length > 0
        ) {
          setDrinks(response.data.drinks.slice(0, 14));
        } else {
          setDrinks([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }


  function callAPI(e) {

    setLoading(true);
    getDrinks(e.target.value);


  }
  /*Cuando se hace clic en el botón de búsqueda, obtiene el valor del input(búsqueda), 
  llama a las funciones anteriores para obtener las bebidas y sus descripciones, 
  actualiza el estado de carga y guarda las bebidas en el estado. */

  function showModal(drink) {
    axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`
      )
      .then((response) => {
        const completeDrink = response.data.drinks[0];
        setDrinkSelected(completeDrink.strDrink);
        setInstructions(
          completeDrink.strInstructionsES !== null
            ? completeDrink.strInstructionsES
            : completeDrink.strInstructions
        );
        let listIngredients = [];
        let listMeasures = [];
        let result = [];
        console.log(completeDrink);
        for (let key in completeDrink) {
          if (completeDrink[key] !== null && key !== "") {
            if (key.includes("strIngredient")) {
              listIngredients.push(completeDrink[key]);
            }
          }
          if (key.includes("strMeasure")) {
            listMeasures.push(completeDrink[key]);
          }
        }
        for (let i = 0; i <= listIngredients.length - 1; i++) {

          let ingredients = listIngredients[i];
          if (listMeasures[i] !== null) {
            ingredients += " : " + listMeasures[i]
          } else {
            ingredients += ": N/A";
          }
          result.push(ingredients);
        }
        setIngredientsSelected(
          result
        );
      })
      .catch((error) => {
        setError(error);
      });

    setOpenModal(true);
  }

  /*Cuando se hace clic en una bebida, extrae los ingredientes de la descripción de la bebida,
    establece el nombre de la bebida,  las instrucciones y los ingredientes en el estado, y abre el modal. */

  function hidenModal() {
    setOpenModal(false);
  }

  /* Renderiza el input para introducir el ingrediente y el botón para buscar.
  También llama a la función visualizacion para mostrar el contenido adecuado 
  basado en el estado de carga y la lista de bebidas. */

  return (
    <>
      <input
        id="toSearch"
        type="text"
        className="searcher"
        placeholder="Introduzca un ingrediente"
        onChange={(e) => { callAPI(e) }}
      ></input>

      {visualizacion()}
    </>
  );

  /*Devuelve el contenido a mostrar basado en el estado de carga y la lista de bebidas. 
   Si está cargando, muestra un mensaje de carga; si hay bebidas, 
   llama a viewProducts; si no hay bebidas, muestra un mensaje de error. */

  function visualizacion() {
    if (!error) {
      if (loading === false) {
        if (drinks.length > 0) {
          return viewProducts();
        } else {
          return <h1>Lo sentimos no hay bebidas con ese ingrediente</h1>;
        }
      } else {
        return <div><span class="loader"></span></div>;
      }
    } else {
      return <Error message={error} />
    }
  }

  /*Para mostrar las bebidas. Por cada bebida, 
  crea un div con una imagen y el nombre de la bebida, 
  y establece un evento de clic para mostrar el modal
  con los detalles de la bebida. */

  function viewProducts() {
    return (
      <>
        <div className="products_v1">
          {modal()}
          {drinks.map((drink) => {
            return (
              <div
                className="drink_v1"
                onClick={(e) => showModal(drink)}
              >
                <img src={drink.strDrinkThumb} alt={drink.strDrink}></img>
                <p>{drink.strDrink}</p>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  /*Permite al usuario buscar bebidas por ingrediente, 
  muestra una lista de bebidas encontradas y 
  permite ver los detalles de cada bebida en un modal. */
  function modal() {
    return (
      <div
        style={{ display: openModal ? "block" : "none" }}
        className="detail"
      >
        <div className="close"><button onClick={(e) => { hidenModal() }}>x</button></div>
        <h3>{drinkSelected}</h3>
        <div className="detail-ingredients">
          <h3>Ingredientes y medidas</h3>
          <div>{ingredientsSelected.map(i => {
            return <p>{i}</p>;
          })}</div>
        </div>
        <div className="detail-instructions">
          <h3>Instrucciones</h3>
          <p style={{ textAlign: "justify" }}>{instructions}</p>
        </div>
      </div>
    );
  }
}