(function(){
  'use strict';

  angular.module('NarrowItDownApp',[]).
  controller('NarrowItDownController', NarrowItDownController).
  // controller('FoundItemsDirectiveController', FoundItemsDirectiveController).
  service('MenuSearchService', MenuSearchService).
  filter('search', SearchTermFilter).
  directive('foundItems', FoundItems);


  function FoundItems(){
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      // controller: 'FoundItemsDirectiveController as controller',
      // bindToController: true
    };

    return ddo;
  }

  // function FoundItemsDirectiveController(){
  //   var controller = this;
  // }

  NarrowItDownController.$inject = ['MenuSearchService']
  function NarrowItDownController(MenuSearchService){
    var controller = this;

    controller.searchTerm="";

    controller.found = [];
    controller.getMenuItems = function(){
        var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
        promise.then(function(result){
          controller.found = result;
        });

    };

    controller.remoteItem = function(index){
      controller.found.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ['$http', '$filter']
  function MenuSearchService($http, $filter ){
    var service = this;
    service.getMatchedMenuItems = function(searchTerm){
      return $http(
        {
          method:'GET',
          url:'https://davids-restaurant.herokuapp.com/menu_items.json'
        }
      ).then(function(result){
          var filteredResult = [];
          if(searchTerm.trim() != ""){
            var rawResult = result.data;
            filteredResult = $filter('search')(rawResult.menu_items, searchTerm);
          }
          return filteredResult;

      });
    };

  }

  function SearchTermFilter(){
    return function(input, search){

      var filtered = [];

      input = input || [];
      search = search || "";

      for(var i=0;i<input.length;i++){
          var item = input[i];
          var str = item.description;
          if(str.indexOf(search)>=0){
            filtered.push(item);
          }
      }
      return filtered;
    };
  }

})();
