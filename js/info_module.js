//  -------------------------------------------------------
//  Variables - Global use
//  -------------------------------------------------------

var cityName = localStorage.getItem("name_localCity");
const URL_DAY_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e4dfa41e22f93aa72d2e80838a3bb930`
var cityWeatherInfo;
var cityWeatherInfoDaily;
var cityPicture;
var dateNow = new Date();

const btnChangCity = document.getElementById("btnChangeCity")
const btnCompareCities = document.getElementById("btnCompareCities")
const cityImageContainer = document.getElementById("cityImage");

//  -------------------------------------------------------
//  Functions
//  -------------------------------------------------------

//getWeatherDataPerDay - Function : Get data info of one day
const getWeatherDataPerDay = async () => {
    const res = await fetch(URL_DAY_WEATHER);
    cityWeatherInfo = await res.json();
    paintWeatherGeneralInfo();

    //Getting Weather Daily
    getWeatherDataDaily();

    //Getting pictyre
    getCityPicture()

}

// getWeatherDataDaily - function : Get from the API the daily weather
const getWeatherDataDaily = async () => {
    const URL_DAILY_WEATHER = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityWeatherInfo.coord.lat}&lon=${cityWeatherInfo.coord.lon}&units=metric&exclude=hourly,minutely&appid=e4dfa41e22f93aa72d2e80838a3bb930`;

    const resDaily = await fetch(URL_DAILY_WEATHER);
    cityWeatherInfoDaily = await resDaily.json();
    paintWeatherDailyInfo();
    console.log(cityWeatherInfoDaily)
}

const getCityPicture = async () => {
    const res = await fetch(`https://api.unsplash.com/photos/random?client_id=KnqxdhP9gviZnH7O9L4xG4KVbrGZHHeooFPfFMTDctg&query=%27${cityName}%27%20SKY`);
    cityPicture = await res.json();
    showCityPicture();
}

// paintWeatherGeneralInfo - function : paint in the html page the weather of the day
const paintWeatherGeneralInfo = () => {
    //console.log(cityWeatherInfo.base);
    let nameCity = cityWeatherInfo.name
    let date = dateNow.toDateString();
    let icon = cityWeatherInfo.weather[0].icon;
    let temp = Math.floor(cityWeatherInfo.main.temp - 273.15)
    let tempMin = Math.floor(cityWeatherInfo.main.temp_min - 273.15)
    let tempMax = Math.floor(cityWeatherInfo.main.temp_max - 273.15)
    let feelsLike = Math.floor(cityWeatherInfo.main.feels_like - 273.15)

    //New Elements
    let image = document.createElement("img");
    let temperature = document.createElement("h2");
    let descResume = document.createElement("small");

    document.getElementById("cityName").innerText = nameCity;
    document.getElementById("date").innerHTML = `${date}<br>${cityWeatherInfo.weather[0].main}`;

    image.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
    document.getElementById("picture").appendChild(image);

    temperature.textContent = `${temp}°C`
    document.getElementById("temp").appendChild(temperature);

    descResume.innerHTML = `${tempMax}°/${tempMin}°  Feels like ${feelsLike}° <br> ${cityWeatherInfo.weather[0].description}`
    document.getElementById("descInfo").appendChild(descResume);
}

// paintWeatherDailyInfo - function : paint in the html page the daily weather (5 days)
const paintWeatherDailyInfo = () => {

    let dailyArray = cityWeatherInfoDaily.daily;
    let detailTable = document.getElementById("detailTable")
    let nameDays = ["Mon", "Sun", "Tue", "Wen", "Thu", "Fri", "Sat"];

    dailyArray.forEach((element, index) => {
        let day = new Date(dateNow);
        day.setDate(day.getDate() + index);

        // let iconImg = `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png}`
        // <img src="http://openweathermap.org/img/wn/02d@2x.png" class="max-width: 50%;" >
        // <img src="http://openweathermap.org/img/wn/${iconImg}@2x.png">
        if (index >= 1) {
            detailTable.innerHTML += `<tr class="table-info">                               
            <td>${nameDays[day.getDay()]}</td>
            <td>${element.temp.min}°c</td>
            <td>${element.temp.max}°c</td>
          </tr> `
        }

    });
}
// setLocalStorage - function : Set the Values of Local Storage
const setLocalStorage = (StorageValue) => {
    if (StorageValue == "") {
        localStorage.setItem("id_localCity", StorageValue);
        localStorage.setItem("name_localCity", StorageValue);
        localStorage.setItem("lat_localCity", StorageValue);
        localStorage.setItem("lon_localCity", StorageValue);
    }
}

// showCitiPicture - function : shows picture of city
const showCityPicture = () => {

    let imageCityCard = document.createElement("div");
    let urlImage = cityPicture.urls.regular;
    console.log(urlImage);

    imageCityCard.innerHTML = `
        <div class="card border-dark  bg-light mb-3" style="max-width: 20rem;">
      
      <div class="card-body">
        <h4 class="card-title">${cityName}</h4>
        <img style="height: 200px; width: 100%; display: block;" src="${urlImage}" alt="Card image">
        
      </div>
    </div>`
    cityImageContainer.appendChild(imageCityCard);
}


// changeCity - function : Change the city origen
const changeCity = () => {
    setLocalStorage("");
    window.open("index.html", "_self")
}

// compareCities - function : compare 2 citie's weather
const compareCities = () => {

}

// getWeather --MAIN-- function : Get the weather per day and daily
const getWeather = () => {
    getWeatherDataPerDay();
}

//  -------------------------------------------------------
//  Events.
//  -------------------------------------------------------

btnChangCity.addEventListener('click', changeCity);
btnCompareCities.addEventListener('click', compareCities);

//  -------------------------------------------------------
//  Execution Secuence.
//  -------------------------------------------------------

export default getWeather;
// getWeather();
