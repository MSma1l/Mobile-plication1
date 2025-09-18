# **1. Funcționalități principale ale aplicației**

1. Upload garderobă
    - Userul face poze la haine → aplicația le salvează în backend.
    - Flask poate face clasificare (tricou, pantaloni, jachetă, pantofi).
2. 
3. Propuneri outfit (AI)
    - Backend primește: temperatură, meteo (ploaie, soare), dispoziția userului.
    - Modelul AI recomandă o combinație din garderobă.
4. 
5. Integrare meteo
    - Folosești o API (ex: [OpenWeatherMap](https://openweathermap.org/api)) → Flask ia temperatura reală și o trimite spre logică.
6. 
7. Preferințe utilizator
    - Userul își setează dispoziția: „sportiv”, „casual”, „elegant”.
    - AI alege hainele potrivite.
8. 
9. Istoric & recomandări personalizate
    - Flask salvează alegerile userului (ex: într-o bază de date SQLite).
    - Sistemul învață ce stil preferă utilizatorul.
