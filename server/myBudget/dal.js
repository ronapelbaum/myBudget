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

exports.addExpense = function (expense, callback) {
    if (expense._id) {
        Expense.findByIdAndUpdate(expense._id, expense, callback);
    } else {
        (new Expense(expense)).save(callback);
    }
};

exports.removeExpense = function (id, callback) {
    Expense.findByIdAndRemove(id, callback);
};

exports.getExpense = function (id, callback) {
//    Expense.find({_id: new ObjectId(id)}, callback);
    Expense.findById(id, callback);
};

exports.getExpensesList = function (callback) {
    Expense.find(callback);
};
exports.getCategoriesList = function (callback) {
    Expense.find().distinct('category', callback);
};


// - incomes
var Income = mongoose.model('income', {category: String, amount: Number, date: Date});

exports.addIncome = function (income, callback) {
    if (income._id) {
        Income.findByIdAndUpdate(income._id, income, callback);
    } else {
        (new Income(income)).save(callback);
    }
};

exports.removeIncome = function (id, callback) {
    Income.findByIdAndRemove(id, callback);
};
exports.getIncomeList = function (callback) {
    Income.find(callback);
};