const apiKey = '4c33c458caadc01561368bc4853b7054';
const base_url = 'https://api.openweathermap.org/data/2.5/weather?q=';

const form = document.getElementById('locationInput');
const cityName = document.querySelector('.name');
const temperature = document.querySelector('.temp');
const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const conditionElement = document.querySelector('.condition');
const tempMaxElement = document.querySelector('.temp-max');
const tempMinElement = document.querySelector('.temp-min');
const humidityElement = document.querySelector('.humidity');
const cloudyElement = document.querySelector('.cloud');
const windElement = document.querySelector('.wind');
const weatherIcon = document.querySelector('.icon');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = form.querySelector('.search').value;

    if (!location) return;

    const weatherData = await getWeatherData(location);
    updateWeatherUI(weatherData);
});

async function getWeatherData(location) {
    const response = await fetch(`${base_url}${location}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
}

function updateWeatherUI(data) {
    if (data.cod === '404') {
        alert('Город не найден!');
        return;
    }

    const { main, weather, wind, name } = data;
    const date = new Date();

    cityName.textContent = name.toUpperCase();
    temperature.textContent = Math.round(main.temp) + '°';
    tempMaxElement.textContent = Math.round(main.temp_max) + '°';
    tempMinElement.textContent = Math.round(main.temp_min) + '°';
    humidityElement.textContent = main.humidity + '%';
    cloudyElement.textContent = weather[0].description;
    windElement.textContent = wind.speed + ' km/h';
    conditionElement.textContent = weather[0].main;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = date.toLocaleDateString('en-US', options);
    timeElement.textContent = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
}

window.addEventListener('load', async () => {
    const weatherData = await getWeatherData('Bishkek');
    updateWeatherUI(weatherData);
});
