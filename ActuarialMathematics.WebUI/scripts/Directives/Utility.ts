/// <reference path="../typings/flot/jquery.flot.d.ts" />

module app {
    'use strict';

    export module UtilityDirectives {

        export interface GreetingScope extends ng.IScope {
            yourname: string;
        }

        export function SayHello(): ng.IDirective {
            return {
                restrict: 'A',
                scope: {
                    yourname: '@sayHello'
                },
                link: (scope: GreetingScope,
                    element: JQuery,
                    attributes) => {
                    element.on("click", function () {
                        var hellostring = "Hello " + scope.yourname;
                        alert(hellostring);
                    });
                }
            }
        };

        interface RegexAttributes extends ng.IAttributes {
            regex: string;
        }

        export function regex(): ng.IDirective {

            return {
                restrict: 'A',
                require: 'ngModel',
                link: (scope: ng.IScope,
                    element: JQuery,
                    attributes: RegexAttributes,
                    ctrl: ng.INgModelController) => {
                    var viewValue = element.val();
                    var regex = new RegExp(attributes.regex, "g");

                    ctrl.$parsers.push(function (viewValue) {
                        if (viewValue == undefined)
                            return ""

                        var validatedValue = "";

                        var reMatch = viewValue.match(regex);
                        if (reMatch != null) {
                            if (reMatch.length > 0) {
                                validatedValue = viewValue.match(regex)[0];
                            }
                        }

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
            }
        };

        
    }
}
    
//actuarialMathematics.directive('saySomething', Directive_Wrapper.SaySomething.Factory());
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
 