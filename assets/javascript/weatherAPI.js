 
 var userLocation= "";
 


var weatherAPI = (function(){
    var APIKey = "2d1b540b6f1afe91eb3a62874c28c56f";

    function queryURL(latlonArray) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "lat=" + latlonArray[0] + "&lon=" + latlonArray[1] + "&units=imperial&appid="  + APIKey;
        return queryURL;
    }

    function weatherData(coordinates) {
        var url = queryURL(coordinates);
        return $.ajax({
            url: url,
            method: "GET"
        })
    }

    function getWeatherDetails(response) {
        return {
            temperature: response.main.temp,
            description: response.weather[0].main
        };
    }

    return {
        queryURL: queryURL,
        weatherData: weatherData,
        getWeatherDetails: getWeatherDetails
    }
})();

function locator() {

    var nameInput =  document.getElementById('location');

document.querySelector('form.pure-form').addEventListener('submit', function (e) {

    //prevent the normal submission of the form
    e.preventDefault();

    console.log(nameInput.value); 

    userLocation = nameInput.value;
    
    bingAPI.getData(userLocation)
    .then(function(response){
      var coordinates = bingAPI.getCoordinates(response);
 
      weatherAPI.weatherData(coordinates)
          .then(function(response){
              var weatherDetails = weatherAPI.getWeatherDetails(response);
              console.log(weatherDetails);
              console.log(coordinates);
              // change the Dom
          });
 
    });
    
    
});
}

locator();



