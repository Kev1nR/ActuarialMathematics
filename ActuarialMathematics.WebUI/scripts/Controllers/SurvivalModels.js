/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-route.d.ts" />
'use strict';
var actuarialMathematics = angular.module('actuarialMathematics', []);
var SurvivalModels;
(function (SurvivalModels) {
    actuarialMathematics.controller('SurvivalModels', function Controller($scope) {
        $scope.Title = "Survival Models";
        $scope.Description = "The Survival Models controller exposes functions relating to Chapter 2 of the book";
        $scope.SimpleFn = function () {
            alert("Hello you - finally?");
        };
        $scope.GompertzLaw = function (B, c, x) {
            return B * c + x;
        };
    });
})(SurvivalModels || (SurvivalModels = {}));
//# sourceMappingURL=SurvivalModels.js.map