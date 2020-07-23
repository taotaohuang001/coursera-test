(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

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

  BroughtList.removeItem = function (itemInbox) {
    ShoppingListCheckOffService.removeItem(itemInbox);
  };
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.removeItem = function (itemInbox) {
    items.splice(itemInbox, 1);
  };

  service.getItems = function(){
    return items;
  };
}

})();
