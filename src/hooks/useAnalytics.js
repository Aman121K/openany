import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logEvent } from "../lib/firebase";

// Sends a page_view event on every client-side route change. Without this,
// Firebase Analytics only sees the very first page load — React Router
// navigations don't trigger a full page reload, so it never finds out.
export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    logEvent("page_view", {
      page_path: location.pathname + location.search,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location]);
}
