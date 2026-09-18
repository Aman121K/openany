import { Link } from "react-router-dom";

function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <span className="footer-dot">·</span>
        <Link to="/terms">Terms of Service</Link>
        <span className="footer-dot">·</span>
        <Link to="/">Home</Link>
      </div>
      <p>
        This tool is not affiliated with Facebook, Instagram, YouTube, TikTok, X, or Meta. For
        personal use only — please respect copyright and each platform's terms of service.
      </p>
      <p className="footer-copy">© {new Date().getFullYear()} Video Downloader. All rights reserved.</p>
    </footer>
  );
}

export default SiteFooter;
