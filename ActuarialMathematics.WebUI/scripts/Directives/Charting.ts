module app {
    export module Charting.Directive {
        'use strict';

        export interface IChartingScope extends ng.IScope {
            name: string;
        }

        export interface IChartingAttributes extends ng.IAttributes {
            chartData: string;
            xaxisTitle: string;
            yaxisTitle: string;
        }

        export function LineChart(): ng.IDirective {
            var linkFn = (
                scope: SurvivalModels.SurvivalModelsScope,
                element: ng.IAugmentedJQuery,
                attributes: IChartingAttributes) => {

                var options = {
                    series: {
                        lines: { show: true },
                        points: {
                            radius: 0.5,
                            show: true,
                            fill: true
                        }
                    },
                    yaxis: {
                        axisLabel: attributes.yaxisTitle || 'Y-Axis',
                        axisLabelUseCanvas: true,
                        axisLabelFontSizePixels: 12,
                        axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                        axisLabelPadding: 5
                    },
                    xaxis: {
                        min: 0,
                        axisLabel: attributes.xaxisTitle || 'X-Axis',
                        axisLabelUseCanvas: true,
                        axisLabelFontSizePixels: 12,
                        axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                        axisLabelPadding: 5
                    },
                    grid: { hoverable: true },
                    legend: { labelBoxBorderColor: "none", position: "left" }
                };

                scope.$watch(attributes.chartData, function (newValue, oldValue) {
                    if (oldValue != newValue) {
                        $.plot($("#chart-placeholder"), newValue, options);
                    }
                }, true);
            }

            return {
                restrict: 'E',
                replace: false,
                template: '<div id=\'chart-placeholder\' class=\'demo-placeholder\'></div>',
                link: linkFn
            }
        }
    }
}