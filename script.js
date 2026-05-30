/* 1. VARIABLEN */
const apiKey = "9263dbbbc3a0428a395b63a63c646696";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const weatherIcon = document.querySelector(".weather-icon");

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
            alert("Stadt nicht gefunden oder API-Key ungültig/noch nicht aktiv!");
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

        // B: Wetter-Typ für Hintergrund-Video
        const weatherMain = data.weather[0].main.toLowerCase();

        // C: Hintergrund-Video & Haupt-Icon
        const bgVideo = document.querySelector("#bg-video");

        if (weatherMain === "clear") {
            bgVideo.src = "images/clear.mp4";
            weatherIcon.src = "images/clear.png";
        } else if (weatherMain === "clouds") {
            bgVideo.src = "images/clouds.mp4";
            weatherIcon.src = "images/clouds.png";
        } else if (weatherMain === "rain" || weatherMain === "drizzle") {
            bgVideo.src = "images/rain.mp4";
            weatherIcon.src = "images/rain.png";
        } else if (weatherMain === "snow") {
            bgVideo.src = "images/snow.mp4";
            weatherIcon.src = "images/snow.png";
        }
        
        // Video nach dem Wechsel
        bgVideo.load();
        bgVideo.play();

        // 7-Tage-Prognose
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