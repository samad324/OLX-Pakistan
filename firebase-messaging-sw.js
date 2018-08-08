let staticCacheName = "static_cache_v59";
let dynamicCacheName = "dynamic_cahce_v59";
let filesToCache = [
  "/src/dashboard/dashboard.html",
  "/src/dashboard/css/style.css",
  "/src/dashboard/css/web.css",
  "/src/dashboard/css/mobile.css",
  "/src/dashboard/css/bootstrap.css",
  "/src/dashboard/js/script.js",
  "/src/ad/ad.html",
  "/src/ad/js/script.js",
  "/src/css/generalStyle.css",
  "/src/css/forMobile.css",
  "/src/css/forWeb.css",
  "/src/dashboard/js/jquery.min.js",
  "/src/dashboard/js/tether.min.js",
  "/src/dashboard/js/bootstrap.min.js",
  "/images/arrow-leftt.png",
  "/images/arrow-right.png",
  "/images/phone.png",
  "/images/room.png",
  "/offline.html"
]


self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          if (staticCacheName !== cacheName && dynamicCacheName !== cacheName) {
            return true
          }
        }).map(function (cacheName) {
          console.log("deleting", cacheName)
          return caches.delete(cacheName);
        })
      );
    })
  );
});


self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(dynamicCacheName).then(function (cache) {
      return caches.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        }).catch(function (err){
          caches.match("/offline.html")
        });
      });
    })
  );
});






self.addEventListener('push', function (event) {
  console.log('Received a push message', event);

  var notification = event.data.json().notification
  console.log(notification)
  var title = notification.title
  var body = notification.body
  var icon = notification.icon
  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      vibrate: [200, 100, 200, 100, 200, 100, 200]
    })
  );

});

self.addEventListener('notificationclick', function (event) {
  var notification = event.notification;
  var action = event.action;
  if (action === 'confirm') {
    console.log('Confirm was chosen');
    notification.close();
  } else {
    console.log(action);
    event.waitUntil(
      clients.matchAll()
        .then(function (clis) {
          var client = clis.find(function (c) {
            return c.visibilityState === 'visible';
          });
          if (client !== undefined) {
            client.navigate("https://olxpakistanpwa.firebaseapp.com/src/dashboard/dashboard.html");
            client.focus();
          } else {
            clients.openWindow("https://olxpakistanpwa.firebaseapp.com/src/dashboard/dashboard.html");
          }
          notification.close();
        })
    );
  }
})