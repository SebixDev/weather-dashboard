const apiKey = "6d69e4a86b97f02758252eb6f7df20b0";
const searchInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");

async function checkWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}&lang=de`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Stadt nicht gefunden");
        const data = await response.json();

        // Daten in HTML-Element
        document.getElementById("city-name").innerText = data.name;
        document.getElementById("temp-display").innerText = Math.round(data.main.temp) + "°C";
        document.getElementById("description").innerText = data.weather[0].description;
        document.querySelector(".humidity").innerText = data.main.humidity + "%";
        document.querySelector(".wind").innerText = Math.round(data.wind.speed) + " km/h";

        // Hintergrund-Klassen zurücksetzen
        document.body.className = "";

        // HINTERGRUND-BILDER ABGEFRAGT
        if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
            document.body.classList.add("clear");
        } else if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
            document.body.classList.add("clouds");
        } else if (data.weather[0].main == "Rain" || data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/rain.png";
            document.body.classList.add("rain");
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
            document.body.classList.add("snow");
        }

    } catch (error) {
        console.error("Fehler beim Abrufen der Wetterdaten:", error);
    }
}

// Event-Listener Suche
searchBtn.addEventListener("click", () => {
    if (searchInput.value.trim() !== "") {
        checkWeather(searchInput.value);
    }
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && searchInput.value.trim() !== "") {
        checkWeather(searchInput.value);
    }
});