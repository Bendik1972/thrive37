var CACHE_VERSION='v2026-02-22g';
var CACHE_NAME='thrive37-'+CACHE_VERSION;

self.addEventListener('install',function(e){
  self.skipWaiting();
});

self.addEventListener('activate',function(e){
  e.waitUntil(
    caches.keys().then(function(names){
      return Promise.all(
        names.filter(function(n){return n!==CACHE_NAME})
          .map(function(n){return caches.delete(n)})
      );
    }).then(function(){return self.clients.claim()})
  );
});

self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request).then(function(res){
      var clone=res.clone();
      caches.open(CACHE_NAME).then(function(c){c.put(e.request,clone)});
      return res;
    }).catch(function(){
      return caches.match(e.request);
    })
  );
});
