// import { decodeToken } from "../src/utils"

if ('serviceWorker' in navigator) {
  send().catch(err => console.log(err))
}

async function send() {
  const publicVAPIDKey = "BAX6kWxVcUeibkPhHX2Z-YEudZEqGJTqAKSchjh1uhAEhR7Xp_cZ07Op0mq6Y34Jy3nqCahSam2vfwh0ievyEo4"
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVAPIDKey)
  })
  // eslint-disable-next-line no-constant-condition
  await fetch('http://localhost:4041/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}