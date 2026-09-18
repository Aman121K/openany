import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

function PrivacyPolicy() {
  return (
    <div className="page">
      <SiteHeader />

      <header className="page-hero">
        <div className="badge">
          <span className="badge-dot" /> Last updated: {new Date().toLocaleDateString()}
        </div>
        <h1>Privacy Policy</h1>
        <p>How we handle your data — in plain language.</p>
      </header>

      <main className="legal-container">
        <p>
          This Privacy Policy explains how Video Downloader ("we", "our", "us") handles
          information when you use our website.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We do not require account registration to use this service. When you paste a video
          link, we send that link to our server solely to fetch the video's public metadata and
          generate a download. We do not store the video links or downloaded files after your
          session ends.
        </p>
        <p>
          Your recent link history is stored only in your own browser's local storage and never
          transmitted to us — it stays on your device and can be cleared at any time from within
          the app.
        </p>

        <h2>2. Cookies &amp; Advertising</h2>
        <p>
          We may use third-party advertising vendors, such as Google AdSense, to display ads.
          These vendors may use cookies to serve ads based on your prior visits to this or other
          websites. You can opt out of personalized advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">
            Google's Ads Settings
          </a>
          .
        </p>

        <h2>3. Third-Party Content</h2>
        <p>
          Videos downloaded through this tool are hosted by the original platform (Facebook,
          Instagram, YouTube, TikTok, X, etc.). We do not host, store, or claim ownership of any
          third-party video content.
        </p>

        <h2>4. Data Security</h2>
        <p>
          We take reasonable measures to protect the limited data that passes through our
          servers, but no online service can guarantee absolute security.
        </p>

        <h2>5. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this
          page with an updated revision date.
        </p>

        <h2>6. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please reach out through our contact
          page.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}

export default PrivacyPolicy;
