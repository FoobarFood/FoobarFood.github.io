View = {};

View.addRecipeToRecipeInfoSection = function(index, recipe) {  
  $(`#recipeTitle${index+1}`).text(recipe.title);

  getRecipeAPI.requestData(recipe.id).then(function(response){
    var data = getRecipeAPI.extractData(response);
    var TimeinMinutes = moment.duration(data.totalTimeInSeconds*1000).asMinutes();

    $(`#recipeTime${index+1}`).text(`Cooking time: ${TimeinMinutes} minutes`);
    $(`#recipeBtn${index+1}`).attr('href', data.attribution.url);

    $(`#recipeIngredients${index+1}`).empty();
    $(`#recipeImg${index+1}`).attr('src', data.imageUrl);
    for (var i = 0; i < data.ingredientLines.length; i++) {
      var $li = $('<li>', { text: data.ingredientLines[i]});
      $(`#recipeIngredients${index+1}`).append($li);
    };
    $(`#recipeSource${index+1}`).attr('href', data.source.recipeUrl);
    $(`#recipeSource${index+1}`).text(data.source.displayName);
  });
}