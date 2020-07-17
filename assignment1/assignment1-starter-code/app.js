(function () {
'use strict';

angular.module('assignment1', [])
.controller('LunchCheckController', function ($scope) {
  $scope.lunchItems="";
  $scope.showMessage="";
  $scope.monitor=function(){
    var count=0;
    var items=$scope.lunchItems.split(',');
    var emptybox="Please enter data first";
    var enjoy="Enjoy!";
    var toomuch="Too Much !";
    for (var i=0; i<items.length; i++){
      if(items[i]){
        count++;
      }
    }
    if (count==0){
      $scope.showMessage=emptybox;
      $scope.style="color:red;"
    } else if (count>=3){
      $scope.showMessage=toomuch;
    } else {
      $scope.showMessage=enjoy;
    }
  }
});

})();
