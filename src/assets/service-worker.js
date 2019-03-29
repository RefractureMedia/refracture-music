console.log("Service Working");

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
    .then(cache => cache.match(event.request, {
      ignoreSearch: true
    }))
    .then(response => {
      return response || fetch(event.request);
    })
  );
});