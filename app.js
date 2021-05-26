const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// Setting up the response page

app.post("/", function (req, res) {
    var query = req.body.cityName;
    var apiKey = "cc65f1441cb244847cde13ff88bb081d";
    var units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
    console.log(url);
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            console.log(temp + "," + desc);
            res.setHeader('Content-type', 'text/html');
            res.write("<h1>Temperature in " + query + " is: " + temp + "</h1>");
            res.write("<h1>Weather: " + desc + "</h1>");
            res.send();
        })
    })
})

app.listen(3000, function () {
    console.log("Server listening on port 3000.");
})

