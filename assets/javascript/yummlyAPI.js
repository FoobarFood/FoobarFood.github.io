var recipeSearchAPI = (function(){
  var api_key = '3cbe02c27769bbeaebe8044f1e437cef';
  var app_id = 'f857dc17';
  var topRecipes = [];

  function recipeSearchURL(recipe) {
    var recipe = recipe.replace(/ /g, '+');
    var recipeURL = `http://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${api_key}&q=${recipe}&requirePictures=true`
    return recipeURL;
  }

  function recipeData(recipe) {
    return $.ajax({
      url: recipeSearchURL(recipe),
      method: 'GET'
    });
  }

  function recipeDataExtraction(response) {
    var recipeResults = response.matches.splice(0,3);
    for (var i=0; i<recipeResults.length; i++){
      var recipeObj = {
        id: recipeResults[i].id,
        imageUrl: recipeResults[i].imageUrlsBySize['90'],
        ingredients: recipeResults[i].ingredients,
        title: recipeResults[i].recipeName
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


//console.log(test);
//"http://api.yummly.com/v1/api/recipe/" + topRecipes.id[i] + "?_app_id=f857dc17&_app_key=3cbe02c27769bbeaebe8044f1e437cef"

// var test3 = recipeGetAPI("tuna melt");

// console.log(test3);
// var recipeSearchURL = "http://api.yummly.com/v1/api/recipes?_app_id=f857dc17&_app_key=3cbe02c27769bbeaebe8044f1e437cef&q=tuna+melt&requirePictures=true";

// $.ajax({
//     url: recipeSearchURL,
//     method: "GET"
//   })

//     .then(function(response) {
//       console.log(response)

//   var recipeResults = response.matches;
//   console.log(recipeResults);

//   var i;
//   for (i=0; i<3; i++) {
//       console.log(recipeResults[i]);
//       var recipeID = recipeResults[i].id;
//       console.log(recipeID);
//        var recipeGET = "http://api.yummly.com/v1/api/recipe/" + (recipeID)+ "?_app_id=f857dc17&_app_key=3cbe02c27769bbeaebe8044f1e437cef"
//       console.log(recipeGET);


//       $.ajax({
//        url: recipeGET,
//       method: "GET"
//       })

//     .then(function(response) {
//       console.log(response)
//       })
//   }