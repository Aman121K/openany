import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

function Terms() {
  return (
    <div className="page">
      <SiteHeader />

      <header className="page-hero">
        <div className="badge">
          <span className="badge-dot" /> Last updated: {new Date().toLocaleDateString()}
        </div>
        <h1>Terms of Service</h1>
        <p>The rules for using Video Downloader.</p>
      </header>

      <main className="legal-container">
        <p>By using Video Downloader, you agree to the following terms.</p>

        <h2>1. Personal Use Only</h2>
        <p>
          This tool is intended for downloading videos you own, have permission to use, or that
          are otherwise legally available for personal, non-commercial use. You are solely
          responsible for ensuring your use complies with copyright law and the terms of service
          of the platform the content was sourced from.
        </p>

        <h2>2. No Affiliation</h2>
        <p>
          Video Downloader is an independent tool and is not affiliated with, endorsed by, or
          sponsored by Meta, Facebook, Instagram, YouTube, Google, TikTok, ByteDance, X Corp, or
          any other platform mentioned on this site.
        </p>

        <h2>3. No Warranty</h2>
        <p>
          This service is provided "as is" without warranties of any kind. Video availability,
          quality, and formats depend on the source platform and may change without notice.
        </p>

        <h2>4. Limitation of Liability</h2>
        <p>
          We are not liable for any damages arising from your use or inability to use this
          service, including any copyright claims resulting from misuse of downloaded content.
        </p>

        <h2>5. Prohibited Use</h2>
        <p>
          You may not use this tool to infringe on intellectual property rights, redistribute
          copyrighted content commercially, or violate any applicable law.
        </p>

        <h2>6. Changes to These Terms</h2>
        <p>
          We may revise these Terms at any time. Continued use of the service after changes are
          posted constitutes acceptance of the revised Terms.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}

export default Terms;
