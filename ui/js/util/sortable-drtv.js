/**
 * Created by apelbaur on 6/19/2014.
 */
angular.module('util_module').directive('sortableTable', [function () {
    return {
        restrict: 'E',
        templateUrl: 'js/util/sortable-tpl.html',
        scope: {
            data: '=',
            onRowClick:'='
        },
        controller: ['$scope', '$parse',  function ($scope,$parse) {
            $scope.reverse = false;
            $scope.order = undefined;
            $scope.setOrder = function (order) {
                $scope.reverse = $scope.order === order &&! $scope.reverse ;
                $scope.order = order;
            };

            $scope.rowClicked = function(row){
                $parse($scope.onRowClick(row));
            }
        }]
    };
}]);