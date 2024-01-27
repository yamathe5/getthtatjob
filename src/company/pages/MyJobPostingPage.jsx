import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../../contexts/auth";
import { useParams } from "react-router-dom";
import { formatDistanceToNow, format } from "date-fns";

import "./my-job-posting-page.css";

function TimeAgo({ dateString }) {
  const date = new Date(`${dateString}`);
  return formatDistanceToNow(date, { addSuffix: true });
}

function formatStatus(status) {
  if (status == "waiting") {
    return "Waiting for review";
  } else if (status == "inprogress") {
    return "Review in progress";
  } else if (status == "finished") {
    return "Review finished";
  } else if (status == "delined") {
    return "Review decined on =======";
  } else {
    return "Status not valid";
  }
}

export default function MyJobPostingPage() {
  const { currentUser } = useAuth();
  const { id } = useParams(); // Aquí extraemos el id de la URL
  const [job, setJob] = useState({});
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [filter, setFilter] = useState("all");

  function handleCardClick(clickedId) {
    setExpandedCard(expandedCard === clickedId ? null : clickedId);
  }
  function handleCandidateClick(clickedId) {
    setSelectedCandidate(selectedCandidate === clickedId ? null : clickedId);
  }
  const getFormattedDate = (dateString) => {
    if (!dateString) return ""; // Retorna un string vacío si la fecha no es válida
    const date = new Date(dateString);
    return isNaN(date) ? "" : format(date, "MM/dd/yy");
  };

  function handleUpdateStatus(e, applicationId, newStatus) {
    e.stopPropagation(); // Detiene la propagación del evento
    if(newStatus === "stop") return 
    fetch(`http://localhost:3000/api/applications/${applicationId}`, {
      method: "PATCH", // Usar PUT o PATCH dependiendo de la operación deseada y la API
      headers: {
        "Content-Type": "application/json", // Asegurarse de que el servidor espera JSON
        // Aquí puedes agregar más encabezados si es necesario, como tokens de autenticación
      },
      body: JSON.stringify({
        status: newStatus, // Asegúrate de que este es el formato esperado por tu API
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => updateData(data))
      .catch((error) => console.error("Error al actualizar el estado:", error));
  }

  function updateData(data) {
    const newCandidates = candidates.map((item) => {
      return item.application_id == data.id
        ? { ...item, status: data.status }
        : item;
    });
    setCandidates(newCandidates);
    handleOnClickFilter(filter, newCandidates)
  }

  // eslint-disable-next-line react/prop-types
  function FormatRenderedComponentAction({ status, applicationId }) {
    if (status == "waiting") {
      return (
        <button
          className="candidate__actions-button"
          onClick={(e) => handleUpdateStatus(e,applicationId, "inprogress")}
        >
          MARK AS STARTED
        </button>
      );
    } else if (status == "inprogress") {
      return (
        <button
          className="candidate__actions-button"
          onClick={(e) => handleUpdateStatus(e,applicationId, "finished")}
        >
          MARK AS FINISHED
        </button>
      );
    } else if (status == "finished") {
      return <button className="candidate__actions-button" onClick={(e) => handleUpdateStatus(e,applicationId, "waiting")}>FINISHED</button>;
    } else if (status == "delined") {
      return <button className="candidate__actions-button" onClick={(e) => handleUpdateStatus(e,applicationId, "waiting")}>DECLINED</button>;
    } else {
      return "Status not valid";
    }
  }

  // Luego, cuando necesites mostrar la fecha formateada:
  const formattedPostedDate = getFormattedDate(job.posteddate);

  function handleOnClickFilter(e, newCandidates) {
    if(newCandidates){
      if (e == "all") {
        setFilteredCandidates(newCandidates);
        return;
      }
      const newFIlteredItems = newCandidates.filter((item) => {
        return item.status == e;
      });
      setFilteredCandidates(newFIlteredItems);
      return
    }
    setFilter(e);

    if (e == "all") {
      setFilteredCandidates(candidates);
      return;
    }
    const newFIlteredItems = candidates.filter((item) => {
      return item.status == e;
    });

    setFilteredCandidates(newFIlteredItems);
  }

  useEffect(() => {
    fetch(`http://localhost:3000/api/companys/${currentUser.id}/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        return fetch(
          `http://localhost:3000/api/applications/jobs/${id}/candidates`
        );
      })
      .then((res) => res.json())
      .then((candidatesData) => {
        setCandidates(candidatesData);
        setFilteredCandidates(candidatesData);
      })
      .catch((error) =>
        console.error("Failed to fetch job or candidates", error)
      );
  }, [currentUser.id, id]);

  return (
    <div className="my-job-posting-page">
      <Sidebar></Sidebar>

      <main className="my-job-posting-main">
        <header className="my-job-posting-header">
          <h1 className="my-job-posting-header__title headline-4 mb-16">
            Show Job Postings
          </h1>
        </header>
        {job ? (
          <article
            className={`my-application-card-container mb-16 ${
              expandedCard === true ? "expanded" : ""
            }`}
            onClick={() => handleCardClick(true)}
          >
            <div
              className={`my-job-card ${expandedCard === true ? "mb-16" : ""}`}
            >
              <header className="my-job-card__header">
                <div className="my-job__info">
                  <h3 className="my-job__job-title headline-6">{job.title}</h3>
                  <p className="my-job__job-data">
                    {job.category} {job.type} ${job.minsalary} - $
                    {job.maxsalary}
                  </p>
                </div>
              </header>

              <div className="my-job__status ">
                <p className="my-job__detail mb-8">
                  <br />
                  Open on <br /> {formattedPostedDate}
                </p>
                <p className="my-job__detail">
                  {job.candidate_count} <br /> total candidates
                </p>
                <p className="my-job__detail  my-job__detail--candidates">
                  {job.track} <br /> candidates on track
                </p>
              </div>

              <div className="application__actions">
                <button className="application__actions--show-btn">SHOW</button>
                <button className="application__actions--close-btn">
                  CLOSE
                </button>
              </div>
            </div>
            <div
              className={`my-job-card__extra-content ${
                expandedCard === true ? "my-job-card__extra-content--show" : ""
              }`}
            >
              <h3 className="my-job-card__extra-content__title mn-8">
                About the job position
              </h3>
              <p className="my-job-card__extra-content__descriptions mb-16">
                {" "}
                {job.aboutjob}
              </p>
              <h3 className="my-job-card__extra-content__title mn-8">
                Mandatory Requirements
              </h3>
              <p className="my-job-card__extra-content__descriptions mb-16">
                {" "}
                {job.mandatoryrequirements}
              </p>
              <h3 className="my-job-card__extra-content__title mn-8">
                Optional Requirements
              </h3>
              <p className="my-job-card__extra-content__descriptions">
                {" "}
                {job.optionalrequirements}
              </p>
            </div>
          </article>
        ) : (
          ""
        )}
        <section className="my-job-posting-page__filter">
          <div className="my-job-posting-page__filter__filter mb-16">
            <p className="label">Filter your applications</p>
            <div className="applications-header__filters">
              <input
                type="radio"
                id="all"
                name="applicationFilter"
                value="all"
                checked={filter === "all"}
                onChange={(e) => handleOnClickFilter(e.target.value)}
                className="my-job-posting-page__filter-input"
              />
              <label htmlFor="all" className="applications-filter__label label">
                All
              </label>
              <input
                type="radio"
                id="waiting"
                name="applicationFilter"
                value="waiting"
                checked={filter === "waiting"}
                onChange={(e) => handleOnClickFilter(e.target.value)}
                className="my-job-posting-page__filter-input"
              />
              <label
                htmlFor="waiting"
                className="applications-filter__label label"
              >
                Waiting
              </label>

              <input
                type="radio"
                id="inprogress"
                name="applicationFilter"
                value="inprogress"
                checked={filter === "inprogress"}
                onChange={(e) => handleOnClickFilter(e.target.value)}
                className="my-job-posting-page__filter-input"
              />
              <label
                htmlFor="inprogress"
                className="applications-filter__label label"
              >
                In Progress
              </label>
              <input
                type="radio"
                id="finished"
                name="applicationFilter"
                value="finished"
                checked={filter === "finished"}
                onChange={(e) => handleOnClickFilter(e.target.value)}
                className="my-job-posting-page__filter-input"
              />
              <label
                htmlFor="finished"
                className="applications-filter__label label"
              >
                Finished
              </label>
            </div>
          </div>
          <h2 className="my-job-posting-page__filter__count headline-6 mb-8">
            4 candiadtes found
          </h2>
          <article className="my-job-postings__container">
            {filteredCandidates &&
              filteredCandidates.map((candidate, id) => {
                return (
                  <article
                    key={id}
                    className={`my-candidates-card-container mb-16 ${
                      selectedCandidate === candidate.application_id
                        ? "expanded"
                        : ""
                    }`}
                    onClick={() =>
                      handleCandidateClick(candidate.application_id)
                    }
                  >
                    <div
                      className={`candidate-card ${
                        selectedCandidate === candidate.application_id
                          ? "mb-16"
                          : ""
                      }`}
                    >
                      <header className="candidate-card__header">
                        <div className="candidate__info">
                          <h3 className="candidate__job-name headline-6">
                            {candidate.name}
                          </h3>
                          <p className="candidate__company-title">
                            {candidate.education}
                          </p>
                        </div>
                      </header>

                      <div className="candidate__details ">
                        <p className="candidate__detail-email mb-4">
                          {candidate.email}
                        </p>
                        <p className="candidate__detail-phone">
                          {candidate.phone}
                        </p>
                      </div>
                      <div className="candidate__status ">
                        <p className="candidate__status__info mb-8">
                          <TimeAgo dateString={candidate.date} />
                        </p>
                        <p className="candidate__status__info">
                          {formatStatus(candidate.status)}
                        </p>
                      </div>
                      <div className="candidate__actions">
                        <FormatRenderedComponentAction
                          status={candidate.status}
                          applicationId={candidate.application_id}
                        />
                      </div>
                    </div>

                    <div
                      className={`candidate__application__extra-content ${
                        selectedCandidate === candidate.application_id
                          ? "candidate__application__extra-content--show"
                          : ""
                      }`}
                    >
                      <p className="candidate-application__last-update mb-16">
                        Last Updated <TimeAgo dateString={candidate.date} />
                      </p>

                      <h3 className="candidate-application__title mb-8">
                        Professional experience
                      </h3>
                      <p className="candidate-application__text mb-16">
                        {candidate.professionalexperience}
                      </p>
                      <h3 className="candidate-application__title mb-8">
                        Why are you interested in working at The company name SA
                      </h3>
                      <p className="candidate-application__text mb-16">
                        {candidate.whyareyouinterested}
                      </p>
                      <button className="candidate-application__button">
                        DOWNLOAD CV
                      </button>
                    </div>
                  </article>
                );
              })}
          </article>
        </section>
      </main>
    </div>
  );
}
