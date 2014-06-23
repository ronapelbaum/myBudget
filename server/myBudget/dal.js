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

var Expense = mongoose.model('expense', {category: String, amount: Number, date: Date});

exports.addExpense = function (expense, callback) {
    var id = expense._id;
    if (id) {
        Expense.findByIdAndUpdate(id, expense, callback);
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

