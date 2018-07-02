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

  function seed() {
    firebase.database().ref('foods').set(FOODS);
  }

  function resetFoods() {
    firebase.database().ref('foods').set('');
  }

  return {
    init: init,
    seed: seed,
    resetFoods: resetFoods
  }
})();