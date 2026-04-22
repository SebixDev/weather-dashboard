/* 1. VARIABLEN (Zutaten & Adressen) */
const apiKey = "DEIN_API_KEY_HIER";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");

// Button-Eventlistener hinzugefügt
searchButton.addEventListener("click", () => {
    console.log("Button wurde geklickt!");
    alert("Suche gestartet für: " + searchInput.value);
});

/* 2. FUNKTIONEN (Die Baupläne) */
async function checkWeather(city) {
    // Der Code schickt eine Anfrage an den Wetter-Server und wartet, bis das Datenpaket zurückkommt:
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    // Wir wandeln das Paket in ein lesbares Format (JSON) um
    var data = await response.json();

    // Zum Testen: Das Paket in der Browser-Konsole (F12) anzeigen
    console.log(data);

    // Die echten Daten in die HTML-Elemente schreiben
    document.querySelector("#city-name").innerHTML = data.name;
    document.querySelector("#temp-display").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector("#description").innerHTML = data.weather[0].description;
}