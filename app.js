//bring key from website
const apiKey='1d8c9adaa8467953df3e18ab04fa1f0d';

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherResults= document.getElementById("weather-results");

//add eventlistener
 searchBtn.addEventListener("click", ()=> {
    const city=cityInput.value;
    if (city){
        getWeather(city);
    }
    else{
        alert('Please enter a city name.');
    }

});

//combining click of search button with enter key
document.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {     // Check if Enter key is pressed
       searchBtn.click();   // Trigger the button click
    }
});

async function getWeather(city){
        const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{
        weatherResults.innerHTML=`<p>Fetching weather data...</p>`;

        
        const response = await fetch(apiUrl);

        if(!response.ok){
            throw new Error('City Not found. Please check the spelling.');
        }

        const data = await response.json();

        displayWeather(data);
    }
    catch(error){

        weatherResults.innerHTML = `<p class="error-message">${error.message}</p>`

    }    

    }

    function displayWeather(data){

        //clearing the innerHTML first
        weatherResults.innerHTML='';

        const cityName=data.name;
        const iconCode = data.weather[0].icon;
        const country=data.sys.country;
        const temperature=data.main.temp;
        const feelsLike=data.main.feels_like;
        const description= data.weather[0].description;
        const humidity=data.main.humidity;
        const windSpeed= data.wind.speed;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        //create html content
        const weatherHTML=`
        <h2 >${cityName}, ${country}</h2>
        <div >
        <img src="${iconUrl}" alt="weather icon">
        ${temperature.toFixed(1)}°C
        </div>
        <p><strong>${description.charAt(0).toUpperCase() + description.slice(1)}</strong></p>
        <p><strong>Feels Like:</strong>${feelsLike.toFixed(1)}°C</p>
        <div>
        <div><p><strong>Humidity</strong> <img src="https://cdn-icons-png.flaticon.com/128/727/727790.png">
        <br>
         ${humidity}%</p></div>
        <div><p><strong>Wind Speed</strong> <i class="fa-solid fa-wind"></i>
        <br>
        ${windSpeed.toFixed(1)} m/s</p></div>
        </div>`;

        //insert created html into dom
        weatherResults.innerHTML=weatherHTML;
        
    
    }
