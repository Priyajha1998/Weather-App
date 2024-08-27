const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIKey = '160e61a408aeba02c20d2b4e3e12cb9c';
    const city = document.querySelector('.search-box input').value.trim();

    if (!city) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent === city) {
                return;
            } else {
                cityHide.textContent = city;
                container.style.height = '555px';
                container.classList.add('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');

                // Clear previous clones if any
                document.querySelectorAll('#clone-info-weather, #clone-info-humidity, #clone-info-wind')
                    .forEach(el => el.remove());

                // Update the weather data
                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/clear.jpg';
                        break;
                    case 'Rain':
                        image.src = 'images/rain.jpg';
                        break;
                    case 'Snow':
                        image.src = 'images/snow.jpg';
                        break;
                    case 'Clouds':
                        image.src = 'images/cloud.jpg';
                        break;
                    case 'Mist':
                    case 'Haze':
                        image.src = 'images/mist.jpg';
                        break;
                    default:
                        image.src = 'images/cloud.jpg';
                }

                temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
                description.textContent = json.weather[0].description;
                humidity.textContent = `${json.main.humidity}%`;
                wind.textContent = `${Math.round(json.wind.speed)}Km/h`;

                // Clone and animate elements
                const infoWeather = document.querySelector('.info-weather');
                const infoHumidity = document.querySelector('.info-humidity');
                const infoWind = document.querySelector('.info-wind');

                const elCloneInfoWeather = infoWeather.cloneNode(true);
                const elCloneInfoHumidity = infoHumidity.cloneNode(true);
                const elCloneInfoWind = infoWind.cloneNode(true);

                elCloneInfoWeather.id = 'clone-info-weather';
                elCloneInfoWeather.classList.add('active-clone');
                elCloneInfoHumidity.id = 'clone-info-humidity';
                elCloneInfoHumidity.classList.add('active-clone');
                elCloneInfoWind.id = 'clone-info-wind';
                elCloneInfoWind.classList.add('active-clone');

                // Insert cloned elements and set timeouts for removal
                setTimeout(() => {
                    infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                    infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                    infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
                }, 2200);

                // Remove cloned elements after animation
                setTimeout(() => {
                    document.querySelectorAll('#clone-info-weather, #clone-info-humidity, #clone-info-wind')
                        .forEach(el => el.remove());
                }, 4700);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            // Optional: Handle network errors or issues gracefully
        });
});
