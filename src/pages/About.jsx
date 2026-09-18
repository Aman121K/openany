import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { IconShield, IconZap, IconGlobe, IconLock } from "../components/Icons";

const VALUES = [
  { title: "Free, always", detail: "No paywalls, no subscriptions, no hidden limits.", Icon: IconShield },
  { title: "Fast by design", detail: "Optimized so your download starts in seconds.", Icon: IconZap },
  { title: "Privacy-first", detail: "We don't store your links or files after your session ends.", Icon: IconLock },
  { title: "Works everywhere", detail: "One tool for Facebook, Instagram, YouTube, TikTok and X.", Icon: IconGlobe },
];

function About() {
  return (
    <div className="page">
      <SiteHeader />

      <header className="page-hero">
        <div className="badge">
          <span className="badge-dot" /> Our story
        </div>
        <h1>About Video Downloader</h1>
        <p>Built for people who just want their videos, fast.</p>
      </header>

      <main className="legal-container">
        <p>
          Video Downloader started as a simple idea: saving a video you love from social media
          shouldn't require installing shady software or sitting through five redirect ads. We
          built a straightforward, browser-based tool that does one job well — fetch a video's
          available formats and let you download the one you want.
        </p>
        <p>
          Whether it's a Reel you want to keep, a tutorial you want to watch offline, or a clip a
          friend shared with you, our tool works entirely from a link — no account, no software
          install, no clutter.
        </p>

        <h2>What we stand for</h2>
        <div className="values-grid">
          {VALUES.map((v) => (
            <div className="value-card" key={v.title}>
              <span className="value-icon">
                <v.Icon />
              </span>
              <div>
                <h3>{v.title}</h3>
                <p>{v.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>A note on responsible use</h2>
        <p>
          This tool is meant for downloading content you own, have permission to use, or that is
          otherwise available for personal use. We're not affiliated with any of the platforms
          we support — please respect copyright and each platform's terms of service. See our{" "}
          <a href="/terms">Terms of Service</a> for details.
        </p>

        <h2>Questions or feedback?</h2>
        <p>
          We'd love to hear from you — visit our <a href="/contact">Contact page</a> and send us
          a message.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}

export default About;
