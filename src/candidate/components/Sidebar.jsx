import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useAuth } from "../../contexts/auth";
import { useLocation } from "react-router-dom";
import "./sidebar.css";

import searchIcon from "../../assets/search_icon.png"
import youApplicationsIcon from "../../assets/your_applicatioons_icon.png"
import profileIcon from "../../assets/user_icon.png"
import logoutIcon from "../../assets/logout_icon.png"
import notFollowingIcon from "../../assets/notFollowing.png"
export default function Sidebar() {
  const { logout } = useAuth();
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <aside className="professional-sidebar">
      <img
        src={Logo}
        alt="Get That Job Logo"
        className="professional-sidebar__logo"
      />
      <nav className="professional-sidebar__navigation">
        <Link
          to="/professional/find-that-job"
          className={`professional-sidebar__link ${
            isActive("/professional/find-that-job")
              ? "professional-sidebar__link--active"
              : ""
          }`}
        >
          <img src={searchIcon} alt="searchIcon" /> Find that job
        </Link>
        <Link
          to="/professional/your-applications"
          className={`professional-sidebar__link ${
            isActive("/professional/your-applications")
              ? "professional-sidebar__link--active"
              : ""
          }`}
        >
          <img src={youApplicationsIcon} alt="youApplicationsIcon" /> Your applications
        </Link>
        <Link
          to="/professional/following"
          className={`professional-sidebar__link ${
            isActive("/professional/following")
              ? "professional-sidebar__link--active"
              : ""
          }`}
        >
          <img src={notFollowingIcon} alt="notFollowingIcon" /> Following
        </Link>
        <Link
          to="/professional/profile"
          className={`professional-sidebar__link ${
            isActive("/professional/profile")
              ? "professional-sidebar__link--active"
              : ""
          }`}
        >
          <img src={profileIcon} alt="profileIcon" />  Profile
        </Link>
        {/* Implement logout functionality or redirect to login page */}
        <Link
          to="/login"
          onClick={() => logout()}
          className="professional-sidebar__link professional-sidebar__link--logout"
        >
          <img src={logoutIcon} alt="logoutIcon" /> Log out
        </Link>
      </nav>

      <div className="professional-siderbar__about-me">
        <p className="mb-12">
        © 2024 - Get That Job
        </p>
        <p className="mb-4">
        Build with ❤ by:        
        </p>
          <a href="https://www.linkedin.com/in/johan-segura/" target="_blank" rel="noreferrer">
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
        <p className="mb-4">
          Source code:
        </p>
        <p className="mb-4">Node.js on REST API</p>
        <p>React.js Responsive SAP</p>
      </div>
    </aside>
  );
}
