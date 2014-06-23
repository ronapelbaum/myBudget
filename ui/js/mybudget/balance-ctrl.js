/**
 * Created by apelbaur on 6/22/2014.
 */
angular.module('myBudget_module').controller('expBalanceCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.today = new Date();
    $scope.sumIncome = 0;
    $scope.sumExpenses = 0;
    $http.get('/getAllRecords', {params: {table: 'expenses'}}).
        success(function (data) {
            for (var i = 0; i < data.length; i++) {
                $scope.sumExpenses += data[i].amount;
            }
        }).
        error(errorFunction);
    $http.get('/getAllRecords', {params: {table: 'income'}}).
        success(function (data) {
            for (var i = 0; i < data.length; i++) {
                $scope.sumIncome += data[i].amount;
            }
        }).
        error(errorFunction);

}]);