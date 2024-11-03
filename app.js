const apiKey = '2a44318a88c074e4bdbd09721e9f08b6'; 
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
const weatherApp = document.querySelector('.weather-app');

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

    const { main, weather, wind, name, dt } = data; 
    const date = new Date(dt * 1000); 

    cityName.textContent = name.toUpperCase(); 
    temperature.textContent = Math.round(main.temp) + '°'; 
    tempMaxElement.textContent = Math.round(main.temp_max) + '°'; 
    tempMinElement.textContent = Math.round(main.temp_min) + '°'; 
    humidityElement.textContent = main.humidity + '%'; 
    cloudyElement.textContent = weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1); 
    windElement.textContent = wind.speed + ' km/h'; 
    conditionElement.textContent = weather[0].main; 

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }; 
    dateElement.textContent = date.toLocaleDateString('en-US', options); 
    timeElement.textContent = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 

    weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`; 

    updateBackground(weather[0].main);
}
function updateBackground(condition) {
    weatherApp.classList.remove('doj', 'sneg', 'obloch', 'asno','smoke','fog','mist');

    switch (condition.toLowerCase()) {
        case 'clear':
            weatherApp.classList.add('asno');
            break;
        case 'clouds':
            weatherApp.classList.add('obloch');
            break;
        case 'rain':
        case 'drizzle':
            weatherApp.classList.add('doj');
            break;
        case 'snow':
            weatherApp.classList.add('sneg');
            break;
        case 'smoke':
            weatherApp.classList.add('smoke');
            break;
        case 'fog':
            weatherApp.classList.add('fog');
            break;
        case 'mist':
            weatherApp.classList.add('mist');
            break;
    }
}

form.addEventListener('submit', async (e) => {  
    e.preventDefault();  
    const location = form.querySelector('.search').value;  
    
    if (!location) return;  
    
    const weatherData = await getWeatherData(location);  
    updateWeatherUI(weatherData);  
    
    form.querySelector('.search').value = '';  
});  
getWeatherData('Bishkek').then(updateWeatherUI);