/**
 * Created by apelbaur on 6/11/2014.
 */

var uiDirectives = angular.module('uiDirectives', []);

uiDirectives.directive('autoComplete', function () {
    var dtrv = {
        restrict: 'E',
        scope: {
            options: '=',
            searchParam: '=ngModel',
            placeholder: '=',
            show: false
        },
        controller: ['$scope', '$filter', function ($scope, $filter) {
            $scope.selected = -1;
            // set new index
            $scope.setSelected = function (index) {
                console.log('setSelected: ' + index);
                $scope.selected = parseInt(index);
                $scope.$apply();
            };
            $scope.showOptions = function (flag) {
                $scope.show = flag;
                $scope.$apply();

            };
            document.addEventListener('keydown', function (e) {
                var arr = $filter('filter')($scope.options, $scope.searchParam);
                console.log(arr);
            });
        }],
        link: function (scope, elem, attrs) {
            var key = {left: 37, up: 38, right: 39, down: 40, enter: 13, esc: 27};


            elem[0].addEventListener('keydown', function (e) {
                console.log(e);
                var currentLength = angular.element(this).find('li').length;
                var keycode = e.keyCode || e.which;
                switch (keycode) {
                    case key.down:
                        console.log('down: ' + scope.selected);
                        if (scope.selected < currentLength - 1) {
                            scope.selected++;
                            scope.$apply();
                        }
                        break;
                    case key.up:
                        console.log('up: ' + scope.selected);
                        if (scope.selected >= 0) {
                            scope.selected--;
                            scope.$apply();
                        }
                        break;
                    case key.enter:
                        console.log('enter: ' + scope.selected);
                        if (scope.selected >= 0) {
                            scope.searchParam = scope.options[scope.selected];
                            scope.$apply();
                        }
                        break;
                    case key.esc:
                        scope.selected = -1;
                        scope.$apply();
                        break;
                }
            })
        },
        templateUrl: 'partials/autoComplete.html'
    };
    console.log(dtrv);
    return dtrv;
});
//uiDirectives.directive('autoComplete', function($timeout) {
//    return function(scope, iElement, iAttrs) {
//        iElement.autocomplete({
//            source: scope[iAttrs.uiItems],
//            select: function() {
//                $timeout(function() {
//                    iElement.trigger('input');
//                }, 0);
//            }
//        });
//    };
//});