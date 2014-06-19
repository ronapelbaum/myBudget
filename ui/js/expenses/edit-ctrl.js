/**
 * Created by apelbaur on 6/19/2014.
 */
angular.module('expenses_module').controller('editExpenseCtrl', ['$scope', '$http', '$location', '$routeParams', '$filter', function ($scope, $http, $location, $routeParams, $filter) {
    $scope.expense = {};
    $scope.categories = [];
    //check if we are in edit mode
    if ($routeParams.id) {
        //get record to edit
        console.log('id: ' + $routeParams.id);
        $http.get('/getRecord', {params: {table: 'expenses', id: $routeParams.id}}).
            success(function (data) {
                $scope.expense = data;
            }).
            error(errorFunction);
    } else {
        //new record mode
        $scope.expense.date = new Date();
    }
    //get the categories for 'typeahead'
    $http.get('/getAllRecords', {params: {table: 'categories'}}).
        success(function (data) {
            $scope.categories = data;
        }).
        error(errorFunction);

    $scope.save = function () {
        $scope.expense.id = $scope.expense.id || (new Date).getTime();
        $scope.expense.amount = $scope.expense.amount || 0;
        //add the expense
        $http.post('/addRecord', $scope.expense, {params: {table: 'expenses', id: $scope.expense.id}}).
            success(function (data) {
            }).
            error(errorFunction);
        //add the category
        $http.post('/addRecord', {name: $scope.expense.category}, {params: {table: 'categories', id: $scope.expense.category}}).
            success(function (data) {
            }).
            error(errorFunction);
        $location.path('/list');
    };
    $scope.remove = function () {
        $http.post('/removeRecord', {}, {params: {table: 'expenses', id: $routeParams.id}}).
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