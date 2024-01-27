import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./job-posting-page.css";
import { useAuth } from "../../contexts/auth";


import { useNavigate } from 'react-router-dom';

function formateDate(date) {
  const newDate = new Date(date);

  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const year = newDate.getFullYear().toString().substr(-2); // Solo los últimos dos dígitos del año

  // Formatear la fecha como MM/DD/YY
  // Uso de `padStart(2, '0')` para asegurar que el día y el mes siempre tengan dos dígitos
  return `Open on ${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}/${year}`;
}

// CLOSE




export default function JobPostingPage() {
  const [filter, setFilter] = useState("all");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const {currentUser} = useAuth();
  const navigate = useNavigate();
  const handleShowClick = (jobId) => {
    navigate(`/company/job-posting/${jobId}`);
  };

  function handleToggleButtonLocal(e, id) {
    setJobs((prevJobs) => {
      // Primero, mapear y cambiar el estado 'close' del trabajo con el ID correspondiente.
      const updatedJobs = prevJobs.map((job) =>
        job.id === id ? { ...job, close: !job.close } : job
      );
  
      // Luego, ordenar los trabajos en base al estado 'close'.
      const sortedJobs = updatedJobs.sort((a, b) => {
        if (a.close && !b.close) {
          return 1;
        } else if (!a.close && b.close) {
          return -1;
        }
        return 0;
      });
  
      // Finalmente, devolver los trabajos ya actualizados y ordenados para actualizar el estado.
      return sortedJobs;
    });
  
    // Aquí deberías agregar la lógica para actualizar el estado en la base de datos.
  }
  
  function handleToggleButton(e, id) {
    // Encuentra el trabajo actual por ID
    const jobToUpdate = jobs.find((job) => job.id === id);
    if (!jobToUpdate) return;

    // Actualiza el estado 'close' en la base de datos
    updateJobCloseStatus(id, jobToUpdate, !jobToUpdate.close);
  }

  useEffect(() => {
    let filtered = jobs;
    if (filter === "withCandidatesOnTrack") {
      filtered = jobs.filter((job) => job.track > 0);
    } else if (filter === "closed") {
      filtered = jobs.filter((job) => job.close);
    }
    setFilteredJobs(filtered);
  }, [filter, jobs]);

  useEffect(() => {
    fetch(`https://getthatjobbaackend.onrender.com/api/companys/${currentUser.id}/jobs`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        data.sort((a, b) => {
          if (a.close ) {
            return 1;
          }
          else if (b.close ) {
            return -1; 
          }
          return 0;
        });
        
        setJobs(data);
        setFilteredJobs(data);
      });
  }, []);

  function updateJobCloseStatus(id, jobToUpdate, newCloseStatus) {
    fetch(`https://getthatjobbaackend.onrender.com/api/jobs/${id}`, {
      method: "PUT", // o PUT dependiendo de tu API
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...jobToUpdate, close: newCloseStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updated:", data);
        // Aquí actualizas el estado local después de la respuesta de la API
        handleToggleButtonLocal(null, id);
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div className="job-posting-page">
      <Sidebar></Sidebar>

      <main className="job-posting-main">
        <header className="job-posting-header">
          <h1 className="job-posting-header__title headline-4 mb-16">
            Job Postings
          </h1>
        </header>
        <section className="job-posting-page__filter">
          <div className="job-posting-page__filter__filter mb-16">
            <p className="label">Filter your applications</p>
            <div className="applications-header__filters">
              <input
                type="radio"
                id="all"
                name="applicationFilter"
                value="all"
                checked={filter === "all"}
                onChange={(e) => setFilter(e.target.value)}
                className="job-posting-page__filter-input"
              />
              <label htmlFor="all" className="applications-filter__label label">
                All
              </label>
              <input
                type="radio"
                id="withCandidatesOnTrack"
                name="applicationFilter"
                value="withCandidatesOnTrack"
                checked={filter === "withCandidatesOnTrack"}
                onChange={(e) => setFilter(e.target.value)}
                className="job-posting-page__filter-input"
              />
              <label
                htmlFor="withCandidatesOnTrack"
                className="applications-filter__label label"
              >
                With candidates on track
              </label>

              <input
                type="radio"
                id="closed"
                name="applicationFilter"
                value="closed"
                checked={filter === "closed"}
                onChange={(e) => setFilter(e.target.value)}
                className="job-posting-page__filter-input"
              />
              <label
                htmlFor="closed"
                className="applications-filter__label label"
              >
                Closed
              </label>
            </div>
          </div>
          <h2 className="job-posting-page__filter__count headline-6 mb-8">
            Jobs postings found
          </h2>
          <article className="job-postings__container">
            {filteredJobs &&
              filteredJobs.map((item, index) => {
                return (
                  <div className="job-posting mb-16" key={index}>
                    <div className="job-posting__dbetails">
                      <h3 className="job-posting__title headline-6 mb-4">
                        {item.title}
                      </h3>
                      <p className="job-posting__info">
                        {/* Manufactoring + Full time + 2.0k - 2.5k */}
                        {item.category +
                          " " +
                          item.type +
                          " " +
                          item.salaryrange}
                      </p>
                    </div>

                    <div className="job-posting__statistics">
                      <p> {formateDate(item.posteddate)} </p>
                      <p>
                        {item.count_candidates} <br />
                        Total Candidates
                      </p>
                      <p>
                        {item.track} <br /> Candidates on track{" "}
                      </p>
                    </div>

                    <div className="job-posting__actions">
                      <button className="job-posting__button job-posting__button--show" onClick={()=> handleShowClick(item.id)}>
                        O SHOW

                      </button>
                      <button
                        className={
                          "job-posting__button " +
                          (item.close
                            ? "job-posting__button--closed"
                            : "job-posting__button--close")
                        }
                        onClick={(e) => handleToggleButton(e, item.id)}
                      >
                        {item.close ? "O CLOSED" : "X CLOSE"}
                      </button>
                    </div>
                  </div>
                );
              })}
          </article>
        </section>
      </main>
    </div>
  );
}
