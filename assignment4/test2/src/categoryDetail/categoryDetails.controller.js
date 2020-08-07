(function() {
'use strict';

angular.module('MenuApp')
    .controller('CategoryDetailsController', CategoryDetailsController);

CategoryDetailsController.$inject = ['category'];
function CategoryDetailsController(categoryDetails) {
    var ctrl = this;

    ctrl.items = categoryDetails.menu_items;
    ctrl.categoryName = categoryDetails.category.name;
}
})();