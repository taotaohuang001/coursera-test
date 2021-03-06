(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('TestController', TestController)
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

TestController.$inject = ['ShoppingListCheckOffService'];
function TestController(ShoppingListCheckOffService) {
  var Test = this;
  Test.oneitems = ShoppingListCheckOffService.getItems();
  Test.boughtList = ShoppingListCheckOffService.getBought();
  Test.removeBought = function(itemIndex){
    ShoppingListCheckOffService.removeBought(itemIndex);
  };
}

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var ToBuyAdder = this;

  ToBuyAdder.itemName = "";
  ToBuyAdder.itemQuantity = "";

  ToBuyAdder.addItem = function () {
    ShoppingListCheckOffService.addItem(ToBuyAdder.itemName, ToBuyAdder.itemQuantity);
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var BroughtList = this;

  BroughtList.items = ShoppingListCheckOffService.getItems();

  BroughtList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var items = [
      {name : "Milk", quantity: 1},
      {name : "Chocolate", quantity: 2},
      {name : "Peanut Butter", quantity: 3},
      {name : "Pepto Bismol (Chocolate flavor)", quantity: 4},
      {name : "Pepto Bismol (Cookie flavor)", quantity: 5},
    ];

  var boughtList = [];


  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.removeItem = function (itemIndex) {
    var item = items[itemIndex];
    boughtList.push(item);
    items.splice(itemIndex, 1);
  };

  service.removeBought = function (itemIndex) {
    boughtList.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };

  service.getBought = function () {
    return boughtList;
  };
}

})();
