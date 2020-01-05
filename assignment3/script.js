
$(document).ready(function() {
    // Will change when a new city is selected
    $("#city").change(function(){
		getWeatherData();
	});
});

/*
 *Name: getWeatherData
 *Purpose: When a user selects a city a ajax request is made to openweather
 *         for JSON data.
 *
 *Arguments: None
 *Returns: None
 *
 *Assumptions: Called when a new city select is made
 *
 *Bugs: None I have found
 *
 *Sample call: getWeatherData
 */
function getWeatherData() {

	$("#weather").html("");

    // Retives selected city name and ID
	var selectedCity = $("#city").find(":selected").text();
	var selectedCityId = $("#city").find(":selected").val();

    // while waiting for data displays loading GIF
	if (selectedCityId != "") {
		$("#pleaseWait").toggle();

        // URL for city weather JSON data
		var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?id=" + selectedCityId + "&appid=2ad263b9a82888fd39382d86aa2fc030&mode=json";

		// potential URL ex:
        // http://api.openweathermap.org/data/2.5/weather?id=6183858&appid=2ad263b9a82888fd39382d86aa2fc030&mode=xml

        // Ajax request
		$.ajax({
			type: "GET",
			url: weatherUrl,
			dataType: "json",
			success: function(json){  // Success, get the JSON data and parse it
				var weatherString = parseJsonResponse(json);
				$("#pleaseWait").toggle();

				$("#weather").html(weatherString);
			},
			error: function() {       // Failure, return error alert to page
				alert("An error occurred while processing JSON file.");
			}
		})
	}
}

/*
 *Name: getWeatherData
 *Purpose: Function used for parsing JSON data
 *
 *Arguments: json
 *Returns: String
 *
 *Assumptions: Called when a succesfull ajax request returns JSON data
 *
 *Bugs: None I have found
 *
 *Sample call: parseJsonResponse(json)
 */
function parseJsonResponse(json) {

    // Define weather variables that correspond to JSON data
	var cityName = json.name;
	var country = json.sys.country;

	var sunrise = new Date(json.sys.sunrise * 1000);
	var sunset = new Date(json.sys.sunset * 1000);

	var description = json.weather[0].description;

	var temperature = json.main.temp;
	var humidity = json.main.humidity;
	var pressure = json.main.pressure;

	var visibility = json.visibility;

	var speed = json.wind.speed;
	var degrees = json.wind.deg;
	var gusts = json.wind.gust;

	var clouds = json.clouds.all;

	var lastupdate = new Date(json.dt * 1000);

	var weatherIcon = json.weather[0].icon;
	var weatherImageUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";

    // Creates a string with all JSON data
	var weatherString = "<b>Weather for " + cityName + " " + country + "</b> <img src=" + weatherImageUrl + " \/><br/>";
	weatherString += "<b>Description:</b> " + description + "</br";
	weatherString += "<b>Sunrise:</b> " + sunrise + "</br>";
	weatherString += "<b>Sunset:</b> " + sunset + "</br>";
	weatherString += "<b>Temperature:</b> " + temperature + "</br>";
	weatherString += "<b>Humidity:</b> " + humidity + "</br>";
	weatherString += "<b>Pressure:</b> " + pressure + "</br>";
	weatherString += "<b>Visibility:</b> " + visibility + "</br>";
	weatherString += "<b>Wind Speed:</b> " + speed + "</br>";
	weatherString += "<b>Wind Gusts:</b> " + gusts + "</br>";
	weatherString += "<b>Wind Direction:</b> " +  degrees + " degrees</br>";
	weatherString += "<b>Clouds:</b> " + clouds + "</br>";
	weatherString += "<b>Last Updated:</b> " + lastupdate + "</br>";

	return weatherString;
}
