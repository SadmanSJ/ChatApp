"use client";
import { useEffect, useState } from "react";

export function useMediaQuery(
  query: `(max-width: 320px)` | `(max-width: 640px)` | `(max-width: 768px)`
): boolean {
  // State to store whether the media query is matched or not
  const [matches, setMatches] = useState<boolean>(() => {
    // Set the initial state
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    // Early return if 'window' is not defined (e.g., during server-side rendering)
    if (typeof window === "undefined") return;

    // Create a MediaQueryList object
    const mediaQueryList = window.matchMedia(query);

    // Event listener callback function
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Set the initial value
    setMatches(mediaQueryList.matches);

    // Attach the listener
    mediaQueryList.addEventListener("change", handleChange);

    // Cleanup function to remove the event listener
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]); // Re-run the effect only if the query changes

  return matches;
}
