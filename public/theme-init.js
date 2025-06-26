/**
 * Theme initialization script to prevent flash.
 * Runs immediately when the page loads, before Angular.
 */
(function () {

  function getSystemTheme() {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "dark"; // Default to dark if no system preference detection
  }

  // Check for saved theme preference or use system preference, defaulting to dark
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("theme");
  } catch (e) {
    // localStorage might not be available (e.g., in private browsing)
    console.warn("localStorage not available, using system theme preference");
  }

  const theme = savedTheme || getSystemTheme();

  // Apply the theme immediately to the HTML element
  document.documentElement.setAttribute("data-theme", theme);

  // Also set it as a class for additional CSS targeting if needed
  document.documentElement.className =
    document.documentElement.className.replace(/\btheme-\w+\b/g, "");
  document.documentElement.classList.add(`theme-${theme}`);

  if (!savedTheme) {
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      // Ignore if localStorage is not available
    }
  }
})();
