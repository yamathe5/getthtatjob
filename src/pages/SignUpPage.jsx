import { useState } from "react";
import Header from "../componentes/Header";
import "./sign-up-page.css";
import { useAuth } from "../contexts/auth";
import discussing from "../assets/discussing.png";
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
    companyAbout: "",
    companyWebsite: "",
    // Asumimos que podría haber más datos específicos de cada tipo de usuario
  });

  const { signup } = useAuth();

  const handleInputChange = (e, name) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType == "professional") {
      const {
        email,
        password,
        name,
        phone,
        birthdate,
        linkedin,
        title,
        experience,
        education,
      } = formData;
      signup(
        {
          email,
          password,
          name,
          phone,
          birthdate,
          linkedin,
          title,
          experience,
          education,
        },
        userType
      );
    } else if (userType == "company") {
      const {
        companyName,
        companyEmail,
        password,
        companyWebsite,
        companyAbout,
      } = formData;
      signup(
        {
          company: companyName,
          email: companyEmail,
          password,
          website: companyWebsite,
          about: companyAbout,
        },
        userType
      );
    }
    // Aquí manejarías la lógica de envío del formulario
  };

  return (
    <div className="signup-page">
      <Header />
      <div className="signup-container">
        <div >
          <h2 className="signup-container__title headline-3 mb-16">
            Good choice!
          </h2>
          <p className="signup-container__subtitle headline-6">
            Create a new account as...
          </p>

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
            <form className="signup-form">
              <div className="signup-form__group">
                <label className="signup-form__label label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="signup-form__input input mb-16 mb-16"
                  value={formData.email}
                  onChange={(e) => handleInputChange(e, "email")}
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
                  onChange={(e) => handleInputChange(e, "password")}
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
                  onChange={(e) => handleInputChange(e, "passwordConfirmation")}
                />
              </div>

              <button
                onClick={handleNext}
                className="signup-form__submit rose-submit-btn"
              >
                Next
              </button>
            </form>
          )}

          {userType === "professional" && step === 2 && (
            <form className="signup-form">
              <div className="signup-form__group">
                <label className="signup-form__label label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="signup-form__input input mb-16"
                  value={formData.name}
                  onChange={(e) => handleInputChange(e, "name")}
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
                  onChange={(e) => handleInputChange(e, "phone")}
                />
              </div>

              <div className="signup-form__group">
                <label className="signup-form__label label" htmlFor="birthdate">
                  Birthdate
                </label>
                <input
                  id="birthdate"
                  type="date"
                  className="signup-form__input input mb-16"
                  value={formData.birthdate}
                  onChange={(e) => handleInputChange(e, "birthdate")}
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
                  onChange={(e) => handleInputChange(e, "linkedin")}
                />
              </div>

              <button
                onClick={handleNext}
                className="signup-form__submit rose-submit-btn"
              >
                Next
              </button>
            </form>
          )}
          {userType === "professional" && step === 3 && (
            <form className="signup-form">
              <div className="signup-form__group">
                <label className="signup-form__label label" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="signup-form__input input mb-16"
                  value={formData.title}
                  onChange={(e) => handleInputChange(e, "title")}
                />
              </div>

              <div className="signup-form__group">
                <label
                  className="signup-form__label label"
                  htmlFor="experience"
                >
                  Experience
                </label>
                <input
                  id="experience"
                  type="text"
                  className="signup-form__input input mb-16"
                  value={formData.experience}
                  onChange={(e) => handleInputChange(e, "experience")}
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
                  onChange={(e) => handleInputChange(e, "education")}
                />
              </div>

              <button
                onClick={(e) => handleSubmit(e)}
                className="signup-form__submit rose-submit-btn"
              >
                Next
              </button>
            </form>
          )}

          {userType === "company" && step === 1 && (
            // Formulario para el primer paso del reclutador
            <form className="signup-form">
              <div className="signup-form__group">
                <label
                  className="signup-form__label label"
                  htmlFor="companyName"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange(e, "companyName")}
                  className="signup-form__input input mb-16"
                />
              </div>
              <div className="signup-form__group">
                <label className="signup-form__label label" htmlFor="email">
                  Email
                </label>
                <input
                  id="companyEmail"
                  type="companyEmail"
                  className="signup-form__input input mb-16"
                  value={formData.companyEmail}
                  onChange={(e) => handleInputChange(e, "companyEmail")}
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
                  onChange={(e) => handleInputChange(e, "password")}
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
                  onChange={(e) => handleInputChange(e, "passwordConfirmation")}
                />
              </div>
              <button
                onClick={handleNext}
                className="signup-form__button-next rose-submit-btn"
              >
                Next
              </button>
            </form>
          )}

          {userType === "company" && step === 2 && (
            // Formulario para el segundo paso del reclutador
            <form className="signup-form">
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
                  onChange={(e) => handleInputChange(e, "companyWebsite")}
                />
              </div>
              <div className="signup-form__group">
                <label
                  className="signup-form__label label"
                  htmlFor="companyAbout"
                >
                  Company Description
                </label>
                <textarea
                  id="companyAbout"
                  name="companyAbout"
                  placeholder="About The Company"
                  value={formData.companyAbout}
                  onChange={(e) => handleInputChange(e, "companyAbout")}
                  className="signup-form__textarea textarea mb-16 "
                />
              </div>
              {/* Otros campos específicos para el reclutador */}
              <button
                onClick={handleBack}
                className="signup-form__button-back rose-submit-btn"
              >
                Back
              </button>
              <button
                type="submit"
                className="signup-form__button-submit rose-submit-btn"
                onClick={(e) => handleSubmit(e)}
              >
                Finish
              </button>
            </form>
          )}
        </div>
        <div className="image-container">
          <img src={ discussing} alt="" />
        </div>
      </div>
    </div>
  );
}
