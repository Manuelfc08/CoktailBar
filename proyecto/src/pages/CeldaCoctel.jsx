import React from "react";


//Este componente se usa para mostrar la información de un cóctel
const CeldaCoctel =  (props) => {
  return (
    <div className="cocktail-container">
      <img className="cocktail-image"src={props.coctel.strDrinkThumb} alt="Imagen cóctel" />
      <p className="cocktail-name">{props.coctel.strDrink}</p>
    </div>
  );
};

export default CeldaCoctel;