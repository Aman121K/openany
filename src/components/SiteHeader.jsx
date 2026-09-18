import { Link } from "react-router-dom";
import { IconFilm } from "./Icons";

function SiteHeader() {
  return (
    <nav className="site-nav">
      <Link to="/" className="brand">
        <span className="brand-mark">
          <IconFilm />
        </span>
        Video Downloader
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default SiteHeader;
