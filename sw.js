/* OICL Premium Calculator — service worker
   ------------------------------------------------------------------
   BUMP CACHE_VERSION ON EVERY UPLOAD. That string is the only thing
   that tells an already-installed phone a new build exists. If you
   upload a new index.html without changing it, iOS will keep serving
   the old cached copy and it will look like nothing changed.
   ------------------------------------------------------------------ */
const CACHE_VERSION = 'oicl-calc-v38';

/* Relative paths so this works under https://<user>.github.io/<repo>/
   as well as at a domain root. */
const PRECACHE = ['./', './index.html', './manifest.json',
                  './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(PRECACHE))
      /* Don't let one bad path abort the whole install — a half-cached
         app that still opens beats an app that refuses to install. */
      .catch(err => console.warn('[sw] precache incomplete:', err))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;

  /* Only handle same-origin GETs. The jsPDF CDN fallback and anything
     else cross-origin goes straight to the network untouched. */
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  /* Page loads: network first, so opening the app while online always
     picks up a fresh upload. Falls back to cache when offline. */
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  /* Everything else: cache first, fill the cache on the way past. */
  event.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then(c => c.put(req, copy));
      }
      return res;
    }))
  );
});

/* Lets the page trigger an immediate update if you ever add a
   "check for updates" button: navigator.serviceWorker.controller
     .postMessage({type:'SKIP_WAITING'}) */
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});
