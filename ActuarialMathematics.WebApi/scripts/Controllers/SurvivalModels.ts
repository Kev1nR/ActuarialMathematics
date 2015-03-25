/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-route.d.ts" />
/// <reference path="../typings/angularjs/angular-resource.d.ts" />

'use strict';
var actuarialMathematics =
    angular.module(
        'actuarialMathematics', []);

module SurvivalModels {

    interface SurvivalModelsScope extends ng.IScope {
        Title: string;
        Description: string;
        SimpleFn: () => void;
        GompertzLaw: (B: number, c: number, x: number) => number;
    }

    export class Controller {
        constructor($scope: SurvivalModelsScope, $http) {
            $scope.Title = "Survival Models";
            $scope.Description = "The Survival Models controller exposes functions relating to Chapter 2 of the book";
            $scope.SimpleFn = function () {
                $http.get('http://localhost:5000/api/SurvivalModels/MyTest')
                    .success(function (data) {
                    alert("Got data");
                })
                    .error(function (data, status, headers, config) {
                    alert(data);
                    alert("an error: " + status.toString());
                    alert("an error: " + headers.toString());
                });                
            } 
            //function () { alert("Hello you - finally?"); }
            $scope.GompertzLaw = function (B, c, x) {
                $http.get('http://localhost:5000/api/SurvivalModels/MyTest')
                    .success(function (data) {
                    alert("Got data");
                })
                    .error(function (data, status, headers, config) {
                    alert(data);
                    alert("an error: " + status.toString());
                    alert("an error: " + headers.toString());
                });
                return B * c + x;
            }
        }
    }
}
actuarialMathematics.controller('SurvivalModels.Controller', SurvivalModels.Controller);