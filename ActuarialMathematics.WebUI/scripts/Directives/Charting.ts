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

                function plothover(event, pos, item) {
                    if (item) {
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);

                        var tooltipText =
                            item.series.label + ":<br/>"
                            + attributes.xaxisTitle + " = " + x + "<br/>"
                            + attributes.yaxisTitle + " = " + y;

                        $("#tooltip").html(tooltipText)
                            .css({ top: item.pageY + 5, left: item.pageX + 5 })
                            .fadeIn(200);
                    } else {
                        $("#tooltip").hide();
                    }
                }

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
                    grid: { hoverable: true, clickable: true },
                    legend: { labelBoxBorderColor: "none", position: "left" }
                };

                scope.$watch(attributes.chartData, function (newValue, oldValue) {
                    if (oldValue != newValue) {
                        $.plot($("#chart-placeholder"), newValue, options);
                    }
                }, true);

                $("<div id='tooltip'></div>").css({
                    position: "absolute",
                    display: "none",
                    border: "1px solid #fdd",
                    padding: "2px",
                    "background-color": "#fee",
                    opacity: 0.80
                }).appendTo("body");

                $("#chart-placeholder").on("plothover", this, plothover);                
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

