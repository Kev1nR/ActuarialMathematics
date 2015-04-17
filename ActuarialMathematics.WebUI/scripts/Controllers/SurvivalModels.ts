/// <reference path="startup.ts" />

module SurvivalModels {

    export interface SurvivalModelsScope extends ng.IScope {
        Title: string;
        Description: string;
        SimpleFn: () => void;
        GompertzLawResults: GompertzLawKVPair[];
        GompertzLawChartData: any;
        GompertzLaw: (B: number, c: number, x: number) => Array<GompertzLawKVPair>;
    }

    interface GompertzLawKVPair {
        t: number;
        mortality: number;
    }
       
    export class Controller {
        scope: SurvivalModelsScope;
    
        constructor($scope: SurvivalModelsScope, $http, $rootScope) {
            this.scope = $scope;

            this.scope.Title = "Survival Models";
            this.scope.Description = "The Survival Models controller exposes functions relating to Chapter 2 of the book";
            this.scope.GompertzLawResults = [];
            this.scope.GompertzLawChartData = [];

            this.scope.SimpleFn = function () {
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

            this.scope.GompertzLaw = function (B, c, x) {
                var url = 'http://localhost:5000/api/SurvivalModels/Gompertz_law?B=' + B +
                    '&c=' + c + 
                    '&x=' + x 
                var promise =
                    $http.get(url)
                        .success(function (data) {
                        var chartdata = [];
                        for (var i = 0; i < data.length; i++) {
                            chartdata.push([data[i].t, data[i].mortality]);
                        };      
                            
                        var results = [{ label: "Age 60", data: chartdata, points: { symbol: "circle", fillColor: "#058DC7" }, color: '#058DC7'}]


                        $scope.GompertzLawChartData = results;

                        $scope.GompertzLawResults = data;
                    })
                        .error(function (data, status, headers, config) {
                        alert(data);
                        alert("an error: " + status.toString());
                        alert("an error: " + headers.toString());                        
                    });

                return promise;
            }
        }
    }
}
actuarialMathematics.controller('SurvivalModels.Controller', SurvivalModels.Controller);