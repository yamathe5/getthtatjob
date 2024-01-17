import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useAuth } from "../../contexts/auth";
import { useLocation } from "react-router-dom";
import "./sidebar.css";

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
          O Find that job
        </Link>
        <Link
          to="/professional/your-applications"
          className={`professional-sidebar__link ${
            isActive("/professional/your-applications")
              ? "professional-sidebar__link--active"
              : ""
          }`}
        >
          O Your applications
        </Link>
        <Link
          to="/professional/following"
          className={`professional-sidebar__link ${
            isActive("/professional/following")
              ? "professional-sidebar__link--active"
              : ""
          }`}
        >
          O Following
        </Link>
        <Link
          to="/professional/profile"
          className={`professional-sidebar__link ${
            isActive("/professional/profile")
              ? "professional-sidebar__link--active"
              : ""
          }`}
        >
          O Profile
        </Link>
        {/* Implement logout functionality or redirect to login page */}
        <Link
          to="/login"
          onClick={() => logout()}
          className="professional-sidebar__link professional-sidebar__link--logout"
        >
          O Log out
        </Link>
      </nav>
    </aside>
  );
}
