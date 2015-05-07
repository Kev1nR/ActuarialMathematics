/// <reference path="startup.ts" />
/// <reference path="../typings/flot/jquery.flot.d.ts" />
var MyDirectives;
(function (MyDirectives) {
    function SayHello() {
        return {
            restrict: 'A',
            scope: '@yourname',
            link: function ($scope, element, attributes) {
                element.on('mouseenter', function () {
                    element.css({ "background-color": "red" });
                }).on('mouseleave', function () {
                    element.css({ "background-color": "white" });
                }).on("click", function () {
                    alert("Hello");
                });
            }
        };
    }
    MyDirectives.SayHello = SayHello;
    ;
    function regex() {
        return {
            restrict: 'A',
            require: 'ngModel',
            //scope: '@yourname',
            link: function (scope, element, attributes, ctrl) {
                var viewValue = element.val();
                //var regex = attributes("regex");
                ctrl.$parsers.push(function (viewValue) {
                    if (viewValue == undefined)
                        return "";
                    var validatedValue = viewValue.replace(/[^0-9\.+-]/g, '');
                    if (validatedValue != viewValue) {
                        ctrl.$setViewValue(validatedValue);
                        ctrl.$render();
                    }
                    return validatedValue;
                });
                //function fixit(viewValue) {
                //    alert("in fixit " + viewValue.toString());
                //    return viewValue;
                //};
                //element.keypress(function () {
                //    alert("Hello");
                //    ctrl.$parsers.unshift(fixit);
                //});
            }
        };
    }
    MyDirectives.regex = regex;
    ;
    function MyChart() {
        return {
            restrict: 'E',
            replace: false,
            template: '<div id=\'chart-placeholder\' class=\'demo-placeholder\'></div>',
            link: function (scope, element, attributes) {
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
                        axisLabelPadding: 5
                    },
                    xaxis: {
                        min: 0,
                        axisLabel: 'Years after age',
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
        };
    }
    MyDirectives.MyChart = MyChart;
    ;
})(MyDirectives || (MyDirectives = {}));
actuarialMathematics.directive('sayHello', MyDirectives.SayHello);
actuarialMathematics.directive('myChart', MyDirectives.MyChart);
actuarialMathematics.directive('regex', MyDirectives.regex);
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
//# sourceMappingURL=Some_Directives.js.map