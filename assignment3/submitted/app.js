(function(){
  'use strict';

  angular.module('NarrowItDownApp',[]).
  controller('NarrowItDownController', NarrowItDownController).
  service('MenuSearchService', MenuSearchService).
  filter('search', SearchTermFilter).
  directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService']
  function NarrowItDownController(MenuSearchService,FindMenuService,$http){
    var Narrow = this;

    Narrow.searchedItem = "Egg"


    // console.log("Narrow.found:" + Narrow.found[1]);
    // console.log("Narrow.found2:" + (MenuSearchService.getMatchedMenuItems(Narrow.searchedItem))[0].description);
    Narrow.found = MenuSearchService.getMatchedMenuItems(Narrow.searchedItem)
    console.log("Narrow.found:" + Narrow.found);
    Narrow.getMenuItems = function(){
      MenuSearchService.getMatchedMenuItems(Narrow.searchedItem)
// MenuSearchService.getMatchedMenuItems(Narrow.searchedItem)
    }

    // Narrow.getMenuItems();

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

    service.kkk =[111]

// Get http-data and fillter the list
    service.getMatchedMenuItems = function(SearchItem){

      var filteredResultRaw = {};
      var save



      return $http(
        {
          method:'GET',
          url:'https://davids-restaurant.herokuapp.com/menu_items.json'
        }
      ).then(function(result){
          if(SearchItem != ""){
            service.searchNameLowerCase=$filter('lowercase')(SearchItem);
            service.filteredResult = searchFilter(result.data.menu_items, service.searchNameLowerCase);
          }
           console.log('works! ' + service.filteredResult[0].description)
          return service.filteredResult;

      });


    };




    // service.searchTerm="";
    //
    // service.getItemsMatchedDescription = function(searchName){
    //
    //   searchLowerCase="";
    //   service.found = [];
    //
    //   searchLowerCase=$filter('lowercase')(searchName);
    //     var promise = service.getMatchedMenuItems(service.searchTermSubmitted);
    //     promise.then(function(result){
    //       service.found = result;
    //     });
    // };
  //
  //   // remove one item with splice
  //     service.remoteItem = function(index){
  //     service.found.splice(index, 1);
  //
  //     service.lastRemoveItem = Narrow.found[index].name + " was removed"
  //
  //     console.log(serivce.lastRemoveItem)
  // }
}


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
