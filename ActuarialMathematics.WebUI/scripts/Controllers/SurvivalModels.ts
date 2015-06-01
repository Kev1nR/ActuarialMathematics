module app {
    'use strict';

    export module SurvivalModels {

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
            colours: { [Age: string]: string };

            constructor($scope: SurvivalModelsScope, $http) {
                var self = this;
                this.scope = $scope;

                this.colours = {
                    "20": "Red",
                    "50": "Blue",
                    "80": "Green"
                };
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
                            self.colours = {
                                "20": "Red",
                                "50": "Blue",
                                "80": "Green",
                            };
                            self.colours[x.toString()] = "Black";

                            var results = [];
                        
                            for (var i = 0; i < data.length; i++) {
                                var chartdata = [];
                                for (var j = 0; j < data[i].GLData.length; j++) {
                                    chartdata.push([data[i].GLData[j].t, data[i].GLData[j].mortality]);
                                }
                                var chartLine = {
                                    label: "Age " + data[i].age.toString(),
                                    data: chartdata,

                                    color: self.colours[data[i].age.toString()]
                                };

                                results.push(chartLine);
                            };

                            $scope.GompertzLawChartData = results;

                            $scope.GompertzLawResults = data;
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].age.toString() === x) {
                                    $scope.GompertzLawResults = data[i].GLData;
                                    break;
                                }
                            }
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

        export class ChapterMenu {
            scope: MenuItems.MenuItemScope;

            constructor($scope: MenuItems.MenuItemScope) {
                this.scope = $scope;
                this.scope.MenuItems = new Array<MenuItems.MenuItem>();
                this.scope.MenuItems.push(new MenuItems.MenuItemImpl("Gompertz' Law", "Gompertz' Law ... $$ S_x(t) = exp \\left\\{ \\frac{-B}{\\log c} c^x (c^t - 1 ) \\right\\} $$", "Pink", 'SurvivalModels/GompertzLaw'));
                this.scope.MenuItems.push(new MenuItems.MenuItemImpl("Makeham's Law", "Makeham's Law ...", "Green", 'SurvivalModels/MakehamsLaw'));
            }
        }
    }
}