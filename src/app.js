const path = require("path");

const express = require("express");
const hbs = require("hbs");
const { registerHelper } = require("hbs");
const port = process.env.PORT || 3000;
const app = express();

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

//define path for handlebars location

const geocode = require("../utils/geocode");
const chalkRainbow = require("chalk-rainbow");
const getWeather = require("../utils/weather");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//define path for static directy
app.use(express.static(path.join(__dirname, "../public")));

app.get("/JSON/weather", (req, res) => {
  if (req.query.location) {
    var search = req.query.location;

    geocode(search, (error, { lat, long, placeName }) => {
      if (error) {
        console.log("Error");
      } else {
        getWeather(lat, long, (error, data) => {
          if (error) {
            res.json({ error: error });
          } else {
            //console.log(placeName);
            data.placeName = placeName;
            res.json(data);
          }
        });
      }
    });
  } else {
    res.json({ error: "please provide a location" });
  }
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather App Help",
    name: "Ariel Snyder",
    message: "Some help text",
  });
});

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App Home",
    name: "Ariel Snyder",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About the Weather App",
    name: "Ariel Snyder",
  });
});
//comment
app.get("/weather", (req, res) => {
  res.send("your weather");
});

// app.get("/help/*", (req, res) => {
//   console.log("404!");
//   res.send("<h1>No help for us chickens!</h1>");
// });

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help",
    number: 404,
    message: "No help for us chickens!",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    number: 404,
    message: "Nobody here but us chickens!",
  });
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
