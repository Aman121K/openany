import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Sends a GA4 page_view on every client-side route change. Without this,
// Google Analytics only sees the very first page load — React Router
// navigations don't trigger a full page reload, so GA never finds out.
export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location]);
}
