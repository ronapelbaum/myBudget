/**
 * Created by apelbaur on 6/22/2014.
 */
angular.module('myBudget_module').controller('expIncomeCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.newIncome = {};
    $scope.incomeList = [];

    var refreshList = function () {
        //get the income list
        $http.get('/getIncomeList').
            success(function (data) {
                $scope.incomeList = data;
            }).
            error(errorFunction);
    };

    refreshList();


    $scope.save = function () {
        //add the income
        $http.post('/addIncome', $scope.newIncome).
            success(function (data) {
                refreshList();
            }).
            error(errorFunction);
    };
    $scope.remove = function (id) {
        $http.post('/removeIncome', {}, {params: {id: id}}).
            success(function (data) {
                refreshList();
            }).
            error(errorFunction);
        //TODO remove last record
    };


}]);