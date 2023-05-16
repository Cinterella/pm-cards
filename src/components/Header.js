import React from 'react';
import '../App.css';

const Header = () => {
    return (
        <header className="header sticky">
            <div className="container clearfix nopadding">
                <div id="logo">
                    <a href="https://puntamogote.com.ar" style={{ backgroundImage: 'url( "https://puntamogote.com.ar/wp-content/uploads/2022/04/punta-mogote-logo-con-margen-align-left.svg" )' }}></a>
                </div>
                <div className="menu-button">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <nav className="nav">
                <div className="menu-main-menu-container">
                    <h1>Nuestros puestos</h1>
                </div>
                </nav>
            </div>
        </header>
  );
};

export default Header;