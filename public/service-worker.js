const CURRENT_CACHE ="static-cache-v1.1";


const files = [
  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js",
  "http://localhost:3000/registro2.html",
  "http://localhost:3000/index.html",
  "./images/eart.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CURRENT_CACHE).then((cache) => {
      return cache.addAll(files);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((fetchResponse) => {
        return fetchResponse;
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  const currentCaches = [CURRENT_CACHE];

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => !currentCaches.includes(cacheName))
          .map((cacheName) => caches.delete(cacheName))
      )
    )
  );
});
