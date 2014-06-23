/**
 * Created by apelbaur on 6/9/2014.
 */
var appModules = [
    'ngRoute',
    'expenses_module',
    'util_module',
    'ui.bootstrap'
];
var expenseApp = angular.module('expenseApp', appModules);

expenseApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/details.html',
                controller: 'editExpenseCtrl'
            }).
            when('/edit/:id', {
                templateUrl: 'partials/details.html',
                controller: 'editExpenseCtrl'
            }).
            when('/list', {
                templateUrl: 'partials/list.html',
                controller: 'expenseListCtrl'
            }).
            when('/pivot', {
                templateUrl: 'partials/pivot.html',
                controller: 'expensePivotCtrl'
            }).
            when('/income', {
                templateUrl: 'partials/income.html',
                controller: 'expenseIncomeCtrl'
            }).
            when('/balance', {
                templateUrl: 'partials/balance.html',
                controller: 'expensesBalanceCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
]);