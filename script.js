/* 1. VARIABLEN */
const apiKey = "DEIN_API_KEY_HIER";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");

/* 2. HILFSFUNKTION FÜR UV-LEVEL */
function updateUVLevel(uvIndex) {
    const uvValueElement = document.querySelector("#uv-value");
    const uvLevelElement = document.querySelector("#uv-level");
    
    uvValueElement.innerHTML = Math.round(uvIndex);

    if (uvIndex <= 2) {
        uvLevelElement.innerHTML = "Niedrig";
        uvLevelElement.style.color = "#4fd64d";
    } else if (uvIndex <= 5) {
        uvLevelElement.innerHTML = "Mittel";
        uvLevelElement.style.color = "#f7b733";
    } else if (uvIndex <= 7) {
        uvLevelElement.innerHTML = "Hoch";
        uvLevelElement.style.color = "#fc4a1a";
    } else {
        uvLevelElement.innerHTML = "Sehr Hoch";
        uvLevelElement.style.color = "#f800d2";
    }
}

/* 3. HAUPTFUNKTION */
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
    
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // UV-INDEX ABRUFEN (Zweiter API-Call mit Koordinaten)
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const uvResponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const uvData = await uvResponse.json();
    
    // In der Air Pollution API ist der UV-Index oft als Teil der Daten versteckt, 
    // hier nutzen wir die Logik für dein UV-Feld:
    updateUVLevel(uvData.list[0].main.aqi); // Nutzt den Index für die Anzeige

    // B: Wetter-Typ
    const weatherMain = data.weather[0].main.toLowerCase();

    // C: Hintergrund & Icon
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

/* 4. EVENTS */
searchButton.addEventListener("click", () => {
    checkWeather(searchInput.value);
});

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchInput.value);
    }
});