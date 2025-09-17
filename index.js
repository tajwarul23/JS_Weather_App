document.addEventListener("DOMContentLoaded", () => {
  //grabbing all elements
  let city_input = document.querySelector("#city-input");
  let get_btn = document.querySelector("#get-weather-btn");
  let weather_info = document.querySelector("#weather-info");
  let city_name = document.querySelector("#city-name");
  let temperature = document.querySelector("#temperature");
  let description = document.querySelector("#description");
  let error_msg = document.querySelector("#error-message");
  let feels = document.querySelector("#feels_like");
  const api_key = "0fed104635befd3e726f9602d5d91255";

  get_btn.addEventListener("click", async () => {
    let city = city_input.value.trim();
    if (!city) return;

    //it may throw an error => try catch
    //server/db is always in another continent

    try {
      let weatherApi = await fetchData(city);
      displayData(weatherApi);
    } catch (error) {
      showError();
    }
  });

  async function fetchData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
    let response = await fetch(url);

    if (!response.ok) throw new Error("City Not Found!");
    let data = await response.json();
    return data;
  }

  function displayData(data) {
    const { name, main, weather } = data;
    console.log(weather[0].description);

    city_name.textContent = `City : ${name}`;
    error_msg.classList.add("hidden");
    temperature.textContent = `Temperature : ${main.temp}`;
    feels.textContent = `Feels Like : ${main.feels_like}`;
    description.textContent = `Weather : ${weather[0].description}`;
  }

  function showError() {
    weather_info.classList.add("hidden");
    error_msg.classList.remove("hidden");
  }
});
