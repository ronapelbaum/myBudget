/**
 * Created by apelbaur on 6/19/2014.
 */
angular.module('myBudget_module').controller('expListCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    var today = new Date();
    $scope.timeFilters = [
        {filter: DateUtils.getMonthOffset(today), name: 'This Month'},
        {filter: DateUtils.getMonthOffset(today, -1), name: 'Previous Month'},
        {filter: DateUtils.getYearOffset(today), name: 'This Year'},
        {filter: DateUtils.getYearOffset(today, -1), name: 'Previous Year'}
    ];
    $scope.selectedTimeFilter = $scope.timeFilters[0];
    $scope.expensesList = {columns:[
        {name:'Date',key:'date', filter:{name:'date', params:'dd/MM/yyyy'}},
        {name:'Category',key:'category'},
        {name:'Amount',key:'amount'}
        ]};
    function getExpenses() {
        $http.get('/getExpensesList', {params: $scope.selectedTimeFilter}).
            success(function (data) {
                $scope.expensesList.rows = data;
            }).
            error(errorFunction);
    }

    getExpenses();
    $scope.$watch('selectedTimeFilter', getExpenses);

    $scope.reverse = false;
    $scope.order = undefined;
    $scope.setOrder = function (order) {
        $scope.reverse = $scope.order === order &&! $scope.reverse ;
        $scope.order = order;
    };


    $scope.edit = function (expense) {
        $location.path('/edit/' + expense._id);
    }

} ]);