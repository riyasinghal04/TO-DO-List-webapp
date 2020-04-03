const express= require('express');
var app=express();
var todoController= require('./controllers/todoController');

//set up template engine
app.set('view engine','ejs');

//static files middleware
app.use(express.static('./public'));


//fire controllers
todoController(app);


app.listen(1000);
console.log("You are listening to port 1000");
