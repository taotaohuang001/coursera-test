!function(){"use strict";var e=document.getElementById("text");function t(t)
{t.message="",t.click=function(){var l="";const n=document.getElementById("lunch-menu");
if(0===n.value.length)e.style.color="red",n.style.borderColor="red",l="Please enter data first";else{e.style.color="green",n.style.borderColor="green",
l=n.value.split(",").length<=3?"Enjoy!":"Too Much!"}t.message=l}}
angular.module("LunchCheck",[]).controller("LunchCheckController",t),t.$inject=["$scope"]}();
