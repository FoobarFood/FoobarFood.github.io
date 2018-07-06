var clickListeners = {};

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
              
            //shows Main Body Div and removes spash div
            $("#splashBody").css("display", "none");
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

    // remove recipe cards 4-8
    View.removeRecipeCards([4, 5 , 6, 7, 8]);

    // remove, then regenerate pagination functionality
    View.removeRecipesPagination();
    View.createRecipesPagination(3);
    App.setupPagination();

    recipeSearchAPI.recipeData(foodSuggestion).then(function(response){
      var data = recipeSearchAPI.recipeDataExtraction(response);

      for (var i = 0; i < data.length; i++) {
        var recipeId = data[i].id;

        View.addRecipeToRecipeInfoSection(i, recipeId);
        
      };

      $("#recipeSplash").hide();
      $("#recipe-details").show();

      // $('.recipeCard').css('display', 'block').animate({
      //   opacity: 1,
      // }, 1600);
    });
  });

}

/*===== clicking on '#addFoodBtn' button inside of modal
validates user inputs, displays error msgs, checks if food already in db, writes to db
*/
clickListeners.addFoodBtn = function() {
  $('#addFoodBtn').on('click', function(){
    // get user inputs 
    var foodInput = $('#foodInput').val().trim();
    var mealSelect = $('#mealChoice').val();
    var tempSelect = 0;
    var weatherSelect = 0;

    $('.form-check-input[name="tempSelect"]:checked').each(function(index, el){
      tempSelect += parseInt(el.value);
    });

    $('.form-check-input[name="weatherSelect"]:checked').each(function(index, el){
      weatherSelect += parseInt(el.value);
    });

    // validate user inputs (food, tempSelect, weatherSelect)
    // display error msg if invalid input
    var validInput = true;

    if(!Utility.addFood.validator.validFoodInput(foodInput)) {
      var errorMsg = foodInput.length ? 'Invalid Food' : 'You must enter a food!';

      View.renderAddFoodErrorMsg('#foodInputError', errorMsg);
      validInput = false; 
    }; 

    if(!Utility.addFood.validator.validTempSelect(tempSelect)) {
      View.renderAddFoodErrorMsg('#tempSelectError', 'Select option(s)');
      validInput = false; 
    };
    
    if (!Utility.addFood.validator.validWeatherSelect(weatherSelect)) {
      View.renderAddFoodErrorMsg('#weatherSelectError', 'Select option(s)');
      validInput = false; 
    };

    // if validInput, add to database
    if (validInput) {
      // convert foodInput into database friendly foodKey
      var foodKey = Utility.addFood.convertFoodInputToKey(foodInput);

      var foodValue = {
        Meal: mealSelect,
        TempNumber: tempSelect,
        WeatherNumber: weatherSelect
      };

      // check that food does not already exist in database
      firebaseUtility.checkFood(foodKey).then(function(snapshot){
        if(snapshot.exists()) {
          View.renderAddFoodMsg('danger', `${foodKey.replace(/_/g,' ')} already exists!`);
        } else {
          firebaseUtility.addFood(foodKey, foodValue).then(function(){
            View.renderAddFoodMsg('success', `${foodKey.replace(/_/g,' ')} successfully added!`);
          });   
        };
      });
    };
  });
}

/*===== clicking on '#popularRecipesBtn' button */
clickListeners.popularRecipesBtn = function() {
  $('#popularRecipesBtn').on('click', function(){
    firebaseUtility.getTopFavorites(8).then(function(snapshot){
      var popularRecipes = [];

      snapshot.forEach(function (childSnapshot) {
        popularRecipes.unshift({
          recipeId: childSnapshot.key,
          favoritesCount: childSnapshot.val()
        });
      });

      // creates 'Recipe Cards' for i > 2 (cards already exists for 0-2 in html)
      for (var i = 0; i < popularRecipes.length; i++) {
        if (i > 2) View.createRecipeCard(i); 
        View.addRecipeToRecipeInfoSection(i, popularRecipes[i].recipeId, popularRecipes[i].favoritesCount);
      };

      // remove, then regenerate pagination functionality
      View.removeRecipesPagination();
      View.createRecipesPagination(popularRecipes.length);
      App.setupPagination();
    });
  });
}