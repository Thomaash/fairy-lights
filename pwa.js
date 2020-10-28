const BASE_URL = "https://www.vycital.eu/fairy-lights/";

document.addEventListener("DOMContentLoaded", () => {
  const link = document.createElement("link");
  link.setAttribute("rel", "manifest");
  link.setAttribute("href", "./app.webmanifest");
  document.head.appendChild(link);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js", { scope: BASE_URL })
      .catch(() => {
        console.error("CLIENT: service worker registration failure.");
      });
  }
});
