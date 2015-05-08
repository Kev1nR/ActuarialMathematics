/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="typings/angularjs/angular-route.d.ts" />
/// <reference path="typings/angularjs/angular-resource.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="controllers/survivalmodels.ts" />
/// <reference path="directives/utility.ts" />
/// <reference path="directives/charting.ts" />

module app {
    'use strict';
    var actuarialMathematics = angular.module(
        'actuarialMathematics', []);

    actuarialMathematics.controller('SurvivalModels.Controller', SurvivalModels.Controller);
    actuarialMathematics.directive('sayHello', UtilityDirectives.SayHello);
    
    actuarialMathematics.directive('lineChart', Charting.Directive.LineChart);
    actuarialMathematics.directive('regex', UtilityDirectives.regex);
}