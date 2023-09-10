// Define a constant for the API key to access OpenWeatherMap's API
const apiKey = "17c217eb87e1e62fc400a04808b0be98";

// Wait until the entire HTML document is loaded before executing the script
document.addEventListener("DOMContentLoaded", function() { 

  // Obtain a reference to the search button element by its ID
  const searchBtn = document.getElementById("searchBtn"); // Find the button

  // Attach a click event listener to the search button
  searchBtn.addEventListener("click", function() { 

    // Retrieve the value entered in the city input field
    const cityName = document.getElementById("cityInput").value;

    // Fetch weather data using OpenWeatherMap's API for the entered city
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`)
      .then(response => response.json()) // Parse the API response as JSON
      .then(data => {

        // Extract the relevant weather information from the API response
        const cityName = data.city.name;
        const temperature = data.list[0].main.temp;
        const windSpeed = data.list[0].wind.speed;
        const humidity = data.list[0].main.humidity;

        // Update the HTML content of the "cityData" element with the fetched weather information
        document.getElementById("cityData").innerHTML = `
          City name: ${cityName} <br>
          Temp: ${temperature} F<br>
          Wind: ${windSpeed} MPH<br>
          Humidity: ${humidity}%
        `;
      })
      .catch(error => console.error("Something went wrong:", error)); // Log any errors to the console
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
