import "./create-new-job-page.css";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useAuth } from "../../contexts/auth";

export default function CreateNewJobPage() {
  const { currentUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const [inputs, setInputs] = useState({
    title: "",
    category: "",
    maxsalary: "",
    minsalary: "",
    type: "Full-time",
    aboutjob: "",
    mandatoryrequirements: "",
    optionalrequirements: "",
  });
  // salaryrange --------------
  // -----
  // company
  // aboutcompany
  // posteddate
  // -----
  // candidates
  // profilestrack
  // close

  async function handleSubmitButton(e) {
    e.preventDefault();

    const now = new Date();
    const dateTimeString = now.toISOString();

    if (parseInt(inputs.minsalary) > parseInt(inputs.maxsalary)) {
      // Configura el mensaje de error y detén la ejecución de la función
      setErrorMessage(
        "The minimum salary must be less than the maximum salary."
      );
      return; // Detén la ejecución si la validación falla
    }

    // Limpia el mensaje de error si la validación es exitosa
    setErrorMessage("");

    await fetch("http://localhost:3000/api/jobs", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        ...inputs,
        company: currentUser.company,
        aboutcompany: currentUser.about,
        posteddate: dateTimeString,
        candidates: 0,
        track: 0,
        close: false,
        companyid: currentUser.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error posting job:", error);
        setErrorMessage("An error occurred while posting the job.");
      });
  }

  function handleInputsChange(e, inputType) {
    setInputs((prev) => ({
      ...prev,
      [inputType]: e.target.value,
    }));
  }

  return (
    <div className="create-job-page">
      <Sidebar></Sidebar>
      <main className="create-job-main">
        <header className="create-job-header">
          <h1 className="create-job-header__title headline-4 mb-16">
            Create new job posting
          </h1>
        </header>
        <form className="create-job-form">
          <section className="create-job-form__section">
            {errorMessage && (
              <p className="create-job-form__error-message headline-6">
                {errorMessage}
              </p>
            )}
            <h2 className="create-job-form__subtitle headline-5 mb-8">
              Main information
            </h2>
            <label htmlFor="jobTitle" className="create-job-form__label label">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              className="create-job-form__input input mb-8"
              value={inputs.title}
              onChange={(e) => handleInputsChange(e, "title")}
            />
            <label
              htmlFor="jobCategory"
              className="create-job-form__label label"
            >
              Job Category
            </label>
            <input
              type="text"
              id="jobCategory"
              className="create-job-form__input input mb-8"
              value={inputs.category}
              onChange={(e) => handleInputsChange(e, "category")}
            />
            <label htmlFor="type" className="create-job-form__label label mb-4">
              Type
            </label>
            <select name="" id="" className="create-job-form__input input mb-8">
              <option value="dog">Full-time</option>
              <option value="cat">Part-time</option>
            </select>
            <label
              htmlFor="minsalary"
              className="create-job-form__label label mb-4"
            >
              Type
            </label>
            <div className="imput-salary-container">
              <input
                type="number"
                id="minsalary"
                className="create-job-form__input input mb-8"
                value={inputs.minsalary}
                onChange={(e) => handleInputsChange(e, "minsalary")}
              />

              <div className="imput-salary-container__divider mb-8"></div>

              <input
                type="number"
                id="maxsalary"
                className="create-job-form__input input mb-8"
                value={inputs.maxsalary}
                onChange={(e) => handleInputsChange(e, "maxsalary")}
              />
            </div>
            {/* Repeat for other fields like Job Category, Type, Salary Range */}
          </section>
          <section className="create-job-form__section">
            <h2 className="create-job-form__subtitle headline-5 mb-8">
              Additional information
            </h2>
            <label
              htmlFor="jobDescription"
              className="create-job-form__label label mb-4"
            >
              About the job position
            </label>
            <textarea
              id="jobDescription"
              className="create-job-form__textarea textarea mb-8"
              value={inputs.aboutjob}
              onChange={(e) => handleInputsChange(e, "aboutjob")}
            ></textarea>
            <label
              htmlFor="mandarotyRequirements"
              className="create-job-form__label label mb-4"
            >
              Mandatory Requirements
            </label>
            <textarea
              id="mandarotyRequirements"
              className="create-job-form__textarea textarea mb-8"
              value={inputs.mandarotyrequirements}
              onChange={(e) => handleInputsChange(e, "mandarotyrequirements")}
            ></textarea>
            <label
              htmlFor="optionalRequirements"
              className="create-job-form__label label mb-4"
            >
              Optional Requirements
            </label>
            <textarea
              id="optionalRequirements"
              className="create-job-form__textarea textarea mb-8"
              value={inputs.optionalrequirements}
              onChange={(e) => handleInputsChange(e, "optionalrequirements")}
            ></textarea>

            {/* Repeat for other fields like Mandatory Requirements, Optional Requirements */}
          </section>
          <button
            type="submit"
            className="create-job-form__submit rose-submit-btn"
            onClick={(e) => handleSubmitButton(e)}
          >
            POST THIS JOB
          </button>
        </form>
      </main>
    </div>
  );
}
