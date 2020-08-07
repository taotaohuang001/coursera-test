(function() {
'use strict';

angular.module('MenuApp')
    .controller('CategoriesRouterController', CategoriesRouterController);

CategoriesRouterController.$inject = ['categories'];
function CategoriesRouterController(categories) {
    var categoriesCtrl = this;

    categoriesCtrl.categories = categories;
}
})();