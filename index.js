const apiKey = "9984d81f881c7319256afca7da75411a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiUrl2 = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCondition = document.querySelector(".condition");
const forecast = document.querySelector(".forecast");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";

    }
    else{
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";


        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed +" km/h";

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "bigclouds.png";            
            weatherCondition.innerHTML = data.weather[0].description;
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "clear.png";
            weatherCondition.innerHTML = data.weather[0].description;
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "rain.png";
            weatherCondition.innerHTML = data.weather[0].description;
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "snow.png";
            weatherCondition.innerHTML = data.weather[0].description;
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "brizzle.png";
            weatherCondition.innerHTML = data.weather[0].description;
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "mist.png";
            weatherCondition.innerHTML =data.weather[0].description;
        }
    }
}

async function getForecast(city){

    const response =
    await fetch(
    forecastUrl + city + `&appid=${apiKey}`
    );

    const data =
    await response.json();

    forecast.innerHTML = "";

    for(let i=0;i<40;i+=8){

    const day = data.list[i];

    if(!day) break;

    forecast.innerHTML += `

    <div class="forecast-card">

    <div>
    ${new Date(day.dt_txt)
    .toLocaleDateString(
    "en",
    {weekday:"short"}
)}
    </div>

    <div>
    ${Math.round(day.main.temp)}°C
    </div>

    </div>`;

}

}



async function getWeatherByLocation(lat, lon){

    const response = await fetch( apiUrl2 + `&lat=${lat}&lon=${lon}&appid=${apiKey}`);

    const data = await response.json();
    getForecast(data.name);

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";


    if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "bigclouds.png";            
            weatherCondition.innerHTML= data.weather[0].description;
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "clear.png";
            weatherCondition.innerHTML = data.weather[0].description;
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "rain.png";
            weatherCondition.innerHTML = data.weather[0].description;
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "snow.png";
            weatherCondition.innerHTML = data.weather[0].description;
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "brizzle.png";
            weatherCondition.innerHTML = data.weather[0].description;
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "mist.png";
            weatherCondition.innerHTML = data.weather[0].description;
        }

}

searchBtn.addEventListener("click", ()=> {
    checkWeather(searchBox.value);
    getForecast(searchBox.value);
});
searchBox.addEventListener("keydown", (event)=>{
if(event.key === "Enter"){
    checkWeather(searchBox.value);
    getForecast(searchBox.value);
}
});

// checkWeather(city);
navigator.geolocation.getCurrentPosition(
(position)=>{

getWeatherByLocation(
position.coords.latitude,
position.coords.longitude
);

},
()=> {
    document.querySelector(".weather").style.display = "none";
}
);
