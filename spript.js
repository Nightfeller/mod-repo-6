const searchBarEl = document.querySelector(".search-bar");
const searchedCitiesEl = document.querySelector(".searched-cities");
const formInputEl = document.querySelector(".form-input");
const searchButtonEl = document.querySelector(".search-btn");
const storedItemsEl = document.querySelector(".stored-items");
const storedCityEl = document.querySelector(".stored-city");
const storedTempEl = document.querySelector(".stored-temp");
const storedWindEl = document.querySelector(".stored-wind");
const storedHumidEl = document.querySelector(".stored-humid");
const array = [];

const lat = "0";
const lon = "0";
const cityName = "Austin";
const limit = "5";
const APIKey = "9c36c83ed0d31dda5daaaa402e1f6dca";
const geoAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${APIKey}`;
const weatherAPI = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

formInputEl.addEventListener('submit', function(event) {
    
});

function getLatLon() {
    fetch(geoAPI).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);

        
        array.forEach((data) => console.log(array));
        
    });
}

getLatLon();