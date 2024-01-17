import Sidebar from "../components/Sidebar";
import "./following-page.css";

import Logo from "../../assets/logo.png";

export default function Following() {
  return (
    <div className="following-page">
      <Sidebar></Sidebar>
      <main className="following-main">
        <header className="following-header">
          <h1 className="following-header__title headline-4 mb-16">
            Following
          </h1>
        </header>
        <section className="following-content">
          <p className="following-header__subtitle headline-6 mb-8">
            You are following 2 jobs
          </p>
          <div className="following-content__container mb-16">
            <div className="following-card">
              <div className="job-card">
                <div className="job-card__details">
                  <img src={Logo} alt="" className="job-card__image" />
                  <div className="job-card__text">
                    <p className="job-card__category">Manufactoring</p>
                    <p className="job-card__job-title">The job title</p>
                    <p className="job-card__company-name">The Company Name</p>
                    <div className="job-card__info">
                      <p className="job-card__employment-type">Full time</p>
                      <p className="job-card__salary-range">2.0k - 2.5k</p>
                    </div>
                  </div>
                </div>
                <div className="job-card__actions">
                  <button className="job-card__action-button job-card__action-button--follow">
                    O FOLLOW
                  </button>
                  <button className="job-card__action-button job-card__action-button--see-more">
                    SEE MORE
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="following-header__subtitle headline-6 mb-8">
            You are following 1 company
          </p>
          <div className="mb-16">
            <div className="following-card">
              <div className="job-card">
                <div className="job-card__details">
                  <img src={Logo} alt="" className="job-card__image" />
                  <div className="job-card__text">
                    <p className="job-card__category">Manufactoring</p>
                    <p className="job-card__job-title">The job title</p>
                    <p className="job-card__company-name">The Company Name</p>
                    <div className="job-card__info">
                      <p className="job-card__employment-type">Full time</p>
                      <p className="job-card__salary-range">2.0k - 2.5k</p>
                    </div>
                  </div>
                </div>
                <div className="job-card__actions">
                  <button className="job-card__action-button job-card__action-button--follow">
                    O FOLLOW
                  </button>
                  <button className="job-card__action-button job-card__action-button--see-more">
                    SEE MORE
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Repeat the .following-card block for each followed company */}
        </section>
      </main>
    </div>
  );
}
