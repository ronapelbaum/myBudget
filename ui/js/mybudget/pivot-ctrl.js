/**
 * Created by apelbaur on 6/19/2014.
 */
angular.module('myBudget_module').controller('expPivotCtrl', ['$scope', '$http', '$filter' , function ($scope, $http, $filter) {
    var expenses = [];
    $scope.pivot = {};
    $http.get('/getExpensesList').
        success(function (data) {
            expenses = data;
            $scope.pivot = new Pivot(expenses, 'category', undefined, 'date', function (date) {
                return $filter('date')(date, 'MMM-yyyy');
            }, 'amount')
            ;
        }).
        error(errorFunction);
}]);