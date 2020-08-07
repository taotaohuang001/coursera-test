(function(){
'use strict';

angular.module('test',[]).
controller('testController',testController).
service('testService',testService);


testController.$inject = ['testService','$http']
function testController(testService,$http){
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

  Ctrl.showServiceItems=function(){
          testService.AddItems(Ctrl.ha)
          testService.gethttp()

          // $http({
          //   method: 'GET',
          //   url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
          // }).then(function successCallback(response) {
          //   Ctrl.listServiceItems  = {};
            // [] and {} are both OK

// to get http data out use "response.data.menu_items[1].name"
            // Ctrl.listServiceItems  = response.data.menu_items[1].name
            //
            // console.log('Ctrl.listServiceItems ' + Ctrl.listServiceItems )
            //
            // Ctrl.listServiceItems.push(Ctrl.listServiceItems)

            // console.log('Ctrl.listServiceItems 2' + Ctrl.listServiceItems )
            //
            //
            // }, function errorCallback(response) {
            //       console.log('not work') });


      // 
      // Ctrl.listServiceItems = testService.items + testService.savedData
            Ctrl.listServiceItems =testService.savedData
  }



}
testService.$inject=['$http']
function testService($http){
  var service = this;
  service.items=[];
  service.savedData = [];
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
      var savedData = [];
      savedData = response.data.menu_items[1].name
      service.savedData.push(savedData)
      console.log('reponse data is:' + response.data.menu_items[1].name)
      console.log('  service.savedData is:' +   service.savedData)
      console.log('savedData: ' + savedData )
      }, function errorCallback(response) {
            console.log('not work') });
  }

}

})();
