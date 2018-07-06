View = {};

// uses the recipeId to make a getRecipeAPI call to get recipe data for display
View.addRecipeToRecipeInfoSection = function(index, recipeId, favoriteCount) {
  $(`#recipeTitle${index+1}`).attr('data-recipeId', recipeId);

  if (favoriteCount) {
    $(`#recipeFavoriteCount${index+1}`).text(favoriteCount);
  } else {
    firebaseUtility.getFavoriteCount(recipeId).then(function(snapshot){
      if(snapshot.exists()) {
        $(`#recipeFavoriteCount${index+1}`).text(snapshot.val());
      } else {
        $(`#recipeFavoriteCount${index+1}`).text(0);
      };
    });
  };

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

View.renderAddFoodErrorMsg = function(errorMsgSelector, errorMsg) {
  $(`${errorMsgSelector} span`).text(errorMsg);
  $(errorMsgSelector).css('display', 'flex').animate({
    opacity: 1,
  }, 1200, function() {
    setTimeout(function(){
      $(errorMsgSelector).animate({
        opacity: 0,
      }, 1200, function(){
        $(errorMsgSelector).css('display', 'none');
      });
    }, 2400);
  });
};

View.renderAddFoodMsg = function(msgType, msg) {
  $('#addFoodMsgOverlay div').attr('class', `alert alert-${msgType}`);
  $('#addFoodMsgOverlay div').text(msg);
  
  $('#addFoodMsgOverlay').css('display', 'flex').animate({
    opacity: 1,
  }, 1200, function() {
    setTimeout(function(){
      $('#addFoodMsgOverlay').animate({
        opacity: 0,
      }, 1200, function(){
        $('#addFoodMsgOverlay').css('display', 'none');
        if (msgType === 'success') $('#addFoodModal').modal('hide');
      });
    }, 2400);
  });
};

View.removeRecipeCards = function(cardsToRemove) {
  for (var i = 0; i < cardsToRemove.length; i++) {
    $(`#recipeCard-${cardsToRemove[i]}`).remove();
  }
}

View.createRecipeCard = function(index) {
  var $recipeCard = $('<div>', {
    id: `recipeCard-${index+1}`,
    class: 'content',
    html: `
      <div class="card">
        <img class="card-img-top" id="recipeImg${index+1}" src="" alt="recipe img">
        <div class="card-body">
          <h5 class="card-title text-center">
            <span id="recipeTitle${index+1}"></span>
          </h5>
          <h6 class="card-subtitle mb-2 text-muted text-center">
            <span id="recipeTime${index+1}"></span>
          </h6>
          <div class="d-flex align-items-center">
            <div class="mr-auto font-italic">
              <small>
                Powered by 
                <a href='http://www.yummly.co/recipes' target='_blank'><img alt='Yummly' src='https://static.yummly.co/api-logo.png'/></a>
              </small>
            </div>
            <div class="d-flex align-items-center ml-auto">
              <small class="mr-1"><i class="fas fa-star"></i></small>
              <span id="recipeFavoriteCount${index+1}"></span>
            </div>
          </div>
          <ul id="recipeIngredients${index+1}" class="my-3 font-weight-light"></ul>
          <div class="d-flex">
            <div class="mr-auto">
              <a href="#" class="btn btn-primary" id="recipeBtn${index+1}" target="_blank">Get the Recipe!</a>
            </div>
            <div class="d-flex align-items-center ml-auto">
              <p class="mb-0">Source: <a href="#" id="recipeSource${index+1}" target="_blank"></a></p>
            </div>
          </div>
        </div>
      </div>
    `
  });
  $('#recipe-details').append($recipeCard);
}

View.removeRecipesPagination = function() {
  $('#recipesPagination').empty();
}

View.createRecipesPagination = function(length){
  var $paginationNav = $('<nav>', {
    'aria-label': 'Recipe navigation',
    html: `
      <ul class="pagination"></ul>
    `
  });

  $('#recipesPagination').append($paginationNav);

  // 1 ... n
  for (var i = 0; i < length; i++) {
    var $li = $('<li>', {
      class: 'page-item',
      html: `<a class="page-link" href="#recipe-details">${i+1}</a>`
    });
    $('#recipesPagination nav ul').append($li);
  };

  // «
  var $laquoLi = $('<li>', {
    class: 'page-item', 
    html: `
      <a class="page-link" href="#recipe-details" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    `
  });

  $('#recipesPagination nav ul').prepend($laquoLi);

  // »
  var $raquoLi = $('<li>', {
    class: 'page-item', 
    html: `
      <a class="page-link" href="#recipe-details" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    `
  });

  $('#recipesPagination nav ul').append($raquoLi);
}