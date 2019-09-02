console.log('Server-side code running');

const express = require('express');

const mongodb = require('mongodb').MongoClient;

const app = express();

var bodyparser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// serve files from the public directory
app.use(express.static('public'));

// connect to the db and start the express server
let db;

// ***Replace the URL below with the URL for your database***
const url =  'mongodb://127.0.0.1:27017/history';
// const url =  'mongodb://localhost:21017/databaseName';

mongoose.connect(url, (err, database) => {
  if(err) {
    return console.log(err);
  }
  db = database;

  // start the express web server listening on 3101
  app.listen(3101, () => {
    console.log('listening on 3101');
  });

});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/main.html');
});

var schema = new mongoose.Schema({
  name : String,
  country : String
},
{
  collection : 'rulers'
});

var detailsModel = mongoose.model("detailsModel", schema);
app.get("/", function (req, res) {
  res.render("response", { rulers: null })
});

app.get("/getrulers", function (req, res) {
  detailsModel.find({}, function (err, allDetails) {
      if (err) {
          console.log(err);
      } else {
          res.render("response", { rulers: allDetails });
      }
  });
});

var connection = mongoose.connection.readyState;

app.get("/getdataconn", function (req, res) {
  if(connection == 1) {
    res.render("databaseRes", {conn: res});
  }

});

//app.post('/clicked', (req, res) => {

  //var dbo = db.db("history");
  //dbo.collection("rulers").findOne({}, function(err, result)
    //{
    //  if (err) throw err;
      //console.log(result.name);
      //console.log(result.country);
      //db.close();
    //});
//  res.sendStatus(201);
//});

// get the click data from the database
//app.get('/clicks', (req, res) => {

//  var dbo = db.db("history");
  //dbo.collection('rulers').find().toArray((err, result) => {
  //  if (err) return console.log(err);
    //res.send(result);
  //});
//});
