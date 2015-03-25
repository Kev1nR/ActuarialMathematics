/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-route.d.ts" />
/// <reference path="../typings/angularjs/angular-resource.d.ts" />
'use strict';
var actuarialMathematics = angular.module('actuarialMathematics', []);
var SurvivalModels;
(function (SurvivalModels) {
    var Controller = (function () {
        function Controller($scope, $http, $rootScope) {
            this.scope = $scope;
            this.scope.Title = "Survival Models";
            this.scope.Description = "The Survival Models controller exposes functions relating to Chapter 2 of the book";
            this.scope.Results = [];
            this.scope.SimpleFn = function () {
                $http.get('http://localhost:5000/api/SurvivalModels/MyTest').success(function (data) {
                    alert("Got data");
                }).error(function (data, status, headers, config) {
                    alert(data);
                    alert("an error: " + status.toString());
                    alert("an error: " + headers.toString());
                });
            };
            this.scope.GompertzLaw = function (B, c, x) {
                var promise = $http.get('http://localhost:5000/api/SurvivalModels/Gompertz_law?B=0.1&c=1.05&x=60&precision=0.10').success(function (data) {
                    var results = data;
                    $scope.Results = results;
                    //return results;
                }).error(function (data, status, headers, config) {
                    alert(data);
                    alert("an error: " + status.toString());
                    alert("an error: " + headers.toString());
                });
                //var results: Array<GompertzLawKVPair> = [
                //    { Item1: 0, Item2: 0.123 },
                //    { Item1: 1, Item2: 1.123 },
                //    { Item1: 2, Item2: 2.123 },
                //    { Item1: 3, Item2: 3.123 },
                //    { Item1: 4, Item2: 4.123 }
                //];
                //return results;
                return promise;
            };
        }
        return Controller;
    })();
    SurvivalModels.Controller = Controller;
})(SurvivalModels || (SurvivalModels = {}));
actuarialMathematics.controller('SurvivalModels.Controller', SurvivalModels.Controller);
//# sourceMappingURL=SurvivalModels.js.map