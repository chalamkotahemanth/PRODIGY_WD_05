document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '58b57e3736490ab0efdb62a815042d3f'; // Replace with your weather API k
    const weatherInfo = document.getElementById('weather-info');
    const locationInput = document.getElementById('location-input');
    const searchButton = document.getElementById('search-button');
    const currentLocationButton = document.getElementById('current-location-button');

    searchButton.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            fetchWeatherData(location);
        }
    });

    currentLocationButton.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherDataByCoords(latitude, longitude);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });

    function fetchWeatherData(location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => displayWeatherData(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function fetchWeatherDataByCoords(latitude, longitude) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => displayWeatherData(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function displayWeatherData(data) {
        if (data.cod === 200) {
            weatherInfo.innerHTML = `
                <h2>Weather in ${data.name}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
        } else {
            weatherInfo.innerHTML = `<p>${data.message}</p>`;
        }
    }
});
