function reload() {
    window.location.reload()
}

function goBack() {
    window.location = "index.html"
}

const fetchWeather = async (query) => {
    try {
        const query = document.querySelector(".city-input").value;
        if (!query) {
            alert('Please enter a city.');
            return;
        }
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=8d6454a89dff871786a0307b0dbebbee&units=metric`)
        if (!response.ok) {
            alert("Sorry no data found!!! Try something else");
        }
        const data = await response.json()
        console.log(data);
        const fetchCity = data
        console.log(fetchCity);
        result.innerHTML = `<div class="city-date d-flex flex-column align-items-center justify-content-center">
                    <h2 class="city">${fetchCity.name}</h2>
                    <p class="date"></p>
                </div>
                <div class="temp-info d-flex flex-column align-items-center justify-content-center">
                    <div class="description d-flex align-items-center justify-content-center">
                        <i class="fa-solid fa-"></i>
                        <span class="description-text text-capitalize">${fetchCity.weather[0].description}</span>
                    </div>
                    <div class="temp">${Math.round(fetchCity.main.temp)}&#8451</div>
                </div>
                <div class="more-info d-flex justify-content-around">
                    <div class="wind-info d-flex flex-column align-items-center justify-content-center">
                        <i class="fa-solid fa-wind"></i>
                        <div class="text-center">
                            <h3 class="wind-speed">${fetchCity.wind.speed}&nbsp;km/h</h3>
                            <p class="wind-label">Wind</p>
                        </div>
                    </div>
                    <div class="humidity-info d-flex flex-column align-items-center justify-content-center">
                        <i class="fa-solid fa-droplet"></i>
                        <div class="text-center">
                            <h3 class="humidity">${fetchCity.main.humidity}&nbsp;&percnt;</h3>
                            <p class="humidity-label">Humidity</p>
                        </div>
                    </div>
                    <div class="visibility-info d-flex flex-column align-items-center justify-content-center">
                        <i class="fa-solid fa-eye"></i>
                        <div class="text-center">
                            <h3 class="visibility-dist">${fetchCity.visibility / 1000}&nbsp;km</h3>
                            <p class="visibility">Visibility</p>
                        </div>
                    </div>
                </div>`
        const date = document.querySelector(".date");
        const currentDate = new Date();
        date.textContent = currentDate.toDateString();
        const descriptionIcon = document.querySelector(".description i")
        const weatherIcon = getWeatherIcon(fetchCity.weather[0].main)
        descriptionIcon.innerHTML = `<i class="fa-solid fa-${weatherIcon}"></i>`
    } catch (err) {
        console.log();
    }
}
function getWeatherIcon(weatherCondition) {
    const iconMap = {
        Clear: "sun",
        Clouds: "cloud",
        Rain: "umbrella",
        Thunderstorm: "bolt-lightning",
        Drizzle: "cloud-rain",
        Snow: "snowflake",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "smog",
    };
    return iconMap[weatherCondition] || "help";
}
