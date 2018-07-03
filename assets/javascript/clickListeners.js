var clickListeners = {};

// Weather Stuff

clickListeners.locator = function() {
  $('#location-submit').on('click', function(e){
    e.preventDefault();

    var locationInput = $('#location-input').val();
      
    bingAPI.getData(locationInput).then(function(response){
      var coordinates = bingAPI.getCoordinates(response);

      weatherAPI.weatherData(coordinates).then(function(response){
          var weatherDetails = weatherAPI.getWeatherDetails(response);


          var tempDesc = Utility.convertTemptoDescription(weatherDetails.temperature);
          var weatherCat = Utility.convertWeathertoCategory(weatherDetails.description);

          firebaseUtility.getFoods().then(function(snapshot){
            var comfortFoods = [];
            snapshot.forEach(function (childSnapshot) {

              var food = childSnapshot.val();

              if (Utility.checkFoodAgainstTempDesc(tempDesc, food) && Utility.checkFoodAgainstWeatherDesc(weatherCat, food) ) {
                comfortFoods.push({
                  name: childSnapshot.key,
                  meal: childSnapshot.val().Meal,
                });

              }
            });

            console.log(comfortFoods);

          });
      });
    });
  });
};

