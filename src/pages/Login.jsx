import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <SiteHeader />
      <main className="auth-container">
        <div className="auth-card">
          <h1>Welcome back</h1>
          <p className="auth-sub">Log in to sync your download history across devices.</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </label>

            {error && (
              <div className="error">
                <span className="error-icon">!</span> {error}
              </div>
            )}

            <button type="submit" className="submit-btn contact-submit" disabled={loading}>
              {loading ? <span className="spinner" /> : "Log In"}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
          <p className="auth-skip">
            <Link to="/">Continue without an account →</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export default Login;
