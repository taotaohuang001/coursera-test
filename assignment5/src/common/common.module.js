(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://still-reaches-10754.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
