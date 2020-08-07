(function() {
'use strict';

angular.module('MenuApp')
    .controller('CategoryDetailsController', CategoryDetailsController);

CategoryDetailsController.$inject = ['category'];
function CategoryDetailsController(category) {
    var ctrl = this;

    ctrl.items = category.menu_items;
    ctrl.categoryName = category.category.name;
}
})();
