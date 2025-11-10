const DEFAULT           = 'a7bd28314c54d4b2fcc57e851f1d6b47';
const CITY_INPUT        = document.getElementById('cityInput');
const GET_WEATHER_BTN   = document.getElementById('getWeather');
const WEATHER_INFO      = document.getElementById('weatherInfo');
const LOADING           = document.getElementById('loading');
const ERROR             = document.getElementById('error');
const CITY_NAME         = document.getElementById('cityName');
const TEMPERATURE       = document.getElementById('temperature');
const DESCRIPTION       = document.getElementById('description');
const WEATHER_ICON      = document.getElementById('weatherIcon');

GET_WEATHER_BTN.addEventListener('click', () => {
    const CITY = CITY_INPUT.value.trim();
    if (!CITY) {
        showError('Please enter a city name.');
        return;
    }

    showLoading();
    fetchWeather(CITY);
});

async function fetchWeather(CITY) {
    try {
        const RESPONSE = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${DEFAULT}&units=metric`);
        console.log(`Weather Response`, RESPONSE);
        if (!RESPONSE.ok) {
            console.log('Error response:', `${RESPONSE.ok}`);
            throw new Error('City not found');
        }

        const DATA = await RESPONSE.json();
        console.log(`Weather Data`, DATA);
        displayWeather(DATA);
        hideError();
    } catch (err) {
        showError(err.message || 'Failed to fetch weather data.');
    } finally {
        hideLoading();
    }
}

function displayWeather(data) {
    CITY_NAME.textContent = data.name + ', ' + data.sys.country;
    TEMPERATURE.textContent = Math.round(data.main.temp) + '°C';
    DESCRIPTION.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    WEATHER_ICON.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    WEATHER_ICON.alt = data.weather[0].description;
    WEATHER_INFO.style.display = 'block';
    console.log(`Weather City`, CITY_NAME.textContent);
    console.log(`Weather Temprature`, TEMPERATURE.textContent);
    console.log(`Weather Description`, DESCRIPTION.textContent);
    console.log(`Weather Icon`, WEATHER_ICON.src);
    console.log(`Weather Icon`, WEATHER_ICON.alt);
}

function showLoading() {
    LOADING.style.display = 'block';
    WEATHER_INFO.style.display = 'none';
    hideError();
}

function hideLoading() {
    LOADING.style.display = 'none';
}

function showError(msg) {
    ERROR.textContent = msg;
    ERROR.style.display = 'block';
    WEATHER_INFO.style.display = 'none';
}

function hideError() {
    ERROR.style.display = 'none';
}