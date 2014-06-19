/**
 * Created by apelbaur on 6/10/2014.
 */
var express = require('express');
var router = express.Router();
var dal = require('./dal');

//--- server logic
router.post('/addRecord', function (req, res) {
    dal.add(req.query.table, req.query.id, req.body);
    res.send(200);
});
router.post('/removeRecord', function (req, res) {
    dal.removeById(req.query.table, req.query.id);
    res.send(200);
});
router.get('/getRecord', function (req, res) {
    res.send(dal.getById(req.query.table, req.query.id));
});
router.get('/getAllRecords', function (req, res) {
    res.send(dal.getAll(req.query.table));
});
module.exports = router;
