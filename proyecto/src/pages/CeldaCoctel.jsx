import React from "react";


//Este componente se usa para mostrar la información de un cóctel
const CeldaCoctel = (props) => {
  return (
    <div >
      <img src={props.coctel.strDrinkThumb} alt="Imagen cóctel" />
      <p>{props.coctel.strDrink}</p>
    </div>
  );
};

export default CeldaCoctel;