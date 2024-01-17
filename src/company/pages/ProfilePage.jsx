import Sidebar from "../components/Sidebar";
import "./profile-page.css";
import { useAuth } from "../../contexts/auth";
import { useState } from "react";
export default function ProfilePage() {
  const { currentUser } = useAuth();
  const [inputs, setInputs] = useState(currentUser);

  console.log(inputs)
  function handleOnChangeInput(e, inputType){
    console.log(inputType)
    setInputs((prev)=>({
      ...prev,
      [inputType]: e.target.value
    }))
  }

  return (
    <div className="company-profile-page">
      <Sidebar></Sidebar>

      <main className="company-profile-main">
        <header className="company-profile-header">
          <h1 className="company-profile-header__title headline-4">Profile</h1>
        </header>
        <form className="company-profile-form">
          <section className="company-profile-form__section">
            {/* <h2 className="company-profile-form__subtitle ">Company Information</h2> */}
            <label
              htmlFor="companyEmail"
              className="company-profile-form__label label mb-4"
            >
              Company Email
            </label>
            <input
              type="email"
              id="companyEmail"
              className="company-profile-form__input input mb-8"
              value={inputs.email}
              onChange={(e) => handleOnChangeInput(e,"email")}
            />

            <label
              htmlFor="company"
              className="company-profile-form__label label mb-4"
            >
              Company Name
            </label>
            <input
              type="text"
              id="company"
              className="company-profile-form__input input mb-8"
              value={inputs.company}
              onChange={(e) => handleOnChangeInput(e,"company")}
            />

            <label
              htmlFor="website"
              className="company-profile-form__label label mb-4"
            >
              Company Website
            </label>
            <input
              type="text"
              id="website"
              className="company-profile-form__input input mb-8"
              value={inputs.website}
              onChange={(e) => handleOnChangeInput(e,"website")}
            />

            <label
              htmlFor="about"
              className="company-profile-form__label label mb-4"
            >
              About The Company
            </label>
            <textarea
              id="about"
              className="company-profile-form__textarea textarea mb-8"
              value={inputs.about}
              onChange={(e) => handleOnChangeInput(e,"about")}
            ></textarea>
          </section>

          <button
            type="submit"
            className="company-profile-form__submit-button rose-submit-btn"
          >
            UPDATE PROFILE
          </button>
        </form>
      </main>
    </div>
  );
}
