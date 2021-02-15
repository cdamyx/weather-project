const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
	
	res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res){
	// console.log(req.body.cityName);
	
	const query = req.body.cityName;
	const apiKey = "fe79cf42e54a57f1d693d3509ee6dcb6";
	const unit = "imperial";
	const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

	https.get(url, function(response){
		console.log(response.statusCode);

		response.on("data", function(data){
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const desc = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
			console.log(temp, desc);
			res.write("<h1>Current weather: " + desc + ".</h1>")
			res.write("<h2>The temperature in " + query + " is " + temp + " degrees Fahrenheit.</h2>")
			res.write("<img src=" + imgUrl + ">")
			res.send();
		})
	})
})




app.listen(3000, function(){
	console.log("Server is running on port 3000.");
})