import Sidebar from "../components/Sidebar";
import "./following-page.css";

import Logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";
import { useNavigate } from 'react-router-dom';


export default function Following() {
  // const url = `http://localhost:3000/api/following/professionals/2/following`
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]); // Correct destructuring
  const [companys, setCompanys] = useState([]); // Correct destructuring

  const navigate = useNavigate();


  useEffect(() => {
    fetch(
      `http://localhost:3000/api/following/professionals/${currentUser.id}/following`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setJobs(getJobs(data));
        setCompanys(getCompanys(data));
      });
  }, [currentUser]);

  const handleSeeMoreClick = (id) => {
    // Asume que el ID es del trabajo. Ajusta la ruta según sea necesario.
    navigate(`/professional/find-that-job/${id}`);
  };
  

  function handleOnClickRemoveFollow(e, id, type) {
    console.log("Removing follow with id:", id);
    fetch(`http://localhost:3000/api/following/professionals/${currentUser.id}/unfollow/${id}`, {
      method: "DELETE",
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Unfollow successful:", data);
      if(type == "job"){
        const newFilteredJobs = jobs.filter((job) => job.id !== id);
        setJobs(newFilteredJobs);
      } else if(type == "company") {
        const newFilteredCompanys = companys.filter((company) => company.id !== id);
        setCompanys(newFilteredCompanys);
          }
      // Actualiza el estado o realiza alguna acción después de un unfollow exitoso
    })
    .catch(error => {
      console.log(error)
      console.error("Error during unfollow:", error);
      // Maneja cualquier error que ocurra durante la solicitud
    });
  }
  

  function getJobs(data) {
    return data.filter((item) => item.jobid != null);
  }
  function getCompanys(data) {
    return data.filter((item) => item.companyid != null);
  }

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
            {jobs &&
              jobs.map((item, index) => {
                return (
                  <div className="following-card" key={index}>
                    <div className="job-card">
                      <div className="job-card__details">
                        <img src={Logo} alt="" className="job-card__image" />
                        <div className="job-card__text">
                          <p className="job-card__category">{item.category}</p>
                          <p className="job-card__job-title">{item.title}</p>
                          <p className="job-card__company-name mb-4">
                            {item.jobcompanyname}
                          </p>
                          <div className="job-card__info">
                            <p className="job-card__employment-type">
                              {item.type}
                            </p>
                            <p className="job-card__salary-range">
                              {item.salaryrange} - {item.salaryrange}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="job-card__actions">
                        <button className="job-card__action-button job-card__action-button--follow" onClick={(e) => handleOnClickRemoveFollow(e, item.id, "job")}>
                          O FOLLOWING
                        </button>
                        <button className="job-card__action-button job-card__action-button--see-more on" onClick={() => handleSeeMoreClick(item.jobid)}>
                          SEE MORE
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <p className="following-header__subtitle headline-6 mb-8">
            You are following 1 company
          </p>
          <div className="mb-16">
            <div className="following-card">
              {companys &&
                companys.map((item, index) => {
                  return (
                    <div className="job-card" key={index}>
                      <div className="job-card__details">
                        <img src={Logo} alt="" className="job-card__image" />
                        <div className="job-card__text">
                          {/* <p className="job-card__category">Manufactoring</p> */}
                          <p className="job-card__job-title">{item.companyname}</p>
                          {/* <p className="job-card__company-name">
                            The Company Name
                          </p> */}
                          <div className="job-card__info">
                            <p className="job-card__employment-type">
                              {item.jobcount} job openings
                            </p>
                            {/* <p className="job-card__salary-range">
                              2.0k - 2.5k
                            </p> */}
                          </div>
                        </div>
                      </div>
                      <div className="job-card__actions">
                        <button className="job-card__action-button job-card__action-button--follow" onClick={(e) => handleOnClickRemoveFollow(e, item.id, "company")}>
                          O FOLLOW
                        </button>
                        <button className="job-card__action-button job-card__action-button--see-more">
                          SEE MORE
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          {/* Repeat the .following-card block for each followed company */}
        </section>
      </main>
    </div>
  );
}
