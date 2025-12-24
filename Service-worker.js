const CACHE = 'voca-cache-v1';
const ASSETS = [
  '/My-voca/',
  '/My-voca/index.html',
  '/My-voca/Manifest.json',
  '/My-voca/Icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res =>
      res || fetch(event.request).catch(() => caches.match('/My-voca/index.html'))
    )
  );
});
