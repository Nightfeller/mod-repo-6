/*

const searchBarEl = document.querySelector(".search-bar");
const searchedCitiesEl = document.querySelector(".searched-cities");
const formInputEl = document.querySelector(".form-input");
const searchButtonEl = document.querySelector(".search-btn");
const storedItemsEl = document.querySelector(".stored-items");
const storedCityEl = document.querySelector(".stored-city");
const storedTempEl = document.querySelector(".stored-temp");
const storedWindEl = document.querySelector(".stored-wind");
const storedHumidEl = document.querySelector(".stored-humid");
let arrayOfCities = [];

const lat = "";
const lon = "";
let cityName = "";
const limit = "5";
const APIKey = "9c36c83ed0d31dda5daaaa402e1f6dca";
const weatherAPI = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;




// add event listener to search button
searchButtonEl.addEventListener('click', function(e) {
    e.preventDefault();
    function getLatLon() {
        const geoAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${APIKey}`;
        fetch(geoAPI).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            arrayOfCities.forEach((data) => console.log(arrayOfCities));
            arrayOfCities = data;
            drawCities(arrayOfCities);
            // return arrayOfCities;
        });
    }
    cityName = document.querySelector(".form-input").value;
    getLatLon();
});

function drawCities(aoc) {
    console.log("drawCities");
    if (aoc.length >= 1) { 
        for (var i = 0; i < aoc.length; i++) {
            console.log(i + ", " + arrayOfCities[i]);
        }
    }
}

// add event listener to search bar


// formInputEl.addEventListener('click', function(e) {
//     e.preventDefault();
//     console.log("event" + e);
// }

*/

const searchBarEl = document.querySelector(".search-bar");
const searchedCitiesEl = document.querySelector(".searched-cities");
const formInputEl = document.querySelector(".form-input");
const searchButtonEl = document.querySelector(".search-btn");
const storedItemsEl = document.querySelector(".stored-items");
const storedCityEl = document.querySelector(".stored-city");
const storedTempEl = document.querySelector(".stored-temp");
const storedWindEl = document.querySelector(".stored-wind");
const storedHumidEl = document.querySelector(".stored-humid");
const localCityEl = document.querySelector(".locally-stored-city");
const array = [];

const lat = "";
const lon = "";
let cityName = "";
const limit = "5";
const APIKey = "9c36c83ed0d31dda5daaaa402e1f6dca";
const weatherAPI = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;



searchButtonEl.addEventListener('click', function(e) {
    e.preventDefault();
    clearCitiesAndWeather();
    function getLatLon() {
        const geoAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${APIKey}`;
        fetch(geoAPI).then(function (response) {
            return response.json();
        }).then(function (arrayofCities) {
            console.log(arrayofCities);
            array.forEach((arrayofCities) => console.log(arrayofCities));
            getCities(arrayofCities) 
            // for(var k = 0; k < 5; k++){
            //localStorage.setItem("city", JSON.stringify(cityName));
            //newButton(cityName, true);
            // }
        });
        
    }
    cityName = document.querySelector(".form-input").value;
    getLatLon();
});

function getCities(arrayofCities) {
    console.log('this is getCities' + JSON.stringify(arrayofCities));
    arrayofCities.forEach((city) => {
        console.log(city);
        const cityEl = document.createElement("li");
        const cityLink = document.createElement("a");
        cityLink.href = `http://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${APIKey}`;
        cityLink.textContent = city.name + ", " + city.state + ", "+ city.country;
        cityLink.addEventListener('click', function(e) {
            e.preventDefault();
            fetch(cityLink.href)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    displayForecast(data);
                })
                .catch(error => console.error(error));
        });
        cityEl.appendChild(cityLink);
        searchedCitiesEl.appendChild(cityEl);
        array.push(city);
        
        console.log(array);
    });
}

function clearCities() {
    while (searchedCitiesEl.firstChild) {
        searchedCitiesEl.removeChild(searchedCitiesEl.firstChild);
    }
}

function clearCitiesAndWeather() {
    while (searchedCitiesEl.firstChild) {
        searchedCitiesEl.removeChild(searchedCitiesEl.firstChild);
    }
}

function displayForecast(data) {

    clearCities();

    for (let i = 0; i < data.list.length; i+=8) { 
        const forecast = data.list[i];
        const forecastEl = document.createElement('div');

        const dateEl = document.createElement('p');
        dateEl.textContent = forecast.dt_txt;
        forecastEl.appendChild(dateEl);

        const tempEl = document.createElement('p');
        tempEl.textContent = `Temp: ${forecast.main.temp}°K`;
        forecastEl.appendChild(tempEl);

        const windEl = document.createElement('p');
        windEl.textContent = `Wind: ${forecast.wind.speed} m/s`;
        forecastEl.appendChild(windEl);

        const humidityEl = document.createElement('p');
        humidityEl.textContent = `Humidity: ${forecast.main.humidity}%`;
        forecastEl.appendChild(humidityEl);

        searchedCitiesEl.appendChild(forecastEl);
    }
}

function newButton(storedCity) {
    let multiCity = [] || JSON.parse(localStorage.getItem("city"));

    if(multiCity.includes(storedCity)) {
        console.log("The city already exists.");
    } else {
        let buttonEl = document.createElement('button');
        buttonEl.textContent = storedCity;
        localCityEl.appendChild(buttonEl);

        buttonEl.addEventListener("click", function(e) {
            e.preventDefault();


        });
    }
}