/**
 * Created by apelbaur on 7/2/2014.
 */
angular.module('util_module').filter('dynamicFilter', function ($filter) {
    return function (value, filter) {
        if (filter) {
            return $filter(filter.name)(value,filter.params);
        } else {
            return value;
        }
    };
});