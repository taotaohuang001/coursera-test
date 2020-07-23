(function(){
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

  function ShoppingListCheckOffService(){
    var service = this;

    var items = [];

    service.addItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity // donot why yet
      };
      items.push(item);
    };

    service.removeItem = function (itemInbox) {
      items.splice(itemInbox, 1);
    }

    service.getItems = function(){
      return items;
    };
  }

})();



<!doctype html>
<html lang="en" ng-app="ShoppingListCheckOff">
  <head>
    <title>Shopping List Check Off</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script scr="angular.min.js"> </script>
    <script scr="app.js"> </script>
    <style> body { font-size: 1.2em; }</style>
    </head>
<body>
<h1>Shopping list chek off</h1>
  <div ng-controller='ToBuyController as ToBuyAdder'>
    <input type="text" ng-model="ToBuyAdder.itemName" placeholder="item name">
    <input type="text" ng-model="ToBuyAdder.itemQuantity" placeholder="quantity">
    <button ng-click="ToBuyAdder.addItem();">Add Item To Shopping List </button>
  </div>

  <div ng-controller='AlreadyBoughtController as BroughtList'>
    <ol>
      <li ng-repeat="item in BroughtList.items">
        {{ item.quantity }} of {{ item.name }}
        <button ng-click="BroughtList.removeItem($index);">Remove Item</button>
      </li>
    </ol>
  </div>
</body>
</html>
