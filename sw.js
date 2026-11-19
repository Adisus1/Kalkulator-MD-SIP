const V="md-calc-v1",SHELL=["./","index.html","manifest.json","icon-192.png","icon-512.png"];
const LIBS=["https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js","https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js","https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(async c=>{await c.addAll(SHELL);for(const u of LIBS){try{await c.add(u)}catch(x){}}}).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const cp=n.clone();caches.open(V).then(c=>c.put(e.request,cp)).catch(()=>{});return n}).catch(()=>caches.match("index.html"))))});
