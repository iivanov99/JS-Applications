const domElements = {
    locationInput: document.querySelector('#location'),
    getWeatherElement: document.querySelector('#submit'),
    forecastDiv: document.querySelector('#forecast'),
    currentConditionsDiv: document.querySelector('#forecast #current'),
    currentCoditionsLabel: document.querySelector('#forecast #current div.label'),
    upcomingForecastDiv: document.querySelector('#forecast #upcoming'),
    contentDiv: document.querySelector('#content')
};

const weatherSymbols = {
    'Sunny': '☀',
    'Partly sunny': '⛅',
    'Overcast': '☁',
    'Rain': '☂',
    'Degrees': '°'
};

const clearInput = () => domElements.locationInput.value = '';

const findLocation = (locations) => {
    const locationFound = locations.find(loc => loc.name === domElements.locationInput.value);
    clearInput();

    if (!locationFound) {
        throw new Error('Invalid location input!');
    }

    return locationFound;
};

const appendCurrentConditions = (location) => {
    fetch(`https://judgetests.firebaseio.com/forecast/today/${location.code}.json`)
        .then(response => response.json())
        .then(forecastInfo => {
            domElements.currentConditionsDiv.innerHTML = '<div class="label">Current conditions</div>';

            const div = document.createElement('div');
            div.classList.add('forecasts');

            const conditionSymbolSpan = document.createElement('span');
            conditionSymbolSpan.classList.add('condition');
            conditionSymbolSpan.classList.add('symbol');
            conditionSymbolSpan.textContent = weatherSymbols[forecastInfo.forecast.condition];

            const conditionSpan = document.createElement('span');
            conditionSpan.classList.add('condition');

            const forecastLocNameSpan = document.createElement('span');
            forecastLocNameSpan.classList.add('forecast-data');
            forecastLocNameSpan.textContent = forecastInfo.name;

            const forecastDegreesSpan = document.createElement('span');
            forecastDegreesSpan.classList.add('forecast-data');
            forecastDegreesSpan.textContent = `${forecastInfo.forecast.low}${weatherSymbols.Degrees}/${forecastInfo.forecast.high}${weatherSymbols.Degrees}`;

            const forecastConditionSpan = document.createElement('span');
            forecastConditionSpan.classList.add('forecast-data');
            forecastConditionSpan.textContent = forecastInfo.forecast.condition;

            conditionSpan.appendChild(forecastLocNameSpan);
            conditionSpan.appendChild(forecastDegreesSpan);
            conditionSpan.appendChild(forecastConditionSpan);

            div.appendChild(conditionSymbolSpan);
            div.appendChild(conditionSpan);

            domElements.currentConditionsDiv.appendChild(div);
        });
};

const appendUpcomingConditions = (location) => {
    fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${location.code}.json`)
        .then(response => response.json())
        .then(upcomingForecast => {
            domElements.upcomingForecastDiv.innerHTML = '<div class="label">Three-day forecast</div>';
            
            const forecastInfoDiv = document.createElement('div');
            forecastInfoDiv.classList.add('forecast-info');

            upcomingForecast.forecast.forEach(forecastInfo => {
                const upcomingWeatherSpan = document.createElement('span');
                upcomingWeatherSpan.classList.add('upcoming')

                const upcomingWeatherSymbolSpan = document.createElement('span');
                upcomingWeatherSymbolSpan.classList.add('symbol');
                upcomingWeatherSymbolSpan.textContent = weatherSymbols[forecastInfo.condition];


                const upcomingDegreesSpan = document.createElement('span');
                upcomingDegreesSpan.classList.add('forecast=data');
                upcomingDegreesSpan.textContent = `${forecastInfo.low}${weatherSymbols.Degrees}/${forecastInfo.high}${weatherSymbols.Degrees}`;

                const upcomingConditionSpan = document.createElement('span');
                upcomingConditionSpan.classList.add('forecast=data');
                upcomingConditionSpan.textContent = forecastInfo.condition;

                upcomingWeatherSpan.appendChild(upcomingWeatherSymbolSpan);
                upcomingWeatherSpan.appendChild(upcomingDegreesSpan);
                upcomingWeatherSpan.appendChild(upcomingConditionSpan);

                forecastInfoDiv.appendChild(upcomingWeatherSpan);
            });

            domElements.upcomingForecastDiv.appendChild(forecastInfoDiv);
        });
}

const displayWeather = () => {
    const url = 'https://judgetests.firebaseio.com/locations.json';

    fetch(url)
        .then(response => response.json())
        .then(locations => findLocation(locations))
        .then(location => {
            domElements.forecastDiv.style.display = 'block';
            appendCurrentConditions(location);
            appendUpcomingConditions(location);
        })
        .catch(err => {
            console.log('To Do Error...');
        });
}

(function attachEvents() {
    domElements.getWeatherElement.addEventListener('click', displayWeather);
})();