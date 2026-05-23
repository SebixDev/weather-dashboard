/* 1. VARIABLEN */
const apiKey = "DEIN_API_KEY_HIER";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const weatherIcon = document.querySelector(".weather-icon");

/* 2. HILFSFUNKTION UV-LEVEL */
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

/* 3. HAUPTFUNKTION 7-TAGE PROGNOSE */
async function getForecast(city) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=de`;
    const forecastList = document.querySelector("#forecast-list");
    
    forecastList.innerHTML = "";

    try {
        const response = await fetch(forecastUrl);
        const data = await response.json();

        const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

        dailyData.forEach(day => {
            const date = new Date(day.dt * 1000);
            const options = { weekday: 'short' };
            const dayName = date.toLocaleDateString('de-DE', options).toUpperCase();

            const weatherMain = day.weather[0].main.toLowerCase();
            
            const iconCode = day.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            const forecastItem = document.createElement("div");
            forecastItem.classList.add("forecast-item");

            forecastItem.innerHTML = `
                <p class="forecast-day">${dayName}</p>
                <img src="${iconUrl}" alt="Wetter">
                <p class="forecast-temp">${Math.round(day.main.temp)}°C</p>
            `;

            forecastList.appendChild(forecastItem);
        });

    } catch (error) {
        console.error("Fehler beim Laden der Prognose:", error);
    }
}

/* 4. HAUPTFUNKTION */
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

    // UV-INDEX ABRUFEN
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const uvResponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const uvData = await uvResponse.json();
    
    updateUVLevel(uvData.list[0].main.aqi);

    // B: Wetter-Typ
    const weatherMain = data.weather[0].main.toLowerCase();

    // C: Hintergrund & Haupt-Icon zurücksetzen
    document.body.className = ""; 

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

    // Prognose Stadt aufrufen
    getForecast(city);
}

/* 5. EVENTS */
searchButton.addEventListener("click", () => {
    checkWeather(searchInput.value);
});

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchInput.value);
    }
});