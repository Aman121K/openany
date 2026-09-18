import { Link, useNavigate } from "react-router-dom";
import { IconFilm, IconUser } from "./Icons";
import { useAuth } from "../context/AuthContext";

function SiteHeader() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="site-nav">
      <Link to="/" className="brand">
        <span className="brand-mark">
          <IconFilm />
        </span>
        Video Downloader
      </Link>
      <div className="nav-links">
        <span className="nav-links-primary">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </span>

        {!loading && (
          user ? (
            <div className="nav-account">
              <span className="nav-user">
                <IconUser className="nav-user-icon" /> {user.name}
              </span>
              <button type="button" className="nav-logout" onClick={handleLogout}>
                Log out
              </button>
            </div>
          ) : (
            <div className="nav-account">
              <Link to="/login">Log in</Link>
              <Link to="/signup" className="nav-signup">
                Sign up
              </Link>
            </div>
          )
        )}
      </div>
    </nav>
  );
}

export default SiteHeader;
