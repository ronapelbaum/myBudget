/**
 * Created by apelbaur on 6/11/2014.
 */

var fs = require('fs');
var path = require('path');
var mkpath = require('mkpath');


var basedir = './_tmp/';
var extension = '.json';


function verifyPath(filePath) {
    var fileDir = path.dirname(filePath);

    if (fs.existsSync(fileDir)) {
        return;
    }
    mkpath(fileDir, function (err) {
        console.error(filePath, err);
    });
    mkpath.sync(fileDir);
}

function getFilePath(table, create) {
    table = table || '_data';
    var filePath = basedir + table + extension;
    if (create)verifyPath(filePath);
    return filePath;
}

function generateId() {
    return (new Date()).getTime();
}

function writeToFile(table, record) {
    fs.writeFile(getFilePath(table, true), JSON.stringify(record, null, 4), function (err) {
        if (err) {
            console.error('writeToFile', err);
            return;
        }
//        console.log("JSON saved to " +  filepath);
    });
}

function readFromFile(table) {
    var filePath = getFilePath(table);

    if (!fs.existsSync(filePath)) {
        return;
    }
    try {
        //TODO use asynchronous!
        return JSON.parse(fs.readFileSync(filePath));
    } catch (err) {
        console.error('readFromFile', err);
    }
}


exports.getAll = function getAll(table) {
    var db = readFromFile(table) || {};
    var records = [];
    for (var key in db) {
        if (db.hasOwnProperty(key)) {
            records.push(db[key]);
        }
    }
    return records;
};

exports.add = function (table, id, record) {
    id = id || generateId();
    //TODO improve this
    var db = readFromFile(table) || {};
    db[id] = record;
    writeToFile(table, db);
};

exports.getById = function (table, id) {
    var db = readFromFile(table) || {};
    return db[id];
};

exports.removeById = function (table, id) {
    var db = readFromFile(table) || {};
    delete db[id];
    writeToFile(table, db);
};

