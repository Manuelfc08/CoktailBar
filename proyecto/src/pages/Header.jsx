import React from "react";
import '../css/header.css';
import logo from '../media/logoRedondeadoSinFondo.png';


const Header = () => {

    return (
    <div className="principalHeader">
        <a href="#">Cocktail Foodie Bar</a>
        <div className="separados">
            <img src={logo} alt="logoCabecera"/>
        </div>
    </div>
    );
}

export default Header;