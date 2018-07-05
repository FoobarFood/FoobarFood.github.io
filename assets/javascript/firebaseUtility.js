var firebaseUtility = {};

firebaseUtility.getFoods = function() {
    return firebase.database().ref('foods').once('value');
}

firebaseUtility.getFavorites = function(limit) {
    return firebase.database().ref('favorites').orderByValue().limitToLast(limit).once('value');
}

/*===== adds a food to foods in firebase database
foodKey is string: Apple_Pie 
foodValue is object: {
  Meal: 'Snack',
  TempNumber: 110,
  WeatherNumber: 200   
}
*/
firebaseUtility.addFood = function(foodKey, foodValue) {
    return firebase.database().ref('foods').child(foodKey).set(foodValue);
}

firebaseUtility.checkFood = function(foodKey) {
    return firebase.database().ref('foods').child(foodKey).once('value');
}

/*===== adds a recipeId to favorites in firebase database
if recipeId does not exist in favorites, add it and set value to 1
else increase value by 1
*/
firebaseUtility.addFavoriteRecipe = function(recipeId) {
    firebase.database().ref('favorites').child(recipeId).once('value').then(function(snapshot){ 
       if (snapshot.exists()) {
           var favoritesCount = snapshot.val() + 1;
           firebase.database().ref('favorites').child(recipeId).set(favoritesCount);
       } else {
           firebase.database().ref('favorites').child(recipeId).set(1);
       };
    });
}