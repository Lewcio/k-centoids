# K-Centoids

**Algorytm centroidów (k-średnich, ang. k-means)** jest jednym z algorytmów stosowanym w analizie skupień, wykorzystywanym m.in. w kwantyzacji wektorowej. Algorytm nazywany jest także algorytmem klastrowym lub - od nazwisk twórców Linde, Buzo i Graya - algorytmem LBG.

## Wymagania

Do działania angular-cli potrzebny jest [Node JS](https://nodejs.org/en/download/) (>= 4.x.x) wraz z npm (>= 3.x.x). Angular-cli instalujemy z najstępującej linijki `npm install -g angular-cli`

## Uruchamianie projektu

Uruchomianie projektu w trybie developerskim `ng serve`. Aplikacja uruchamia się na `http://localhost:4200/`. Aplikacja automatycznie odświeży się w momencie zmienienia kodu.


## Budowanie projektu

`ng build` generuje projekt w finalną aplikacje. Wygenerowane zasoby znajdująsię w katalogu `dist/`. Używając flagi `-prod`, projekt budowany jest w produkcyjną aplukację.

## Obsługa programu
#### 1. Wprowadzenie punktów
Podajemy współrzędne punktu **X** i **Y** w oknie _Add point_ i dodajemy je przez kliknięcie przyciksu _Add point_. **X** i **Y**należą do zbioru liczb rzeczywistych.
#### 2. Dodanie centroidów
W przypadku pojawienia się w karcie _Points_ współrzędnych punktu, można dodać punkt centroidu przyciskiem _Add centroid_. Punkty należące do dodanych centroidów znajdują się w karcie _Centroid points_.
#### 3. Aktualizowanie wyników centroidów
Kiedy w jednej grupie punktów należących do jednego centroidu występuje więcej niz 1 punkt, klikając przycisk _update centroids_, program wylicza nowe współrzędne na podstawie punktów należących do danego centroidu.
