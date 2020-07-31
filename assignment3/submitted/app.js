(function(){
  'use strict';

  angular.module('NarrowItDownApp',[]).
  controller('NarrowItDownController', NarrowItDownController).
  service('MenuSearchService', MenuSearchService).
  service('FindMenuService', FindMenuService).
  filter('search', SearchTermFilter).
  directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService','FindMenuService','$http']
  function NarrowItDownController(MenuSearchService,FindMenuService,$http){
    var Narrow = this;

    Narrow.searchTerm = "egg"

    Narrow.getMatchedMenuItems = function(SearchItem){
        return $http(
          {
            method:'GET',
            url:'https://davids-restaurant.herokuapp.com/menu_items.json'
          })




    // Narrow.getMenuItems = function(){
    //   return  FindMenuService.getMatchedMenuItems(Narrow.searchTerm)
    // }


    //
    // console.log('get it?' + Narrow.getMenuItems(Narrow.searchTerm))
    // console.log('get it?' + FindMenuService.getMatchedMenuItems.filteredResult)



    // var Narrow = this;
    // Narrow.searchTerm="";
    // Narrow.searchTermSubmitted="";
    //
    // Narrow.found = [];
    // Narrow.getMenuItems = function(){
    //   // Filter search items description to lowcase
    //   Narrow.searchTermSubmitted=$filter('lowercase')(Narrow.searchTerm);
    //     var promise = MenuSearchService.getMatchedMenuItems(Narrow.searchTermSubmitted);
    //     promise.then(function(result){
    //       Narrow.found = result;
    //     });
    // };
    //
    // // remove one item with splice
    //   Narrow.remoteItem = function(index){
    //   Narrow.found.splice(index, 1);
    //
    //   Narrow.lastRemoveItem = Narrow.found[index].name + " was removed"
    //
    //   console.log(Narrow.lastRemoveItem)
    //
    // };

  }

  MenuSearchService.$inject = ['$http','searchFilter','$filter']
  function MenuSearchService($http, searchFilter, $filter){
    var service = this;

    service.searchTerm="";

    service.getMenuItems = function(){

      service.searchTermSubmitted="";
      service.found = [];

      // Filter search items description to lowcase

      service.searchTermSubmitted=$filter('lowercase')(service.searchTerm);
        var promise = service.getMatchedMenuItems(service.searchTermSubmitted);
        promise.then(function(result){
          service.found = result;
        });
    };

    // remove one item with splice
      service.remoteItem = function(index){
      service.found.splice(index, 1);

      service.lastRemoveItem = Narrow.found[index].name + " was removed"

      console.log(serivce.lastRemoveItem)
  }
}

FindMenuService.$inject = ['$http', 'searchFilter']
function FindMenuService($http, searchFilter){
  var Find = this;

  Find.getMatchedMenuItems = function(SearchItem){
    return $http(
      {
        method:'GET',
        url:'https://davids-restaurant.herokuapp.com/menu_items.json'
      }
    ).then(function(result){
        var filteredResult = [];
        if(SearchItem != ""){
          filteredResult = searchFilter(result.data.menu_items, SearchItem);
        }
        return filteredResult;
    });
  };
}


// FindMenuService.$inject = ['$http', 'searchFilter']
// function FindMenuService($http, searchFilter){
//   var Find = this;
//
//   Find.getMatchedMenuItems = function(SearchItem){
//     return $http(
//       {
//         method:'GET',
//         url:'https://davids-restaurant.herokuapp.com/menu_items.json'
//       }
//     ).then(function(result){
//         var filteredResult = [];
//         if(SearchItem != ""){
//           filteredResult = searchFilter(result.data.menu_items, SearchItem);
//         }
//         return filteredResult;
//     });
//   };
// }


  function FoundItemsDirective(){
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      // controller: NarrowItDownController,
      // controllerAs: 'Narrow',
      // bindToController: true
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
