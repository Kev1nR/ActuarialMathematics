/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="typings/angularjs/angular-route.d.ts" />
/// <reference path="typings/angularjs/angular-resource.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/mathjax/mathjax.d.ts" />
/// <reference path="controllers/survivalmodels.ts" />
/// <reference path="directives/utility.ts" />
/// <reference path="directives/charting.ts" />
/// <reference path="directives/ui.ts" />


module app {
    'use strict';

    var actuarialMathematics = angular.module(
        'actuarialMathematics', ['ngRoute']);

    actuarialMathematics.directive('sayHello', UtilityDirectives.SayHello);

    actuarialMathematics.directive('lineChart', Charting.Directive.LineChart);
    actuarialMathematics.directive('regex', UtilityDirectives.regex);
    actuarialMathematics.directive('metroPanelUi', UIComponents.MetroPanelUI);
    
    actuarialMathematics.config(['$routeProvider',
        function routes($routeProvider: ng.route.IRouteProvider) {
            $routeProvider
                .when('/', {
                templateUrl: 'Home/ChapterMenu',
                controller: MenuItems.ChapterMenu
            })
                .when('/SurvivalModels', {
                templateUrl: 'SurvivalModels',
                controller: SurvivalModels.ChapterMenu
            })
                .when('/SurvivalModels/GompertzLaw', {
                templateUrl: 'SurvivalModels/GompertzLaw',
                controller: SurvivalModels.Controller
            })
                .otherwise({
                redirectTo: '/'
            });
        }
    ]);
}