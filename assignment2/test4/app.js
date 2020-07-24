(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('TestController', TestController)
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var ToBuyAdder = this;

  ToBuyAdder.itemName = "";
  ToBuyAdder.itemQuantity = "";

  ToBuyAdder.addItem = function () {
    if (ToBuyAdder.itemName !== "" && ToBuyAdder.itemQuantity !== ""){
    ShoppingListCheckOffService.addItem(ToBuyAdder.itemName, ToBuyAdder.itemQuantity);
   }
 }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var BroughtList = this;

  BroughtList.isEmpty = function (){
    return ShoppingListCheckOffService.isEmptyArray(ShoppingListCheckOffService.getItems()) && ShoppingListCheckOffService.getBought().length!==0;
  };

  BroughtList.items = ShoppingListCheckOffService.getItems();

  BroughtList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
     };
  BroughtList.TrueremoveItem = function (itemIndex) {
    ShoppingListCheckOffService.TrueremoveItem(itemIndex);
    };
  // BroughtList.itemsCheck = function(array){
  //   return ShoppingListCheckOffService.getItems().length===0
  // }
  BroughtList.boughtList = ShoppingListCheckOffService.getBought();

  }


TestController.$inject = ['ShoppingListCheckOffService'];
function TestController(ShoppingListCheckOffService) {
  var Test = this;

  Test.isEmpty = function(){
    return ShoppingListCheckOffService.isEmptyArray(ShoppingListCheckOffService.getBought());
  };

  Test.boughtList = ShoppingListCheckOffService.getBought();
  Test.RemoveItemFromBrought = function (itemIndex) {
    ShoppingListCheckOffService.RemoveItemFromBrought(itemIndex);
  };

}



function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var items = [
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

    var item = items[itemIndex];

    items.push(item);

    boughtList.splice(itemIndex, 1);

  };

  service.TrueremoveItem = function (itemIndex) {

    items.splice(itemIndex, 1);

  };

  service.RemoveItemFromBrought = function (itemIndex) {

    boughtList.splice(itemIndex, 1);

  };



  service.getItems = function () {
    return items;
  };

  service.getBought = function () {
    return boughtList;
  };

  service.isEmptyArray = function(list) {
      return list.length === 0;
    }

}

})();
