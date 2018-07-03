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

          $("#fooString").text(`Today in ${cleanName}, it is ${weatherDetails.temperature} with ${weatherDetails.description}. The perfect day for...`)

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


clickListeners.foodBtn = function() {
  $('.foodBtn').on('click', function(){
    var foodSuggestion = $(this).attr('data-name');

    recipeSearchAPI.recipeData(foodSuggestion).then(function(response){
      var data = recipeSearchAPI.recipeDataExtraction(response);

      for (var i = 0; i < data.length; i++) {
        View.addRecipeToRecipeInfoSection(i, data[i]);
      };
    });

  });
}