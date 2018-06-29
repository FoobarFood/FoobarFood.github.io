//API Key

var APIKey = "2d1b540b6f1afe91eb3a62874c28c56f";

var zipCode = "07002"

var city = "New York"

var lat = 51;

var lon= 3;

var latlon = [-51.789, -3.778];

console.log("The latitude and longitude: "+ "latitude: " + latlon[0] + "longitude" + latlon[1]);

//URL to query the database

//var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + city + ",us&units=imperial&appid=" + APIKey;

//var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "zip=" + zipCode + ",us&units=imperial&appid=" + APIKey;

//get the weather based on lattitude and longitude 
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "lat=" + latlon[0] + "&lon=" + latlon[1] + "&units=imperial&appid="  + APIKey;

//+ ",us&units=imperial&appid="



//Run AJAX call 

$.ajax({
url: queryURL,
method: "GET"
})
//store retreived data in the response object 

.then(function(response){

//Log the url
console.log(queryURL);

//Log the response object
console.log(response); 

//Log the response of the temperature
console.log("The temperature is " + response.main.temp);

//Log the response of the description for the day
console.log(response.weather[0].main);

//Content to HTML
$("#fooString").append("The temperature is: " + response.main.temp + "<br>"); 
$("#fooString").append("Weather conditions are: "+response.weather[0].main);

})