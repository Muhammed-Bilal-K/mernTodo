//Modles
const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: 'This field is required.'
    },
    done: {
        type: Boolean,
        default: false,
        required: 'This field is required.'
    },
});

module.exports = mongoose.model('todos', TodoSchema);

