
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./sidebar.css";
import { useAuth } from "../../contexts/auth";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const {logout} = useAuth();
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
        <Link to="/company/job-posting" className={`company-sidebar__link ${
            isActive("/company/job-posting")
              ? "company-sidebar__link--active"
              : ""
          }`}>
          O Job Postings
        </Link>
        <Link to="/company/create-new-job" className={`company-sidebar__link ${
            isActive("/company/create-new-job")
              ? "company-sidebar__link--active"
              : ""
          }`}>
          O Create New Job
        </Link>
        <Link to="/company/profile" className={`company-sidebar__link ${
            isActive("/company/profile")
              ? "company-sidebar__link--active"
              : ""
          }`}>
          O Profile
        </Link>
        {/* Assuming you have a logout function that you will call */}
        <button onClick={()=> logout()} className="company-sidebar__link">
          O Log out
        </button>
      </nav>
    </aside>
  );
}
