/**
 * Created by apelbaur on 6/23/2014.
 */
var express = require('express');
var dal = require('./dal');
var router = express.Router();

//--- server logic
router.post('/addExpense', function (req, res) {
    dal.addExpense(req.body, function (data) {
        res.send(data);
    });
});
router.post('/removeExpense', function (req, res) {
    dal.removeExpense(req.query.id, function (data) {
        res.send(data);
    });
});
router.get('/getExpense', function (req, res) {
    dal.getExpense(req.query.id, function (data) {
        res.send(data);
    });
});
router.get('/getExpensesList', function (req, res) {
    dal.getExpensesList(function (data) {
        res.send(data);
    });
});
router.get('/getCategoriesList', function (req, res) {
    dal.getCategoriesList(function (data) {
        res.send(data);
    });
});
router.get('/getExpensesSum', function (req, res) {
    dal.getExpensesSum(req.query.filter, function (data) {
        res.send(data);
    });
});
router.get('/getExpensesPivot', function (req, res) {
    dal.getExpensesPivot(req.query.pivotBy, function (data) {
        res.send(data);
    })
});

//--- income
router.post('/addIncome', function (req, res) {
    dal.addIncome(req.body, function (data) {
        res.send(data);
    });
});
router.post('/removeIncome', function (req, res) {
    dal.removeIncome(req.query.id, function (data) {
        res.send(data);
    });
});
router.get('/getIncomeList', function (req, res) {
    dal.getIncomeList(function (data) {
        res.send(data);
    });
});
router.get('/getIncomeSum', function (req, res) {
    dal.getIncomeSum(req.query.filter, function (data) {
        res.send(data);
    });
});

module.exports = router;
