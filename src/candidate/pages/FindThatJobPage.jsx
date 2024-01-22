import { useState, useEffect } from "react";
import "./find-that-job-page.css";
import Sidebar from "../components/Sidebar";
import Logo from "../../assets/logo.png";
import { useAuth } from "../../contexts/auth";
export default function FindThatJobPage() {
  // const [minSalary, setMinSalary] = useState("");
  // const [maxSalary, setMaxSalary] = useState("");
  // const [searchType, setSearchType] = useState("full-time");
  
  const [jobs, setjobs] = useState([]);
  const [filteredJobs, setFilteresJobs] = useState([]);
  const [searchValue, setSearchValue] = useState({
    search: "",
    type:"all",
    minSalary: 0,
    maxSalary:0
  });

  const {currentUser} = useAuth()

  useEffect(() => {
    fetch(`http://localhost:3000/api/jobs/${currentUser.id}`)
      .then((response) => response.json())
      .then((data) => {
        setjobs(data), setFilteresJobs(data);
      });
  }, [currentUser]);

  function toggleFollow (jobId, following, followingid){
    
    if(following){
      fetch(`http://localhost:3000/api/following/professionals/${currentUser.id}/unfollow/${followingid}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
  
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }else {
      fetch(`http://localhost:3000/api/following/professionals/${currentUser.id}/follow`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ professionalid: currentUser.id,  jobid: jobId, following: true }),
        headers: {
          "Content-Type": "application/json",
        },
  
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }
    
  
  }

 


  function handleSearchChange(e, inputType) {
    const newValue = e.target.value;
    const newSearchValue = {
      ...searchValue,
      [inputType]: newValue
    };
  
    setSearchValue(newSearchValue);
  
    const newFilteredJobs = jobs.filter((job) => {
      const satisfiesType = job.type.toLowerCase().includes(newSearchValue.type.toLowerCase()) || newSearchValue.type.toLowerCase() == "all";
      const satisfiesSearch = job.title.toLowerCase().includes(newSearchValue.search.toLowerCase()) || job.company.toLowerCase().includes(newSearchValue.search.toLowerCase()) ;
      const satisfiesMinSalary = parseInt(job.minsalary, 10) >= parseInt(newSearchValue.minSalary, 10) || newSearchValue.minSalary == "";
      const satisfiesMaxSalary = parseInt(job.maxsalary, 10) <= parseInt(newSearchValue.maxSalary, 10) || newSearchValue.maxSalary == "";
  
      return satisfiesType && satisfiesSearch && satisfiesMinSalary && satisfiesMaxSalary;
    });
  
    setFilteresJobs(newFilteredJobs);
    // if (!newSearchValue.search && newSearchValue.type === "all" && newSearchValue.minSalary == "" && newSearchValue.maxSalary == "") {
    //   setFilteresJobs(jobs);
    // } else {
    // }
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
                <option value="all">All</option>
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
                  value={searchValue.minSalary}
                  onChange={(e)=> handleSearchChange(e, "minSalary")}
                  placeholder="min"
                />
                <div></div>
                <input
                  type="number"
                  id="maxSalary"
                  className="find-job-filters__input find-job-filters__input--max input"
                  value={searchValue.maxSalary}
                  onChange={(e)=> handleSearchChange(e, "maxSalary")}
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
                          ${item.minsalary} - ${item.maxsalary}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="job-card__actions">
                    <button className="job-card__action-button job-card__action-button--follow" onClick={()=>toggleFollow(item.id, item.following, item.followingid)}>
                      { item.following ? "FOLLOWING" : "NOT FOLLOWING"}
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
