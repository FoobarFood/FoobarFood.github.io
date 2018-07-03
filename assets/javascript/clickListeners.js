var clickListeners = {};

// Weather Stuff

clickListeners.locator = function() {
  $('#location-submit').on('click', function(e){
    e.preventDefault();

    var locationInput = $('#location-input').val();
  
    bingAPI.getData(locationInput).then(function(response){
      var coordinates = bingAPI.getCoordinates(response);
      var cleanName = bingAPI.getCleanName(response);

           weatherAPI.weatherData(coordinates).then(function(response){
          var weatherDetails = weatherAPI.getWeatherDetails(response);

          console.log(weatherDetails);
          // TODO: change the DOM
          $("#fooString").text(`Today in ${cleanName}, it is ${weatherDetails.temperature} with ${weatherDetails.description}. The perfect day for...`)
      });
    });
  });
};

