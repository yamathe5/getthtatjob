import { useEffect, useState } from "react";
import "./your-aplication-page.css";
import Sidebar from "../components/Sidebar";
import Logo from "../../assets/logo.png";

import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../../contexts/auth";

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

export default function YourApplicationsPage() {
  // Estado para los filtros de las aplicaciones
  const [filter, setFilter] = useState("all");
  const [applications, setApplications] = useState([]);
  const [filteredApplications, settFilteredApplications] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetch(
      `https://getthatjobbaackend.onrender.com/api/applications/professionals/${currentUser.id}/applications`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setApplications(data);
        settFilteredApplications(data);
      });
  }, [currentUser]);

  function handleDeclineApplication(applicationId) {
    console.log(applicationId);
    fetch(`https://getthatjobbaackend.onrender.com/api/applications/professionals/${currentUser.id}/applications/${applicationId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(() => {
      // Aquí actualizamos el estado para reflejar la eliminación de la aplicación
      console.log(applications, applicationId)
      const updatedApplications = applications.filter(application => application.applicationsid !== applicationId);
      setApplications(updatedApplications);
      settFilteredApplications(updatedApplications.filter(application => {
        // Puedes necesitar ajustar este filtro si tienes alguna lógica adicional para los `filteredApplications`
        return filter === "all" || application.status === filter;
      }));
    })
    .catch((error) => {
      console.error("Error during unfollow:", error);
    });
  }
  

  function handleCardClick(clickedId) {
    setExpandedCard(expandedCard === clickedId ? null : clickedId);
  }

  function handleOnClickFilter(e) {
    setFilter(e.target.value);
    console.log(e.target.value, filter);

    if (e.target.value == "all") {
      settFilteredApplications(applications);
      return;
    }
    const newFIlteredItems = applications.filter((item) => {
      return item.status == e.target.value;
    });

    settFilteredApplications(newFIlteredItems);
  }

  return (
    <div className="applications-page">
      <Sidebar></Sidebar>

      <main className="applications-main">
        <header className="applications-header">
          <h1 className="applications-header__title headline-4 mb-16">
            Your applications
          </h1>
          <div className="applications-main__container">
            <p className="label">Filter your applications</p>
            <div className="applications-header__filters">
              <input
                type="radio"
                id="all"
                name="applicationFilter"
                value="all"
                checked={filter === "all"}
                onChange={(e) => handleOnClickFilter(e)}
                className="job-posting-page__filter-input"
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
                onChange={(e) => handleOnClickFilter(e)}
                className="job-posting-page__filter-input"
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
                onChange={(e) => handleOnClickFilter(e)}
                className="job-posting-page__filter-input"
              />
              <label
                htmlFor="inprogress"
                className="applications-filter__label label"
              >
                In progress
              </label>
              <input
                type="radio"
                id="finished"
                name="applicationFilter"
                value="finished"
                checked={filter === "finished"}
                onChange={(e) => handleOnClickFilter(e)}
                className="job-posting-page__filter-input"
              />
              <label
                htmlFor="finished"
                className="applications-filter__label label"
              >
                Finished
              </label>
              <input
                type="radio"
                id="declined"
                name="applicationFilter"
                value="declined"
                checked={filter === "declined"}
                onChange={(e) => handleOnClickFilter(e)}
                className="job-posting-page__filter-input"
              />
              <label
                htmlFor="declined"
                className="applications-filter__label label"
              >
                Declined
              </label>
            </div>
          </div>
        </header>
        <h2 className="applications-list__count headline-6 mb-8">
           Applications found
        </h2>
        <section className="applications-list">
          {filteredApplications &&
            filteredApplications.map((application, index) => {
              return (
                <article
                  className={`application-card-container mb-16 ${
                    expandedCard === application.id ? "expanded" : ""
                  }`}
                  key={index}
                  onClick={() => handleCardClick(application.id)}
                >
                  <div className={`application-card ${expandedCard === application.id ? "mb-16" : ""}`}>
                    <header className="application-card__header">
                      <img
                        src={Logo}
                        alt="Company Logo"
                        className="application-card__logo"
                      />
                      <div className="application__info">
                        <h3 className="application__job-title headline-6">
                          {application.title}
                        </h3>
                        <p className="application__company-name">
                          {application.company}
                        </p>
                      </div>
                    </header>

                    <div className="application__details ">
                      <p className="application__detail mb-8">
                        Manufacturing   Full time
                      </p>
                      <p className="application__detail">
                        ${application.minsalary} - ${application.maxsalary}
                      </p>
                    </div>
                    <div className="application__status">
                      <p className="application__status-time">
                        <TimeAgo dateString={application.date} />
                      </p>
                      <p className="application__status-review">
                        {formatStatus(application.status)}{" "}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`application__extra-content ${
                      expandedCard === application.id ? "show" : ""
                    }`}
                  >
                    <p className="extra-content__last-updated mb-16">Last Updated on 03/22/21</p>
                    <h3 className="extra-content__heading mb-8">Professional experience</h3>
                    <p className="extra-content__mandatory mb-16">{application.professionalexperience}</p>
                    <h3 className="extra-content__heading mb-8">Why are you interested in working at {application.company}</h3>
                    <p className="extra-content__optional mb-16">{application.whyareyouinterested}</p>
                    <div>
                      <button className="extra-content__decline-btn" onClick={()=>handleDeclineApplication(application.applicationsid)}>X DECLINE APPLICATION</button>
                    </div>
                  </div>
                </article>
              );
            })}
        </section>
      </main>
    </div>
  );
}
