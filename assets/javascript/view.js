View = {};

View.addFoodsToSuggestionList = function(foodObj) {

    var $button = $('<button>', {
        class: 'btn foodBtn',
        text: foodObj.name.replace(/_/g, ' '),
        'data-name': foodObj.name
    });

    $('.btn-group-vertical').append($button);
};