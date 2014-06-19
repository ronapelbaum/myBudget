/**
 * Created by apelbaur on 6/10/2014.
 */
var dalImpl = require('./dalFsImpl');

exports.add = function (table, id, record) {
    dalImpl.add(table, id, record);
};

exports.removeById = function (table, id) {
    dalImpl.removeById(table, id);
};

exports.getById = function (table, id) {
    return dalImpl.getById(table, id);
};

exports.getAll = function (table) {
    return dalImpl.getAll(table);
};
