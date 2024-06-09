// Fetches current weather and forecast weather data for a given city.
function getWeather() {
    const apiKey = '1bc9445cd07635254608bf102f53dfa8';
    const city = document.getElementById('city').value;

    // Check if city is empty
    if (!city) {
        alert('Please enter the city name');
        return;
    }

    // Construct URLs for current weather and forecast weather
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    // Fetch current weather data
    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            displayWeather(data);
        })
        .catch((error) => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again');
        });

    // Fetch forecast weather data
    fetch(forecastWeatherUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            displayHourForecast(data.list);
        })
        .catch((error) => {
            console.error('Error fetching forecast weather data:', error);
            alert('Error fetching forecast weather data. Please try again');
        });
}

// Displays the current weather information on the webpage.
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';

    // Check if the city is not found
    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const temperatureHTML = `<p>${temperature}&#176;C</p>`;
        const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
    }
}

// Displays the hourly forecast weather information on the webpage.
function displayHourForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = '';

    // Get the next 8 hours of forecast data
    const next8Hours = hourlyData.slice(0, 8);

    // Iterate over each hour and display the forecast information
    next8Hours.forEach((item) => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="hourly Weather Icon">
                <span>${temperature}&#176;C</span>
            </div>`;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

// Displays the weather icon on the webpage.
function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
    weatherIcon.style.margin = 'auto';
    weatherIcon.style.width = '100px';
    weatherIcon.style.height = '100px';
}

showImage(); // Call the showImage() function to display the weather icon.
