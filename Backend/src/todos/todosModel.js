var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duedate: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('todos', todoSchema);