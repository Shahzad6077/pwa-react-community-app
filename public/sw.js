const cacheAppIdentifier = "pwaCommunityApp";
const dynamicCacheAppIdentifier = "pwaCommunityApp-d1";

this.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheAppIdentifier).then(cache => {
      cache.addAll([
        "/static/js/bundle.js",
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/styles.css",
        "/index.html",
        "/",
        "/home",
        "/posts",
        "/fetch"
      ]);
    })
  );
});

this.addEventListener("fetch", event => {
  // ##- THIS WILL WORK BUT HERE IS A PROBLEM
  // ##- EVEN WE HAVE INTERNET THE DATA WILL ALWAYS FETCHED FROM SW CACHE.
  // ##- WE NEED DATA FROM CACHE WHEN INTERNET IS OFLINE
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then(cacheResult => {
        if (cacheResult) {
          return cacheResult;
        }
        let requestUrl = event.request.clone();
        return fetch(requestUrl);
        // .then(fetchRes => {
        //   return caches.open(dynamicCacheAppIdentifier).then(cache => {
        //     cache.put(event.request.url, fetchRes.clone());
        //     return fetchRes;
        //   });
        // });
      })
    );
  }
});
