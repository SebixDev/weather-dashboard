/* 1. VARIABLEN */
const apiKey = "DEIN_API_KEY_HIER";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");

/* 2. FUNKTIONEN */
async function checkWeather(city) {
    // Anfrage an den Wetter-Server
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    // Paket in ein lesbares Format (JSON) umgewandelt
    var data = await response.json();

    // Paket in der Browser-Konsole (F12) anzeigen
    console.log(data);

    // Die echten Daten in die HTML-Elemente schreiben
    document.querySelector("#city-name").innerHTML = data.name;
    document.querySelector("#temp-display").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector("#description").innerHTML = data.weather[0].description;
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