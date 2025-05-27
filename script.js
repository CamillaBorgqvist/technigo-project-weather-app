// url for todays weather in Stockholm  https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=9fa3f19508599582ebd3a493bc9ef0e7
// url for forcast for Stockholm https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=9fa3f19508599582ebd3a493bc9ef0e7

const weatherImg = document.getElementById("weather-img")
const temperature = document.getElementById("temperature")
const city = document.getElementById("city")
const description = document.getElementById("description")


const day = document.getElementById("day")
const highestTemp = document.getElementById("highest-temp")
const lowestTemp = document.getElementById("lowest-temp")

//getting the data for today
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

    .catch(error => {
            console.error("Något gick fel:", error);
            document.getElementById("temperature").textContent = "Fel vid hämtning";
        });
    
}

fetchTodaysWeather()

//getting the forcast data. 
// want to show the max and mid temp througt a day so chose to group the data per day to do this 
const fetchForcast = document.querySelectorAll('.daily-forcast');

fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=9fa3f19508599582ebd3a493bc9ef0e7")
  .then(response => response.json())
  .then(data => {
    const groupeDays = {};

    // group the weather forecasts per day
    data.list.forEach(forecast => {
      const date = forecast.dt_txt.split(' ')[0];
      if (!groupeDays[date]) {
        groupeDays[date] = [];
      }
      groupeDays[date].push(forecast);
    });

    // get data for the first 5 days
    const days = Object.keys(groupeDays).slice(0, fetchForcast.length); //return an array with dates, only as many as I have made space for in my html

    days.forEach((date, index) => {
      const forecasts = groupeDays[date];

      let minTemp = Infinity;
      let maxTemp = -Infinity;
      let iconCode = "";

      //finds every days min and max temp by going through the data that has been grouped in the arrays 
      forecasts.forEach(f => {
        if (f.main.temp_min < minTemp) minTemp = f.main.temp_min;
        if (f.main.temp_max > maxTemp) maxTemp = f.main.temp_max;

        // Use the icon at 12.00
        if (f.dt_txt.includes("12:00:00")) {
          iconCode = f.weather[0].icon;
        }
      });

      //if no icon at 12.00 is found
      if (!iconCode) {
        iconCode = forecasts[0].weather[0].icon;
      }

      //add to HTML
      const container = fetchForcast[index];
      const dayName = new Date(date).toLocaleDateString("en-US", { weekday: 'short' });

      container.querySelector('.day').textContent = dayName;
      container.querySelector('.highest-temp').textContent = `${Math.round(maxTemp)}°C`;
      container.querySelector('.lowest-temp').textContent = `${Math.round(minTemp)}°C`;
      container.querySelector('.weather-img').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    });
  });

  fetchForcast ()