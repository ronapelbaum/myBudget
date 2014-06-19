/**
 * Created by apelbaur on 6/19/2014.
 */
angular.module('expenses_module').controller('expensePivotCtrl', ['$scope', '$http', '$filter' , function ($scope, $http, $filter) {
    $scope.pivot = {};
    $http.get('/getAllRecords', {params: {table: 'expenses'}}).
        success(function (data) {
            $scope.pivot = new Pivot(data, 'category', undefined, 'date', function (date) {
                return $filter('date')(date, 'MMM-yyyy');
            }, 'amount')
            ;
        }).
        error(errorFunction);
}]);