const request = require("postman-request");

const APIAccessKeyWS = "6446a311551e975d190124f3cf930923";

var urlWeather = "http://api.weatherstack.com/current";

const getWeather = (Lat, Long, callback) => {
  request(
    {
      url: urlWeather,
      json: true,
      qs: {
        access_key: APIAccessKeyWS,
        query: Lat + "," + Long,
        units: "f",
      },
    },
    (error, { body }) => {
      if (error) {
        callback(error, undefined);
      } else if (body.error) {
        callback(body.error, undefined);
      } else {
        console.log(body);
        //[temperature, feelslike, weather_descriptions] = body.current;
        //console.log(response.body.current);
        //var current = response.body.current;
        let weather = {
          temperature: body.current.temperature,
          description: body.current.weather_descriptions[0],
          feelslike: body.current.feelslike,
        };

        //var weather = `It is currently ${body.current.temperature} degrees out and ${body.current.weather_descriptions[0]} and it feels like ${body.current.feelslike} degrees`;

        callback(undefined, weather);
      }
    }
  );
};

module.exports = getWeather;
