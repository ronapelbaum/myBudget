/**
 * Created by apelbaur on 6/23/2014.
 */
var dbUrl = "localhost/myBudget"; // "username:password@example.com/mydb"
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

mongoose.connect('mongodb://' + dbUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.info('mongoose connection open!');
});


//-- expenses
var Expense = mongoose.model('expense', {category: String, amount: Number, date: Date});

exports.addExpense = function (expense, dalCallback) {
    var myCallback = function (err, data) {
        dalCallback(data)
    };
    if (expense._id) {
        Expense.findByIdAndUpdate(expense._id, expense, myCallback);
    } else {
        (new Expense(expense)).save(myCallback);
    }
};

exports.removeExpense = function (id, dalCallback) {
    Expense.findByIdAndRemove(id, function (err, data) {
        dalCallback(data._doc)
    });
};

exports.getExpense = function (id, dalCallback) {
//    Expense.find({_id: new ObjectId(id)}, dalCallback);
    Expense.findById(id, function (err, data) {
        dalCallback(data._doc)
    });
};

exports.getExpensesList = function (filter, dalCallback) {
    if (filter) {
        filter = JSON.parse(filter);
        Expense.find(
            {date: {$gte: new Date(filter.start), $lt: new Date(filter.end)}},
            function (err, data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    res.push(data[i]._doc);
                }
                dalCallback(res);
            });
    } else {
        Expense.find(function (err, data) {
            dalCallback(data)
        });
    }
};
exports.getCategoriesList = function (dalCallback) {
    Expense.find().distinct('category', function (err, data) {
        dalCallback(data)
    });
};
exports.getExpensesSum = function (filter, dalCallback) {
    console.log(filter);
    if (filter) {
        filter = JSON.parse(filter);
        Expense.aggregate([
            {$match: {date: {$gte: new Date(filter.start), $lt: new Date(filter.end)}}},
            {$group: {_id: 0, total: {$sum: '$amount'}}}
        ], function (err, data) {
            dalCallback(data[0])
        });
    }
};
exports.getExpensesPivot = function (pivotBy, dalCallback) {
    console.log(pivotBy);
    //pivot
    //db.expenses.aggregate([{$group:{_id:'$category',total:{$sum:'$amount'}}},{$project:{_id:0,cat:'$_id',total:"$total"}}])
    //
    //db.expenses.aggregate([{$project:{_id:0,category:'$category',amount:'$amount',mon:{$month:'$date'}}},{$group:{_id:{cat:'$category', month:"$mon"},total:{$sum:'$amount'}}}])
    Expense.aggregate([
        {$project: {_id: 0, category: '$category', year_month: {y: {$year: '$date'}, m: {$month: '$date'}}, amount: '$amount'}},
        {$group: {_id: {c: '$category', ym: "$year_month"}, sum: {$sum: '$amount'}}},
        {$project: {_id: 0, category: '$_id.c', month: '$_id.ym', total: '$sum'}}
    ], function (err, data) {
        var pivot = {};
        for (var i = 0; i < data.length; i++) {
            var current = data[i];
            pivot[current.category] = pivot[current.category] || {};
            var date = new Date(current.month.y, current.month.m, 1);
            pivot[current.category][ date] = current.total;
        }
        console.log(pivot);
        dalCallback(pivot)
    });
};


// - incomes
var Income = mongoose.model('income', {category: String, amount: Number, date: Date});

exports.addIncome = function (income, dalCallback) {
    var myCallback = function (err, data) {
        dalCallback(data)
    };
    if (income._id) {
        Income.findByIdAndUpdate(income._id, income, myCallback);
    } else {
        (new Income(income)).save(myCallback);
    }
};
exports.removeIncome = function (id, dalCallback) {
    Income.findByIdAndRemove(id, function (err, data) {
        dalCallback(data._doc)
    });
};
exports.getIncomeList = function (dalCallback) {
    Income.find(function (err, data) {
        dalCallback(data)
    });
};
exports.getIncomeSum = function (filter, dalCallback) {
    Income.aggregate([
        {$group: {_id: 0, total: {$sum: '$amount'}}}
    ], function (err, data) {
        dalCallback(data[0])
    });
};