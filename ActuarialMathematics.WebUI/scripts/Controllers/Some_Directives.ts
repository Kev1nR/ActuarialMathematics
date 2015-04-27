/// <reference path="startup.ts" />
/// <reference path="../typings/flot/jquery.flot.d.ts" />

module MyDirectives {

    export interface GreetingScope extends ng.IScope {
        yourname: string;
    }

    export function SayHello(): ng.IDirective {
        return {
            restrict: 'A',
            scope: '@yourname',
            link: ($scope: GreetingScope,
                element: JQuery,
                attributes) => {
                element.on('mouseenter', function () {
                    element.css({ "background-color": "red" });
                })
                .on('mouseleave', function () {
                    element.css({ "background-color": "white" });
                })
                .on("click", function () {
                    alert("Hello");
                });
            }
        }
    };

    export function MyChart(): ng.IDirective {

        return {
            restrict: 'E',
            replace: false,
            template: '<div id=\'chart-placeholder\' class=\'demo-placeholder\'></div>',
            link: (scope: SurvivalModels.SurvivalModelsScope, element: JQuery, attributes) => {
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
                            axisLabel: 'Mortality',
                            axisLabelUseCanvas: true,
                            axisLabelFontSizePixels: 12,
                            axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                            axisLabelPadding: -50
                        },
                        xaxis: {
                            min: 0,
                            axisLabel: 'Years after age',
                            axisLabelUseCanvas: true,
                            axisLabelFontSizePixels: 12,
                            axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                            axisLabelPadding: 20    
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
        }
    };
}
actuarialMathematics.directive('sayHello', MyDirectives.SayHello);
actuarialMathematics.directive('myChart', MyDirectives.MyChart);
//actuarialMathematics.directive("myWidget", function () {
//    var linkFunction = function (scope, element, attributes) {
//        var paragraph = element.children()[0];
//        $(paragraph).on("click", function () {
//            $(this).css({ "background-color": "red" });   
//        });
//    };

//    return 
//    {
//    restrict: "E",
//    link: linkFunction
//    };
//});
 