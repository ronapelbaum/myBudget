/**
 * Created by apelbaur on 6/9/2014.
 */
var appModules = [
    'ngRoute',
    'expenses_module',
    'util_module',
    'ui.bootstrap'
];
var expenses_app = angular.module('expenses_app', appModules);

expenses_app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/details.html',
                controller: 'expEditCtrl'
            }).
            when('/edit/:id', {
                templateUrl: 'partials/details.html',
                controller: 'expEditCtrl'
            }).
            when('/list', {
                templateUrl: 'partials/list.html',
                controller: 'expListCtrl'
            }).
            when('/pivot', {
                templateUrl: 'partials/pivot.html',
                controller: 'expPivotCtrl'
            }).
            when('/income', {
                templateUrl: 'partials/income.html',
                controller: 'expIncomeCtrl'
            }).
            when('/balance', {
                templateUrl: 'partials/balance.html',
                controller: 'expBalanceCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
]);