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

          $("#fooString").text(`Today in ${cleanName}, it is ${weatherDetails.temperature}°F with ${weatherDetails.description}. The perfect day for...`)

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
              };
            });

            var filteredMeals = [];
            for (var i = 0; i < comfortFoods.length; i++) {
                if (comfortFoods[i].meal == $("#mealSelect").val()) {
                    filteredMeals.push(comfortFoods[i]);
                };  
            };
            if ($("#mealSelect").val() === 'Everything!' ) {
              filteredMeals = comfortFoods;
            };
            var randomIndices = Utility.getRandomIndices(filteredMeals.length);

            $('.btn-group-vertical').empty(); 
            for (var i = 0; i < randomIndices.length; i++) {
              View.addFoodsToSuggestionList(filteredMeals[randomIndices[i]]);
            };
              
            //shows Main Body Div
            $("#mainBody").removeAttr("style");
          });
      });
    });
  });
};

/*===== clicking on a '.foodBtn' button
calls the recipeSearchApi passing in the data-name value of the button,
which returns a data obj that can be used to dynamically add recipes
*/
clickListeners.foodBtn = function() {
  $('.btn-group-vertical').on('click', '.foodBtn', function(){
    var foodSuggestion = $(this).attr('data-name');

    recipeSearchAPI.recipeData(foodSuggestion).then(function(response){
      var data = recipeSearchAPI.recipeDataExtraction(response);

      for (var i = 0; i < data.length; i++) {
        var recipeId = data[i].id;

        View.addRecipeToRecipeInfoSection(i, recipeId);
      };
    });

  });
}

/*===== clicking on '#addFoodBtn' button

*/