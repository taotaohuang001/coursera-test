(function(){
'use strict';

angular.module('test',[]).
controller('testController',testController).
service('testService',testService);


testController.$inject = ['testService']
function testController(testService){
  var Ctrl = this;

  Ctrl.ha = "ha"
  var testList = [];
  console.log('testList#1:' + testList);
  Ctrl.show = function(){

    testList.push(Ctrl.ha);
    Ctrl.ha = "not har"
  console.log('testList#2:' + testList);
    }

  Ctrl.showha = function(){
      testService.AddItems(Ctrl.ha)
      // console.log('Ctrl.haha:' + Ctrl.haha);
      testService.gethttp()
  }

  Ctrl.listServiceItems = testService.items

}
testService.$inject=['$http']
function testService($http){
  var service = this;
  service.items=[];
  service.AddItems = function(item){
    service.items.push(item);
    console.log('item:' + item);
    console.log('items:' + service.items);
  };

  service.gethttp =function(){
    $http({
      method: 'GET',
      url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
    }).then(function successCallback(response) {
      var test = response.data.menu_items.description
      console.log('work' + response.data.menu_items[1].name.length )
      }, function errorCallback(response) {
            console.log('not work') });
  }

}

})();
