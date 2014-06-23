/**
 * Created by apelbaur on 6/22/2014.
 */
angular.module('myBudget_module').controller('expIncomeCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.newIncome = {};
    $scope.incomeList = [];

    var refreshList = function () {
        //get the income list
        $http.get('/getAllRecords', {params: {table: 'income'}}).
            success(function (data) {
                $scope.incomeList = data;
            }).
            error(errorFunction);
    };

    refreshList();


    $scope.save = function () {
        //add the income
        $http.post('/addRecord', $scope.newIncome, {params: {table: 'income', id: $scope.newIncome.category}}).
            success(function (data) {
                refreshList();
            }).
            error(errorFunction);
    };
    $scope.remove = function (id) {
        $http.post('/removeRecord', {}, {params: {table: 'income', id: id}}).
            success(function (data) {
                refreshList();
            }).
            error(errorFunction);
        //TODO remove last record
    };


}]);