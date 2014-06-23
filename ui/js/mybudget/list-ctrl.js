/**
 * Created by apelbaur on 6/19/2014.
 */
angular.module('myBudget_module').controller('expListCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.expensesList = [];
    $http.get('/getAllRecords', {params: {table: 'expenses'}}).
        success(function (data) {
            $scope.expensesList = data;
        }).
        error(errorFunction);

    $scope.setFilter = function (filterProp) {
        $scope.filterProp = $scope.filterProp ? undefined : filterProp;
    };
    $scope.setOrder = function (orderProp) {
        if ($scope.orderProp && $scope.orderProp.indexOf('-') < 0) {
            $scope.orderProp = '-' + orderProp;
        } else {
            $scope.orderProp = orderProp;
        }
    };


    $scope.edit = function (id) {
        $location.path('/edit/' + id);
    }

} ]);