const request = require("postman-request");

const APIAccessKeyWS = "6446a311551e975d190124f3cf930923";

///var urlWeather = "http://api.weatherstack.com/current";
var urlWeather = "https://api.weather.gov/points/";

const getWeather = (Lat, Long, callback) => {
  request(
    {
      url: `${urlWeather}${Lat},${Long}`,
      json: true,
      headers: {
        "User-Agent": "https://murray-weatherapp.herokuapp.com",
      },
      // qs: {
      //   "User-Agent": "murrayweatherapp-test",
      //   //access_key: APIAccessKeyWS,
      //   //query: Lat + "," + Long,
      //   //units: "f",
      // },
    },
    (error, { body }) => {
      if (error) {
        callback(error, undefined);
      } else if (body.error) {
        callback(body.error, undefined);
      } else {
        console.log(body);
        request(
          {
            url: body.properties.forecast,
            json: true,
            headers: {
              "User-Agent": "https://murray-weatherapp.herokuapp.com",
            },
          },
          (error, { body }) => {
            const forcast = body.properties.periods[0];
            console.log(body.properties.periods[0]);
            let weather = {
              temperature: forcast.temperature,
              description: forcast.detailedForecast,
              feelslike: forcast.temperature,
            };
            //var weather = `It is currently ${body.current.temperature} degrees out and ${body.current.weather_descriptions[0]} and it feels like ${body.current.feelslike} degrees`;

            callback(undefined, weather);
          }
        );
        //[temperature, feelslike, weather_descriptions] = body.current;
        //console.log(response.body.current);
        //var current = response.body.current;
      }
    }
  );
};

module.exports = getWeather;
