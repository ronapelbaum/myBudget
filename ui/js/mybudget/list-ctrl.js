/**
 * Created by apelbaur on 6/19/2014.
 */
angular.module('myBudget_module').controller('expListCtrl', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) {
    var today = new Date();
    $scope.timeFilters = [
        {filter: DateUtils.getMonthOffset(today), name: 'This Month'},
        {filter: DateUtils.getMonthOffset(today, -1), name: 'Previous Month'},
        {filter: DateUtils.getYearOffset(today), name: 'This Year'},
        {filter: DateUtils.getYearOffset(today, -1), name: 'Previous Year'}
    ];
    $scope.selectedTimeFilter = $rootScope.selectedTimeFilter || $scope.timeFilters[0];
    $scope.expensesList = {columns: [
        {name: 'Date', key: 'date', filter: {name: 'date', params: 'dd/MM/yyyy'}},
        {name: 'Category', key: 'category'},
        {name: 'Amount', key: 'amount'}
    ]};
    function getExpenses() {
        var timeFilter = $rootScope.selectedTimeFilter || $scope.selectedTimeFilter;
        $http.get('/getExpensesList', {params: timeFilter}).
            success(function (data) {
                $scope.expensesList.rows = data;
            }).
            error(errorFunction);
    }

    getExpenses();

    $scope.$watch('selectedTimeFilter', function (newVal, oldVal) {
        $rootScope.selectedTimeFilter = $scope.selectedTimeFilter;
        if (newVal.name !== oldVal.name) {
            getExpenses();
        }
    });

    $scope.reverse = false;
    $scope.order = undefined;
    $scope.setOrder = function (order) {
        $scope.reverse = $scope.order === order && !$scope.reverse;
        $scope.order = order;
    };


    $scope.edit = function (expense) {
        $location.path('/edit/' + expense._id);
    }

} ]);