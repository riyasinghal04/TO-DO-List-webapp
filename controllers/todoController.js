var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb+srv://test:test@todo-ce6yn.mongodb.net/test?retryWrites=true&w=majority');

//schema- blueprint
var todoSchema= new mongoose.Schema({
  item: String
})

var Todo=mongoose.model('ToDo',todoSchema);
// var itemOne= Todo({item: 'get flowers'}).save(function(err){
//   if(err) throw err;
//   console.log('item saved');
// });

//var data= [{ item: 'get milk'},{item:'walk dog'},{item:'practice coding'}];
var urlencodedParser= bodyParser.urlencoded({extended: false});

module.exports= function(app){

app.get('/todo',function(req,res){

  Todo.find({},function(err,data){
    if(err) throw err;
    res.render('todo',{todos:data});
  });

});

app.post('/todo', urlencodedParser, function(req,res){
  //get data from view and add it to mongodb
  var newTodo=Todo(req.body).save(function(err,data){
    if (err) throw err;
    res.json(data);
  });

  // data.push(req.body);
  // res.json(data);
});

//delete request
app.delete('/todo/:item',function(req,res){
  //to delete item from mongodb
  Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
    if(err) throw err;
    res.json(data);
  });

    // data= data.filter(function(todo){
    //   return todo.item.replace(/ /g,'-') !== req.params.item;
    //   //returns true or false
    //   //if true, the item remains in array ; if false, item removed from array
    //   res.json(data);
    //});
});

};
