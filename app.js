const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){
	
	const url = "https://api.openweathermap.org/data/2.5/weather?q=pratt, ks, us&appid=fe79cf42e54a57f1d693d3509ee6dcb6&units=imperial";

	https.get(url, function(response){
		console.log(response.statusCode);

		response.on("data", function(data){
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const desc = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
			console.log(temp, desc);
			res.write("<p>The weather is " + desc + ".</p>")
			res.write("<h1>The temperature in Pratt is " + temp + " degrees Fahrenheit.</h1>")
			res.write("<img src=" + imgUrl + ">")
			res.send();
		})
	})

})









app.listen(3000, function(){
	console.log("Server is running on port 3000.");
})