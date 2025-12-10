const statusEl = document.getElementById('status');
const listEl = document.getElementById('list');

let map = L.map('map').setView([52.52, 13.405], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

document.getElementById('scanBt').addEventListener('click', async () => {
  status('Запрос Bluetooth...');
  listEl.innerHTML = '';
  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    });
    addDevice({name: device.name || 'unnamed', id: device.id, type: 'bluetooth'});
    status('Устройство выбрано.');
  } catch (e) { status('Отказ или ошибка: ' + e.message); }
});

document.getElementById('getGeo').addEventListener('click', () => {
  if (!navigator.geolocation) return status('Геолокация не поддерживается');
  navigator.geolocation.getCurrentPosition(p => {
    const {latitude, longitude} = p.coords;
    map.setView([latitude, longitude], 15);
    L.marker([latitude, longitude]).addTo(map).bindPopup('Вы здесь').openPopup();
    status('Готово.');
  });
});

document.getElementById('fetchWifi').addEventListener('click', () => {
  status('Для Wi-Fi нужен нативный Android-плагин.');
});

function addDevice(d){
  const div=document.createElement('div');
  div.className='device';
  div.innerHTML=`<b>${d.name||d.id}</b> (${d.type})`;
  listEl.appendChild(div);
}

function status(t){ statusEl.textContent=t; }

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
