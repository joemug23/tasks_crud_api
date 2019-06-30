var express = require('express');
var bodyParser = require('body-parser');
// var db = require('./models/db');

const { Pool, Client } = require('pg');

// connect to postgres database
const pool = new Pool({
    user: 'yourusername',
    host: 'localhost',
    database: 'todo',
    password: 'yourpassword',
    port: '5432'
});

var app = express();

app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send("<h2>Welcome to the Task Manager api</h2></br><p>Please use the route <strong>/api/</strong> to access to the api resources</p>")
});

// get all tasks
app.get('/api/tasks', function(req, res){
    pool.query('SELECT * FROM tasks', (err, result) => {
        // console.log(err, result);
        res.send(result.rows);

    });
});

// get task by id
app.get('/api/task/:t_id', function(req, res){
    text = "SELECT * FROM tasks WHERE taskid=$1";
    var t_id = req.params.t_id;

    // res.send(text);
    pool.query(text, [t_id], (err, result) => {
        if (!err){
            res.send(result.rows);
        } else {
            res.send(err);
        }

    });
});

// insert a task
app.post('/api/tasks', function(req, res){
    var title = req.body.tasktitle;
    var details = req.body.taskdetails;
    var project = req.body.projectname;
    var status = req.body.taskstatus;

    var text = "INSERT INTO tasks (tasktitle, taskdetails, projectname, taskstatus) VALUES ($1, $2, $3, $4)";

    pool.query(text,[title, details, project, status], (err, result) => {
        if (!err){
            res.send(req.status);
        } else {
            res.send(err);
        }
    });

});

// delete task by id
app.delete('/api/task/:t_id', function(req, res){
    text = "DELETE FROM tasks WHERE taskid=$1";
    var t_id = req.params.t_id;

    pool.query(text,[t_id], (err, result) => {
        if (!err){
            res.send(req.status);
        } else {
            res.send(err);
        }
    });
});

// update task by id
app.put('/api/task/:t_id', function(req, res){

    var title = req.body.tasktitle;
    var details = req.body.taskdetails;
    var project = req.body.projectname;
    var status = req.body.taskstatus;

    text = "UPDATE tasks SET tasktitle=$1, taskdetails=$2, projectname=$3, taskstatus=$4 WHERE taskid=$5";
    var t_id = req.params.t_id;

    // res.send(text);
    pool.query(text,[title, details, project, status, t_id], (err, result) => {
        if (!err){
            res.send(req.status);
        } else {
            res.send(err);
        }
    });
});


app.listen(port=3440);
console.log("Running on port:" + port);
