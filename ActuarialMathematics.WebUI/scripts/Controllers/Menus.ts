module app {
    'use strict';

    export module MenuItems {

        export interface MenuItem {
            Title: string;
            Template: string;
            Colour: any;
            Url: string; 
        }

        export interface MenuItemScope extends ng.IScope {
            MenuItems: Array<MenuItem>;
        }

        export class MenuItemImpl implements MenuItem {
            public Title: string;
            public Template: string;
            public Colour: any;
            public Url: string;

            constructor(title: string, template: string, colour: any, url: string) {
                this.Title = title;
                this.Template = template;
                this.Colour = colour;
                this.Url = url;
            }
        }

        export class ChapterMenu {
            scope: MenuItemScope; 

            constructor($scope: MenuItemScope) {
                this.scope = $scope;
                this.scope.MenuItems = new Array<MenuItem>();
                this.scope.MenuItems.push(new MenuItemImpl("Survival Models", "This is the Survival models chapter 2", "Pink", 'SurvivalModels'));
                this.scope.MenuItems.push(new MenuItemImpl("Annuities", "This is the Annuities chapter x", "Green", 'Annuities'));               
            }
        }

        
    }
} 