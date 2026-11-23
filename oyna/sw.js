// Hadi Bil web · ağ önce, ağ yoksa önbellek (sürüm 202611231603)
const ONB = 'hadibil-web-202611231603';
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x !== ONB).map((x) => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin) return;   // sunucu (Supabase) istekleri doğrudan gider
  e.respondWith(fetch(r).then((y) => { if (y && y.ok) { const k = y.clone(); caches.open(ONB).then((c) => c.put(r, k)); } return y; }).catch(() => caches.match(r).then((c) => c || caches.match('./'))));
});
