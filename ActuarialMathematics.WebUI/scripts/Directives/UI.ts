module app {

    export module UIComponents {
        interface MetroPanel extends ng.IAttributes {
            colour: string;
            panelTitle: string;
        }

        class CssParser {
            elem: any;
            GetNewHeight: (adjustPercent: number) => string;
            GetNewWidth: (adjustPercent: number) => string;
            GetBorder: () => string;

            adjustNumeric = function (adjustPercent: number, value: string) {
                var origVal = parseFloat(value);
                var adjustedVal = origVal * (adjustPercent / 100.0);
                return adjustedVal;
            };

            constructor(elem: any) {
                this.elem = elem;
                this.GetNewHeight = function (adjustPercent: number) {
                    var adjustedHeight = this.adjustNumeric(adjustPercent, this.elem.css("height"));
                    return adjustedHeight.toString() + "px";
                };

                this.GetNewWidth = function (adjustPercent: number) {
                    var adjustedWidth = this.adjustNumeric(adjustPercent, this.elem.css("width"));
                    return adjustedWidth.toString() + "px";
                };

                this.GetBorder = function () {
                    var w = this.elem.css("border-bottom-width");
                    var s = this.elem.css("border-bottom-style");
                    var c = this.elem.css("border-bottom-color");
                    return w + " " + s + " " + c;
                };
            }


        }

        export function MetroPanelUI(): ng.IDirective {
            return {
                restrict: 'E',
                scope: {
                    colour: '@',
                    panelTitle: '@',
                    url: '@'
                },
                replace: false,
                transclude: true,
                template: '<div class="metro-panel">'
                + '<div class="metro-panel metro-panel-title"><a href={{url}}> {{panelTitle}} </a></div>'
                + '<div class="metro-panel metro-panel-body" ng-transclude> </div>'
                + '</div>',
                link: (
                    scope,
                    element: ng.IAugmentedJQuery,
                    attributes: MetroPanel) => {
                    scope.panelTitle = attributes.panelTitle;

                    var cssadjust = new CssParser(element);

                    var titlePane = element.find(".metro-panel-title");
                    titlePane.css("background-color", attributes.colour);
                    var rgbColour = titlePane.css("background-color");
                    titlePane.css("height", cssadjust.GetNewHeight(15));
                    titlePane.css("text-align", "center");
                    titlePane.css("font-weight", "700");
                    titlePane.css("font-size", "larger");
                    titlePane.css("padding", "10px 0 0 0");
                    var b = cssadjust.GetBorder();
                    titlePane.css("border-bottom", cssadjust.GetBorder());

                    var bodyColour = rgbColour.replace("rgb", "rgba")
                        .replace("rgbaa", "rgba")
                        .replace(")", ", 0.2)");
                    var bodyPane = element.find(".metro-panel-body");
                    bodyPane.css("background-color", bodyColour);
                    bodyPane.css("height", cssadjust.GetNewHeight(85));

                    MathJax.Hub.Queue(["Typeset", MathJax.Hub]); 
                }
            }
        };
    }

} 