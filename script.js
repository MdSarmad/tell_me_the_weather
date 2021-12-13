const cityForm = document.querySelector('form');
const card = document.querySelector('.weather-bdy-container');
const details = document.querySelector('.weather-info');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    const cityDets = data.cityDets;
    const weather = data.weather;

    details.innerHTML = `
                <h5 class="weather-info-text city-name">${cityDets.EnglishName}</h5>
                <div class="weather-info-text weather-condition">${weather.WeatherText}</div>
                <div class="display-temp">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>`;

                // remove the d-none class if present
                if(card.classList.contains('d-none')){
                    card.classList.remove('d-none');
                }

                // update the night/day & icon images

                const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
                icon.setAttribute('src',iconSrc);

                let timeSrc = null;
                if(weather.IsDayTime){
                    timeSrc = './img/day.jpg';
                }else{
                    timeSrc = './img/night.jpg';
                }
                time.setAttribute('src',timeSrc);
}



const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {cityDets,weather};
}

cityForm.addEventListener('submit',e=>{
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // Update the UI with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));


})

