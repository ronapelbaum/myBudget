/**
 * Created by apelbaur on 6/19/2014.
 */
angular.module('myBudget_module').controller('expEditCtrl', ['$scope', '$http', '$location', '$routeParams', '$filter', function ($scope, $http, $location, $routeParams, $filter) {
    $scope.expense = {};
    $scope.categories = [];
    //check if we are in edit mode
    if ($routeParams.id) {
        //get record to edit
        $http.get('/getExpense', {params: {id: $routeParams.id}}).
            success(function (data) {
                $scope.expense = data;
            }).
            error(errorFunction);
    } else {
        //new record mode
        $scope.expense.date = new Date();
    }
    //get the categories for 'typeahead'
    $http.get('/getCategoriesList').
        success(function (data) {
            $scope.categories = data;
        }).
        error(errorFunction);

    $scope.save = function () {
        $scope.expense.amount = $scope.expense.amount || 0;
        //add the expense
        $http.post('/addExpense', $scope.expense).
            success(function (data) {
            }).
            error(errorFunction);
        $location.path('/list');
    };
    $scope.remove = function () {
        $http.post('/removeExpense', {}, {params: {id: $routeParams.id}}).
            success(function (data) {
                $scope.expense = data;
            }).
            error(errorFunction);
        //TODO remove last record
        $location.path('/list');
    };


    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = !!!$scope.opened;
    };
}]);