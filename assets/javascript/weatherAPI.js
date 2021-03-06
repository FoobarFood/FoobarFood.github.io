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
        weatherData: weatherData,
        getWeatherDetails: getWeatherDetails
    }
})();
