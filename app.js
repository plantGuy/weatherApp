const geocode = require("./utils/geocode");
const chalkRainbow = require("chalk-rainbow");
const getWeather = require("./utils/weather");



async function main() {
  //getLocation("Crozet", getWeather);
  if (process.argv[2]) {
    var location = process.argv[2];

    console.log(location);
    geocode(location, (error, { lat, long, placeName }) => {
      if (error) {
        console.log("Error");
      } else {
        getWeather(lat, long, (error, data) => {
          if (error) {
            console.log(error);
          } else {
            console.log(placeName);
            console.log(data);
          }
        });
      }
    });
  } else {
    console.log("please provide a location");
  }
}

//geocoding
//Address -> Lat/long -> Weather

main();
