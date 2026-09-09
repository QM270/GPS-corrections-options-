/* Offline cache. Bump CACHE whenever you edit any file, especially data.js. */
const CACHE = 'gps-corrections-v1';
const ASSETS = [
  './', './index.html', './styles.css', './app.js', './data.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png',
  './img/novatel.png', './img/rs1.png', './img/500s.png', './img/600s.png',
  './img/700s.png', './img/trimble-372.png', './img/trimble-262.png', './img/trimble-nh.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k =>
    Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{});
    return res;
  }).catch(() => caches.match('./index.html'))));
});
