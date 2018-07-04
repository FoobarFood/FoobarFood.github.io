View = {};

// uses the recipeId to make a getRecipeAPI call to get recipe data for display
View.addRecipeToRecipeInfoSection = function(index, recipeId) {
  getRecipeAPI.requestData(recipeId).then(function(response){
    var recipeData = getRecipeAPI.extractData(response);

    var TimeinMinutes = moment.duration(recipeData.totalTimeInSeconds*1000).asMinutes();

    $(`#recipeTitle${index+1}`).text(recipeData.name);
    $(`#recipeImg${index+1}`).attr('src', recipeData.imageUrl);
    $(`#recipeTime${index+1}`).text(`Cooking time: ${TimeinMinutes} minutes`);
  
    $(`#recipeIngredients${index+1}`).empty();
  
    for (var i = 0; i < recipeData.ingredientLines.length; i++) {
      var $li = $('<li>', { text: recipeData.ingredientLines[i]});
      $(`#recipeIngredients${index+1}`).append($li);
    };
  
    $(`#recipeBtn${index+1}`).attr('href', recipeData.attribution.url);
    $(`#recipeSource${index+1}`).attr('href', recipeData.source.recipeUrl);
    $(`#recipeSource${index+1}`).text(recipeData.source.displayName);
  });
};

View.addFoodsToSuggestionList = function(foodObj) {
  var $button = $('<button>', {
      class: 'btn foodBtn',
      text: foodObj.name.replace(/_/g, ' '),
      'data-name': foodObj.name
  });

  $('.btn-group-vertical').append($button);
};