/**
 * Created by apelbaur on 6/19/2014.
 */
angular.module('util_module').directive('navBar', [function () {
    var drtv = {
        restrict: 'E',
        templateUrl: 'js/util/nav-tpl.html',
        scope: {
            pages: '='
        },
        controller: ['$scope', '$location', function ($scope, $location) {
            $scope.isActive = function (route) {
                return route === $location.path();
            };
        }]
    };
    return drtv;
}]);