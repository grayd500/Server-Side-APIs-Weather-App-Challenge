// Define a constant for the API key to access OpenWeatherMap's API
const apiKey = "17c217eb87e1e62fc400a04808b0be98";

// Wait until the entire HTML document is loaded before executing the script
document.addEventListener("DOMContentLoaded", function() { 

  // Obtain a reference to the search button element by its ID
  const searchBtn = document.getElementById("searchBtn");

  // Attach a click event listener to the search button
  searchBtn.addEventListener("click", function() { 

    // Retrieve the value entered in the city input field
    const cityName = document.getElementById("cityInput").value;

    // Fetch weather data using OpenWeatherMap's API for the entered city
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {

        // Extract the relevant weather information from the API response
        for (let i = 1; i <= 5; i++) {
          const dayData = data.list[i];
          // Extract Date - it will be in a format like "2022-01-25 15:00:00"
          const rawDate = new Date(dayData.dt_txt);
          const formattedDate = `${rawDate.getMonth() + 1}/${rawDate.getDate()}/${rawDate.getFullYear()}`;

          // Extract Weather Emoji
          const weatherIconCode = dayData.weather[0].icon;
          const weatherEmoji = `<img src="http://openweathermap.org/img/wn/${weatherIconCode}.png">`;
          const temperature = dayData.main.temp;
          const windSpeed = dayData.wind.speed;
          const humidity = dayData.main.humidity;

          // Update one of the divs for the 5-day forecast
          document.getElementById(`day${i + 1}`).innerHTML = `
            Date: ${formattedDate}<br>
            ${weatherEmoji}<br>
            Temp: ${temperature} F<br>
            Wind: ${windSpeed} MPH<br>
            Humidity: ${humidity}%
          `;
        }

        // Get latitude and longitude from the 5-day forecast data
        const lat = data.city.coord.lat;
        const lon = data.city.coord.lon;

        // Now fetch current weather using these latitude and longitude
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
          .then(response => response.json())
          .then(currentData => {
            // Process the current weather data

            // Extract current weather information
            const currentTemperature = currentData.main.temp;
            const currentWindSpeed = currentData.wind.speed;
            const currentHumidity = currentData.main.humidity;

            // Update the HTML content of the "cityData" element with the fetched current weather information
            document.getElementById("cityData").innerHTML = `
              City name: ${cityName} <br>
              Temp: ${currentTemperature} F<br>
              Wind: ${currentWindSpeed} MPH<br>
              Humidity: ${currentHumidity}%
            `;
          })
          .catch(error => console.error("Something went wrong in current weather fetch:", error));
      })
      .catch(error => console.error("Something went wrong:", error));
  });

  // Obtain references to all buttons with the "preset-city-btn" class
  const presetButtons = document.querySelectorAll(".preset-city-btn");
  
  // Attach click event listeners to each preset city button
  presetButtons.forEach(function(button) {
    button.addEventListener("click", function() {

      // Retrieve the data-city attribute's value from the clicked button
      const presetCity = this.getAttribute("data-city");

      // Update the city input field with the value of the clicked preset city button
      document.getElementById("cityInput").value = presetCity;

      // Programmatically click the search button to fetch and display weather info for the preset city
      searchBtn.click(); // This will trigger the above search button click event
    });
  });

});
