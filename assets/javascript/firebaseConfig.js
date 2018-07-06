var FirebaseConfig = (function() {
  function init() {
    var config = {
      apiKey: "AIzaSyA2JCrZme1h9yi-96eKZPzGxp24GWR6Z5A",
      authDomain: "foobar-foods.firebaseapp.com",
      databaseURL: "https://foobar-foods.firebaseio.com",
      projectId: "foobar-foods",
      storageBucket: "",
      messagingSenderId: "663049471199"
    };
    firebase.initializeApp(config);
  }

  function seedFoods() {
    firebase.database().ref('foods').set(FOODS);
  }

  function seedFavorites() {
    firebase.database().ref('favorites').set(FAVORITE_RECIPES);
  }

  return {
    init: init,
    seedFoods: seedFoods,
    seedFavorites: seedFavorites
  }
})();