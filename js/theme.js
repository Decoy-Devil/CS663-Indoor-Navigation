// Sunrise/sunset reading-theme toggle. Runs in <head> so the theme is applied before first paint.
(() => {
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("reading-theme"); } catch (e) {}
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));

  const label = () => root.getAttribute("data-theme") === "dark"
    ? { text: "Switch to light theme (sunrise)" }
    : { text: "Switch to dark theme (eclipse)" };

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.innerHTML = '<span class="sun" aria-hidden="true"></span><span class="moon" aria-hidden="true"></span>';
    const paint = () => { const l = label(); btn.title = l.text; btn.setAttribute("aria-label", l.text); };
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("reading-theme", next); } catch (e) {}
      paint();
    });
    paint();
    document.body.appendChild(btn);
  });
})();
