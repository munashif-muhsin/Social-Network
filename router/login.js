/**
 * Created by Muhsin on 14/05/2016.
 */


var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://localhost:7474');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(express.static(__dirname + "/Webpage"));


router.post('/login/', function (req, res) {
    var name = req.body.name;
    var pass = req.body.pass;


    db.cypher({

        query: 'match (u:Person ) where u.name="' + name + '" AND u.pass="' + pass + '" return u'
    }, function (err, results) {
        if (err) throw err;
        if (results != "") {
            res.json(results);
        } else {
            res.status(500).send('Login Failed!! ');
        }


    });

});


module.exports = router;