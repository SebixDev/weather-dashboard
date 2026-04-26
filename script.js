/* 1. VARIABLEN */
const apiKey = "DEIN_API_KEY_HIER";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");

/* 2. HAUPTFUNKTION */
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (response.status == 404) {
        alert("Stadt nicht gefunden!");
        return;
    }

    var data = await response.json();

    // A: Texte füllen
    document.querySelector("#city-name").innerHTML = data.name;
    document.querySelector("#temp-display").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector("#description").innerHTML = data.weather[0].description;

    // B: Wetter-Typ bestimmen
    const weatherMain = data.weather[0].main.toLowerCase();

    // C: Hintergrund & Icon umschalten
    document.body.classList.remove("clear", "clouds", "rain", "snow");

    if (weatherMain === "clear") {
        document.body.classList.add("clear");
        weatherIcon.src = "images/clear.png";
    } else if (weatherMain === "clouds") {
        document.body.classList.add("clouds");
        weatherIcon.src = "images/clouds.png";
    } else if (weatherMain === "rain" || weatherMain === "drizzle") {
        document.body.classList.add("rain");
        weatherIcon.src = "images/rain.png";
    } else if (weatherMain === "snow") {
        document.body.classList.add("snow");
        weatherIcon.src = "images/snow.png";
    }
}

/* 3. EVENTS */
searchButton.addEventListener("click", () => {
    checkWeather(searchInput.value);
});

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchInput.value);
    }
});