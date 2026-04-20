// Bausteine aus dem HTML ins JavaScript geholt 
const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const tempDisplay = document.querySelector("#temp-display");

// Button-Eventlistener hinzugefügt
searchButton.addEventListener("click", () => {
    console.log("Button wurde geklickt!");
    alert("Suche gestartet für: " + searchInput.value);
});