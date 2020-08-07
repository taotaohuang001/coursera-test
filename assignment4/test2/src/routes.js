(function () {
'use strict';

angular.module('MenuApp')
    .config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
    .state('home', {
        url: '/',
        template: 'Welcome to CHU restaurant! Please check out our <h1><a ui-sref="categories"> <button> Menu Categories </button></a></h1>'
        // templateUrl: /testpage.html
    })
    .state('categories', {
        url: '/categories',
        templateUrl: 'src/categories/categories.router.html',
        controller: 'CategoriesRouterController as categoriesCtrl',
        resolve: {
            categories: ['MenuDataService', function (MenuDataService) {
                return MenuDataService.getAllCategories();
            }]
        }
    })
    // .state('categories.category', {
    .state('category', {
        url: '/categories/{categoryId}',
        templateUrl: 'src/categoryDetail/categoryDetails.router.html',
        controller: 'CategoryDetailsController as categoryDetails',
        resolve: {
            category: ['$stateParams', 'MenuDataService',  function($stateParams, MenuDataService) {
                return MenuDataService.getItemsForCategory($stateParams.categoryId);
            }]
        }
    });
}

})();
