/* 1. VARIABLEN */
const apiKey = "9263dbbbc3a0428a395b63a63c646696";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const weatherIcon = document.querySelector(".weather-icon");

/* HELPER-FUNKTION CSS EFFEKTE */
function createWeatherEffects(type) {
    const effectsContainer = document.querySelector("#weather-bg-effects");
    effectsContainer.innerHTML = "";

    if (type === "rain") {
        for (let i = 0; i < 40; i++) {
            const drop = document.createElement("div");
            drop.classList.add("rain-drop");
            drop.style.left = Math.random() * 100 + "vw";
            drop.style.animationDuration = (Math.random() * 0.5 + 0.5) + "s";
            drop.style.animationDelay = Math.random() * 2 + "s";
            effectsContainer.appendChild(drop);
        }
    } else if (type === "snow") {
        for (let i = 0; i < 30; i++) {
            const flake = document.createElement("div");
            flake.classList.add("snowflake");
            const size = Math.random() * 4 + 2 + "px";
            flake.style.width = size;
            flake.style.height = size;
            flake.style.left = Math.random() * 100 + "vw";
            flake.style.animationDuration = (Math.random() * 3 + 2) + "s";
            flake.style.animationDelay = Math.random() * 5 + "s";
            effectsContainer.appendChild(flake);
        }
    }
}

/* 2. HAUPTFUNKTION 7-TAGE PROGNOSE */
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

/* 3. HAUPTFUNKTION */
async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status == 404 || response.status == 401) {
            alert("Stadt nicht gefunden oder API-Key ungültig!");
            return;
        }

        const data = await response.json();

        // A: Texte
        document.querySelector("#city-name").innerHTML = data.name;
        document.querySelector("#temp-display").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector("#description").innerHTML = data.weather[0].description;
        
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        document.querySelector("#uv-value").innerHTML = "1";
        document.querySelector("#uv-level").innerHTML = "Normal";
        document.querySelector("#uv-level").style.color = "#4fd64d";

        // B: Wetter-Typ
        const weatherMain = data.weather[0].main.toLowerCase();

        // C: Klassen
        document.body.className = ""; 

        if (weatherMain === "clear") {
            document.body.classList.add("clear");
            weatherIcon.src = "images/clear.png";
            createWeatherEffects("clear");
        } else if (weatherMain === "clouds") {
            document.body.classList.add("clouds");
            weatherIcon.src = "images/clouds.png";
            createWeatherEffects("clouds");
        } else if (weatherMain === "rain" || weatherMain === "drizzle") {
            document.body.classList.add("rain");
            weatherIcon.src = "images/rain.png";
            createWeatherEffects("rain");
        } else if (weatherMain === "snow") {
            document.body.classList.add("snow");
            weatherIcon.src = "images/snow.png";
            createWeatherEffects("snow");
        }

        getForecast(city);

    } catch (error) {
        console.error("Fehler beim Abrufen der Wetterdaten:", error);
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