import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./about-that-job-page.css"; // Asegúrate de que el nombre del archivo CSS coincide con este import
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { formatDistanceToNow } from "date-fns";

function TimeAgo({ dateString }) {
  const date = new Date(dateString ); // Añade 'Z' para asegurar interpretación como UTC
  return `${formatDistanceToNow(date, { addSuffix: true })}`;
}

function formatDate(){

  var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
  var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
  
  return localISOTime  // => '2015-01-26T06:40:36.181'
}


export default function AboutThatJobPage() {
  const [job, setJob] = useState(null);
  const { id } = useParams(); // Aquí extraemos el id de la URL
  const { currentUser } = useAuth();
  const [toggle, setToggle] = useState(false);
  const [inputValues, setInputValues] = useState({
    professionalexperience: currentUser.experience,
    whyareyouinterested: "",
  });

  useEffect(() => {
    // Asegúrate de usar el id en la URL del endpoint
    fetch(
      `https://getthatjobbaackend.onrender.com/api/professionals/${currentUser.id}/jobs/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(currentUser)
        setJob(data); // Aquí actualizamos el estado con los datos de la API
      })
      .catch((error) => {
        // Es una buena práctica manejar errores de la petición
        console.error("Error fetching job data:", error);
      });
  }, [id]); // El id es una dependencia del useEffect

  if (!job) {
    return <div>Loading...</div>; // Muestra algo mientras los datos están cargando
  }

  function handleSendApplication() {
    console.log(inputValues);

    fetch(`https://getthatjobbaackend.onrender.com/api/applications/jobs/${id}/apply`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        jobid: id,
        professionalid: currentUser.id,
        professionalexperience: inputValues.professionalexperience,
        whyareyouinterested: inputValues.whyareyouinterested,
        date: formatDate(),
        status: "waiting",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(res)
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) =>
        console.error(
          "There has been a problem with your fetch operation:",
          error
        )
      );
  }

  function handleOnchangueInputs(e, type) {
    setInputValues((prev) => ({
      ...prev,
      [type]: e.target.value,
    }));
  }
  return (
    <div className="about-job-page">
      <Sidebar />
      <main className="about-job">
        <div className="about-job__back-button-container">
          <button className="about-job__back-button">{"< BACK"}</button>
        </div>

        <section className="about-job__header">
          <div className="about-job__company-info">
            <img src="" alt="" className="about-job__company-logo" />
            <h3 className="about-job__company-name headline-5">
              {job[0].company}
            </h3>
            <p className="about-job__company-status">{ job[0].following ? "FOLLOWING" : "NOT FOLLOWING"}</p>
          </div>

          {
            toggle ? <button
            className="about-job__apply-button rose-submit-btn"
            onClick={() => handleSendApplication()}
          >
            SEND APPLICATION
          </button> : <button
            className="about-job__apply-button rose-submit-btn"
            onClick={() => setToggle((prev) => !prev)}
            >
           APPLY NOW
          </button>
          }
          
        </section>

        <article className="about-job__details">
          <h3 className="about-job__title headline-3 mb-8">{job[0].title} </h3>
          <p className="about-job__posted-date mb-16">
            <TimeAgo dateString={job[0].posteddate} />
          </p>
          <div className="about-job__attributes">
            <div className="about-job__attribute">
              <p className="about-job__attribute-name mb-4">Category</p>
              <p className="about-job__attribute-value">{job[0].category}</p>
            </div>
            <div className="about-job__attribute">
              <p className="about-job__attribute-name mb-4">Type</p>
              <p className="about-job__attribute-value">{job[0].type}</p>
            </div>
            <div className="about-job__attribute">
              <p className="about-job__attribute-name mb-4">Salary</p>
              <p className="about-job__attribute-value">
                ${job[0].minsalary} - ${job[0].maxsalary}
              </p>
            </div>
          </div>
        </article>

        {toggle ? (
          <>
            <section className="about-job__send-application">
              <h3 className="about-job__send-application-title headline-5 mb-16">
                Complete your application
              </h3>
              <label className="label" htmlFor="">
                Professional experience (taken from your profile)
              </label>
              <textarea
                className="input mb-16"
                type="text"
                value={inputValues.professionalexperience}
                onChange={(e) =>
                  handleOnchangueInputs(e, "professionalexperience")
                }
              />

              <label className="label mb-4" htmlFor="">
                Why are you interested in working at The company name SA
              </label>
              <textarea
                className="input mb-4"
                type="text"
                value={inputValues.whyareyouinterested}
                onChange={(e) =>
                  handleOnchangueInputs(e, "whyareyouinterested")
                }
              />
              <p className="input-description mb-16">
                Between 50 and 1000 characters
              </p>
            </section>

            <button
              className="about-job__apply-button rose-submit-btn"
              onClick={() => handleSendApplication()}
            >
              SEND APPLICATION
            </button>
          </>
        ) : (
          <>
            <section className="about-job__description">
              <div className="about-job__company-description">
                <h3 className="about-job__section-title headline-5 mb-8">
                  About The company name SA
                </h3>
                <p className="about-job__text mb-16">{job[0].aboutcompany}</p>
              </div>

              <div className="about-job__position-description">
                <h3 className="about-job__section-title headline-5 mb-8">
                  About the job position
                </h3>
                <p className="about-job__text mb-16">{job[0].aboutjob}</p>
              </div>

              <div className="about-job__requirements">
                <h3 className="about-job__section-title headline-5 mb-8">
                  Mandatory Requirements
                </h3>
                <p className="about-job__text mb-16">
                  {job[0].mandatoryrequirements}
                </p>
              </div>

              <div className="about-job__requirements">
                <h3 className="about-job__section-title headline-5 mb-8">
                  Optional Requirements
                </h3>
                <p className="about-job__text mb-16">
                  {job[0].optionalrequirements}
                </p>
              </div>
            </section>

            <button
              className="about-job__apply-button rose-submit-btn"
              onClick={() => setToggle((prev) => !prev)}
            >
              APPLY NOW
            </button>
          </>
        )}
      </main>
    </div>
  );
}
