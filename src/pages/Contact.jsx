import { useState } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const API_BASE = "http://localhost:5050";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    if (form.message.trim().length < 10) {
      setErrorMsg("Your message should be at least 10 characters.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErrorMsg("Could not reach the server. Please try again later.");
      setStatus("error");
    }
  }

  return (
    <div className="page">
      <SiteHeader />
      <main className="legal-container">
        <h1>Contact Us</h1>
        <p className="legal-updated">
          Have a question, found a bug, or want to suggest a feature? Send us a message below.
        </p>

        {status === "success" ? (
          <div className="contact-success">
            <span className="contact-success-icon">✓</span>
            <h3>Message sent</h3>
            <p>Thanks for reaching out — we'll get back to you as soon as we can.</p>
            <button type="button" className="link-btn" onClick={() => setStatus("idle")}>
              Send another message
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                value={form.name}
                onChange={update("name")}
                placeholder="Your name"
                maxLength={200}
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@example.com"
                maxLength={200}
              />
            </label>

            <label>
              Message
              <textarea
                value={form.message}
                onChange={update("message")}
                placeholder="How can we help?"
                rows={6}
                maxLength={5000}
              />
            </label>

            {errorMsg && (
              <div className="error">
                <span className="error-icon">!</span> {errorMsg}
              </div>
            )}

            <button type="submit" className="submit-btn contact-submit" disabled={status === "loading"}>
              {status === "loading" ? <span className="spinner" /> : "Send Message"}
            </button>
          </form>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

export default Contact;
