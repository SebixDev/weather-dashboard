# 🌤️ Dynamisches Wetter-Dashboard

Ein modernes, interaktives Wetter-Dashboard, das Echtzeitdaten von der OpenWeatherMap API abruft und das Design dynamisch an die Wetterlage anpasst.

## 🚀 Funktionen (Stand 09.06.2026)

* **Echtzeit-Wetterdaten:** Abruf von Temperatur, Stadtname und Wetterbeschreibung über die OpenWeatherMap API.
* **Dynamisches Design:** Der Hintergrund der Website ändert sich automatisch (Gradients) basierend auf der Wetterlage (z.B. sonnig, bewölkt, Regen).
* **Interaktive Suche:** Suche nach Städten per Klick auf den Button oder einfach durch Drücken der **Enter-Taste**.
* **Fehlerbehandlung:** Einfache Prüfung, ob eine Stadt existiert.
* **Responsive UI:** Mit CSS gestaltetes Dashboard, das auf verschiedenen Bildschirmgrößen funktioniert.

## 🛠️ Tech-Stack

* **HTML5:** Struktur der Anwendung.
* **CSS3:** Styling mit Flexbox und dynamischen Verläufen (Linear Gradients).
* **JavaScript (ES6+):** Logik der App mit `fetch`, `async/await` und DOM-Manipulation.
* **API:** [OpenWeatherMap API](https://openweathermap.org/)

## 📂 Projektstruktur

* `index.html` - Das Grundgerüst.
* `style.css` - Das Design und die dynamischen Hintergrund-Klassen.
* `script.js` - Die Logik (API-Abruf, Event-Listener, UI-Updates).
* `/images` - Ordner für die Wetter-Icons (clouds, clear, rain, etc.).

## 📝 Geplante Updates (To-Do)

- [x] Grundlegendes HTML/CSS Design
- [x] JavaScript API-Anbindung
- [x] apiKey einfügen für Wetterdaten
- [x] Dynamische Hintergründe
- [x] Wetter Icons hinzufügen
- [x] Vorhersage für die nächsten 7 Tage hinzufügen
- [x] Standort-Autovervollständigung
- [x] Feuchtigkeits- & Wind-Anzeige
- [x] Feuchtigkeits- & Wind-Anzeige Icons einfügen
- [x] Icons herunnterladen und lokalen Ordner erstellen am PC.
- [x] Glas-Effekt als neues Designelement einbauen
- [x] 7 Tage Prognose einbauen
- [x] UV-Index Daten hinzufügen


---
*Erstellt als Teil eines Lern-Projekts.*