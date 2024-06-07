function getWeather() {
    const apiKey = '1bc9445cd07635254608bf102f53dfa8';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter the city name');
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;


    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data.Please try again');
        });
    }
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfo = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    //clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';


    if (data.cod === '404') {
                    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
                } else {
                    const cityName=data.name;
                    const temperature=Math.round(data.main.temp-273.15);
                    const description=data.weather[0].description;
                    const icon=data.weather[0].icon;
                    const iconUrl=`https://openweathermap.org/img/wn/${iconCode}@4x.png`;

                    const temperatureHTML = `<p>${temperature}&#176;C</p>`;
                    const weatherInfoHTML = `<p>${cityName}</p>
                                 <p>${description}</p>`;

                    tempDivInfo.innerHTML = temperatureHTML;
                    weatherInfo.innerHTML = weatherInfoHTML;
                    weatherIcon.src=iconUrl;
                    weatherIcon.alt=description;
                }

                showImage();
    }
function displayHourForecast(hourlyData){
    const hourlyForecastDiv=document.getElementById('hourly-forecast');
    const next24Hours=hourlyData.slice(0,8);
    next24Hours.forEach(item=>{
        const dateTime=new Date(item.dt*1000);
        const hour=dateTime.getHours();
        const temperature=Math.round(item.main.temp-273.15);
        const iconCode=item.weather[0].icon;

        const hourlyItemHtml=
        `<div class="hourly-item">
           <span>${hour}:00</span>
              <img src='$iconUrl'alt="hourly Weather Icon">
              <span>4{temprature}&#176;C</span>
         </div>`;
            hourlyForecastDiv.innerHTML+=hourlyItemHtml;
    });   



    
}    


function showImage(){
    const weatherIcon=document.getElementById('weather-icon');
    weatherIcon.style.display='block';
}

showImage(); // Call the showImage() function to display the weather icon.

