const express = require('express');
let app = express();
var getReposByUsername = require('../helpers/github.js');
var bodyParser = require('body-parser');
var db = require('../database/index.js');


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/repos', function(req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log("receiving POST request", req.body.username);
  console.log(typeof getReposByUsername.getReposByUsername);
  getReposByUsername.getReposByUsername(req.body.username, function(err, result) {
    console.log('pinging gitHub API for repos for ')
    if (err) {
      console.log('error in post request');
    } else {
      result.map((repo) => {
        db.save(repo, (err, result) => {

          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        })
      })

    }
    res.send();
  });





});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.find((err, result) => {
    if (err) {
      console.log('error getting repos from db', err );
      res.send(err);
    } else {
      console.log('success at getting repos from db');
      if (result.length < 25) {
        res.send(result);
      } else {
      result.length = 25;
      res.send(result);
      }
    }
  })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

