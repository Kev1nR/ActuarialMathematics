/// <reference path="startup.ts" />

module Charting.Directive {
    'use strict';

    export interface IChartingScope extends ng.IScope
    {
        name: string;
    }

    export interface IChartingAttributes extends ng.IAttributes {
        chosenOne: string;
    }

    export class LineChart {
        public link: (scope: IChartingScope,
        element: ng.IAugmentedJQuery,
        attrs: IChartingAttributes) => void;

        public template = '<div id="chartplaceholder">Chart goes here</div>';
        public scope = {};

        constructor() {
            this.link = (scope: IChartingScope,
                element: ng.IAugmentedJQuery,
                attrs: IChartingAttributes) =>
                {
                scope.name = attrs.chosenOne;
            };
        }

        public static Factory()
        {
            var directive = () => {
                return new LineChart();
            };

            directive['$inject'] = [''];

            return directive;
        }
    }
    //export function LineChart(): ng.IDirective
    //{
    //    return {
    //        restrict: 'E',
    //        require: ['ngModel'],
    //        template: '<div id="chartplaceholder">Chart goes here</div>',
    //        replace: true,
    //        link: 
    //    };
    //}
}
//actuarialMathematics.directive('chartingDirective', , Charting.Directive.LineChart);