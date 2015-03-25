/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-route.d.ts" />
/// <reference path="../typings/angularjs/angular-resource.d.ts" />
'use strict';
var actuarialMathematics = angular.module('actuarialMathematics', []);
var SurvivalModels;
(function (SurvivalModels) {
    var Controller = (function () {
        function Controller($scope, $http) {
            $scope.Title = "Survival Models";
            $scope.Description = "The Survival Models controller exposes functions relating to Chapter 2 of the book";
            $scope.SimpleFn = function () {
                $http.get('http://localhost:5000/api/SurvivalModels/MyTest').success(function (data) {

                    alert("Got data");
                    for (var i = 0; i < data.length; i++)
                    {
                        var obje = data[i];
                        alert("obj " + i.toString() + " " + obje.toString());
                    }

                }).error(function (data, status, headers, config) {
                    alert(data);
                    alert("an error: " + status.toString());
                    alert("an error: " + headers.toString());
                });
            };
            //function () { alert("Hello you - finally?"); }
            $scope.GompertzLaw = function (B, c, x) {
                $http.get('http://localhost:5000/api/SurvivalModels/Gompertz_law?B=0.1&c=20.0&x=60&precision=1.0').success(function (data) {
                    alert("Got data" + data.toString());
                }).error(function (data, status, headers, config) {
                    alert(data);
                    alert("an error: " + status.toString());
                    alert("an error: " + headers.toString());
                });
                return B * c + x;
            };
        }
        return Controller;
    })();
    SurvivalModels.Controller = Controller;
})(SurvivalModels || (SurvivalModels = {}));
actuarialMathematics.controller('SurvivalModels.Controller', SurvivalModels.Controller);
//# sourceMappingURL=SurvivalModels.js.map