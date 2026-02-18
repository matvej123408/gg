const STOP_ID = "3014549";
const REFRESH_INTERVAL = 30000; // 30 sec

async function loadDepartures() {
  const API_KEY = ""; // <-- если нужен ключ, вставь сюда
  const url = API_KEY
    ? `https://api.rmv.de/hapi/departureBoard?id=${STOP_ID}&format=json&accessId=${API_KEY}`
    : `https://api.rmv.de/hapi/departureBoard?id=${STOP_ID}&format=json`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const tbody = document.getElementById("board");
    tbody.innerHTML = "";

    if (!data.Departure) {
      tbody.innerHTML = `<tr><td colspan="5">Нет данных</td></tr>`;
      return;
    }

    data.Departure.forEach(dep => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${dep.rtTime || dep.time || "-"}</td>
        <td>${dep.Product?.line || "-"}</td>
        <td>${dep.direction || "-"}</td>
        <td>${dep.stop || "-"}</td>
        <td>${STOP_ID}</td>
      `;
      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error("Ошибка:", err);
  }
}

loadDepartures();
setInterval(loadDepartures, REFRESH_INTERVAL);
