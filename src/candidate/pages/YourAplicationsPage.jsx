import { useEffect, useState } from "react";
import "./your-aplication-page.css";
import Sidebar from "../components/Sidebar";
import Logo from "../../assets/logo.png";


import { formatDistanceToNow } from 'date-fns';

function TimeAgo({ dateString }) {
  const date = new Date(dateString);
  return `${formatDistanceToNow(date, { addSuffix: true })}`;
}

function formatStatus(status){
  if (status == "waiting") {
    return "Waiting for review"
  }else if (status == "inprogress"){
    return "Review in progress"
  }else if  (status == "finished"){
    return "Review finished"
  }else if  (status == "delined"){
    return "Review decined on ======="
  }else {
    return "Status not valid"
  }
}


export default function YourApplicationsPage() {
  // Estado para los filtros de las aplicaciones
  const [filter, setFilter] = useState("all");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/applications/professionals/4/applications")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setApplications(data);
      });
  }, []);

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
                onChange={(e) => setFilter(e.target.value)}
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
                onChange={(e) => setFilter(e.target.value)}
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
                id="inProgress"
                name="applicationFilter"
                value="inProgress"
                checked={filter === "inProgress"}
                onChange={(e) => setFilter(e.target.value)}
                className="job-posting-page__filter-input"
              />
              <label
                htmlFor="inProgress"
                className="applications-filter__label label"
              >
                In progress
              </label>
              <input
                type="radio"
                id="Finished"
                name="applicationFilter"
                value="Finished"
                checked={filter === "Finished"}
                onChange={(e) => setFilter(e.target.value)}
                className="job-posting-page__filter-input"
              />
              <label
                htmlFor="Finished"
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
                onChange={(e) => setFilter(e.target.value)}
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
          4 applications found
        </h2>
        <section className="applications-list">
          {
            applications && applications.map((application, index)=>{
              return <article className="application-card mb-16" key={index}>
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
                  <p className="application__company-name">{application.company}</p>
                </div>
              </header>
  
              <div className="application__details ">
                <p className="application__detail mb-8">
                  Manufacturing Full time
                </p>
                <p className="application__detail">
                {application.salaryrange} - {application.salaryrange}
                </p>
              </div>
              <div className="application__status">
                <p className="application__status-time">
                <TimeAgo dateString="2022-02-10T05:00:00.000Z" />

                </p>
                <p className="application__status-review">{formatStatus(application.status)} </p>
              </div>
            </article>
            })
          }
         
        
        </section>
      </main>
    </div>
  );
}
