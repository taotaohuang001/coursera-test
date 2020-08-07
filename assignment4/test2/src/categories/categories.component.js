(function() {
'use strict';

angular.module('MenuApp')
    .component('categories', {
        templateUrl: 'src/categories/categories.html',
        bindings: {
            'categories': '<'
        }
    });
})();
