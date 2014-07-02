/**
 * Created by apelbaur on 7/2/2014.
 */
angular.module('util_module').directive('caret', [function () {
    return {
        restrict: 'E',
        template: '<span ng-class="{dropup:up}"><span class="caret"></span></span>',
        scope: {up: '='}
    };
}]);
