require('dotenv').config();

// First, we save the city name and API key in variables. Like putting your lunch in a lunchbox!
const cityName = "CITY_NAME";
const apiKey = process.env.API_KEY;

// Then we ask the OpenWeatherMap for weather info for that city.
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`)
  .then(response => response.json())  // Once we get a reply, we read the info they sent back.
  .then(data => {
    console.log(data);  // We can check the whole info in the console.

    // Here's how to find the latitude and longitude in the info.
    const lat = data.city.coord.lat;
    const lon = data.city.coord.lon;

    // Now you can use these for anything else you want!
  })
  .catch(error => console.error("Something went wrong:", error));  // If something goes wrong, we'll see an error message.


  document.addEventListener("DOMContentLoaded", function() {
    // Find the button element on the page
    const searchBtn = document.getElementById("searchBtn");

    document.getElementById("presetCityBtn").addEventListener("click", function() {
        // Set the input field value to Austin
        document.getElementById("cityInput").value = "Austin";
      
        // Now trigger the search button's click event to fetch weather data
        document.getElementById("searchBtn").click();
      });
  
    // Listen for a click on the button
    searchBtn.addEventListener("click", function() {
      // Find out what city name was typed into the input field
      const cityName = document.getElementById("cityInput").value;
      const apiKey = "17c217eb87e1e62fc400a04808b0be98";
  
      // Ask OpenWeatherMap for the weather in that city
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`)

        .then(response => response.json())
        .then(data => {
          console.log(data);
  
          // Grabbing the weather details
          const cityName = data.city.name;
          const temperature = data.list[0].main.temp;  // This is in Farenheight
          const windSpeed = data.list[0].wind.speed;  // This is in miles per hour
          const humidity = data.list[0].main.humidity; // This is a percentage
  
          // Updating the #cityData div
          document.getElementById("cityData").innerHTML = `
            City name: ${cityName} <br>
            Temp: ${temperature} F<br>
            Wind: ${windSpeed} MPH<br>
            Humidity: ${humidity}%
          `;
        })
        .catch(error => console.error("Something went wrong:", error));
    });
  });
  