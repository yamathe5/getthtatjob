import { useState } from "react";
import "./your-aplication-page.css";
import Sidebar from "../components/Sidebar";
import Logo from "../../assets/logo.png"
export default function YourApplicationsPage() {
  // Estado para los filtros de las aplicaciones
  const [filter, setFilter] = useState("all");

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
        <section className="applications-list">
          <h2 className="applications-list__count headline-6 mb-8">
            4 applications found
          </h2>
          <article className="application-card">
            <header className="application-card__header">
              <img
                src={Logo}
                alt="Company Logo"
                className="application-card__logo"
              />
              <div className="application__info">
                <h3 className="application__job-title headline-6">
                  The job title
                </h3>
                <p className="application__company-name">The Company Name SA</p>
              </div>
            </header>

            <div className="application__details ">
              <p className="application__detail mb-8">Manufacturing Full time</p>
              <p className="application__detail">
                2.0k - 2.5k Posted 2 days ago
              </p>
            </div>
            <div className="application__status">
              <p className="application__status-time">Sent 1 min. ago</p>
              <p className="application__status-review">Waiting for review</p>
            </div>
          </article>
          <br />
          <br />
          <article className="application-card">
            <header className="application-card__header">
              <img
                src=""
                alt="Company Logo"
                className="application-card__logo"
              />
              <h3 className="application__job-title">The job title</h3>
              <p className="application__company-name">The Company Name SA</p>
            </header>
            <p className="application-card__status">Status: Applied</p>
            <button className="application-card__action-button">View</button>
            <button className="application-card__action-button">
              Withdraw
            </button>
          </article>
        </section>
      </main>
    </div>
  );
}
