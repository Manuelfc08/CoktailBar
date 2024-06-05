import React from "react";
import "../css/header.css";
import logo from "../media/imagenLogo.png";
import MenuHeader from "./MenuHeader";

const Header = () => {
  return (
    <div className="principalHeader">
      <div className="grid-header">
        <MenuHeader />
        <div className="separados">
          <img src={logo} alt="logoCabecera" />
        </div>
      </div>
    </div>
  );
};

export default Header;
