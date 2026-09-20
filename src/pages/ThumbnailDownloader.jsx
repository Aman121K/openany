import { useState } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { IconClipboard, IconDownload } from "../components/Icons";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5050";

const QUALITIES = [
  { key: "maxresdefault", label: "Max HD", size: "1280×720" },
  { key: "sddefault", label: "SD", size: "640×480" },
  { key: "hqdefault", label: "HD", size: "480×360" },
  { key: "mqdefault", label: "Medium", size: "320×180" },
  { key: "default", label: "Small", size: "120×90" },
];

function extractVideoId(input) {
  const trimmed = input.trim();
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/,
  ];
  for (const re of patterns) {
    const match = trimmed.match(re);
    if (match) return match[1];
  }
  // Allow pasting a bare 11-character video ID too.
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  return null;
}

function ThumbnailDownloader() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [error, setError] = useState("");
  const [brokenQualities, setBrokenQualities] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const id = extractVideoId(url);
    if (!id) {
      setError("Please paste a valid YouTube video link.");
      setVideoId(null);
      return;
    }
    setBrokenQualities({});
    setVideoId(id);
  }

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text);
    } catch {
      // ignore — user can paste manually
    }
  }

  function handleDownload(quality) {
    const imageUrl = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
    const params = new URLSearchParams({ url: imageUrl });
    window.location.href = `${API_BASE}/api/thumbnail-download?${params.toString()}`;
  }

  return (
    <div className="page">
      <SiteHeader />

      <header className="page-hero">
        <div className="badge">
          <span className="badge-dot" /> Free · Instant · No sign-up
        </div>
        <h1>YouTube Thumbnail Downloader</h1>
        <p>Paste any YouTube link to grab its thumbnail in every available resolution.</p>
      </header>

      <main className="container">
        <form className="url-form" onSubmit={handleSubmit}>
          <div className="input-wrap">
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button type="button" className="paste-btn" onClick={handlePaste}>
            <IconClipboard className="btn-icon" /> Paste
          </button>
          <button type="submit" className="submit-btn">
            Get Thumbnail
          </button>
        </form>

        {error && (
          <div className="error">
            <span className="error-icon">!</span> {error}
          </div>
        )}

        {videoId && (
          <div className="result">
            <div className="thumb-grid">
              {QUALITIES.filter((q) => !brokenQualities[q.key]).map((q) => (
                <div className="thumb-grid-item" key={q.key}>
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/${q.key}.jpg`}
                    alt={`${q.label} thumbnail`}
                    onError={() =>
                      setBrokenQualities((prev) => ({ ...prev, [q.key]: true }))
                    }
                    onLoad={(e) => {
                      // YouTube returns a 120x90 grey placeholder (not a 404)
                      // for resolutions that don't exist for a given video.
                      if (e.target.naturalWidth === 120 && q.key !== "default") {
                        setBrokenQualities((prev) => ({ ...prev, [q.key]: true }));
                      }
                    }}
                  />
                  <div className="thumb-grid-info">
                    <div>
                      <strong>{q.label}</strong>
                      <span className="format-sub">{q.size}</span>
                    </div>
                    <button
                      type="button"
                      className="format-action"
                      onClick={() => handleDownload(q.key)}
                    >
                      <IconDownload className="format-action-icon" /> Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <section className="content-section">
          <span className="eyebrow">How it works</span>
          <h2 className="section-title">Grab any YouTube thumbnail in 3 steps</h2>
          <div className="steps-grid">
            <div className="step-card">
              <span className="step-number">1</span>
              <h3>Paste the video link</h3>
              <p>Copy any YouTube video, Shorts, or youtu.be link and paste it above.</p>
            </div>
            <div className="step-card">
              <span className="step-number">2</span>
              <h3>Preview every size</h3>
              <p>We show all resolutions YouTube generates, from small to full HD.</p>
            </div>
            <div className="step-card">
              <span className="step-number">3</span>
              <h3>Download the one you need</h3>
              <p>Click download on the size that fits your project — no cropping needed.</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default ThumbnailDownloader;
