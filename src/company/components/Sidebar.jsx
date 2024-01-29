import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./sidebar.css";
import { useAuth } from "../../contexts/auth";
import { useLocation } from "react-router-dom";
import createNewJobIcon from "../../assets/create_new_job_icon.png";
import jobPostingIcon from "../../assets/jobs_posting_icon.png";
import profileIcon from "../../assets/user_icon.png";
import logoutIcon from "../../assets/logout_icon.png";
export default function Sidebar() {
  const { logout } = useAuth();
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <aside className="company-sidebar">
      <img
        src={Logo}
        alt="Get That Job Logo"
        className="company-sidebar__logo"
      />
      <nav className="company-sidebar__navigation">
        {/* Use Link component to navigate to the routes */}
        <Link
          to="/company/job-posting"
          className={`company-sidebar__link ${
            isActive("/company/job-posting")
              ? "company-sidebar__link--active"
              : ""
          }`}
        >
          <img src={jobPostingIcon} alt="jobPostingIcon" /> Job Postings
        </Link>
        <Link
          to="/company/create-new-job"
          className={`company-sidebar__link ${
            isActive("/company/create-new-job")
              ? "company-sidebar__link--active"
              : ""
          }`}
        >
          <img src={createNewJobIcon} alt="createNewJobIcon" /> Create New Job
        </Link>
        <Link
          to="/company/profile"
          className={`company-sidebar__link ${
            isActive("/company/profile") ? "company-sidebar__link--active" : ""
          }`}
        >
          <img src={profileIcon} alt="profileIcon" /> Profile
        </Link>
        {/* Assuming you have a logout function that you will call */}
        <button onClick={() => logout()} className="company-sidebar__link">
          <img src={logoutIcon} alt="logoutIcon" /> Log out
        </button>
      </nav>
      <div className="professional-siderbar__about-me">
        <p className="mb-12">© 2024 - Get That Job</p>
        <p className="mb-4">Build with ❤ by:</p>
        <a
          href="https://www.linkedin.com/in/johan-segura/"
          target="_blank"
          rel="noreferrer"
        >
          <p className="mb-12">
            <i className="fab fa-linkedin"></i>
            Johan Segura - yamathe5
          </p>
        </a>
        <a href="https://github.com/yamathe5" target="_blank" rel="noreferrer">
          <p className="mb-12">
            <i className="fab fa-github"></i>
            Johan Segura - yamathe5
          </p>
        </a>
        <p className="mb-4">Source code:</p>
        <p className="mb-4">Node.js on REST API</p>
        <p>React.js Responsive SAP</p>
      </div>
    </aside>
  );
}
