module app {

    export module UIComponents {
        interface MetroPanel extends ng.IAttributes {
            colour: string;
            panelTitle: string;
        } 

        export function MetroPanelUI(): ng.IDirective {
            return {
                restrict: 'E',
                scope: {
                    colour: '@',
                    panelTitle: '@',
                },
                replace: false,
                transclude: true,
                template: '<div class="metro-panel">'
                        + '<div class="metro-panel metro-panel-title"> {{panelTitle}} </div>'
                        + '<div class="metro-panel metro-panel-body" ng-transclude> </div>'
                        + '</div>',
                link: (
                    scope,
                    element: ng.IAugmentedJQuery,
                    attributes: MetroPanel) => {
                    scope.panelTitle = attributes.panelTitle; 
                    
                    var titlePane = element.find(".metro-panel-title"); 
                    titlePane.css("background-color", attributes.colour);                
                    var rgbColour = titlePane.css("background-color");
                    
                    var bodyColour = rgbColour.replace("rgb", "rgba")
                        .replace("rgbaa", "rgba")
                        .replace(")", ", 0.2)");
                    var bodyPane = element.find(".metro-panel-body");
                    bodyPane.css("background-color", bodyColour);
                }
            }
        };
    }

} 