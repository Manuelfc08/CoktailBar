import React from "react";
//Este componente se usa para mostrar la información de un cóctel
const Celda = ({imagen,nombre}) => {
  return (
     <div className="celda">
      <img src={imagen} alt={nombre}/>
      <p>{nombre}</p>
    </div>
  );
};

export default Celda;