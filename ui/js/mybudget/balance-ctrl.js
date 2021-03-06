/**
 * Created by apelbaur on 6/22/2014.
 */
angular.module('myBudget_module').controller('expBalanceCtrl', ['$scope', '$http', function ($scope, $http) {
    var today = new Date();
    $scope.today = today;
    $scope.sumIncome = 0;
    $scope.sumExpenses = 0;
    var filter = DateUtils.getMonthOffset(today);
    $http.get('/getExpensesSum', {params: {filter: filter}}).
        success(function (data) {
            $scope.sumExpenses = data.total;
        }).
        error(errorFunction);
    $http.get('/getIncomeSum').
        success(function (data) {
            $scope.sumIncome = data.total;
        }).
        error(errorFunction);

}]);