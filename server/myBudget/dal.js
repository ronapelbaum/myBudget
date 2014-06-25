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

exports.getExpensesList = function (dalCallback) {
    Expense.find(function (err, data) {
        dalCallback(data)
    });
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