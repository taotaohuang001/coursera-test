(function(){
  'use strict';

  angular.module('NarrowItDownApp',[]).
  controller('NarrowItDownController', NarrowItDownController).
  service('MenuSearchService', MenuSearchService).
  filter('search', SearchTermFilter).
  directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService']
  function NarrowItDownController(MenuSearchService){
    var Narrow = this;

    Narrow.searchedItem = ""

    Narrow.getMenuItems = function(){
        MenuSearchService.getMatchedMenuItems(Narrow.searchedItem).then(function(result){
          Narrow.found = MenuSearchService.filteredResult;
          Narrow.result = result;
          console.log("controller results: " + result);
        })
    }

    Narrow.remoteItem = function(index){
      Narrow.lastRemoveItem = Narrow.found[index].name + " was removed"
      Narrow.found.splice(index, 1);
    };

  }

  MenuSearchService.$inject = ['$http','searchFilter','$filter']
  function MenuSearchService($http, searchFilter, $filter){
    var service = this;
    service.getMatchedMenuItems = function(SearchItem){
      return $http(
        {
          method:'GET',
          url:'https://davids-restaurant.herokuapp.com/menu_items.json'
        }
      ).then(
        function successCallback(result){
          if(SearchItem.trim() != ""){
            service.filteredResult = [];
            service.searchNameLowerCase=$filter('lowercase')(SearchItem);
            service.filteredResult = searchFilter(result.data.menu_items, service.searchNameLowerCase);
            // console.log('service.filteredResult  ' + service.filteredResult[0].description)
            result = true;

                    console.log('results true: ' + result);
          }
          else{
            result = false;
            console.log('search something')
                    console.log('results false: ' + result);
          }
                    console.log('results overall: ' + result);
          return result
        },
        function errorCallback(response) {
                console.log('link cannot be openned') }
        );
    };
}

  function FoundItemsDirective(){
    var ddo = {
      templateUrl: 'foundItems.html',
      // transclude: true,
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

  // MenuSearchService.getMatchedMenuItems(Narrow.searchedItem)
  // Use promise for this searhcing results, when search is returned in the end.
          // var promise = MenuSearchService.getMatchedMenuItems(Narrow.searchedItem);
          // promise.then(function(result){
          //   // console.log('Narrow.found before ' + Narrow.found )
          //   // console.log('MenuSearchService.filteredResult before ' + MenuSearchService.filteredResult )
          //   Narrow.found = MenuSearchService.filteredResult
          //   // console.log('Narrow.found after' + Narrow.found )
          //   // console.log('MenuSearchService.filteredResult after' + MenuSearchService.filteredResult )
          // })


})();
