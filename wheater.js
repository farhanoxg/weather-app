const inputbox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather_img');
const temperature = document.querySelector('.temperature');
const discription = document.querySelector('.discription');
const cityname = document.querySelector('.cityname');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const apikey = "5faf654f04ba866e217e63ca69248323"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        // console.log('error');
        // return;
    }
    else {
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
    }


    cityname.innerHTML = `${weather_data.name}`
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;

    discription.innerHTML = `${weather_data.weather[0].main}`;

    wind_speed.innerHTML = `${(weather_data.wind.speed)} KM/h`;

    //images from here

    switch (weather_data.weather[0].main) {
        case 'Clouds': weather_img.src = "WeatherPng/clouds.png"
            break;
        case 'Clear': weather_img.src = "WeatherPng/clear.png"
            break;
        case 'Cold': weather_img.src = "WeatherPng/snow.png"
            break;
        case 'Haze': weather_img.src = "WeatherPng/haze.png"
            break;
        case 'Rain': weather_img.src = "WeatherPng/rain.png"
            break;
        case 'Mist': weather_img.src = "WeatherPng/mist.png"
            break;
    }


    // console.log(weather_data);

}



searchBtn.addEventListener('click', () => {
    if (inputbox.value == "") {
        alert("Input Required")
        return false;
    }
    checkWeather(inputbox.value);
})
