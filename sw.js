// sw.js
self.addEventListener('install', e => {
    e.waitUntil(
      // after the service worker is installed,
      // open a new cache
      caches.open('lucky-app-cache').then(cache => {
          // add all URLs of resources we want to cache
          return cache.addAll([
		    '/',
            '/index.html',
            '/contact.html',
            '/images/favicon.png',
            '/gallery.html',
            '/portfolio/nguvumedia.html',
            '/portfolio/imari.html',
            '/portfolio/mayo.html',
            '/portfolio/ompha.html',
            '/portfolio/togg.html',
            '/portfolio/ymc.html',
            '/images/slider.jpg',
            '/images/logo.png',
            '/images/logo.png',
            '/css/main.css',
            '/css/bootstrap.min.css',
            '/MailHandler.ashx',
            '/css/main.css',
            '/css/bootstrap.min.css',
            '/js/jquery.min.js',
            '/js/main.js',
            '/js/slider.js'

          ]);
      })
    );
});
// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
self.addEventListener('fetch', function(event) {
      event.respondWith(
          caches.match(event.request).then(function(response) {
              return response || fetch(event.request);
          })
      );
});
