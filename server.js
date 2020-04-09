var express = require('express');
var app = express();
var fs = require("fs");
app.use(express.json())

const tasks = [{
    "id": 1,
    "content": "Restful API homework",
    "createdTime": "2019-05-15T00:00:00Z"
  }
]

//返回所有任务
app.get('/api/tasks', function (req, res) {
   	fs.readFile( __dirname + "/" + "data.json", 'utf8', function (err, data) {
       		console.log( data );
       		res.end( data );
   	});
})

//返回特定id的任务
app.get('/api/tasks/:id', (req, res) => {
    let task = tasks.find(b => b.id === parseInt(req.params.id));
    if(!task) return res.status(404).json({msg: 'The task with the given ID not find.'});
    res.json(task).end();
});

//创建新任务
app.post('/api/tasks', (req, res) => {
    const {error} = validateTask(req.body);
    if(error){
        return res.status(400).json({msg: error.details[0].message}).end();
    }

    const task = {
        "id": tasks.length + 1,
        "content": "Restful API homework",
        "createdTime": "2019-05-15T00:00:00Z"
    };
    tasks.push(task);
    res.json(task).end();
});

//删除任务
app.delete('/api/tasks/:id', (req, res) => {
    let task = tasks.find(b => b.id === parseInt(req.params.id));
    if(!task) return res.status(404).json({msg: 'The task with the given ID not find.'});

    const index = tasks.indexOf(task);
    tasks.splice(index, 1);

    res.json(task).end();
});

var server = app.listen(3000, function () {
  	var host = server.address().address;
  	var port = server.address().por;
  	console.log("ToDoList RESTFul API sever started on http://%s:%s", host, port);
})
