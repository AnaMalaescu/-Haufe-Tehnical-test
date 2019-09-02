console.log('Server-side code running');

const express = require('express');

const mongodb = require('mongodb').MongoClient;

const app = express();

// serve files from the public directory
app.use(express.static('public'));

// connect to the db and start the express server
let db;

// ***Replace the URL below with the URL for your database***
const url =  'mongodb://127.0.0.1:27017/history';
// const url =  'mongodb://localhost:21017/databaseName';

mongodb.connect(url, (err, database) => {
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

app.post('/clicked', (req, res) => {

  var dbo = db.db("history");
  dbo.collection("rulers").findOne({}, function(err, result)
    {
      if (err) throw err;
      console.log(result.name);
      console.log(result.country);
      db.close();
    });
  res.sendStatus(201);
});

// get the click data from the database
app.get('/clicks', (req, res) => {

  var dbo = db.db("history");
  dbo.collection('rulers').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});
