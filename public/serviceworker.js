// Name of the cache
const CACHE_NAME = 'v1_cache';

// Files to cache
const urlsToCache = [
  '/',
  '/offline',
  '/styles.css',
  '/script.js',
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          // Return cached file
          return response;
        }
        // Perform network request if no cache
        return fetch(event.request);
      })
  );
});
