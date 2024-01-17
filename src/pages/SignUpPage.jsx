import { useState } from "react";
import Header from "../componentes/Header";
import "./sign-up-page.css"

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [userType, setuserType] = useState("professional"); // 'professional' o 'company'

  const [formData, setFormData] = useState({
    // Datos comunes entre profesional y reclutador
    email: "",
    password: "",
    passwordConfirmation: "",
    // Datos comunes entre profesional
    name: "",
    phone: "",
    birthdate: "",
    linkedin: "",
    title: "",
    experience: "",
    education: "",
    // Datos específicos del reclutador
    companyName: "",
    companyEmail: "",
    companyDescription: "",
    companyWebsite: "",
    // Asumimos que podría haber más datos específicos de cada tipo de usuario
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    // Validar datos antes de pasar al siguiente paso
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejarías la lógica de envío del formulario
  };

  return (
    <div className="signup-page">
      <Header />
      <div className="signup-container">
        <h2 className="signup-container__title headline-3 mb-16">Good choice!</h2>
        <p className="signup-container__subtitle headline-6">Create a new account as...</p>

        <div className="account-type-toggle">
          <button
            className={`account-type-toggle__button ${
              userType === "professional"
                ? "account-type-toggle__button--active"
                : ""
            }`}
            onClick={() => {
              setuserType("professional");
              setStep(1);
            }}
          >
            PROFESSIONAL
          </button>
          <button
            className={`account-type-toggle__button ${
              userType === "company"
                ? "account-type-toggle__button--active"
                : ""
            }`}
            onClick={() => {
              setuserType("company");
              setStep(1);
            }}
          >
            RECRUITER
          </button>
        </div>

        {userType === "professional" && step === 1 && (
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-form__group">
              <label className="signup-form__label label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="signup-form__input input mb-16 mb-16"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="signup-form__group">
              <label className="signup-form__label label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="signup-form__input input mb-16 mb-16"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="signup-form__group">
              <label
                className="signup-form__label label"
                htmlFor="passwordConfirmation"
              >
                Password Confirmation
              </label>
              <input
                id="passwordConfirmation"
                type="password"
                className="signup-form__input input mb-16 mb-16"
                value={formData.passwordConfirmation}
                onChange={handleInputChange}
              />
            </div>

            <button onClick={handleNext} className="signup-form__submit rose-submit-btn">
              Next
            </button>
          </form>
        )}

        {userType === "professional" && step === 2 && (
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-form__group">
              <label className="signup-form__label label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="signup-form__input input mb-16"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="signup-form__group">
              <label className="signup-form__label label" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                type="phone"
                className="signup-form__input input mb-16"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="signup-form__group">
              <label className="signup-form__label label" htmlFor="birthdate">
                Birthdate
              </label>
              <input
                id="birthdate"
                type="text"
                className="signup-form__input input mb-16"
                value={formData.birthdate}
                onChange={handleInputChange}
              />
            </div>
            <div className="signup-form__group">
              <label className="signup-form__label label" htmlFor="linkedin">
                Linkedin
              </label>
              <input
                id="linkedin"
                type="text"
                className="signup-form__input input mb-16"
                value={formData.linkedin}
                onChange={handleInputChange}
              />
            </div>

            <button onClick={handleNext} className="signup-form__submit rose-submit-btn">
              Next
            </button>
          </form>
        )}
        {userType === "professional" && step === 3 && (
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-form__group">
              <label className="signup-form__label label" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                type="text"
                className="signup-form__input input mb-16"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="signup-form__group">
              <label className="signup-form__label label" htmlFor="experience">
                Experience
              </label>
              <input
                id="experience"
                type="text"
                className="signup-form__input input mb-16"
                value={formData.experience}
                onChange={handleInputChange}
              />
            </div>

            <div className="signup-form__group">
              <label className="signup-form__label label" htmlFor="education">
                Education
              </label>
              <input
                id="education"
                type="text"
                className="signup-form__input input mb-16"
                value={formData.education}
                onChange={handleInputChange}
              />
            </div>

            <button onClick={handleNext} className="signup-form__submit rose-submit-btn">
              Next
            </button>
          </form>
        )}

        {userType === "company" && step === 1 && (
          // Formulario para el primer paso del reclutador
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-form__group">
              <label className="signup-form__label label" htmlFor="companyName">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleInputChange}
                className="signup-form__input input mb-16"
              />
            </div>
            <div className="signup-form__group">
              <label className="signup-form__label label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="signup-form__input input mb-16"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="signup-form__group">
              <label className="signup-form__label label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="signup-form__input input mb-16"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="signup-form__group">
              <label
                className="signup-form__label label"
                htmlFor="passwordConfirmation"
              >
                Password Confirmation
              </label>
              <input
                id="passwordConfirmation"
                type="password"
                className="signup-form__input input mb-16"
                value={formData.passwordConfirmation}
                onChange={handleInputChange}
              />
            </div>
            <button onClick={handleNext} className="signup-form__button-next rose-submit-btn">
              Next
            </button>
          </form>
        )}

        {userType === "company" && step === 2 && (
          // Formulario para el segundo paso del reclutador
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-form__group">
              <label
                className="signup-form__label label"
                htmlFor="companyWebsite"
              >
                Company Website
              </label>
              <input
                id="companyWebsite"
                type="text"
                className="signup-form__input input mb-16"
                value={formData.companyWebsite}
                onChange={handleInputChange}
              />
            </div>
            <div className="signup-form__group">
              <label
                className="signup-form__label label"
                htmlFor="companyDescription"
              >
                Company   Description
              </label>
              <textarea
                id="companyDescription"
                name="companyDescription"
                placeholder="About The Company"
                value={formData.companyDescription}
                onChange={handleInputChange}
                className="signup-form__textarea textarea mb-16 "
              />
            </div>
            {/* Otros campos específicos para el reclutador */}
            <button onClick={handleBack} className="signup-form__button-back rose-submit-btn">
              Back
            </button>
            <button type="submit" className="signup-form__button-submit rose-submit-btn">
              Finish
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
