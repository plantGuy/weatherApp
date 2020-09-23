const weatherForm = document.querySelector("form");
const search = document.getElementById("location");

var url = "/JSON/weather";

function getWeather(param, next) {
  console.log(`searching for ${param}`);
  fetch(`/JSON/weather?location=${param}`)
    .then((response) => response.json())
    .then((data) => {
      return next(data);
    });
}

async function main(search = "crozet") {
  console.log(search);
  getWeather(
    search,
    ({ placeName, description, temperature, feelslike, error }) => {
      const err = document.querySelector("#error");
      if (error) {
        err.textContent = `Error: ${error}`;
      } else {
        err.textContent = "";
        city = document.querySelector("#city");
        city.textContent = `Weather for ${placeName}`;
        document.getElementById(
          "results"
        ).innerHTML = `It is ${description} and ${temperature}.  It feels like ${feelslike}`;
      }
    }
  );
}

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("results").innerHTML = "Getting weather...";

  main(search.value);
  console.log(weatherForm);
  return false;
});
//main();
