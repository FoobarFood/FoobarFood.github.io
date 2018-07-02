var App = (function(){
  function init() {
    FirebaseConfig.init();
  }

  return {
    init: init
  }
})();


$(document).ready(function(){
  App.init();
});

// Weather Stuff 

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

// Recipe Stuff
recipeSearchAPI.recipeData('tuna melt').then(function(response){
  console.log(response.matches)

  var topRecipes = recipeSearchAPI.recipeDataExtraction(response);

  console.log(topRecipes);

    for (var i=0; i<topRecipes.length; i++){
        var recipeURLid = topRecipes[i]['id'];
        console.log(recipeURLid);
        var fullrecipeURL = `https://www.yummly.com/recipe/${recipeURLid}`
        console.log(fullrecipeURL);

        var recipeTitle = topRecipes[i]['title'];
        var recipeIngredients = topRecipes[i]['ingredients'];
        var recipeImageSmall = topRecipes[i]['imageUrl'];
        var recipeImage = recipeImageSmall.split('=s90-c')[0];

        console.log(recipeTitle);
        console.log(recipeIngredients);
        console.log(recipeImage);

  }


  // dom manipulation
});