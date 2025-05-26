// url for todays weather in Stockholm  https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=9fa3f19508599582ebd3a493bc9ef0e7
// url for forcast for Stockholm

const weatherImg = document.getElementById("weather-img")
const temperature = document.getElementById("temperature")
const city = document.getElementById("city")
const description = document.getElementById("description")


const day = document.getElementById("day")
const highestTemp = document.getElementById("highest-temp")
const lowestTemp = document.getElementById("lowest-temp")


const fetchTodaysWeather = () => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=9fa3f19508599582ebd3a493bc9ef0e7")
    .then ((response) => response.json())
    .then ((data) => {
        const temp = Math.round(data.main.temp * 10) / 10; //round temp to 1 decimal
        document.getElementById("temperature").textContent = temp + " °C";
        document.getElementById("city").textContent = data.name;
        document.getElementById("description").textContent = data.weather[0].description;

        const iconCode = data.weather[0].icon;
        document.getElementById("weather-img").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        //convert to date and readable time 
        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunset = new Date(data.sys.sunset * 1000);

        document.getElementById("sunrise").textContent = sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById("sunset").textContent = sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    })
    
};


fetchTodaysWeather()