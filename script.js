// Define a constant for the API key
const apiKey = "17c217eb87e1e62fc400a04808b0be98";

// Wait until the HTML document is loaded
document.addEventListener("DOMContentLoaded", function() { 
  const searchBtn = document.getElementById("searchBtn");

  // When you click the search button, this code will run
  searchBtn.addEventListener("click", function() { 
    const cityName = document.getElementById("cityInput").value;

    // This is like asking a magic weather website for the 5-day forecast
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        updateFiveDayForecast(data);

        const lat = data.city.coord.lat;
        const lon = data.city.coord.lon;

        // Now we ask the magic weather website for the weather right now
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
      })
      .then(response => response.json())
      .then(currentData => {
        updateCurrentWeather(currentData, cityName);
      })
      .catch(error => console.error("Something went wrong:", error));
  });

  const presetButtons = document.querySelectorAll(".preset-city-btn");
  
  presetButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const presetCity = this.getAttribute("data-city");
      document.getElementById("cityInput").value = presetCity;
      searchBtn.click();
    });
  });
});

function updateFiveDayForecast(data) {
  for (let i = 1; i <= 5; i++) {
    const dayData = data.list[i];
    const formattedDate = new Date(dayData.dt_txt).toLocaleDateString();
    const weatherEmoji = `<img src="http://openweathermap.org/img/wn/${dayData.weather[0].icon}.png">`;
    const temperature = dayData.main.temp;
    const windSpeed = dayData.wind.speed;
    const humidity = dayData.main.humidity;

    document.getElementById(`day${i + 1}`).innerHTML = `
      Date: ${formattedDate}<br>
      ${weatherEmoji}<br>
      Temp: ${temperature} F<br>
      Wind: ${windSpeed} MPH<br>
      Humidity: ${humidity}%
    `;
  }
}

function updateCurrentWeather(currentData, cityName) {
  const currentTemperature = currentData.main.temp;
  const currentWindSpeed = currentData.wind.speed;
  const currentHumidity = currentData.main.humidity;

  document.getElementById("cityData").innerHTML = `
    ${cityName}<br>
    Temp: ${currentTemperature} F<br>
    Windspeed: ${currentWindSpeed} MPH<br>
    Humidity: ${currentHumidity}%<br>
    Date: ${new Date().toLocaleDateString()}<br>
  `;
}
