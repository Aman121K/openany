import { useEffect, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import AdSlot from "../components/AdSlot";
import { useAuth } from "../context/AuthContext";
import {
  IconYouTube,
  IconInstagram,
  IconFacebook,
  IconX,
  IconTikTok,
  IconLink,
  IconClipboard,
  IconDownload,
  IconShield,
  IconZap,
  IconGlobe,
  IconLock,
  IconMusic,
  IconFilm,
  IconClose,
  IconUser,
} from "../components/Icons";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5050";
const HISTORY_KEY = "vdl_history";
const MAX_HISTORY = 6;

function formatSize(bytes) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
}

function formatDuration(seconds) {
  if (!seconds) return "";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

function saveToHistory(entry) {
  const current = loadHistory().filter((h) => h.sourceUrl !== entry.sourceUrl);
  const updated = [entry, ...current].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return updated;
}

const PLATFORMS = [
  { name: "YouTube", Icon: IconYouTube },
  { name: "Instagram", Icon: IconInstagram },
  { name: "Facebook", Icon: IconFacebook },
  { name: "X (Twitter)", Icon: IconX },
  { name: "TikTok", Icon: IconTikTok },
];

const STEPS = [
  {
    title: "Copy the video link",
    detail: "Open the Facebook, Instagram, YouTube or TikTok post and tap Share → Copy Link.",
    Icon: IconLink,
  },
  {
    title: "Paste it above",
    detail: "Paste the link into the box and hit Download to fetch available qualities.",
    Icon: IconClipboard,
  },
  {
    title: "Choose a quality & save",
    detail: "Pick your preferred resolution or audio-only option and the file downloads instantly.",
    Icon: IconDownload,
  },
];

const FEATURES = [
  { title: "Completely Free", detail: "No hidden fees, no subscriptions, ever.", Icon: IconShield },
  { title: "No Sign-up", detail: "Paste a link and go — no account needed.", Icon: IconLock },
  { title: "HD Quality", detail: "Download in the best available resolution.", Icon: IconZap },
  { title: "Multi-Platform", detail: "Works with Facebook, Instagram, YouTube, TikTok & X.", Icon: IconGlobe },
];

const FAQS = [
  {
    q: "Is this video downloader free to use?",
    a: "Yes, Video Downloader is 100% free with no limits on the number of videos you can download.",
  },
  {
    q: "Do I need to install any software?",
    a: "No. Everything runs directly in your browser — there's nothing to install.",
  },
  {
    q: "Can I download private videos?",
    a: "This tool works with publicly accessible video links. Private or login-restricted content isn't supported.",
  },
  {
    q: "Which platforms are supported?",
    a: "Facebook, Instagram (including Reels and Stories), YouTube, TikTok, and X (Twitter), among others.",
  },
  {
    q: "Is it legal to download videos this way?",
    a: "You should only download videos you own, have permission to use, or that are otherwise legally available for personal use. Please respect copyright and each platform's terms of service.",
  },
];

function Home() {
  const { user, token } = useAuth();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [video, setVideo] = useState(null);
  const [tab, setTab] = useState("video");
  const [history, setHistory] = useState([]);
  const [downloadingId, setDownloadingId] = useState(null);
  const [toast, setToast] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (user && token) {
      fetch(`${API_BASE}/api/history`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => (res.ok ? res.json() : { history: [] }))
        .then((data) => setHistory(data.history || []))
        .catch(() => setHistory([]));
    } else {
      setHistory(loadHistory());
    }
  }, [user, token]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  async function fetchInfo(rawUrl) {
    const trimmed = rawUrl.trim();
    setError("");
    setVideo(null);
    if (!trimmed) {
      setError("Please paste a video link first.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        const result = { ...data, sourceUrl: trimmed };
        setVideo(result);
        setTab(
          data.formats?.some((f) => f.hasVideo) || !data.formats?.length ? "video" : "audio"
        );

        const entry = {
          sourceUrl: trimmed,
          title: data.title,
          thumbnail: data.thumbnail,
          extractor: data.extractor,
        };

        if (user && token) {
          fetch(`${API_BASE}/api/history`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ entry }),
          })
            .then((res) => (res.ok ? res.json() : { history: [] }))
            .then((d) => setHistory(d.history || []))
            .catch(() => {});
        } else {
          setHistory(saveToHistory(entry));
        }
      }
    } catch {
      setError("Could not reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  function handleFetch(e) {
    e.preventDefault();
    fetchInfo(url);
  }

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        setToast("Link pasted from clipboard");
      }
    } catch {
      setToast("Couldn't read clipboard — paste manually");
    }
  }

  function handleClear() {
    setUrl("");
    setVideo(null);
    setError("");
  }

  function handleDownload(format_id, key, directUrl) {
    setDownloadingId(key);
    if (typeof window.gtag === "function") {
      window.gtag("event", "download_click", {
        platform: video?.extractor || "unknown",
        format_id: format_id || "best",
      });
    }
    const params = new URLSearchParams({ url: video.sourceUrl });
    if (format_id) params.set("format_id", format_id);
    if (directUrl) params.set("media_url", directUrl);
    window.location.href = `${API_BASE}/api/download?${params.toString()}`;
    setTimeout(() => setDownloadingId(null), 2500);
  }

  function handleHistoryClick(entry) {
    setUrl(entry.sourceUrl);
    fetchInfo(entry.sourceUrl);
  }

  function clearHistory() {
    if (user && token) {
      fetch(`${API_BASE}/api/history`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    } else {
      localStorage.removeItem(HISTORY_KEY);
    }
    setHistory([]);
  }

  const videoFormats = video?.formats?.filter((f) => f.hasVideo) || [];
  const audioFormats = video?.formats?.filter((f) => !f.hasVideo && f.hasAudio) || [];
  const activeFormats = tab === "video" ? videoFormats : audioFormats;
  const hasTabs = videoFormats.length > 0 && audioFormats.length > 0;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="page">
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <div className="bg-glow" aria-hidden="true" />

      <header className="topbar">
        <SiteHeader />
        <div className="hero-inner">
          <div className="badge">
            <span className="badge-dot" /> Fast &nbsp;·&nbsp; Free &nbsp;·&nbsp; No sign-up
          </div>
          <h1>
            <span className="logo-dot">
              <IconFilm />
            </span>
            Video Downloader
          </h1>
          <p>Save videos from Facebook, Instagram, YouTube, X and TikTok in one click</p>

          <div className="platforms">
            {PLATFORMS.map((p) => (
              <span className="platform-chip" key={p.name}>
                <p.Icon className="platform-chip-icon" aria-hidden="true" /> {p.name}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="container">
        <form className="url-form" onSubmit={handleFetch}>
          <div className="input-wrap">
            <input
              type="text"
              placeholder="https://... paste your video link here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {url && (
              <button
                type="button"
                className="icon-btn clear-btn"
                onClick={handleClear}
                aria-label="Clear input"
                title="Clear"
              >
                <IconClose />
              </button>
            )}
          </div>
          <button type="button" className="paste-btn" onClick={handlePaste} title="Paste from clipboard">
            <IconClipboard className="btn-icon" /> Paste
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <span className="spinner" aria-hidden="true" />
            ) : (
              <>
                <IconDownload className="btn-icon" /> Download
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="error">
            <span className="error-icon" aria-hidden="true">
              !
            </span>{" "}
            {error}
          </div>
        )}

        {loading && (
          <div className="skeleton-card">
            <div className="skeleton thumb-skel" />
            <div className="skeleton line-skel" style={{ width: "70%" }} />
            <div className="skeleton line-skel" style={{ width: "40%" }} />
            <div className="skeleton line-skel" style={{ width: "100%", height: 44 }} />
          </div>
        )}

        {video && !loading && (
          <div className="result">
            <div className="result-header">
              {video.thumbnail && (
                <div className="thumb-wrap">
                  <img className="thumb" src={video.thumbnail} alt={video.title || "thumbnail"} />
                  {video.duration ? (
                    <span className="duration-badge">{formatDuration(video.duration)}</span>
                  ) : null}
                </div>
              )}
              <div className="meta">
                <h2>{video.title || "Untitled video"}</h2>
                <div className="meta-row">
                  {video.uploader && (
                    <span className="chip">
                      <IconUser className="chip-icon" /> {video.uploader}
                    </span>
                  )}
                  {video.extractor && (
                    <span className="chip chip-accent">
                      <IconLink className="chip-icon" /> {video.extractor}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {hasTabs && (
              <div className="tabs">
                <button
                  type="button"
                  className={`tab ${tab === "video" ? "active" : ""}`}
                  onClick={() => setTab("video")}
                >
                  <IconFilm className="tab-icon" /> Video ({videoFormats.length})
                </button>
                <button
                  type="button"
                  className={`tab ${tab === "audio" ? "active" : ""}`}
                  onClick={() => setTab("audio")}
                >
                  <IconMusic className="tab-icon" /> Audio only ({audioFormats.length})
                </button>
              </div>
            )}

            <div className="formats">
              {activeFormats.length > 0 ? (
                activeFormats.map((f) => {
                  const key = f.format_id;
                  const isBusy = downloadingId === key;
                  return (
                    <button
                      key={key}
                      className="format-btn"
                      onClick={() => handleDownload(f.format_id, key, f.directUrl)}
                      disabled={isBusy}
                    >
                      <span className="format-icon">
                        {f.hasVideo ? <IconFilm /> : <IconMusic />}
                      </span>
                      <span className="format-info">
                        <strong>{f.resolution}</strong>
                        <span className="format-sub">
                          {f.ext.toUpperCase()}
                          {f.filesize ? ` · ${formatSize(f.filesize)}` : ""}
                        </span>
                      </span>
                      <span className="format-action">
                        {isBusy ? (
                          "Starting…"
                        ) : (
                          <>
                            <IconDownload className="format-action-icon" /> Download
                          </>
                        )}
                      </span>
                    </button>
                  );
                })
              ) : (
                <button className="format-btn" onClick={() => handleDownload(null, "best")}>
                  <span className="format-icon">
                    <IconDownload />
                  </span>
                  <span className="format-info">
                    <strong>Best available quality</strong>
                  </span>
                  <span className="format-action">Download</span>
                </button>
              )}
            </div>
          </div>
        )}

        {!video && !loading && history.length > 0 && (
          <div className="history">
            <div className="history-head">
              <h3>
                Recent links
                <span className="history-scope">
                  {user ? "· synced to your account" : "· saved on this device"}
                </span>
              </h3>
              <button type="button" className="link-btn" onClick={clearHistory}>
                Clear
              </button>
            </div>
            <div className="history-list">
              {history.map((h) => (
                <button
                  key={h.sourceUrl}
                  className="history-item"
                  onClick={() => handleHistoryClick(h)}
                  title={h.sourceUrl}
                >
                  {h.thumbnail ? (
                    <img src={h.thumbnail} alt="" className="history-thumb" />
                  ) : (
                    <span className="history-thumb history-thumb-fallback">
                      <IconFilm />
                    </span>
                  )}
                  <span className="history-text">
                    <span className="history-title">{h.title || h.sourceUrl}</span>
                    {h.extractor && <span className="history-source">{h.extractor}</span>}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <AdSlot label="Advertisement" size="banner" />

        <section className="content-section">
          <span className="eyebrow">Simple process</span>
          <h2 className="section-title">How it works</h2>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div className="step-card" key={s.title}>
                <span className="step-number">{i + 1}</span>
                <span className="step-icon">
                  <s.Icon />
                </span>
                <h3>{s.title}</h3>
                <p>{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section">
          <span className="eyebrow">Built to be reliable</span>
          <h2 className="section-title">Why use our downloader</h2>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div className="feature-card" key={f.title}>
                <span className="feature-icon">
                  <f.Icon />
                </span>
                <h3>{f.title}</h3>
                <p>{f.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot label="Advertisement" size="rectangle" />

        <section className="content-section">
          <span className="eyebrow">Need help</span>
          <h2 className="section-title">Frequently asked questions</h2>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={f.q}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  {f.q}
                  <span className="faq-caret">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <p className="faq-answer">{f.a}</p>}
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default Home;
