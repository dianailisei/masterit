// import { decodeToken } from "../src/utils"
const publicVAPIDKey = "BAX6kWxVcUeibkPhHX2Z-YEudZEqGJTqAKSchjh1uhAEhR7Xp_cZ07Op0mq6Y34Jy3nqCahSam2vfwh0ievyEo4"

if ('serviceWorker' in navigator) {
  
  send().catch(err => console.log(err));
}

async function send() {
  //register sw
  console.log("registering sw");
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });
  console.log("sw registered");

  //register push
  console.log("registering push");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVAPIDKey)
  })
  console.log("Push registered");

  //send push notif
  console.log("Sending push");
  // let user = decodeToken(localStorage.getItem("token"))
  // console.log(user)
  // eslint-disable-next-line no-constant-condition
  await fetch('http://localhost:4041/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  await setInterval(function() {
    fetch('http://localhost:4041/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'content-type': 'application/json'
      }
    }
    )}, 300000)
    // eslint-disable-next-line no-undef
  //console.log('Sent push');
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