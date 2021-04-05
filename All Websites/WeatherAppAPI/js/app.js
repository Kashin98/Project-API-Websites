// Select Elements
const weatherForm = document.getElementById("weatherForm");
const city = document.querySelector(".cityInput");
const feedback = document.querySelector(".feedback");
const resultShow = document.querySelector(".results");
const cardBG = document.querySelector(".card");
const weatherType = document.querySelector(".weatherType");

// I used classes in this project to just remember everything I learnt about classes. No other reason
// Class get API JSON
class GetAPIJSON {
  constructor() {
    this.apiKey = "7be898a3f864a98d5cb722e4f96ba290";
  }

  async apiGetCall(city) {
//     Had to use https://cors-anywhere.herokuapp.com/ since the requests from openweather are http requests and https requests requires a subscription.
    const url = `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;
    const results = await fetch(url);
    const resultData = await results.json();
    return resultData;
  }
}

// class Display results
class DisplayData {
  constructor() {
    this.cityName = document.getElementById("cityName");
    this.country = document.getElementById("cityCountry");
    this.icon = document.getElementById("cityIcon");
    this.temp = document.getElementById("cityTemp");
    this.humid = document.getElementById("cityHumidity");
  }
  displayResults(data) {
    const {
      name,
      sys: { country },
      main: { temp, humidity },
    } = data;
    const { main, icon } = data.weather[0];

    // Displaying data
    console.log(main);
    resultShow.classList.add("showItem");
    this.cityName.textContent = name;
    this.country.textContent = country;
    this.icon.src = `http://openweathermap.org/img/w/${icon}.png`;
    this.temp.textContent = `${(temp - 273).toFixed(0)} ° C`;
    this.humid.textContent = humidity;

    // All Wallpapers from - https://www.vexels.com/
    // Change Background (Awful code, chaining if else statements like a madman)
    if (main === "Snow") {
      document.body.style.background =
        "url(./img/snow.jpg) bottom fixed no-repeat";
      cardBG.style.background = "#7faaeb93";
      weatherType.textContent = `Snowing in ${name}`;
    } else if (
      main === "Rain" ||
      main === "Thunderstorm" ||
      main === "Drizzle"
    ) {
      document.body.style.background =
        "url(./img/rain.jpg) center fixed no-repeat";
      cardBG.style.background = "#24e9c886";
      weatherType.textContent = `Raining in ${name}`;
    } else if (main === "Clouds") {
      document.body.style.background =
        "url(./img/clouds.jpg) center fixed no-repeat";
      cardBG.style.background = "#24e9c886";
      weatherType.textContent = `Cloudy in ${name}`;
    } else if (main === "Clear") {
      document.body.style.background =
        "url(./img/clear.jpg) center fixed no-repeat";
      cardBG.style.background = "#ffd166a2";
      weatherType.textContent = `Clear Skies in ${name}`;
    } else {
      document.body.style.background =
        "url(./img/defaultBG.jpg) center fixed no-repeat";
      weatherType.textContent = `${main}y in ${name}`;
    }
  }
}

(function () {
  weatherForm.addEventListener("submit", submitData);

  const cityData = new GetAPIJSON();
  const showCityData = new DisplayData();

  // Submit Input Data
  function submitData() {
    event.preventDefault();
    const cityValue = city.value;
    cityValue === ""
      ? feedbackData("Enter A city")
      : cityData
          .apiGetCall(cityValue)
          .then((data) => {
            data.message === "city not found"
              ? feedbackData("This City Is not available")
              : showCityData.displayResults(data);
          })
          .catch((error) => console.log(error));
  }

  // Feedback for empty data
  function feedbackData(text) {
    feedback.textContent = text;
    feedback.classList.add("showItem");
    setTimeout(() => {
      feedback.classList.remove("showItem");
    }, 3000);
  }
})();
