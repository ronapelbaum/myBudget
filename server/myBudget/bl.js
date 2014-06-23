/**
 * Created by apelbaur on 6/23/2014.
 */
var express = require('express');
var dal = require('./dal');
var router = express.Router();

//--- server logic
router.post('/addExpense', function (req, res) {
    dal.add(req.body, function (err, data) {
        res.send(data);
    });
});
router.post('/removeExpense', function (req, res) {
    dal.removeById(req.query.id, function (err, data) {
        res.send(data._doc);
    });
});
router.get('/getExpense', function (req, res) {
    dal.getById(req.query.id, function (err, data) {
        res.send(data._doc);
    });
});
router.get('/getExpensesList', function (req, res) {
    dal.getExpenses(function (err, data) {
        res.send(data);
    });
});
router.get('/getCategoriesList', function (req, res) {
    dal.getCategories(function (err, data) {
        res.send(data);
    });
});

module.exports = router;
