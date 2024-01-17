import { useState, useEffect } from "react";
import "./find-that-job-page.css";
import Sidebar from "../components/Sidebar";
import Logo from "../../assets/logo.png";
export default function FindThatJobPage() {
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  // const [searchType, setSearchType] = useState("full-time");
  const [jobs, setjobs] = useState([]);
  const [filteredJobs, setFilteresJobs] = useState([]);
  const [searchValue, setSearchValue] = useState({
    search: "",
    type:"full-time"
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/jobs")
      .then((response) => response.json())
      .then((data) => {
        setjobs(data), setFilteresJobs(data);
      });
  }, []);

  function handleSearchChange(e, inputType) {
    setSearchValue(
      prev => ({
        ...prev,
        [inputType] : e.target.value
      })
    );
    const newFilteredjobs = inputType == "type" ? filterByType() : filterBySearch()
    

    function filterByType() {
      return jobs.filter((item) => {
        const title = item.type || ""; // Fallback to empty string if null/undefined
  
        return (
          title.toLowerCase().includes(e.target.value.toLowerCase()) 
        );
      });
    }

    function filterBySearch() {
      return jobs.filter((item) => {
        const title = item.title || ""; // Fallback to empty string if null/undefined
        const company = item.company || ""; // Fallback to empty string if null/undefined
  
        return (
          title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          company.toLowerCase().includes(e.target.value.toLowerCase()) 
        );
      });
    }

    

    setFilteresJobs(newFilteredjobs);
  }

  return (
    <div className="find-job-page">
      <Sidebar></Sidebar>
      <main className="find-job-main">
        <header className="find-job-header">
          <h1 className="find-job-header__title headline-4 mb-16">
            Find that job
          </h1>
          <div className="find-job-header__search">
            <label
              htmlFor="search"
              className="find-job-header__label label mb-4"
            >
              Search by job title or company name
            </label>
            <input
              type="text"
              id="search"
              className="find-job-header__input input mb-8"
              value={searchValue.search}
              onChange={(e) => handleSearchChange(e, "search")}
            />
          </div>
          <div className="find-job-filters mb-16">
            <div className="find-job-filters__category">
              <label
                htmlFor="category"
                className="find-job-filters__label label mb-4"
              >
                Category
              </label>
              <select id="category" className="find-job-filters__select input">
                <option value="manufacturing">Manufacturing</option>
                <option value="sales">Sales</option>
                {/* Add more category options */}
              </select>
            </div>
            <div className="find-job-filters__type">
              <label
                htmlFor="type"
                className="find-job-filters__label label mb-4"
              >
                Type
              </label>
              <select id="type" value={searchValue.type} onChange={(e)=> handleSearchChange(e, "type")} className="find-job-filters__select input">
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                {/* Add more type options */}
              </select>
            </div>
            <div className="find-job-filters__salary">
              <label
                htmlFor="minSalary"
                className="find-job-filters__label label mb-4"
              >
                Min Salary
              </label>
              <div className="find-job-filters__salary-container">
                <input
                  type="number"
                  id="minSalary"
                  className="find-job-filters__input find-job-filters__input--min input"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  placeholder="min"
                />
                <div></div>
                <input
                  type="number"
                  id="maxSalary"
                  className="find-job-filters__input find-job-filters__input--max input"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  placeholder="max"
                />
              </div>
            </div>
          </div>
        </header>
        <h3 className="job-cards__title headline-6 mb-8">12 jobs for you</h3>
        <section className="job-cards">
          {/* Repite este bloque para cada tarjeta de trabajo */}
          {filteredJobs &&
            filteredJobs.map((item, index) => {
              return (
                <div className="job-card" key={index}>
                  <div className="job-card__details">
                    <img src={Logo} alt="" className="job-card__image" />
                    <div className="job-card__text">
                      <p className="job-card__category">{item.category}</p>
                      <p className="job-card__job-title">{item.title}</p>
                      <p className="job-card__company-name mb-4">
                        {item.company}
                      </p>
                      <div className="job-card__info">
                        <p className="job-card__employment-type">{item.type}</p>
                        <p className="job-card__salary-range">
                          {item.salaryrange} - {item.salaryrange}
                        </p>
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
              );
            })}
        </section>
      </main>
    </div>
  );
}
