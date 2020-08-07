(function() {
'use strict';

angular.module('MenuApp')
    .component('categoryDetails', {
        templateUrl: 'src/categoryDetail/categoryDetails.html',
        bindings: {
            'items': '<'
        }
    });
})();
