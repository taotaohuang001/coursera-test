(function(){
  'use strict';

  angular.module('NarrowItDownApp',[]).
  controller('NarrowItDownController', NarrowItDownController).
  service('MenuSearchService', MenuSearchService).
  filter('search', SearchTermFilter).
  directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService','$filter']
  function NarrowItDownController(MenuSearchService, $filter){
    var Narrow = this;
    Narrow.searchTerm="";
    Narrow.searchTermSubmitted="";

    Narrow.found = [];
    Narrow.getMenuItems = function(){
      // Filter search items description to lowcase
      Narrow.searchTermSubmitted=$filter('lowercase')(Narrow.searchTerm);
        var promise = MenuSearchService.getMatchedMenuItems(Narrow.searchTermSubmitted);
        promise.then(function(result){
          Narrow.found = result;
        });
    };

    // remove one item with splice
      Narrow.remoteItem = function(index){
      var RemoveItem = Narrow.found[index].name
      Narrow.found.splice(index, 1);
      Narrow.lastRemoveItem = RemoveItem + " was removed"
      console.log(Narrow.lastRemoveItem)
    };
  }

  MenuSearchService.$inject = ['$http', 'searchFilter']
  function MenuSearchService($http, searchFilter ){
    var service = this;
    service.getMatchedMenuItems = function(SearchItem){
      return $http(
        {
          method:'GET',
          url:'https://davids-restaurant.herokuapp.com/menu_items.json'
        }
      ).then(function(result){
          var filteredResult = [];
          if(SearchItem.trim() != ""){
            filteredResult = searchFilter(result.data.menu_items, SearchItem);
          }
          return filteredResult;
      });
    };
  }

  function FoundItemsDirective(){
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
    };
    return ddo;
  }

  function SearchTermFilter(){
    return function(menuDescriptionList, searchKeyword){
      var filtered = [];
      menuDescriptionList = menuDescriptionList || [];
      searchKeyword = searchKeyword || "";
      for(var i=0;i<menuDescriptionList.length;i++){
          var item = menuDescriptionList[i];
          // Making description the lowercase to match results
          var str = item.description.toLowerCase();
          if(str.indexOf(searchKeyword)>=0){
            filtered.push(item);
          }
      }
      return filtered;
    };
  }

})();
