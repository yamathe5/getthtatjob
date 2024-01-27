import Header from "../componentes/Header";
import { useState } from "react";
import "./login-page.css";
import { useAuth } from "../contexts/auth";
import welcome from "../assets/Welcomeback.png"


export default function LoginPage() {
  const [userType, setUserType] = useState("professional"); // 'professional' o 'company'
  const [email, setEmail] = useState("Elenora_Lang85@yahoo.com");
  const [password, setPassword] = useState("fiLL1XmqGis68Ga");
  const { login } = useAuth();

  // Manejadores para los inputs y el toggle
  const handleUserTypeToggle = (type) => {
    setUserType(type);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    login(email, password, userType)
  };

  return (
    <div>
      <Header></Header>
      <main className="main-content">
        <div className="login-container">
          <h2 className="login-container__title headline-3 mb-16">
            Welcome back
          </h2>
          <p className="login-container__subtitle headline-6">
            Login to your account as...
          </p>
          <div className="user-type-toggle mb-16">
            <button
              className={`user-type-toggle__button ${
                userType === "professional"
                  ? "user-type-toggle__button--active"
                  : ""
              }`}
              onClick={() => handleUserTypeToggle("professional")}
            >
              PROFESSIONAL
            </button>
            <button
              className={`user-type-toggle__button ${
                userType === "company"
                  ? "user-type-toggle__button--active"
                  : ""
              }`}
              onClick={() => handleUserTypeToggle("company")}
            >
              RECRUITER
            </button>
          </div>
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <div className="login-form__group mb-16">
              <label htmlFor="" className="label mb-4">
                EMAIL
              </label>

              <input
                type="email"
                className="login-form__input input"
                placeholder="Email"
                value={email || "Elenora_Lang85@yahoo.com"}
                onChange={handleEmailChange}
              />
            </div>
            <div className="login-form__group mb-16">
              <label htmlFor="" className="label">
                PASSWORD
              </label>
              <input
                type="password"
                className="login-form__input input"
                placeholder="Password"
                value={password || "fiLL1XmqGis68Ga"}
                onChange={handlePasswordChange}
              />
            </div>
            <button
              type="submit"
              className="login-form__submit rose-submit-btn"
            >
              LOGIN
            </button>
          </form>
        </div>
        <div className="illustration">
          {/* Asumiendo que tienes la imagen guardada en la carpeta public */}
          <img
            src={welcome}
            alt="A professional waving"
            className="illustration__image"
          />
        </div>
      </main>
    </div>
  );
}
