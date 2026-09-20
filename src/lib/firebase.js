import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, logEvent as fbLogEvent } from "firebase/analytics";

// Firebase web config — the apiKey here is a public client identifier
// (not a secret); access is controlled by Firebase project settings, not
// by hiding this value.
const firebaseConfig = {
  apiKey: "AIzaSyABkiUE3dHV0xmt7s81LYPE6EIFBLQnTDE",
  authDomain: "opneany.firebaseapp.com",
  projectId: "opneany",
  storageBucket: "opneany.firebasestorage.app",
  messagingSenderId: "603051180490",
  appId: "1:603051180490:web:fe0e843505209afbbc8f33",
  measurementId: "G-SG28YM1BXW",
};

export const app = initializeApp(firebaseConfig);

let analyticsInstance = null;

// Analytics isn't supported in every environment (e.g. some in-app
// browsers, SSR, ad blockers) — isSupported() checks before we try to use it,
// so a blocked/unsupported environment just silently no-ops instead of
// throwing and breaking the app.
isSupported()
  .then((supported) => {
    if (supported) analyticsInstance = getAnalytics(app);
  })
  .catch(() => {
    analyticsInstance = null;
  });

/**
 * Log a Firebase Analytics event. Safe to call even before analytics has
 * finished initializing, or in environments where it's unsupported/blocked
 * — it just does nothing in that case.
 */
export function logEvent(eventName, params) {
  if (!analyticsInstance) return;
  try {
    fbLogEvent(analyticsInstance, eventName, params);
  } catch {
    // Never let analytics failures affect the actual app.
  }
}
