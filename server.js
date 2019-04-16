var express = require("express")
var app = express();

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restfultask");
mongoose.connection.on("Mongoose Connected", function () {
    console.log("**********Mongoose Connected")
})

var RestTaskSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    completed: {type: Boolean}
}, {timestamps: true})

var RestTaskModel = mongoose.model("RestTaskModel", RestTaskSchema);
mongoose.Promise = global.Promise;

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 
var path = require("path");


// THIS IS FOR ANGULAR WATCH
app.use(express.static( __dirname + '/public/dist/public' ));

app.get("/tasks", function(req,res){
    RestTaskModel.find({}, function(err, tasks){
        console.log("********* ALL TASKS SERVER.JS")
        res.json(tasks);
    })
})

app.get("/task/:id", function(req,res){
    console.log(req.params.id)
    RestTaskModel.findById({_id: req.params.id}, function(err, task){
        console.log("SHOWWW")
        res.json(task);
    })
    
})


app.post("/task/new", function(req,res){
    console.log(req.body)
    var task = new RestTaskModel(req.body);
    task.save(function(err){
        if(err){
            console.log(req.body)
            console.log("**********Error with POST method USER CREATION");
            console.log(err);
            res.json(task);
        } else{
            console.log("**************** SUCCESSFULLY CREATED TASK")
            res.json(task);
        }
        
    })
})

app.put("/task/put/:id", function(req,res){
    console.log(req.body )
    RestTaskModel.findByIdAndUpdate({_id: req.params.id},function(err){
        if(err){
            console.log("**********Error with POST method USER CREATION");
            console.log(err);
            res.json(task);
        } else{
            console.log("**************** SUCCESSFULLY CREATED USER")
            res.json(task);
        }
        
    })
})

app.delete("/task/remove/:id", function(req,res){
    console.log(req.params.id)
    RestTaskModel.findByIdAndRemove({_id: req.params.id}, function(err){
        console.log("REMOVEEEEEDDDD")
        // res.json(task);
    })
    
})


app.listen(9000,function(){
    console.log("****************PORT IS LISTENING")
})