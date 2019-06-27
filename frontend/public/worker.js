console.log('Loaded service worker!');

// Install Service Worker
self.addEventListener('install', function (event) {
  console.log('installed!');
});

// Service Worker Active
self.addEventListener('activate', function (event) {
  console.log('activated!');
});

self.addEventListener('push', ev => {
  const alarm = ev.data.json();
  // console.log('Got push', alarm);
  self.registration.showNotification("Hurry up!", {
    body: `Your ${alarm.name} starts in about 5 minutes`,
    icon: './notification.png'
  });
});