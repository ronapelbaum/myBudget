/**
 * Created by apelbaur on 6/19/2014.
 */
angular.module('util_module', []);

var DateUtils = {
    getMonthOffset: function (date, offset) {
        offset = offset || 0;
        var month = date.getMonth();
        var fullYear = date.getFullYear();
        if (month + offset > 11) {
            fullYear += (offset / 12 + 1);
        } else if (month + offset < 0) {
            fullYear -= (offset / 12 + 1);
        }
        month = (month + offset) % 12;

        return {
            start: new Date(fullYear, month, 1),
            end: new Date(fullYear, month + 1, 1)
        };
    },
    getYearOffset: function (date, offset) {
        offset = offset || 0;
        return {
            start: new Date(date.getFullYear() + offset, 0, 1),
            end: new Date(date.getFullYear() + offset + 1, 0, 1)
        };
    }
};