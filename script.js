/* 1. VARIABLEN */
const apiKey = "DEIN_API_KEY_HIER";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");

/* 2. FUNKTIONEN */
async function checkWeather(city) {
    // Anfrage an den Wetter-Server
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    // Fehler abfangen, falls die Stadt nicht existiert
    if (response.status == 404) {
        alert("Stadt nicht gefunden!");
        return;
    }

    // Paket in ein lesbares Format (JSON) umgewandelt
    var data = await response.json();

    // Paket in der Browser-Konsole (F12) anzeigen
    console.log(data);

    // --- A: TEXT-DATEN AKTUALISIEREN ---
    document.querySelector("#city-name").innerHTML = data.name;
    document.querySelector("#temp-display").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector("#description").innerHTML = data.weather[0].description;

    // --- B: DYNAMISCHES DESIGN (HINTERGRUND) ---
    // Wir holen den Wetter-Typ (z.B. "Clouds", "Clear", "Rain")
    const weatherMain = data.weather[0].main.toLowerCase();

    // Zuerst alle alten Klassen entfernen, damit sie sich nicht stapeln
    document.body.classList.remove("clear", "clouds", "rain", "snow");

    // Jetzt die passende Klasse hinzufügen
    if (weatherMain === "clear") {
        document.body.classList.add("clear");
    } else if (weatherMain === "clouds") {
        document.body.classList.add("clouds");
    } else if (weatherMain === "rain" || weatherMain === "drizzle") {
        document.body.classList.add("rain");
    } else if (weatherMain === "snow") {
        document.body.classList.add("snow");
    }
}

/* 3. EVENTS */

// Button-Klick
searchButton.addEventListener("click", () => {
    checkWeather(searchInput.value);
});

// Textfeld: Enter-Taste 
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchInput.value);
    }
});