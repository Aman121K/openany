import { Link } from "react-router-dom";

function SiteHeader() {
  return (
    <nav className="site-nav">
      <Link to="/" className="brand">
        <span className="brand-mark">▶</span> Video Downloader
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/privacy-policy">Privacy</Link>
        <Link to="/terms">Terms</Link>
      </div>
    </nav>
  );
}

export default SiteHeader;
