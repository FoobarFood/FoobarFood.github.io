var App = (function(){
  function init() {
    FirebaseConfig.init();
    clickListeners.locator();
    clickListeners.foodBtn();
  }

  return {
    init: init
  }
})();


$(document).ready(function(){
  App.init();
});

// locator();

// Recipe Stuff
// recipeSearchAPI.recipeData('tuna melt').then(function(response){
//   console.log(response.matches)

//   var topRecipes = recipeSearchAPI.recipeDataExtraction(response);

//   console.log(topRecipes);

//     for (var i=0; i<topRecipes.length; i++){
//         var recipeURLid = topRecipes[i]['id'];
//         console.log(recipeURLid);
//         var fullrecipeURL = `https://www.yummly.com/recipe/${recipeURLid}`
//         console.log(fullrecipeURL);

//         var recipeTitle = topRecipes[i]['title'];
//         var recipeIngredients = topRecipes[i]['ingredients'];
//         var recipeImageSmall = topRecipes[i]['imageUrl'];
//         var recipeImage = recipeImageSmall.split('=s90-c')[0];

//         console.log(recipeTitle);
//         console.log(recipeIngredients);
//         console.log(recipeImage);

//   }


  // dom manipulation
// });