const apiKey = "17c217eb87e1e62fc400a04808b0be98";

document.addEventListener("DOMContentLoaded", function() { 
  const searchBtn = document.getElementById("searchBtn"); // Find the button

  // Listen for a click on the search button
  searchBtn.addEventListener("click", function() { 

    // What city was typed into the input field? Let's find out!
    const cityName = document.getElementById("cityInput").value;

    // Request weather data by city
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {

        // Grab the info we want to know about the weather
        const cityName = data.city.name;
        const temperature = data.list[0].main.temp;
        const windSpeed = data.list[0].wind.speed;
        const humidity = data.list[0].main.humidity;

        // Put this info on our webpage!
        document.getElementById("cityData").innerHTML = `
          City name: ${cityName} <br>
          Temp: ${temperature} F<br>
          Wind: ${windSpeed} MPH<br>
          Humidity: ${humidity}%
        `;
      })
      .catch(error => console.error("Something went wrong:", error));
  });

  // preset buttons
  const presetButtons = document.querySelectorAll(".preset-city-btn");
  
  presetButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const presetCity = this.getAttribute("data-city");
      document.getElementById("cityInput").value = presetCity;
      searchBtn.click(); // This will trigger the above search button click event
    });
  });

});
