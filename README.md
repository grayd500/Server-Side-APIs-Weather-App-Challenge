## Weather Dashboard

## Description

The Weather Dashboard is a web application that allows travelers to check the weather outlook for multiple cities. It provides both current and future weather conditions for a selected city and maintains a search history for easy access.

### Motivation

The motivation behind this project is to assist travelers in planning their trips effectively by providing them with up-to-date weather information for their destination cities.

### Problem Solved

The Weather Dashboard solves the problem of quickly accessing weather data for multiple cities, helping travelers make informed decisions about their travel plans.

### What I Learned

While building this project, I learned how to use third-party APIs to retrieve weather data, work with localStorage to store user data, and dynamically update HTML and CSS to display the information effectively.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

To run this project locally, follow these steps:

1. Clone the repository to your local machine.
2. Open the project folder in your code editor.
3. Obtain an API key from OpenWeatherMap (follow their documentation).
4. Create a `config.js` file in the project root and store your API key there:

   ```javascript
   // config.js
   const API_KEY = 'your_api_key_here';

   ```markdown
Save the file and run the project using a development server (e.g., Live Server for Visual Studio Code).

## Usage

1. Open the Weather Dashboard in your web browser.
2. Enter the name of the city you want to check the weather for in the search input.
3. Click the "Search" button.
4. You will be presented with current and future weather conditions for the selected city.
5. The city will be added to the search history for easy access.

![Weather Dashboard Screenshot](/images/weatherAppSample.png)

## Credits

- This project was created by [Your Name].
- Third-party assets used in this project:
  - [OpenWeatherMap API](https://openweathermap.org/api)
- References and tutorials:
  - [Full-Stack Blog on how to use API keys](https://example.com/api-key-tutorial)
- This project makes use of the following third-party libraries:
- [jQuery](https://jquery.com/)
- [Bootstrap](https://getbootstrap.com/)

We would like to express our gratitude to the developers of jQuery and Bootstrap for their valuable contributions to web development.

  

## License

This project is licensed under the MIT License.
