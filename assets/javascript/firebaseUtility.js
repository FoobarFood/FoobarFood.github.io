var firebaseUtility = {}

firebaseUtility.getFoods = function() {
    return firebase.database().ref('foods').once('value');
}

