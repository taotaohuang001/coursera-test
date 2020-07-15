(function () {
'use strict';

angular.module('assignment1', [])
.controller('MyFirstController', function ($scope) {
  $scope.setMessage="";
  $scope.lunchItems="";
  $scope.inputBoxStyle={};
  $scope.turnGreen = function() {
    $scope.inputBoxStyle.borderClass = 'green-border';
  };
  $scope.listenFor=function(){
    var itemArray=$scope.lunchItems.split(',');
    var count=0;

    var emptyString="Please enter data first";
    var lessThanThree="Enjoy!";
    var moreThanThree="Too Much !";
    for (var i=0; i<itemArray.length; i++){
      if(itemArray[i]){
        count++;
      }
    }
    if (count==0){
      $scope.turnGreen();
      $scope.setMessage=emptyString;


    } else if (count<=3){
      $scope.setMessage=lessThanThree;
    } else {
      $scope.setMessage=moreThanThree;
    }
  }
});

})();
