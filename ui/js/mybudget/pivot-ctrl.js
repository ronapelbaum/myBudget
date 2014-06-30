/**
 * Created by apelbaur on 6/19/2014.
 */
angular.module('myBudget_module').controller('expPivotCtrl', ['$scope', '$http', '$filter' , function ($scope, $http, $filter) {
    var expenses = [];
    var calcPivot = function () {
        var rowsFilter = $scope.pivotBy.category ? 'category' : 'All Categories';
        var columnsFilter = $scope.pivotBy.month ? 'date' : 'Total2';
        $scope.pivot = new Pivot(expenses, rowsFilter, undefined, columnsFilter, function (date) {
            return $filter('date')(date, 'MMM-yyyy');
        }, 'amount');
        console.log($scope.pivot);
    };
    $scope.pivot = {};
    $scope.pivotBy = {category: true, month: true};
    $scope.$watch('pivotBy.category', calcPivot);
    $scope.$watch('pivotBy.month', calcPivot);
    $http.get('/getExpensesList').
        success(function (data) {
            expenses = data;
            calcPivot();
        }).
        error(errorFunction);
}]);