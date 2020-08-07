(function() {
'use strict';

angular.module('data')
    .service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http'];
function MenuDataService($http) {
    var menuService = this;

    menuService.getAllCategories = function() {
        return $http({
            url: 'https://davids-restaurant.herokuapp.com/categories.json'
        }).then(function(response) {
            return response.data;
        });
    };

    menuService.getItemsForCategory = function(categoryShortName) {
        var url = 'https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName;
        return $http({
            url: url
        }).then(function (response) {
            return response.data;
        });
    };
}

})();