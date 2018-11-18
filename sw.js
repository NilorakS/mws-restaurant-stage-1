const staticCacheName = 'rev-static-v1';
const cacheUrls = [
	'/',
	'/index.html',
	'/restaurant.html',
	'js/dbhelper.js',
	'js/main.js',
	'js/restaurant_info.js',
	'/data/restaurants.json',
	'/css/styles.css',
	'/css/responsive.css',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg',
	'/img/favicon.ico'
];

// listen for the browser to set up a new service worker and cache urls
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll(cacheUrls);
		})
	);
});

// listen for a service worker to become active and clear old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('rev-') && cacheName !== staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});