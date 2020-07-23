(function () {
'use strict';
angular.module('LunchCheck',[])
    .controller('LunchCheckController', LunchCheckController);


    LunchCheckController.$inject=['$scope'];
function LunchCheckController($scope) {
    $scope.gifts="";
    $scope.msg="";
    $scope.warning="";
    $scope.color="black";
    $scope.checkPresents=function () {
        $scope.warning='';
        let str=$scope.gifts;
        if(str.trim().length === 0){
            $scope.msg='Please enter data first';
            $scope.color='red';

        }
        else{
            let count=0;
            let items=str.split(',');
            for(let i=0; i<items.length;i++){
                if(items[i].trim().length!=0){
                    count++;
                }
                else{
                    $scope.warning="Empty item is not considered."
                }
            }
            if(count>0 && count<4){
                $scope.color='green';
                $scope.msg='Enjoy!'
            }
            else if(count>3) {
                $scope.color='green';
                $scope.msg='Too much!';
            }
        }
    }


}
})();
