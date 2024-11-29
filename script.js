const apiUrl = "https://weatherapp-mauve-theta.vercel.app/api/weather"; // URL to the Vercel serverless function

const search = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  // Fetch weather data from the serverless function (Vercel API endpoint)
  const response = await fetch(`${apiUrl}?location=${city}`);

  if (response.status == "404") {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();

    if (data.error) {
      document.querySelector(".error").innerHTML = data.error;
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      document.querySelector(".desc").innerHTML = data.weather[0].description;
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

      // Update weather icon based on weather conditions
      if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/sunny.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/cloudy.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png";
      }

      document.querySelector(".error").style.display = "none";
      document.querySelector(".weather").style.display = "block";
    }
    console.log(data);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(search.value);
});
