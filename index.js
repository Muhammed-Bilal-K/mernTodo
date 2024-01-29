var express = require('express');
let mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

var app = express();

mongoose.connect('mongodb://localhost:27017/TODOLIST');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected');
})


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/get', (req, res, next) => {
    TodoModel.find({})
        .then(result => res.json(result))
        .catch(err => res.json(err));
})

app.put('/update/:id', (req, res, next) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
        .then(result => res.json(result))
        .catch(err => res.json(err));
})

app.delete('/delete/:id', (req, res, next) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
})


app.post('/add', (req, res, next) => {
    console.log(req.body);
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
        .catch(err => res.json(err));
})

app.listen(3001, () => {
    console.log('listening...3001');
})

module.exports = app;
