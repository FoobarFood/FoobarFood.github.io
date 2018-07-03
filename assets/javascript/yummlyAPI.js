// Yummly API docs: https://developer.yummly.com/documentation

// Yummly Search API
// Attribution: 
// logo- https://static.yummly.co/api-logo.png
// url- https://www.yummly.co/recipes/
/* Usage:
recipeSearchAPI.recipeData(recipeSearchTerm).then(function(response){
  var data = recipeSearchAPI.recipeDataExtraction(response);
  // do something with data...
  console.log(data);
});
*/
var recipeSearchAPI = (function(){
  var api_key = '3cbe02c27769bbeaebe8044f1e437cef';
  var app_id = 'f857dc17';

  function recipeSearchURL(recipe) {
    var recipe = recipe.replace(/_/g, '+');
    var recipeURL = `https://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${api_key}&q=${recipe}&requirePictures=true`
    return recipeURL;
  }

  function recipeData(recipe) {
    return $.ajax({
      url: recipeSearchURL(recipe),
      method: 'GET'
    });
  }

  function recipeDataExtraction(response) {
    var topRecipes = [];
    var recipeResults = response.matches.splice(0,3);

    for (var i=0; i<recipeResults.length; i++){
      var recipeObj = {
        id: recipeResults[i].id,
        imageUrl: recipeResults[i].imageUrlsBySize['90'],
        ingredients: recipeResults[i].ingredients,
        title: recipeResults[i].recipeName,
        totalTimeInSeconds: recipeResults[i].totalTimeInSeconds
      }
      topRecipes.push(recipeObj);
    }
    return topRecipes;
  }

  return {
    recipeData: recipeData,
    recipeDataExtraction: recipeDataExtraction
  }
})();

// Yummly Get Recipe API
/* Usage: | ex. recipeID = 'Tomato-Tuna-Melts-2250549' 
getRecipeAPI.requestData(recipeId).then(function(response){
  var data = getRecipeAPI.extractData(response);
  // do something with data...
  console.log(data);
});
*/
var getRecipeAPI = (function(){
  var appId = 'f857dc17';
  var appKey = '3cbe02c27769bbeaebe8044f1e437cef';
  
  // returns AJAX promise
  function requestData(recipeId) {
    return $.ajax({
      url: `https://api.yummly.com/v1/api/recipe/${recipeId}?_app_id=${appId}&_app_key=${appKey}`,
      method: 'GET'
    });
  }

  // returns data object
  function extractData(response) {
    return {
      attribution: {
        logoUrl: response.attribution.logo,
        url: response.attribution.url
      },
      source: {
        displayName: response.source.sourceDisplayName,
        recipeUrl: response.source.sourceRecipeUrl
      },
      flavors: response.flavors,
      imageUrl: response.images[0].hostedLargeUrl,
      ingredientLines: response.ingredientLines,
      totalTimeInSeconds: response.totalTimeInSeconds
    };
  }

  return {
    requestData: requestData,
    extractData: extractData
  }
})();