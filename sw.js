function openCache() {
  return caches.open("v1/fairy-lights");
}
async function cacheReqeust(request, response) {
  const cache = await openCache();
  cache.put(request, response);
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await openCache();

      await cache.addAll([
        "./10-xmass.js",
        "./20-button.js",
        "./button.css",
        "./fairy-lights-off.svg",
        "./fairy-lights-on.svg",
        "./favicon.png",
        "./index.html",
        "./pwa.js",
        "./style.css",
      ]);

      return self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    // Fallback to offline page if navigating fails.
    event.respondWith(
      (async () => {
        try {
          const response =
            ("preloadResponse" in event && (await event.preloadResponse)) ||
            (await fetch(event.request));
          cacheReqeust(event.request, response.clone());
          return response;
        } catch (error) {
          const cache = await openCache();
          const cachedResponse = await cache.match("./index.html");
          if (cachedResponse != null) {
            return cachedResponse;
          } else {
            throw error;
          }
        }
      })()
    );
  } else {
    // If a request fails and it's in offline cache, serve it from the cache.
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(event.request);
          cacheReqeust(event.request, response.clone());
          return response;
        } catch (error) {
          const cache = await openCache();
          const cachedResponse = await cache.match(event.request);
          if (cachedResponse != null) {
            return cachedResponse;
          } else {
            throw error;
          }
        }
      })()
    );
  }
});
