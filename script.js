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