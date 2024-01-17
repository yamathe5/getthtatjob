import Sidebar from "../components/Sidebar";
import "./profile-page.css";
import { useAuth } from "../../contexts/auth";
import { useState } from "react";
export default function Profile() {
  const { currentUser } = useAuth();
  const [inputs, setinputs] = useState(currentUser);

  const dateForInput = new Date(inputs.birthdate).toISOString().split("T")[0];
  // const handleDateChange = (event) => {
  //   const newDate = new Date(event.target.value);
  //   const isoDateToSend = newDate.toISOString();
  //   // Actualizar el estado o enviar la fecha a la API
  //   setDate(isoDateToSend);
  // };


    function handleOnChangeInput(e, field) {
    setinputs((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  }

  return (
    <div className="profile-page">
      <Sidebar></Sidebar>
      <main className="profile-main">
        <header className="profile-header">
          <h1 className="profile-header__title mb-16">Profile</h1>
        </header>
        <section className="profile-content">
          <form className="profile-form">
            <div className="profile-form__section mb-16">
              <h2 className="profile-form__subtitle headline-5 mb-8">
                Personal information
              </h2>
              <label htmlFor="email" className="profile-form__label label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="profile-form__input input mb-8"
                value={inputs.email}
                onChange={(e) => handleOnChangeInput(e, "email")}
              />
              <label htmlFor="name" className="profile-form__label label ">
                name
              </label>
              <input
                type="name"
                id="name"
                className="profile-form__input input mb-8"
                value={inputs.name}
                onChange={(e) => handleOnChangeInput(e, "name")}
              />
              <label htmlFor="phone" className="profile-form__label label">
                phone
              </label>
              <input
                type="phone"
                id="phone"
                className="profile-form__input input mb-8"
                value={inputs.phone}
                onChange={(e) => handleOnChangeInput(e, "phone")}
              />
              <label htmlFor="birthdate" className="profile-form__label label">
                birthdate
              </label>
              <input
                type="date"
                id="birthdate"
                className="profile-form__input input mb-8"
                value={dateForInput}
                onChange={(e) => handleOnChangeInput(e, "birthdate")}
              />
              <label htmlFor="linkedin" className="profile-form__label label">
                linkedin
              </label>
              <input
                type="linkedin"
                id="linkedin"
                className="profile-form__input input mb-8"
                value={inputs.linkedin}
                onChange={(e) => handleOnChangeInput(e, "linkedin")}
              />
              {/* Repeat for other personal information fields */}
            </div>
            <div className="profile-form__section mb-16">
              <h2 className="profile-form__subtitle headline-5 mb-8">
                Professional information
              </h2>
              <p className="profile-form__instruction mb-8">
                Changes made here will be reflected in your future applications
              </p>
              <label htmlFor="title" className="profile-form__label label">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="profile-form__input input mb-8"
                value={inputs.title}
                onChange={(e) => handleOnChangeInput(e, "title")}
              />

              <label htmlFor="experience" className="profile-form__label label">
                Profesional experience
              </label>
              <textarea
                name="experience"
                id="experience"
                cols="30"
                rows="5"
                className="profile-form__input input mb-8"
                value={inputs.experience}
                onChange={(e) => handleOnChangeInput(e, "experience")}
              ></textarea>
              <label htmlFor="education" className="profile-form__label label">
                Education
              </label>
              <textarea
                name="education"
                id="education"
                cols="30"
                rows="5"
                className="profile-form__input input"
                value={inputs.education}
                onChange={(e) => handleOnChangeInput(e, "education")}
              ></textarea>
              {/* Repeat for other professional information fields */}
            </div>
            <button
              type="submit"
              className="profile-form__submit rose-submit-btn mb-16"
            >
              SAVE CHANGES
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
