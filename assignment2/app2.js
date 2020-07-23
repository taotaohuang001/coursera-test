(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
        .service('IfCheckerService', IfCheckerService);


    ToBuyController.$inject = ['ShoppingListCheckOffService', 'IfCheckerService'];
    function ToBuyController(ShoppingListCheckOffService, IfCheckerService) {
        var toBuy = this;

        toBuy.isEmpty = function () {
            return IfCheckerService.isEmptyArray(toBuy.getItems());
        };

        toBuy.getItems = function() {
            return ShoppingListCheckOffService.getItemsToBuy();
        };

        toBuy.setBought = function (itemIndex) {
            return ShoppingListCheckOffService.setBought(itemIndex);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', 'IfCheckerService'];
    function AlreadyBoughtController(ShoppingListCheckOffService, IfCheckerService) {
        var alreadyBought = this;

        alreadyBought.isEmpty = function () {
            return IfCheckerService.isEmptyArray(alreadyBought.getItems());
        };

        alreadyBought.getItems = function () {
            return ShoppingListCheckOffService.getAlreadyBoughtItems();
        }
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var items = [
          {name : "Milk", quantity: 1},
          {name : "Chocolate", quantity: 2},
          {name : "Peanut Butter", quantity: 3},
          {name : "Pepto Bismol (Chocolate flavor)", quantity: 4},
          {name : "Pepto Bismol (Cookie flavor)", quantity: 5},
        ]

        service.boughtItems = [];

        service.getAlreadyBoughtItems = function () {
            return service.boughtItems;
        };

        service.getItemsToBuy = function () {
            return items;
        };

        service.setBought = function(itemIndex) {
            service.boughtItems.push(items[itemIndex]);
            items.splice(itemIndex, 1);
        };
    }

function IfCheckerService() {
        var service = this;

        service.isEmptyArray = function(list) {
            return list.length === 0;
        }
    }
})();
