import { Link } from "react-router-dom";
import { IconFilm } from "./Icons";

function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col footer-brand-col">
          <span className="brand footer-brand">
            <span className="brand-mark">
              <IconFilm />
            </span>
            Video Downloader
          </span>
          <p>
            A free, fast tool to save videos from your favorite platforms — for personal use
            only.
          </p>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-col">
          <h4>Tools</h4>
          <Link to="/">Video Downloader</Link>
          <Link to="/youtube-thumbnail-downloader">Thumbnail Downloader</Link>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>

        <div className="footer-col">
          <h4>Platforms</h4>
          <span>YouTube</span>
          <span>Instagram</span>
          <span>Facebook</span>
          <span>TikTok · X</span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Not affiliated with Meta, Facebook, Instagram, YouTube, Google, TikTok, ByteDance, or
          X Corp. Please respect copyright and each platform's terms of service.
        </p>
        <p className="footer-copy">© {new Date().getFullYear()} Video Downloader. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default SiteFooter;
