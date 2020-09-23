const request = require("postman-request");
const APIAccessKeyGC =
  "pk.eyJ1IjoibG1tNm4iLCJhIjoiY2tjNHZpZHI1MDZ4MDJ4bjFxdGllMWRmbSJ9.8XMbmcU9LP0hUDwd4-K68Q";
var urlGeocode = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const getLocation = (searchStr, callback) => {
  //const searchStr = 'Crozet'

  url = `${urlGeocode}${encodeURIComponent(searchStr)}.json`;
  console.log(url);
  request(
    {
      url: url,
      json: true,
      qs: {
        access_token: APIAccessKeyGC,
        limit: 1,
      },
    },
    (error, { body }) => {
      if (error) {
        callback("unable to connect to location services", undefined);
      } else if (body.error) {
        callback(body.error, undefined);
      } else if (body.features.length === 0) {
        callback("no results", undefined);
      } else {
        var Coord = { lat: "", long: "" };

        Coord.lat = body.features[0].center[1];
        Coord.long = body.features[0].center[0];
        Coord.placeName = body.features[0].place_name;
        console.log(Coord);

        return callback(undefined, Coord);
      }
    }
  );
};

module.exports = getLocation;
