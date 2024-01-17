import React from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.png"
import "./header.css"

export default function Header() {
    const navigate = useNavigate();

    const goToSignUp= () => {
        navigate('/signup'); // Cambia '/signup' por la ruta a la que quieres redirigir para registrarse

    }

    const goToLogin = () => {
        navigate('/login'); // Cambia '/login' por la ruta a la que quieres redirigir para iniciar sesión
      };
    
  return (
    <header className="header">
      <div className="header__logo">
        <img src={Logo} alt="" />
      </div>
      <div className="header__buttons">
        <button className="header__button header__button--signup" onClick={goToSignUp}>SIGN UP</button>
        <button className="header__button header__button--login" onClick={goToLogin}>LOGIN</button>
      </div>
    </header>
  )
}
